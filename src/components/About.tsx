import { Card, CardContent } from "@/components/ui/card";
import { Palette, Crown, Heart, Award } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Authentic Artistry",
    description: "Each painting is created using traditional techniques passed down through generations of Rajasthani master artists."
  },
  {
    icon: Crown,
    title: "Royal Heritage",
    description: "Our collection features motifs and styles that once adorned the palaces of Rajasthani royalty and nobility."
  },
  {
    icon: Heart,
    title: "Handcrafted with Love",
    description: "Every piece is meticulously hand-painted with natural pigments and gold leaf, ensuring each artwork is unique."
  },
  {
    icon: Award,
    title: "Certified Quality",
    description: "All our paintings come with authenticity certificates and are created by award-winning artisans."
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-heritage bg-clip-text text-transparent">
            The Art of २४ Artistry
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            For over two decades, we have been dedicated to preserving and promoting the exquisite art of 
            Rajasthani miniature painting. Our gallery showcases the finest collection of authentic artworks 
            that capture the essence of India's royal heritage and cultural magnificence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center group hover:shadow-royal transition-all duration-300 border-0 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-royal rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-sunset rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Magic of Rajasthani Art
          </h3>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Step into our gallery and immerse yourself in the vibrant world of Rajasthani miniature paintings. 
            Each visit is a journey through centuries of artistic excellence and cultural heritage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Authentic Paintings</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-white/80">Master Artisans</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-white/80">Happy Collectors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;