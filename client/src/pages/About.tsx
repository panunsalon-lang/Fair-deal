import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Star, Heart, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="w-full overflow-hidden">
      {/* Header */}
      <section className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 rounded-l-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">
              About <span className="text-accent">Fair Deal</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              A story of integrity, excellence, and a commitment to providing the best essentials for your daily life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Fair Deal was founded by <span className="font-bold text-foreground">Arif Najar</span> with a vision to create a business that stands for honesty, quality, and reliability. In an era where shortcuts are common, we chose the path of integrity.
                </p>
                <p>
                  Our journey began with a simple goal: to serve our community with the best possible products and services. Over the years, Fair Deal has grown from a small local initiative into a trusted name, known for its commitment to customer satisfaction.
                </p>
                <p>
                  Arif Najar's leadership has been the cornerstone of our success. His dedication to excellence and his "customer-first" philosophy guide everything we do at Fair Deal.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img 
                  src="/assets/hero.jpg" 
                  alt="Arif Najar's Vision" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl border border-border hidden md:block">
                <p className="text-accent text-4xl font-bold mb-1">10+</p>
                <p className="text-muted-foreground font-medium">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide every decision we make and every product we sell.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Integrity",
                description: "We believe in being honest and transparent in all our dealings. Fairness is in our name.",
                icon: <ShieldCheck className="w-12 h-12 text-accent" />,
              },
              {
                title: "Quality",
                description: "We never compromise. Every item in our shop is hand-picked for its superior quality.",
                icon: <Star className="w-12 h-12 text-accent" />,
              },
              {
                title: "Customer First",
                description: "Your satisfaction is our priority. We build long-term relationships based on trust.",
                icon: <Heart className="w-12 h-12 text-accent" />,
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-10 rounded-3xl shadow-lg border border-border hover:shadow-accent/5 transition-all duration-300 group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-foreground mb-16">
              Why Choose Fair Deal?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Personalized attention to every client's needs",
                "Transparent pricing with no hidden costs",
                "High-quality standards across all categories",
                "Prompt and professional communication",
                "Years of experience and a proven track record",
                "A commitment to building long-term trust",
              ].map((reason, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-6 bg-secondary/20 rounded-2xl"
                >
                  <CheckCircle2 className="text-accent w-6 h-6 flex-shrink-0" />
                  <p className="text-foreground text-lg font-medium">{reason}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Get in Touch
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Have questions or want to learn more about our products? We're here to help you find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:9906515680">
              <Button size="lg" variant="secondary" className="gap-3 px-10 py-8 text-xl rounded-full shadow-2xl">
                <Phone size={24} />
                Call: +91 9906515680
              </Button>
            </a>
            <a href="https://wa.me/9906515680" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="gap-3 px-10 py-8 text-xl rounded-full shadow-2xl">
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
