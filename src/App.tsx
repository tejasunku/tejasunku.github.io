import { BrowserRouter, Link, Outlet, useLocation, Routes, Route } from "react-router-dom";

const navItems = [
  { to: "/", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/products", label: "Products" },
  { to: "/tos", label: "ToS" },
  { to: "/privacy", label: "Privacy" },
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
        Hi, I'm <strong>Teja Sunku</strong>, owner of <strong>Kube Era LLC</strong>.
        I build software solutions designed to improve people's digital lives.
      </p>
      <p>
        This website is your central hub for all projects distributed under Kube Era LLC.
        Any login you create here grants you access to all gated services across the domain.
      </p>
      <p>
        I sell individual services like{" "}
        <a href="https://cleanupmyemail.tejasunku.com">Clean Up My Email</a> — my first service
        designed to help people organize and clean up their email inbox.
      </p>
      <p>
        Check out the <Link to="/products">Projects</Link> page to see all available services.
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

function TermsOfService() {
  return (
    <main style={{ padding: "2rem", maxWidth: "700px" }}>
      <h1>Terms of Service — tejasunku.com</h1>
      <p><em>Effective Date: June 4, 2026 | Last Updated: June 4, 2026</em></p>
      <p>
        These Terms of Service ("Terms") govern your use of the website tejasunku.com (the "Site"), operated by Kube Era LLC ("Company," "we," "us," or "our"). By accessing or using the Site, you agree to be bound by these Terms.
      </p>

      <h2>1. Overview</h2>
      <p>
        tejasunku.com serves as a centralized authentication portal for services provided by Kube Era LLC. The Site itself does not provide any paid services. It exists solely to manage user accounts and login credentials that enable access to our various services.
      </p>

      <h2>2. Account Registration</h2>
      <p>
        To use services provided by Kube Era LLC, you may create an account on tejasunku.com. You may also authenticate using a third-party OAuth provider (e.g., Google, GitHub). By registering, you agree to provide accurate information and to keep your credentials secure.
      </p>

      <h2>3. Scope of Access</h2>
      <p>
        An account on tejasunku.com grants limited access to Kube Era LLC services. Each service has its own Terms of Service and Privacy Policy that govern your use of that specific service. These base Terms apply to all services unless explicitly overridden by a service's own Terms, in which case the service-specific Terms take precedence for that service. Base Terms remain in full force and effect for any matter not explicitly overridden.
      </p>

      <h2>4. Data Collection and Storage</h2>
      <p>
        tejasunku.com collects and stores only the minimum data necessary to manage your account and authentication. This includes your email address, authentication credentials, and basic profile information. We do not store any additional personal data beyond what is required for login management.
      </p>

      <h2>5. Account Deletion</h2>
      <p>
        You may delete your account at any time. Upon deletion:
      </p>
      <ul>
        <li>Your account data on tejasunku.com will be permanently removed.</li>
        <li><strong>Your account deletion may irrevocably delete data associated with any Kube Era LLC services you have used. This deletion is permanent and there is no recourse for recovery.</strong> The specific consequences of deletion depend on the individual service and are governed by that service's Terms of Service.</li>
      </ul>

      <h2>6. Third-Party OAuth Providers</h2>
      <p>
        If you choose to authenticate using a third-party OAuth provider, certain information will be shared with that provider in accordance with their terms and privacy policies. We do not control the data practices of third-party OAuth providers. We do not share your information with any other third parties.
      </p>

      <h2>7. No Warranties; Limitation of Liability</h2>
      <p>
        <strong>THE SITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.</strong>
      </p>
      <p>
        <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, KUBE ERA LLC SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM YOUR USE OF THE SITE. OUR TOTAL LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.</strong>
      </p>
      <p>
        Because the Site is provided free of charge, Kube Era LLC disclaims all liability to the fullest extent permitted by applicable law.
      </p>

      <h2>8. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Kube Era LLC, its officers, directors, employees, and agents from any claims, losses, damages, liabilities, and expenses arising out of your use of the Site or violation of these Terms.
      </p>

      <h2>9. Changes to These Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on the Site. Your continued use of the Site after changes are posted constitutes acceptance of the revised Terms.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the State of Delaware, United States, without regard to its conflict of law principles.
      </p>

      <h2>11. Contact</h2>
      <p>If you have questions about these Terms, contact us at:</p>
      <p>
        <strong>Kube Era LLC</strong><br />
        Email: <a href="mailto:sunkut@outlook.com">sunkut@outlook.com</a><br />
        Website: tejasunku.com
      </p>
    </main>
  );
}

function PrivacyPolicy() {
  return (
    <main style={{ padding: "2rem", maxWidth: "700px" }}>
      <h1>Privacy Policy — tejasunku.com</h1>
      <p><em>Effective Date: June 4, 2026 | Last Updated: June 4, 2026</em></p>
      <p>
        This Privacy Policy describes how Kube Era LLC ("Company," "we," "us," or "our") collects, uses, and protects your information when you use tejasunku.com (the "Site").
      </p>

      <h2>1. Overview</h2>
      <p>
        tejasunku.com is a centralized authentication portal operated by Kube Era LLC. The Site exists solely to manage user accounts and login credentials for Kube Era LLC services. We collect and store only the minimum data necessary to fulfill this purpose.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We collect the following information when you create an account:</p>
      <ul>
        <li><strong>Email address</strong> — used for account identification and communication</li>
        <li><strong>Authentication credentials</strong> — securely hashed passwords or OAuth tokens</li>
        <li><strong>Basic profile information</strong> — such as your name, if provided</li>
      </ul>
      <p>
        If you choose to authenticate via a third-party OAuth provider, we receive only the information that provider shares as part of the authentication process (typically your email address and profile information).
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>We use your information exclusively for:</p>
      <ul>
        <li>Managing your account and authentication</li>
        <li>Enabling login access to Kube Era LLC services</li>
        <li>Communicating with you about your account</li>
      </ul>

      <h2>4. Information Sharing</h2>
      <p>
        We do not sell, rent, or share your personal information with any third parties, <strong>except</strong>:
      </p>
      <ul>
        <li>
          <strong>Third-party OAuth providers</strong> — if you choose to authenticate using an OAuth provider (e.g., Google, GitHub), certain information is shared with that provider as part of the authentication flow. This sharing is initiated by your choice to use that authentication method. We have no control over the data practices of these providers.
        </li>
      </ul>

      <h2>5. Data Retention</h2>
      <p>
        We retain your account data for as long as your account remains active. You may delete your account at any time (see Section 6).
      </p>

      <h2>6. Account Deletion and Data Removal</h2>
      <p>You may delete your account at any time through the Site. Upon deletion:</p>
      <ul>
        <li>All data stored by tejasunku.com related to your account will be permanently deleted.</li>
        <li><strong>Account deletion may irrevocably delete data associated with Kube Era LLC services you have used.</strong> The specific data affected depends on the individual service. Refer to each service's Privacy Policy for details.</li>
        <li>Deletion is permanent and cannot be undone.</li>
      </ul>

      <h2>7. Data Security</h2>
      <p>
        We implement reasonable security measures to protect your data. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2>8. Children's Privacy</h2>
      <p>
        The Site is not intended for use by individuals under the age of 13 (or the applicable age of consent in your jurisdiction). We do not knowingly collect information from children.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will post the updated policy on the Site with a revised "Last Updated" date. Your continued use of the Site after changes are posted constitutes acceptance of the revised policy.
      </p>

      <h2>10. Your Rights</h2>
      <p>
        Depending on your jurisdiction, you may have rights regarding your personal data, including the right to access, correct, or delete your information. To exercise these rights, contact us at the email below.
      </p>

      <h2>11. Contact</h2>
      <p>If you have questions about this Privacy Policy, contact us at:</p>
      <p>
        <strong>Kube Era LLC</strong><br />
        Email: <a href="mailto:sunkut@outlook.com">sunkut@outlook.com</a><br />
        Website: tejasunku.com
      </p>
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
        <Route path="/tos" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}