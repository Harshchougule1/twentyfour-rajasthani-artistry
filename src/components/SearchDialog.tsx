import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const paintings = [
  {
    id: 1,
    title: "Rajasthani Phad hand painting",
    price: "₹3,500",
    description: "Traditional Phad painting depicting epic tales and folklore",
    category: "Traditional"
  },
  {
    id: 2,
    title: "Royal Peacock Majesty",
    price: "₹12,500",
    description: "Exquisite peacock motif with intricate gold leaf details",
    category: "Royal"
  },
  {
    id: 3,
    title: "Elephant Procession",
    price: "₹18,000",
    description: "Traditional royal elephant parade in vibrant colors",
    category: "Traditional"
  },
  {
    id: 4,
    title: "Heritage Collection",
    price: "₹25,000",
    description: "Curated set of classical Rajasthani miniatures",
    category: "Heritage"
  }
];

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPaintings = paintings.filter(painting =>
    painting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    painting.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    painting.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPainting = (painting: typeof paintings[0]) => {
    // Scroll to gallery section and close dialog
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    onOpenChange(false);
    
    // Optional: Open WhatsApp with the specific painting
    setTimeout(() => {
      window.open(
        `https://wa.me/918605322549?text=Hi, I'm interested in ${painting.title} for ${painting.price}`, 
        '_blank'
      );
    }, 500);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search paintings, categories, or descriptions..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>No paintings found.</CommandEmpty>
        <CommandGroup heading="Paintings">
          {filteredPaintings.map((painting) => (
            <CommandItem
              key={painting.id}
              onSelect={() => handleSelectPainting(painting)}
              className="flex flex-col items-start p-4 cursor-pointer"
            >
              <div className="flex justify-between w-full items-start">
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{painting.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{painting.description}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {painting.category}
                    </span>
                    <span className="font-bold text-rajasthani-gold">{painting.price}</span>
                  </div>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        {searchQuery && filteredPaintings.length === 0 && (
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                window.open(
                  `https://wa.me/918605322549?text=Hi, I'm looking for: ${searchQuery}`, 
                  '_blank'
                );
                onOpenChange(false);
              }}
              className="flex items-center gap-2 p-4 cursor-pointer"
            >
              <Search className="h-4 w-4" />
              <span>Ask about "{searchQuery}" on WhatsApp</span>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;