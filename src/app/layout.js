import "./globals.css";

export const metadata = {
  title: "Auto Klímek - Profesionální autoservis",
  description: "Kvalitní péče a férové ceny pro vaše auto.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}