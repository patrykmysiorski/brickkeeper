// import { compare, hash } from "bcrypt";
import { compare, hash } from "bcrypt";
import client from "./db";
import { Collection, ObjectId } from "mongodb";

interface MongoUser {
  name: string;
  email: string;
  _id: ObjectId;
  password: string;
}

type User = {
  id: string;
  name: string;
  email: string;
};

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

async function getCollection(collection: string): Promise<Collection> {
  await client.connect();
  const db = client.db("brickkeeper");
  return db.collection("users");
}

export async function getUserFromDb(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const users = await getCollection("users");
    const existingUser = await users.findOne<MongoUser>({ email });

    if (!existingUser) {
      return null;
    }

    const isValidPassword = await verifyPassword(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return null;
    }

    client.close();

    return {
      id: existingUser._id.toString(),
      name: existingUser.name,
      email: existingUser.email,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createNewUser(
  email: string,
  password: string,
  name: string
): Promise<User | null> {
  try {
    const users = await getCollection("users");

    const existingUser = await users.findOne<MongoUser>({ email });

    if (existingUser) {
      return null;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await users.insertOne({
      email,
      password: hashedPassword,
      name,
    });

    if (!newUser) {
      return null;
    }

    client.close();

    return { id: newUser.insertedId.toString(), email, name };
  } catch (error) {
    console.log(error);
    return null;
  }
}
