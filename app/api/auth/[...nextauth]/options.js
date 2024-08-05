import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const options = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        if (user.length > 0) {
          const pwMatch = await bcrypt.compare(
            credentials.password,
            user[0].userPassword
          );

          if (pwMatch) {
            delete user[0].userPassword;
            console.log(user[0]);
            return user[0];
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SEC,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...user, // credentials from user if logged in with credentials
        };
      }
      return token;
    },
    async session(session, token) {
      let user = {
        ...session,
        user: {
          ...token,
        },
      };

      return user;
    },
  },
};
