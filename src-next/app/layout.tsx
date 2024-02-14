"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import React, { useState } from "react";
import { CssVarsProvider } from "@mui/joy";
import { Toaster } from "react-hot-toast";
import TitleBar from "@/components/TitleBar";
import LockStateContext from "@/components/LockStateContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [isUnlocked, setUnlocked] = useState(false);

    return (
        <html lang="en">
            <head>
                <title>SecretStore</title>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </head>
            <body
                className={`${inter.className}`}
                style={{
                    margin: 0,
                    width: "100vw",
                    height: "100vh",
                    borderWidth: "1px 2px 2px 1px",
                    borderStyle: "solid",
                    borderColor: "#404040",
                    boxSizing: "border-box",
                }}
            >
                <LockStateContext.Provider value={{ isUnlocked, setUnlocked }}>
                    <TitleBar />
                    <CssVarsProvider defaultMode="dark">{children}</CssVarsProvider>
                    <Toaster position="bottom-center"/>
                </LockStateContext.Provider>
            </body>
        </html>
    );
}
