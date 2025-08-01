import { Button } from "@/components/ui/button";
import { Menu, Search, User, LogOut } from "lucide-react";
import { CartSheet } from "./CartSheet";
import { AuthDialog } from "./AuthDialog";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

interface HeaderProps {
  onShowOrders?: () => void;
}

const Header = ({ onShowOrders }: HeaderProps) => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-all duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-3xl font-cinzel font-bold text-rajasthani-gold drop-shadow-lg">
                २४
              </span>
              <span className="text-lg font-playfair font-semibold text-foreground tracking-[0.2em] -mt-1">
                ARTISTRY
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#gallery" className="text-foreground hover:text-primary transition-colors">
              Gallery
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <CartSheet />
            
            {user ? (
              <div className="flex items-center space-x-2">
                {onShowOrders && (
                  <Button variant="ghost" size="sm" onClick={onShowOrders}>
                    My Orders
                  </Button>
                )}
                <span className="text-sm hidden sm:inline">
                  Welcome, {user.email?.split('@')[0]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-primary hover:text-primary-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAuthDialog(true)}
                className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="hidden md:inline-flex"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Collection
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />
    </header>
  );
};

export default Header;