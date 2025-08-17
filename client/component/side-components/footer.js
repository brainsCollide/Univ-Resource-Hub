import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gray-900 text-white py-12 px-6 overflow-hidden">
      {/* Decorative Hollow Circles */}
      <div className="absolute top-0 right-0 w-24 h-24 border-4 border-white rounded-full translate-x-1/2 -translate-y-1/2 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-[#1d919c] rounded-full -translate-x-1/2 translate-y-1/2 opacity-20"></div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 z-10 relative">
        {/* About */}
        <div>
          <h4 className="text-xl font-semibold mb-3">About Sakarya Book Space</h4>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            Sakarya Book Space is a community platform for students to share books, join study groups, and grow together through collaborative learning.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              { label: "Home", href: "/" },
              { label: "Posts", href: "/content-page" },
              { label: "Blog", href: "/resource" },
              { label: "Join Us", href: "/join-us" },
              { label: "Contact", href: "/contact" },
            ].map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="hover:text-[#1d919c] transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Sakarya Book Space. All rights reserved.</p>
        <div className="mt-2 md:mt-0">
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-[#1d919c] transition-colors duration-200"
          >
            <FaInstagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
