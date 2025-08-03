import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface PaintingDetail {
  id: number;
  title: string;
  originalPrice?: string;
  price: string;
  images: string[];
  description: string;
  category: string;
  dimensions: string;
  medium: string;
  artist: string;
  yearCreated: string;
  technique: string;
  story: string;
}

interface PaintingDetailDialogProps {
  painting: PaintingDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaintingDetailDialog = ({ painting, open, onOpenChange }: PaintingDetailDialogProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!painting) return null;

  const handleAddToCart = () => {
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

  const handleBuyNow = () => {
    window.open(`https://wa.me/918605322549?text=Hi, I want to buy ${painting.title} for ${painting.price}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-bold text-primary flex-1">{painting.title}</DialogTitle>
            <div className="flex gap-3 ml-4">
              <Button onClick={handleBuyNow} variant="royal" size="sm">
                Buy Now
              </Button>
              <Button onClick={handleAddToCart} variant="outline" size="sm">
                Add to Cart
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img 
                src={painting.images[0]} 
                alt={painting.title}
                className="w-full h-full object-contain"
              />
            </div>
            {painting.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {painting.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden bg-muted">
                    <img 
                      src={image} 
                      alt={`${painting.title} view ${index + 2}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{painting.category}</Badge>
              <p className="text-muted-foreground">{painting.description}</p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Artwork Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Artist:</span>
                  <p className="text-muted-foreground">{painting.artist}</p>
                </div>
                <div>
                  <span className="font-medium">Year:</span>
                  <p className="text-muted-foreground">{painting.yearCreated}</p>
                </div>
                <div>
                  <span className="font-medium">Dimensions:</span>
                  <p className="text-muted-foreground">{painting.dimensions}</p>
                </div>
                <div>
                  <span className="font-medium">Medium:</span>
                  <p className="text-muted-foreground">{painting.medium}</p>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Technique:</span>
                  <p className="text-muted-foreground">{painting.technique}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">Story & Heritage</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{painting.story}</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {painting.originalPrice && (
                  <span className="text-lg font-medium text-muted-foreground line-through">
                    {painting.originalPrice}
                  </span>
                )}
                <span className="text-3xl font-bold text-rajasthani-gold">
                  {painting.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaintingDetailDialog;