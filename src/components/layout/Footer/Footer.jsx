function Footer() {
  return (
    <footer className="bg-surface-low text-on-surface border-t border-outline-variant transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold mb-4 text-on-surface">TechNexus</h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Elevating the next generation of engineers through shared
              knowledge and professional collaboration.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  API Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-outline-variant mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant/80 text-sm">
            © 2024 TechNexus Community. All rights reserved.
          </p>
          <p className="text-on-surface-variant/60 text-xs">Built for creators.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
