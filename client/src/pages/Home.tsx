import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { defaultSEOConfigs } from "@/lib/seo";
import { Phone, MessageCircle, ShieldCheck, Clock, Award } from "lucide-react";

export default function Home() {
  // Simplified SEO for now
  useSEO({
    ...defaultSEOConfigs.home,
    title: "Fair Deal | Quality Services by Arif Najar",
    description: "Welcome to Fair Deal, run by Arif Najar. We provide top-quality services and products with a commitment to excellence.",
  });

  const services = [
    {
      title: "Quality Assurance",
      description: "We ensure every product and service meets our high standards of quality.",
      icon: <ShieldCheck className="w-12 h-12 text-accent" />,
    },
    {
      title: "Timely Delivery",
      description: "Your time is valuable. We pride ourselves on prompt and reliable service.",
      icon: <Clock className="w-12 h-12 text-accent" />,
    },
    {
      title: "Expertise",
      description: "With years of experience, Arif Najar brings unmatched expertise to every project.",
      icon: <Award className="w-12 h-12 text-accent" />,
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary to-background py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4 leading-tight animate-fade-in">
              Fair Deal
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-light animate-fade-in-delay-1">
              Excellence in Every Deal
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-delay-2">
              Welcome to Fair Deal, your trusted destination for quality services and products. Led by Arif Najar, we are dedicated to providing the best value and experience to our customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
              <Link href="/about">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Learn About Us
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-foreground mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-background p-8 rounded-xl border border-border hover:shadow-lg transition-all duration-300 text-center">
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Brief Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-serif font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Fair Deal was established with a simple mission: to provide honest, high-quality services that people can rely on. Arif Najar, the founder, has spent years building a reputation for integrity and excellence.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe in building long-term relationships with our clients based on trust and mutual respect. Every project we undertake is a testament to our commitment to quality.
              </p>
              <Link href="/about">
                <Button variant="link" className="text-accent p-0 h-auto text-lg font-semibold">
                  Read our full story →
                </Button>
              </Link>
            </div>
            <div className="order-1 md:order-2 bg-muted rounded-2xl aspect-video flex items-center justify-center text-6xl">
              🤝
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today to discuss your needs or learn more about how we can help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:7006630873">
              <Button size="lg" variant="secondary" className="gap-2">
                <Phone size={20} />
                Call: +91 7006630873
              </Button>
            </a>
            <a href="https://wa.me/7006630873" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="gap-2">
                <MessageCircle size={20} />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
