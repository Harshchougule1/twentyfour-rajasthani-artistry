import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-gallery.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-white drop-shadow-lg">
            २४ Artistry
          </span>
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-gray-200 leading-relaxed">
          Discover the timeless beauty of authentic Rajasthani miniature paintings. 
          Each masterpiece tells a story of royal heritage, vibrant culture, and artistic excellence.
        </p>
        <div className="flex justify-center">
          <Button 
            variant="royal" 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Gallery
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/20 to-transparent"></div>
    </section>
  );
};

export default Hero;