import "./globals.css";

export const metadata = {
  title: "Orca Charter Group",
  description: "Seattle premium charter service with Mercedes Sprinter transportation.",
  icons: {
    icon: "/icon.png",        // 浏览器 tab 图标
    shortcut: "/icon.png",    // iOS / Safari
    apple: "/icon.png",       // iPhone 添加到主屏幕
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
