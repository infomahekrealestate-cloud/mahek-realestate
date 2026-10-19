import Hero from '../components/Hero';
import BestFeatures from '../components/BestFeatures';
import SignatureProjects from '../components/SignatureProjects';
import ServicesSection from '../components/ServicesSection';
import AboutUs from '../components/AboutUs';
import ClientsSection from '../components/ClientsSection';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import FaqSection from '../components/FaqSection';
import ContactSection from '../components/ContactSection';
import ImageGallery from '../components/ImageGallery';

export default function HomePage({
  onViewDetails,
  onEnquire,
  activeFilters,
  scrollToContact,
  scrollToProjects
}) {
  return (
    <main>
      {/* 1. Hero Construction Banner */}
      <Hero
        onExploreProjects={scrollToProjects}
        onOpenContact={scrollToContact}
      />

      {/* 2. Core Capabilities / Best Features */}
      <BestFeatures
        onSelectFeature={() => scrollToProjects()}
      />

      {/* 3. About Us: Your Vision Is Our Mission */}
      <AboutUs
        onOpenContact={scrollToContact}
      />

      {/* 4. Signature & PDF Verified Projects */}
      <SignatureProjects
        activeFilters={activeFilters}
        onViewDetails={onViewDetails}
        onEnquire={onEnquire}
      />

      {/* 5. Services Offered by Mahek Real Estate */}
      {/* <ServicesSection /> */}

      {/* 6. Institutional Clients & Partners */}
      <ClientsSection />

      {/* 7. Testimonials: Our Clients Say */}
      <Testimonials />

      {/* 8. Latest News & Groundbreaking Milestones */}
      <BlogSection
        onSelectPost={() => scrollToContact()}
      />

      {/* 9. Frequently Asked Questions */}
      <FaqSection
        onOpenContact={scrollToContact}
      />

      {/* 10. Consultation & Contact Form */}
      <ContactSection />

      {/* 11. Event Exhibitions & Project Gallery (Upper of Footer) */}
      <ImageGallery />
    </main>
  );
}
