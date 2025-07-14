import { Download, Monitor, Smartphone, Laptop } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { GradientCard } from "@/components/ui/gradient-card";
const platforms = [{
  name: "Windows",
  icon: Monitor,
  description: "Download for Windows 10/11",
  action: "Download .exe"
}, {
  name: "macOS",
  icon: Laptop,
  description: "Download for Mac Intel/Apple Silicon",
  action: "Download .dmg"
}, {
  name: "Linux",
  icon: Smartphone,
  description: "Download for Ubuntu/Debian",
  action: "Download .deb"
}];
export function DownloadSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Download ClipIt</h2>
          <p className="text-muted-foreground text-lg">Available for all major platforms</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <GradientCard key={platform.name} variant="glass" className="text-center">
                <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{platform.name}</h3>
                <p className="text-muted-foreground mb-6">{platform.description}</p>
                <AnimatedButton className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  {platform.action}
                </AnimatedButton>
              </GradientCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}