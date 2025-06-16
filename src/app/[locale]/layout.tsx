import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata, Viewport } from "next";
import "@/assets/css/style.css";
import { getEscape } from "@/repository/server";

export const viewport: Viewport = {
  themeColor: "#211d47",
};

export async function generateMetadata(): Promise<Metadata> {
  const escape = await getEscape();

  return {
    title: `${escape.name} Escape`,
    ...(escape.faviconUrl && {
      icons: {
        icon: {
          url: escape.faviconUrl,
          sizes: "255x255",
          type: "image/x-icon",
        },
      },
    }),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <div className="max-w-xl mx-auto shadow-md min-h-dvh relative bg-white">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
