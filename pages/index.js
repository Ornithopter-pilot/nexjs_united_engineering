import Head from 'next/head';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import IndustryCapabilities from '../components/IndustryCapabilities';
import About from '../components/About';
import Contact from '../components/Contact';
import PageWrapper from '../components/PageWrapper';
import CoreTechnologies from '../components/CoreTechnologies';
import EnhancedTimeline from '../components/EnhancedTimeline';
import SectionDivider from '../components/SectionDivider';

export default function Home() {
  useEffect(() => {
    // Add any page initialization code here
  }, []);

  return (
    <>
      <Head>
        <title>United Engineering - Advanced Precision Manufacturing</title>
        <meta name="description" content="United Engineering delivers ultra-precision components and systems for aerospace, medical, automotive, energy, defense, and robotics industries with tolerances down to ±0.001mm." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="United Engineering - Advanced Precision Manufacturing" />
        <meta property="og:description" content="Ultra-precision engineered components for aerospace, medical, automotive, energy, defense, and robotics with digital manufacturing and AI-optimized design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://unitedengineering.org" />
        <meta property="og:image" content="https://unitedengineering.org/og-image.jpg" />
        
        {/* Font Awesome for icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      <PageWrapper>
        <main className="min-h-screen bg-dark text-white overflow-hidden">
          <NavBar />
          <Hero />
          
          {/* Section divider */}
          <SectionDivider pattern={1} />
          
          {/* Core Technologies Section */}
          <CoreTechnologies />
          
          {/* Section divider */}
          <SectionDivider direction="up" pattern={2} bgColor="bg-dark" textColor="text-dark-gray" />
          
          {/* Solutions Section */}
          <IndustryCapabilities />
          
          {/* Section divider */}
          <SectionDivider pattern={3} />
          
          {/* Enhanced Timeline Section */}
          <EnhancedTimeline />
          
          {/* Section divider */}
          <SectionDivider pattern={2} />
          
          <Contact />
        </main>

        <footer className="bg-dark py-8 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center text-gray-400">
              <p>© 2025 United Engineering. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </PageWrapper>
    </>
  );
}
