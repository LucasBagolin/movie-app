export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        © {year} Lucas Vieira Bagolin.
      </div>
    </footer>
  );
}