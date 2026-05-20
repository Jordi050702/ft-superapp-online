import "./globals.css";
import BottomNav from "../components/BottomNav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <main>{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
