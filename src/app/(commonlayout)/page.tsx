import { CategorySection } from "@/components/layout/CategorySection";
import { CtaSection } from "@/components/layout/CtaSection";
import { FeaturedMedicinesSection } from "@/components/layout/FeaturedMedicinesSection";
import { HeroSection } from "@/components/layout/HeroSection";
import { HowItWorksSection } from "@/components/layout/HowItWorksSection";
import { NewsletterSection } from "@/components/layout/NewsletterSection";
import { StatsSection } from "@/components/layout/StatsSection";
import { TestimonialsSection } from "@/components/layout/TestimonialsSection";
import { WhyChooseUsSection } from "@/components/layout/WhyChooseUsSection";



const page = () => {
    return (
        <div>
     <HeroSection />
      <CategorySection />
      <FeaturedMedicinesSection />
      <StatsSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CtaSection />
        </div>
    );
};

export default page;