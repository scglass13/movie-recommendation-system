// Wrap all pages with common header and footer

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header
          style={{ padding: "10px", background: "#282c34", color: "white" }}
        >
          <h1>Movie Recommendation System</h1>
        </header>
        <main style={{ padding: "20px" }}>{children}</main>
        <footer
          style={{
            padding: "10px",
            background: "#282c34",
            color: "white",
            textAlign: "center",
          }}
        >
          <p>&copy; 2025 Movie Recommendation System</p>
        </footer>
      </body>
    </html>
  );
}
