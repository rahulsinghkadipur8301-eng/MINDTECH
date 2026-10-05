/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { IndustriesSection } from './components/IndustriesSection';
import { GlobalPartnersSection } from './components/GlobalPartnersSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FadeInSection } from './components/FadeInSection';

export default function App() {
  const [inquiryCategory, setInquiryCategory] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (categoryOrPartner?: string) => {
    if (categoryOrPartner) {
      setInquiryCategory(categoryOrPartner);
    }
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-950 relative">
      {/* 1. Dynamic Biotech Molecular Network, Floating Benzene Rings, Chemical Shapes & Green Dots Animation throughout scroll */}
      <AnimatedBackground />

      {/* 2. Slim Top Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 3. Top Header Bar with Pure White Logo Section, Desktop Links & Responsive Mobile Hamburger Drawer */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Page Content - High-Density, Minimalist & Aesthetic Layout with Smooth Transitions */}
      <main className="flex-grow relative z-10">
        
        {/* 1. Automated & Animated Showcase Hero with Green Dots and Chemical Shapes Floating Behind */}
        <Hero onOpenInquiry={handleOpenInquiry} />

        {/* 2. Corporate Profile, 6 Pillars with Automated Animation & MSME Credibility */}
        <FadeInSection direction="up" delay={50} threshold={0.08}>
          <AboutSection onOpenInquiry={handleOpenInquiry} />
        </FadeInSection>

        {/* 3. Application Sectors & Specialty Ingredients */}
        <FadeInSection direction="up" delay={50} threshold={0.08}>
          <IndustriesSection onOpenInquiry={handleOpenInquiry} />
        </FadeInSection>

        {/* 4. Global Manufacturing Partners (Fine Organics, VVF Limited, SNS Silcos, Greentech France) */}
        <FadeInSection direction="up" delay={50} threshold={0.08}>
          <GlobalPartnersSection onOpenInquiry={handleOpenInquiry} />
        </FadeInSection>

        {/* 5. The Mindtech Edge - 6 Pillars in an Ultra-Sleek Bento Card Grid */}
        <FadeInSection direction="up" delay={50} threshold={0.08}>
          <WhyChooseUsSection onOpenInquiry={handleOpenInquiry} />
        </FadeInSection>

        {/* 6. Central Facility Desk, Bawana Warehouse Hub & Sample Request Form */}
        <FadeInSection direction="up" delay={50} threshold={0.08}>
          <ContactSection initialSubject={inquiryCategory} />
        </FadeInSection>
      </main>

      {/* Corporate Multi-Column Molecular Footer */}
      <FadeInSection direction="none" delay={0} threshold={0.05}>
        <Footer onOpenInquiry={handleOpenInquiry} />
      </FadeInSection>
    </div>
  );
}
