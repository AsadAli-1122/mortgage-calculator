import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Frontend Mentor | Mortgage repayment calculator</title>
        <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/images/favicon-32x32.png"
    />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
