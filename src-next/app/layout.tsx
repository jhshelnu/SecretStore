'use client'

import { Inter } from "next/font/google"
import "./globals.css"
import React from "react"
import { CssVarsProvider } from "@mui/joy"

const inter = Inter({ subsets: ["latin"] })

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
            <body className={`${inter.className}`}>
                <CssVarsProvider defaultMode="dark">{children}</CssVarsProvider>
            </body>
        </html>
    )
}
