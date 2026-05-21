import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { defaultSEOConfigs } from "@/lib/seo";
import { Phone, MessageCircle, ShieldCheck, Clock, Award, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  useSEO({
    ...defaultSEOConfigs.home,
    title: "Fair Deal | Your One-Stop Shop for Essentials",
    description: "Welcome to Fair Deal, run by Arif Najar. We provide top-quality food, clothes, cosmetics, jewelry, and more.",
  });

  const { data: featuredProducts } = trpc.products.getFeatured.useQuery();

  const categories = [
    { name: "Food", image: "/assets/food.jpg", desc: "Fresh & Organic Essentials", href: "/shop" },
    { name: "Clothes", image: "/assets/clothes.jpg", desc: "Stylish & Modern Apparel", href: "/shop" },
    { name: "Cosmetics", image: "/assets/cosmetics.jpg", desc: "Premium Beauty Products", href: "/shop" },
    { name: "Jewelry", image: "/assets/jewelry.jpg", desc: "Elegant & Timeless Pieces", href: "/shop" }
  ];

  const features = [
    {
      title: "Quality Assurance",
      description: "We ensure every product meets our high standards of quality and excellence.",
      icon: <ShieldCheck className="w-10 h-10 text-accent" />,
    },
    {
      title: "Fast Delivery",
      description: "Your time is valuable. We pride ourselves on prompt and reliable delivery.",
      icon: <Clock className="w-10 h-10 text-accent" />,
    },
    {
      title: "Expert Curation",
      description: "Arif Najar personally selects the best products for our valued customers.",
      icon: <Award className="w-10 h-10 text-accent" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content: "The quality of products at Fair Deal is unmatched. I've been buying my cosmetics and jewelry here for months!",
      rating: 5
    },
    {
      name: "Rahul Sharma",
      role: "Food Enthusiast",
      content: "Fresh organic food delivered right to my door. Fair Deal has made my life so much easier and healthier.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Fashion Blogger",
      content: "I love the clothing collection. It's trendy, comfortable, and very reasonably priced. Highly recommended!",
      rating: 4
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 px-4 py-1 text-sm font-medium">
                Welcome to Fair Deal
              </Badge>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-foreground mb-6 leading-tight">
                Everything You Need, <br />
                <span className="text-accent">All in One Place</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                From fresh food and stylish clothes to premium cosmetics and elegant jewelry. Led by Arif Najar, we bring you the best quality essentials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-full group">
                    Shop Now
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full border-2">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-card relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our wide range of essential products curated just for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={cat.href}>
                  <div className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-xl">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <h3 className="text-3xl font-serif font-bold text-white mb-2">{cat.name}</h3>
                      <p className="text-white/80 mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {cat.desc}
                      </p>
                      <div className="w-12 h-1 bg-accent rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
                  Featured Products
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our most popular items this week.
                </p>
              </div>
              <Link href="/shop">
                <Button variant="link" className="text-accent text-lg font-semibold p-0 group">
                  View All Products <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-none shadow-2xl hover:shadow-accent/10 transition-all duration-500 group">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <img 
                        src={product.images[0] || "/assets/hero.jpg"} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-black backdrop-blur-sm border-none px-3 py-1">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                      <p className="text-accent text-2xl font-bold mb-4">₹{product.price}</p>
                      <Link href="/shop">
                        <Button className="w-full rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Why Choose Fair Deal?</h2>
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/assets/hero.jpg" 
                  alt="Our Commitment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-accent p-10 rounded-3xl shadow-2xl text-accent-foreground hidden md:block">
                <p className="text-5xl font-bold mb-2">100%</p>
                <p className="text-xl font-medium opacity-90">Satisfaction Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">Loved by Our Customers</h2>
            <p className="text-muted-foreground text-lg">Hear what our valued clients have to say about us.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-8 border-none shadow-xl bg-card hover:-translate-y-2 transition-transform duration-300">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-lg italic mb-8 text-muted-foreground leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-xl font-bold text-accent">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/assets/hero.jpg" alt="CTA Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers and discover the best deals on all your essential needs today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:9906515680">
              <Button size="lg" variant="secondary" className="gap-3 px-10 py-8 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform">
                <Phone size={24} />
                Call: +91 9906515680
              </Button>
            </a>
            <a href="https://wa.me/9906515680" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="gap-3 px-10 py-8 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform">
                <MessageCircle size={24} />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );
}
