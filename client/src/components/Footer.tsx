import { Link } from "wouter";
import { Phone, MessageCircle, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <a className="text-3xl font-serif font-bold text-foreground mb-6 block">
                Fair Deal
              </a>
            </Link>
            <p className="text-muted-foreground text-lg max-w-md mb-8 leading-relaxed">
              Your trusted destination for quality essentials. From fresh food and stylish clothes to premium cosmetics and elegant jewelry, we bring excellence to every deal.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/9906515680" className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                <MessageCircle size={20} />
              </a>
              <a href="tel:9906515680" className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                <Phone size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">
              Categories
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/shop">
                  <a className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Food
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <a className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Clothes
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <a className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Cosmetics
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <a className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Jewelry
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-accent transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <a className="text-muted-foreground hover:text-accent transition-colors">Shop</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-accent transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-accent transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground">
            © {currentYear} <span className="font-bold text-foreground">Fair Deal</span>. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
