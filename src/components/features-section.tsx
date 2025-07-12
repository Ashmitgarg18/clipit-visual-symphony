import { Zap, Shield, Scissors, Download, Clock, Heart } from "lucide-react"
import { GradientCard } from "@/components/ui/gradient-card"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process videos in seconds, not minutes. Our optimized engine delivers results at blazing speed."
  },
  {
    icon: Scissors,
    title: "Precise Clipping",
    description: "Select exact timestamps and download only the segments you need. No waste, just perfect clips."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your videos are processed securely. We don't store or share your content with anyone."
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Download in MP4, MP3, or any format you need. Full quality, every time."
  },
  {
    icon: Clock,
    title: "No Time Limits",
    description: "Clip videos of any length. From short clips to full documentaries."
  },
  {
    icon: Heart,
    title: "Completely Free",
    description: "No hidden fees, no subscriptions. ClipIt is free forever for everyone."
  }
]

export function FeaturesSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12 animate-fadeInUp">
        <h2 className="text-3xl font-bold mb-4 neon-text">
          Why Choose ClipIt?
        </h2>
        <p className="text-xl text-muted-foreground">
          The most powerful and user-friendly video clipping tool
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <GradientCard
            key={feature.title}
            variant="glass"
            className="hover:neon-glow transition-all duration-300 animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          </GradientCard>
        ))}
      </div>
    </section>
  )
}