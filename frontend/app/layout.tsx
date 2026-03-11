import './globals.css';
import AuthProvider from "@/components/SessionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Everything inside AuthProvider can now use useSession() */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}