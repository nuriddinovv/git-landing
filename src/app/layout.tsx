import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
    title: "GUDS | Find work fast. Hire ready workers instantly.",
    description: "Direct marketplace for 1-day gigs and permanent jobs. No intermediaries.",
    icons: {
        icon: "/logo/logo.png",
        apple: "/logo/logo.png",
    },
    openGraph: {
        images: [
            {
                url: "/logo/fullLogo.png",
                width: 1200,
                height: 630,
                alt: "GUDS Logo",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${plusJakartaSans.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
