import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "韩达光个人网站",
  description: "AI智能体研发者 | 人类生存空间开拓者 | 未来科技布道者",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.difyChatbotConfig = {
              token: 'q284wHgpZ56Uq2o4',
              baseUrl: 'https://udify.app',
              theme: 'light',
              welcomeMessage: '你好，我是韩达光智能体助手，有什么可以帮你的吗？'
            }
          `
        }} />
        <script src="https://udify.app/embed.min.js" id="q284wHgpZ56Uq2o4" defer />
        <style dangerouslySetInnerHTML={{
          __html: `
            #dify-chatbot-bubble-button {
              background-color: #1C64F2 !important;
              right: 20px !important;
              bottom: 20px !important;
            }
            #dify-chatbot-bubble-window {
              width: 24rem !important;
              height: 40rem !important;
              right: 20px !important;
              bottom: 80px !important;
            }
          `
        }} />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
