import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // ✅ Fix 1: destructure `account` to get the real Google ID
    async signIn({ user, account }) {
      try {
        const response = await fetch("http://localhost:8000/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
            googleId: account?.providerAccountId, // ✅ Fix 1: was missing entirely
          }),
        });

        if (response.ok) return true;

        const err = await response.json();
        console.error("FastAPI rejected login:", err);
        return false;
      } catch (error) {
        console.error("Backend connection failed:", error);
        return false;
      }
    },

    // ✅ Fix 2: properly populate session from token
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email ?? "";
        (session.user as any).id = token.sub; // ✅ Fix 2: expose Google UID to frontend
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };