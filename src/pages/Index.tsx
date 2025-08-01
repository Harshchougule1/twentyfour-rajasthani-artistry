import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedGallery from "@/components/FeaturedGallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { OrdersPage } from "@/components/OrdersPage";

const Index = () => {
  const [showOrders, setShowOrders] = useState(false);

  if (showOrders) {
    return (
      <div className="min-h-screen bg-background">
        <OrdersPage onBack={() => setShowOrders(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onShowOrders={() => setShowOrders(true)} />
      <Hero />
      <FeaturedGallery />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;