import { BrowserRouter, Link, Outlet, useLocation, Routes, Route } from "react-router-dom";

const navItems = [
  { to: "/", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/products", label: "Products" },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc", display: "flex", gap: "1.5rem" }}>
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          style={{
            textDecoration: location.pathname === item.to ? "underline" : "none",
            color: location.pathname === item.to ? "black" : "#666",
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function About() {
  return (
    <main style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1>About</h1>
      <p>
        Hi, I'm <strong>Teja Sunkara</strong>, owner of <strong>Kube Era LLC</strong>.
        I build software solutions designed to improve people's digital lives.
      </p>
      <p>
        Have questions about my products or need support? Reach out at{" "}
        <a href="mailto:sunkut@outlook.com">sunkut@outlook.com</a>.
      </p>
      <h2>Refunds</h2>
      <p>
        I offer refunds within one week of purchase for digital solutions that haven't been used.
        Other refunds are granted at my discretion. If you have any issues with a purchase,
        please contact me and I'll do my best to help.
      </p>
    </main>
  );
}

function Blog() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Blog</h1>
      <p>Coming soon.</p>
    </main>
  );
}

function Products() {
  return (
    <main style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1>Products</h1>
      <p>
        I sell software solutions to improve your digital life. Have questions or issues with a product?{" "}
        <a href="mailto:sunkut@outlook.com">Contact me</a>.
      </p>
      <ul>
        <li>
          <a href="https://cleanupmyemail.tejasunku.com">Clean Up My Email</a>
        </li>
      </ul>
    </main>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}