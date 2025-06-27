
import ReduxProvider from "@/core_components/ReduxProvider/ReduxProvider";
import './globals.css';
import "@fontsource/bebas-neue";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body >
            <ReduxProvider>
            {children}
          </ReduxProvider>
        </body>
      </html>
  );
}
