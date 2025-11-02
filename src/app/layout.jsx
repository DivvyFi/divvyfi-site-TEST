// src/app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white">{children}</body>
    </html>
  )
}

