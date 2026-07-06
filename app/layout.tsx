import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snapform — Editor Foto Formal & Profesional Instan Bertenaga AI",
  description: "Transformasikan foto kasual Anda menjadi pasfoto CV, LinkedIn, atau portofolio akademis secara instan dan profesional dengan AI. Cukup pilih preset visual tanpa perlu prompt engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Script Anti-Flicker untuk sinkronisasi tema di browser client */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const cachedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const activeTheme = cachedTheme || (systemPrefersDark ? 'dark' : 'light');
                  if (activeTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
