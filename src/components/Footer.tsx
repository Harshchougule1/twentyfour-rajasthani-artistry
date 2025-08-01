import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-rajasthani-gold to-rajasthani-orange bg-clip-text text-transparent">
              २४ Artistry
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Preserving the magnificent legacy of Rajasthani miniature painting through authentic, 
              handcrafted masterpieces that celebrate India's royal heritage.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-rajasthani-gold cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-rajasthani-gold cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-rajasthani-gold cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 hover:text-rajasthani-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-primary-foreground/80 hover:text-rajasthani-gold transition-colors">Home</a></li>
              <li><a href="#gallery" className="text-primary-foreground/80 hover:text-rajasthani-gold transition-colors">Gallery</a></li>
              <li><a href="#about" className="text-primary-foreground/80 hover:text-rajasthani-gold transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-primary-foreground/80 hover:text-rajasthani-gold transition-colors">Contact</a></li>
            </ul>
          </div>

      

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Gallery Address</h4>
            <div className="text-primary-foreground/80 space-y-2">
              <p>Pune, Maharashtra</p>
              <p>411061</p>
              <p className="mt-4">+91 8605322549</p>
              <p>+91 7796656571</p>
              <p>chougulesachin2406@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2025 २४ Artistry. All rights reserved. | Crafted with love for Rajasthani art heritage.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
