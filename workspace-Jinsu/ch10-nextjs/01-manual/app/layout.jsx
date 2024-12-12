export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>Next.js App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
