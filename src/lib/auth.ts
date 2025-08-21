import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Lucia } from "lucia";
import { Collection, MongoClient } from "mongodb";
import { cookies } from "next/headers";
import connectToDb from "./db";

interface UserDoc {
  _id: string;
}

interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}

const client = await connectToDb();

await client.connect();

const db = client.db("brickkeeper");

const User = db.collection("users") as Collection<UserDoc>;
const Session = db.collection("sessions") as Collection<SessionDoc>;

const adapter = new MongodbAdapter(Session, User);

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  client.close();
}
