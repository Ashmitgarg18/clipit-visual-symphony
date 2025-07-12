import { Download, Monitor, Smartphone, Laptop } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { GradientCard } from "@/components/ui/gradient-card"

const platforms = [
  {
    name: "Windows",
    icon: Monitor,
    description: "Download for Windows 10/11",
    action: "Download .exe"
  },
  {
    name: "macOS",
    icon: Laptop,
    description: "Download for Mac Intel/Apple Silicon",
    action: "Download .dmg"
  },
  {
    name: "Linux",
    icon: Smartphone,
    description: "Download for Ubuntu/Debian",
    action: "Download .deb"
  }
]

export function DownloadSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12 animate-fadeInUp">
        <h2 className="text-3xl font-bold mb-4 neon-text">
          Now available for Desktops
        </h2>
        <p className="text-xl text-muted-foreground">
          Download ClipIt app for faster, offline video processing
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 animate-scaleIn">
        {platforms.map((platform, index) => (
          <GradientCard
            key={platform.name}
            variant="glass"
            className="text-center hover:neon-glow transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full glass flex items-center justify-center mb-4">
                <platform.icon className="h-8 w-8 text-primary" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{platform.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {platform.description}
                </p>
              </div>

              <AnimatedButton variant="neon" className="w-full">
                <Download className="h-4 w-4" />
                {platform.action}
              </AnimatedButton>
            </div>
          </GradientCard>
        ))}
      </div>
    </section>
  )
}