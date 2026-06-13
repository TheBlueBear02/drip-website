import { lazy, Suspense } from 'react';
import Nav from '@/components/layout/Nav';
import SkillSwitcherStrip from '@/components/ui/SkillSwitcherStrip';
import Hero from '@/components/sections/Hero';

const BeforeAfter = lazy(() => import('@/components/sections/BeforeAfter'));
const HowItWorks = lazy(() => import('@/components/sections/HowItWorks'));
const LivePreviewCallout = lazy(() => import('@/components/sections/LivePreviewCallout'));
const SkillsPreview = lazy(() => import('@/components/sections/SkillsPreview'));
const UserRecommendations = lazy(() => import('@/components/sections/UserRecommendations'));
const PlatformSupport = lazy(() => import('@/components/sections/PlatformSupport'));
const FAQ = lazy(() => import('@/components/sections/FAQ'));
const Footer = lazy(() => import('@/components/layout/Footer'));

function SectionFallback() {
  return <div className="section-fallback" aria-hidden="true" />;
}

function Home() {
  return (
    <>
      <header className="site-header">
        <Nav />
        <SkillSwitcherStrip />
      </header>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <BeforeAfter />
        <HowItWorks />
        <LivePreviewCallout />
        <SkillsPreview />
        <UserRecommendations />
        <PlatformSupport />
        <FAQ />
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;
