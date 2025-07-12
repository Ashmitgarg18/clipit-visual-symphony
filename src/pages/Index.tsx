import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { DownloadSection } from "@/components/download-section"

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <DownloadSection />
      
      {/* Footer */}
      <footer className="border-t border-border/20 py-8 text-center text-sm text-muted-foreground">
        <p>© 2025 ClipIt. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
