"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Box, CssVarsProvider } from "@mui/joy";
import { Toaster } from "react-hot-toast";
import TitleBar from "@/components/TitleBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <title>SecretStore</title>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </head>
            <body className={`${inter.className}`} style={{ margin: 0, width: "100vw", height: "100vh" }}>
                <Box style={{ margin: 0, width: "100vw", height: "100vh" }}>
                    <TitleBar />
                    <Toaster position="bottom-center"/>
                    <CssVarsProvider defaultMode="dark">{children}</CssVarsProvider>
                </Box>
            </body>
        </html>
    );
}
