import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const options = {
  session: {
    jwt: true,
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            throw new Error("Failed to fetch user");
          }

          const user = await res.json();

          if (user.length > 0) {
            const pwMatch = await bcrypt.compare(
              credentials.password,
              user[0].userPassword
            );

            if (pwMatch) {
              delete user[0].userPassword; // Ensure this field exists before deleting
              console.log(user[0]);
              return user[0];
            }
          }

          return null;
        } catch (error) {
          console.error("Authorization error:", error);
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
        return { ...user }; // credentials from user if logged in with credentials
      }
      return token;
    },
    async session(session, token) {
      // let user = {
      //   ...session,
      //   user: {
      //     ...token,
      //   },
      // };

      // return user;
      session.user = { ...token };
      return session;
    },
  },
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //     },
  //   },
  //   callbackUrl: {
  //     name: `__Secure-next-auth.callback-url`,
  //     options: {
  //       sameSite: "lax",
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //     },
  //   },
  // },
  // debug: process.env.NODE_ENV === "development",
};
