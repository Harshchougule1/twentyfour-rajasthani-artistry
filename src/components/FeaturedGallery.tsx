import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import peacockPainting from "@/assets/peacock-painting.jpg";
import elephantPainting from "@/assets/elephant-painting.jpg";
import collectionImage from "@/assets/paintings-collection.jpg";

const paintings = [
  {
    id: 1,
    title: "Rajasthani Phad hand painting",
    originalPrice: "₹4,500",
    price: "₹3,500",
    image: peacockPainting,
    description: "Traditional Phad painting depicting epic tales and folklore"
  },
  {
    id: 2,
    title: "Royal Peacock Majesty",
    price: "₹12,500",
    image: peacockPainting,
    description: "Exquisite peacock motif with intricate gold leaf details"
  },
  {
    id: 3,
    title: "Elephant Procession",
    price: "₹18,000",
    image: elephantPainting,
    description: "Traditional royal elephant parade in vibrant colors"
  },
  {
    id: 4,
    title: "Heritage Collection",
    price: "₹25,000",
    image: collectionImage,
    description: "Curated set of classical Rajasthani miniatures"
  }
];

const FeaturedGallery = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (painting: typeof paintings[0]) => {
    addItem({
      id: painting.id,
      title: painting.title,
      price: painting.price,
      image: painting.image
    });
    toast({
      title: "Added to cart",
      description: `${painting.title} has been added to your cart.`,
    });
  };

  const handleBuyNow = (painting: typeof paintings[0]) => {
    window.open(`https://wa.me/918605322549?text=Hi, I want to buy ${painting.title} for ${painting.price}`, '_blank');
  };

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-royal bg-clip-text text-transparent">
            Featured Masterpieces
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each painting is meticulously handcrafted by master artisans, preserving centuries-old techniques 
            and bringing royal Rajasthani heritage to your walls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          {paintings.map((painting) => (
            <Card 
              key={painting.id} 
              className="group overflow-hidden hover:shadow-elegant transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm cursor-pointer"
              onClick={() => window.open(`https://wa.me/918605322549?text=Hi, I'm interested in ${painting.title} for ${painting.price}`, '_blank')}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={painting.image} 
                  alt={painting.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {painting.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {painting.description}
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {painting.originalPrice && (
                      <span className="text-lg font-medium text-muted-foreground line-through">
                        {painting.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-rajasthani-gold">
                      {painting.price}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="royal" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(painting);
                      }}
                    >
                      Buy Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(painting);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="heritage" 
            size="lg" 
            className="px-12 py-6 text-lg"
            onClick={() => window.open('https://wa.me/918605322549?text=Hi, I want to see your complete gallery collection', '_blank')}
          >
            View Complete Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGallery;