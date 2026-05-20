import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
            Contact Us
          </h1>
          <p className="text-muted-foreground">
            We're here to help. Reach out to Fair Deal today.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
                Get in Touch
              </h2>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg h-fit">
                    <Phone className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Phone</h3>
                    <a
                      href="tel:9906515680"
                      className="text-accent hover:underline text-lg font-semibold"
                    >
                      +91 9906515680
                    </a>
                    <p className="text-muted-foreground text-sm mt-1">
                      Call us for immediate assistance.
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg h-fit">
                    <MessageCircle className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/9906515680"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline text-lg font-semibold"
                    >
                      Chat with us on WhatsApp
                    </a>
                    <p className="text-muted-foreground text-sm mt-1">
                      Quick inquiries and support via messaging.
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg h-fit">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-foreground font-medium">
                      Fair Deal Shop
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Run by Arif Najar<br />
                      [Your Specific Address Here]
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg h-fit">
                    <Clock className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Business Hours</h3>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>Monday - Saturday: 10:00 AM - 7:00 PM</li>
                      <li>Sunday: Closed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div>
              <div className="bg-card border border-border rounded-lg p-8 sticky top-20">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  Send a Message
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      placeholder="How can we help you?"
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  </div>

                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
