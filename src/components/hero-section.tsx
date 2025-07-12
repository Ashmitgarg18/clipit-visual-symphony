import { VideoInput } from "./video-input"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import clipitLogo from "@/assets/clipit-logo.png"

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <img 
            src={clipitLogo} 
            alt="ClipIt Logo" 
            className="h-10 w-10 floating"
            draggable="false"
          />
          <h1 className="text-2xl font-bold neon-text">ClipIt</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-sm glass px-4 py-2 rounded-full">
            <span className="text-accent font-medium">🎧 New:</span>
            <span className="ml-2">Download Entire Playlist</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-12">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 gradient-bg rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary to-accent rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-10 animate-float" style={{ animationDelay: "4s" }} />
        </div>

        {/* Hero Text */}
        <div className="relative z-10 space-y-6 animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="neon-text">ClipIt</span>
          </h1>
          
          <div className="space-y-2">
            <p className="text-xl md:text-2xl text-muted-foreground">
              download just the part you need
            </p>
            <p className="text-lg md:text-xl text-accent font-medium">
              faster. smoother. free.
            </p>
          </div>
        </div>

        {/* Video Input Component */}
        <div className="relative z-10 w-full max-w-4xl">
          <VideoInput />
        </div>

        {/* Demo Video Section */}
        <div className="relative z-10 space-y-4 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-lg font-medium text-muted-foreground">see it in action</h2>
          
          <div className="relative">
            <div className="glass rounded-2xl p-4 hover:neon-glow transition-all duration-300">
              <div className="aspect-video bg-muted/20 rounded-xl flex items-center justify-center border border-primary/20">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full glass flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[12px] border-l-primary border-y-[8px] border-y-transparent ml-1" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Demo video coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}