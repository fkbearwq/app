
import "./globals.css";

export const metadata = {
  title: "Orca Charter Group",
  description: "Seattle premium charter service with Mercedes Sprinter transportation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
