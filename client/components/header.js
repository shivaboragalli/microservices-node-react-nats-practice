import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter(Boolean) // cleaner than linkConfig check
    .map(({ label, href }) => (
      <li key={href} className="nav-item">
        <Link className="nav-link" href={href}>
          {label}
        </Link>
      </li>
    ));

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/">
          GitTix
        </Link>
        <ul className="nav d-flex align-items-center gap-3">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
