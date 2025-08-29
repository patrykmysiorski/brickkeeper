import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createNewUser, getUserFromDb } from "./lib/utils";
import { signInSchema } from "./lib/zod";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: {},
      name: {},
    },
    authorize: async (credentials) => {
      const { email, password, name } = await signInSchema.parseAsync(
        credentials
      );

      let user = null;

      if (!credentials) {
        return null;
      }

      if (name) {
        user = await createNewUser(email, password, name);
      } else {
        // logic to verify if the user exists
        user = await getUserFromDb(email, password);
      }

      if (!user) {
        throw new Error("Invalid credentials.");
      }

      // return user object with their profile data
      return user;
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(client),
  providers,
  pages: {
    signIn: "/auth",
  },
});
