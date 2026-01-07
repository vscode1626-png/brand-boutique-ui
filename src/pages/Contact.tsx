import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const Contact: React.FC = () => {
  const generateWhatsAppLink = () => {
    const message = encodeURIComponent('Hi! I have a question about RICH CLUB products.');
    return `https://wa.me/919876543210?text=${message}`;
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center">
            <p className="section-subtitle">Get in Touch</p>
            <h1 className="section-title">Contact Us</h1>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-3xl mb-8">We'd Love to Hear From You</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Have a question about our products, shipping, or returns? Our team is here to help.
                Reach out to us through any of the channels below.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-secondary flex items-center justify-center">
                    <MapPin size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Visit Us</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      123 Fashion Street<br />
                      Linking Road, Bandra West<br />
                      Mumbai, Maharashtra - 400050
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-secondary flex items-center justify-center">
                    <Phone size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Call Us</h4>
                    <p className="text-muted-foreground text-sm">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-secondary flex items-center justify-center">
                    <Mail size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email Us</h4>
                    <p className="text-muted-foreground text-sm">
                      contact@richclub.com<br />
                      support@richclub.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-secondary flex items-center justify-center">
                    <Clock size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Business Hours</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Monday - Saturday: 10:00 AM - 7:00 PM<br />
                      Sunday: 11:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-10 p-6 bg-brand-olive/5 border border-brand-olive/20">
                <h4 className="font-medium mb-2">Quick Support via WhatsApp</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant responses on WhatsApp during business hours.
                </p>
                <Button variant="outline" className="border-brand-olive text-brand-olive hover:bg-brand-olive hover:text-primary-foreground" asChild>
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={16} />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-muted aspect-square md:aspect-auto flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  Interactive map placeholder<br />
                  <span className="text-sm">(Google Maps integration ready)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="font-display text-3xl text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto grid gap-6">
            <div className="bg-background p-6">
              <h4 className="font-medium mb-2">What is your return policy?</h4>
              <p className="text-sm text-muted-foreground">
                We offer a 7-day easy return policy. Items must be unworn, unwashed, and in original packaging with all tags attached.
              </p>
            </div>
            <div className="bg-background p-6">
              <h4 className="font-medium mb-2">How long does shipping take?</h4>
              <p className="text-sm text-muted-foreground">
                Metro cities: 2-3 business days. Other cities: 4-6 business days. Free shipping on orders above ₹2,000.
              </p>
            </div>
            <div className="bg-background p-6">
              <h4 className="font-medium mb-2">Do you offer international shipping?</h4>
              <p className="text-sm text-muted-foreground">
                Currently, we only ship within India. International shipping will be available soon.
              </p>
            </div>
            <div className="bg-background p-6">
              <h4 className="font-medium mb-2">How can I track my order?</h4>
              <p className="text-sm text-muted-foreground">
                Once your order is shipped, you'll receive a tracking link via SMS and email to monitor your delivery status.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
