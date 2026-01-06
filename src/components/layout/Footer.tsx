import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-display text-2xl font-medium tracking-tight">
              ATELIER
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
              Contemporary clothing for the modern individual. Quality craftsmanship meets timeless design.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-primary-foreground/20 rounded-full hover:bg-primary-foreground/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-primary-foreground/20 rounded-full hover:bg-primary-foreground/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-primary-foreground/20 rounded-full hover:bg-primary-foreground/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">Best Sellers</Link></li>
              <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase mb-4">Help</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>contact@atelier.com</li>
              <li>+91 98765 43210</li>
              <li>Mon - Sat: 10:00 - 19:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2025 ATELIER. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
