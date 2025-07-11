
import ReduxProvider from "@/core_components/ReduxProvider/ReduxProvider";
import './globals.css';
import "@fontsource/bebas-neue";
import React, { ReactNode } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
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
