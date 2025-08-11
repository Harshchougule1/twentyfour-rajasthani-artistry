import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import PaintingDetailDialog from "@/components/PaintingDetailDialog";
import peacockPainting from "@/assets/rp.jpg";
import elephantPainting from "@/assets/elephant-painting.jpg";
import collectionImage from "@/assets/paintings-collection.jpg";

const paintings = [
  {
    id: 1,
    title: "Rajasthani Phad hand painting",
    originalPrice: "₹4,500",
    price: "₹3,500",
    images: [peacockPainting, collectionImage, elephantPainting],
    description: "Traditional Phad painting depicting epic tales and folklore",
    category: "Traditional Phad",
    dimensions: "24 x 18 inches",
    medium: "Natural pigments on cloth",
    artist: "Master Kalyan Joshi",
    yearCreated: "2024",
    technique: "Traditional Phad painting technique with natural colors",
    story: "This authentic Phad painting narrates the legendary tales of Pabuji, a folk hero of Rajasthan. Painted using traditional techniques passed down through generations, it showcases the rich storytelling tradition of Rajasthani culture. The intricate details and vibrant colors represent the eternal battle between good and evil, brought to life through masterful brushwork."
  },
  {
    id: 2,
    title: "Royal Peacock Majesty",
    price: "₹12,500",
    images: [collectionImage, peacockPainting, elephantPainting],
    description: "Exquisite peacock motif with intricate gold leaf details",
    category: "Miniature Art",
    dimensions: "16 x 12 inches",
    medium: "Watercolor and gold leaf on handmade paper",
    artist: "Ustad Mohsin Khan",
    yearCreated: "2024",
    technique: "Mughal miniature painting with gold illumination",
    story: "Inspired by the royal courts of Rajasthan, this magnificent peacock represents beauty, grace, and royalty. The intricate feather patterns are painted with the finest brushes, while 24-karat gold leaf adds a divine luminescence. Each stroke reflects the artist's devotion to preserving the classical traditions of Indian miniature art."
  },
  {
    id: 3,
    title: "Elephant Procession",
    price: "₹18,000",
    images: [elephantPainting, collectionImage, peacockPainting],
    description: "Traditional royal elephant parade in vibrant colors",
    category: "Royal Court Art",
    dimensions: "20 x 16 inches",
    medium: "Tempera and gold on silk",
    artist: "Shri Ravi Sharma",
    yearCreated: "2024",
    technique: "Classical Rajasthani court painting style",
    story: "This majestic elephant procession captures the grandeur of royal celebrations in ancient Rajasthan. The decorated elephants, adorned with precious textiles and jewels, carry the royal family through the palace courtyard. Every detail, from the ornate howdahs to the ceremonial decorations, reflects the opulence and splendor of Rajput heritage."
  },
  {
    id: 4,
    title: "Heritage Collection",
    price: "₹25,000",
    images: [collectionImage, peacockPainting, elephantPainting],
    description: "Curated set of classical Rajasthani miniatures",
    category: "Collection Set",
    dimensions: "12 x 10 inches each (Set of 4)",
    medium: "Mixed media on handmade paper",
    artist: "Heritage Artists Collective",
    yearCreated: "2024",
    technique: "Multiple traditional techniques combined",
    story: "This exclusive collection brings together four masterpieces representing different aspects of Rajasthani culture - royal portraits, wildlife, architecture, and festivals. Each piece is carefully crafted by master artisans, making this collection a perfect representation of the rich artistic heritage of Rajasthan. Ideal for collectors who appreciate authentic traditional art."
  }
];

const FeaturedGallery = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedPainting, setSelectedPainting] = useState<typeof paintings[0] | null>(null);

  const handleAddToCart = (painting: typeof paintings[0]) => {
    addItem({
      id: painting.id,
      title: painting.title,
      price: painting.price,
      image: painting.images[0]
    });
    toast({
      title: "Added to cart",
      description: `${painting.title} has been added to your cart.`,
    });
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
              className="group overflow-hidden hover:shadow-elegant transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm"
            >
              <div className="relative overflow-hidden cursor-pointer"
                   onClick={() => window.open(`https://wa.me/918605322549?text=Hi, I'm interested in ${painting.title} for ${painting.price}`, '_blank')}>
                <div className="aspect-[4/3] bg-muted">
                  <img 
                    src={painting.images[0]} 
                    alt={painting.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 
                  className="text-xl font-semibold mb-2 text-foreground hover:text-primary transition-colors cursor-pointer"
                  onClick={() => setSelectedPainting(painting)}
                >
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
                  <div>
                    <Button 
                      variant="royal" 
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

      <PaintingDetailDialog 
        painting={selectedPainting}
        open={!!selectedPainting}
        onOpenChange={(open) => !open && setSelectedPainting(null)}
      />
    </section>
  );
};

export default FeaturedGallery;
