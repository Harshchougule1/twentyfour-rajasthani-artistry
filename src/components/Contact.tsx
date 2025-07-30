import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Gallery",
    details: ["Pune, Maharashtra", "411061"]
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 8605322549", "+91 7796656571"]
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["chougulesachin2406@gmail.com"]
  }
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-sunset bg-clip-text text-transparent">
            Visit Our Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the beauty of Rajasthani art in person. Our gallery welcomes art enthusiasts, 
            collectors, and anyone passionate about Indian heritage and culture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-gold transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-royal rounded-lg">
                          <info.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 bg-gradient-heritage text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Special Exhibition</h3>
                <p className="mb-4 text-white/90">
                  Join us for our special exhibition "Royal Splendor: 300 Years of Rajasthani Art" 
                  featuring rare and exquisite pieces from private collections.
                </p>
                <Button variant="secondary" className="bg-white text-rajasthani-blue hover:bg-white/90">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-royal bg-clip-text text-transparent">
                Get in Touch
              </h3>
              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const firstName = formData.get('firstName');
                  const lastName = formData.get('lastName');
                  const email = formData.get('email');
                  const phone = formData.get('phone');
                  const message = formData.get('message');
                  
                  const whatsappMessage = `Hi! New inquiry from ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Message: ${message}`;
                  
                  window.open(`https://wa.me/918605322549?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input name="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input name="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input name="email" type="email" placeholder="Enter your email" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <Input name="phone" type="tel" placeholder="Enter your phone number" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea 
                    name="message"
                    placeholder="Tell us about your interest in Rajasthani art or any specific paintings you'd like to know about"
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" variant="royal" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;