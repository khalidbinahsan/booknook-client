import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db, mongoClient } from "./db";

const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

// Google login is enabled only when its keys exist, so the app still runs
// locally with email/password before the Google credentials are added.
const socialProviders = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    prompt: "select_account",
  };
}

export const auth = betterAuth({
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client: mongoClient }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    // After registering, the user is sent to the Login page (assignment rule)
    autoSignIn: false,
  },

  socialProviders,

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once a day
  },

  plugins: [
    // Issues JWTs (GET /api/auth/token) and publishes the public keys at
    // /api/auth/jwks so the Express server can verify them.
    jwt({
      jwt: {
        issuer: baseURL,
        audience: baseURL,
        expirationTime: "1h",
        definePayload: ({ user }) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }),
      },
    }),
    // Must be the last plugin: lets server actions set auth cookies
    nextCookies(),
  ],

  trustedOrigins: [baseURL],
});
