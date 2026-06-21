import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/homepage/HeroSection";
import { BOQUploadSection } from "@/components/homepage/BOQUploadSection";
import { TrustedBySection } from "@/components/homepage/TrustedBySection";
import { CategoriesSection } from "@/components/homepage/CategoriesSection";
import { WhyChooseUsSection } from "@/components/homepage/WhyChooseUsSection";
import { FeaturedProductsSection } from "@/components/homepage/FeaturedProductsSection";
import { SpecialOffersSection } from "@/components/homepage/SpecialOffersSection";
import { TestimonialsSection } from "@/components/homepage/TestimonialsSection";
import { FAQSection } from "@/components/homepage/FAQSection";
import { RecentProjectsSection } from "@/components/homepage/RecentProjectsSection";

export default function Page() {
  return (
    <div className="min-h-screen font-sans text-neutral-900 bg-[#f8fafc]">
      <Header />

      <main className="w-full flex-1 pb-16 md:pb-0">
        <HeroSection />
        <TrustedBySection />
        <CategoriesSection />
        <BOQUploadSection />
        <FeaturedProductsSection />
        <SpecialOffersSection />
        <WhyChooseUsSection />
        <RecentProjectsSection />
        <TestimonialsSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}