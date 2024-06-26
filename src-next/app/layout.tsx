"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy";
import { Toaster } from "react-hot-toast";
import LockStateContext from "@/components/LockStateContext";
import { invoke } from "@tauri-apps/api/tauri";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    // this component relies on native tauri api's which are not available server-side or during build-time
    const TitleBar = dynamic(() => import("../components/TitleBar"), { ssr: false });

    const [isUnlocked, setUnlocked] = useState(false);

    // don't think this is strictly necessary for release builds,
    // but it is very useful in development when a UI refresh occurs
    useEffect(() => {
        invoke("is_secretstore_initialized")
            .then(isInit => setUnlocked(isInit as boolean));
    }, []);

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
                    overflow: "hidden",
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
