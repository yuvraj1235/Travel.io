import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    // 🔹 Simple Email + Password Login (for local dev, no Google OAuth)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // For local development:
        // You can use any email/password
        // If you want specific test accounts, modify this logic
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        // Mock: Accept any credentials locally (no backend call)
        // Later, this will call your backend /api/auth/login
        
        // For now, create mock user with this email
        return {
          id: Math.random().toString(36).substr(2, 9),
          email: credentials.email,
          name: credentials.email.split("@")[0],
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };