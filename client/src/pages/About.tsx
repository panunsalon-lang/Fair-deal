import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
            About Fair Deal
          </h1>
          <p className="text-muted-foreground">
            The story of integrity and excellence led by Arif Najar
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Our Story
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Fair Deal was founded by Arif Najar with a vision to create a business that stands for honesty, quality, and reliability. In an era where shortcuts are common, we chose the path of integrity.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Our journey began with a simple goal: to serve our community with the best possible products and services. Over the years, Fair Deal has grown from a small local initiative into a trusted name, known for its commitment to customer satisfaction.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Arif Najar's leadership has been the cornerstone of our success. His dedication to excellence and his "customer-first" philosophy guide everything we do at Fair Deal.
              </p>
            </div>
            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center text-6xl">
              👤
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Integrity",
                description: "We believe in being honest and transparent in all our dealings.",
                icon: "🤝",
              },
              {
                title: "Quality",
                description: "We never compromise on the quality of our products or services.",
                icon: "⭐",
              },
              {
                title: "Reliability",
                description: "You can count on us to deliver what we promise, every single time.",
                icon: "🛡️",
              },
            ].map((value) => (
              <div key={value.title} className="bg-background border border-border rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground mb-12">
            Why Choose Fair Deal?
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              "Personalized attention to every client's needs",
              "Transparent pricing with no hidden costs",
              "High-quality standards maintained across all services",
              "Prompt and professional communication",
              "Years of experience and a proven track record",
              "A commitment to building long-term relationships",
            ].map((reason, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="text-2xl text-accent flex-shrink-0">✓</div>
                <p className="text-foreground leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Have questions or want to learn more about our services? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:7006630873">
              <Button size="lg" variant="secondary">
                Call: +91 7006630873
              </Button>
            </a>
            <a href="https://wa.me/7006630873" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary">
                WhatsApp Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Contact Form
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
