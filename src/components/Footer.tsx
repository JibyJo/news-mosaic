import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3B434A] text-white text-sm py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-3">About News Mosaic</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition"
                >
                  Who we are
                </a>
              </li>
              <li>
                <a
                  href="/press"
                  className="text-gray-300 hover:text-white transition"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="/media-forum"
                  className="text-gray-300 hover:text-white transition"
                >
                  Media Forum
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Services</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/newsletter"
                  className="text-gray-300 hover:text-white transition"
                >
                  Newsletters
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-300 hover:text-white transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Business</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/advertising"
                  className="text-gray-300 hover:text-white transition"
                >
                  Advertising
                </a>
              </li>
              <li>
                <a
                  href="/partnerships"
                  className="text-gray-300 hover:text-white transition"
                >
                  Partnerships
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/"
                className="hover:text-blue-400 transition"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://twitter.com/"
                className="hover:text-blue-400 transition"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="https://youtube.com/"
                className="hover:text-red-500 transition"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube fa-lg"></i>
              </a>
              <a
                href="https://instagram.com/"
                className="hover:text-pink-400 transition"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-600 pt-4 text-center text-gray-400 text-xs">
          <p>© 2025 News Mosaic. All Rights Reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="/legal-notice" className="hover:text-white transition">
              Legal Notice
            </a>
            <a href="/terms" className="hover:text-white transition">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
