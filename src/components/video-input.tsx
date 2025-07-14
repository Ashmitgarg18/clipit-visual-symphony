import { useState } from "react"
import { Clipboard, Download, Play, Scissors, Youtube, Twitter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AnimatedButton } from "@/components/ui/animated-button"
import { GradientCard } from "@/components/ui/gradient-card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

type PlatformMode = 'youtube' | 'twitter'

export function VideoInput() {
  const [url, setUrl] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [platform, setPlatform] = useState<PlatformMode>('youtube')
  const { toast } = useToast()
  const navigate = useNavigate()

  // Platform-specific content
  const getPlatformContent = () => {
    if (platform === 'youtube') {
      return {
        placeholder: "Paste YouTube URL here...",
        description: "Paste your YouTube URL below and download just the parts you need",
        supportText: "Supports YouTube links from youtube.com and youtu.be",
        icon: Youtube,
        bgClass: "from-red-950/10 via-background to-red-900/5"
      }
    } else {
      return {
        placeholder: "Paste Twitter/X URL here...",
        description: "Paste your Twitter/X video URL below and download just the clips you need",
        supportText: "Supports Twitter/X video links from twitter.com and x.com",
        icon: Twitter,
        bgClass: "from-blue-950/10 via-background to-slate-900/5"
      }
    }
  }

  const content = getPlatformContent()

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
      toast({
        title: "URL Pasted!",
        description: "Video URL has been pasted from clipboard."
      })
    } catch (err) {
      toast({
        title: "Paste failed",
        description: "Could not access clipboard. Please paste manually.",
        variant: "destructive"
      })
    }
  }

  const handleProcess = () => {
    if (!url) {
      toast({
        title: "No URL provided",
        description: `Please enter a ${platform === 'youtube' ? 'YouTube' : 'Twitter/X'} URL to process.`,
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      navigate(`/process?url=${encodeURIComponent(url)}`)
    }, 2000)
  }

  return (
    <div className={`bg-gradient-to-br ${content.bgClass} p-6 rounded-2xl transition-all duration-500 animate-gradient-x`}>
      <GradientCard variant="glass" className="w-full max-w-2xl mx-auto animate-fadeInUp">
        <div className="space-y-6">
          {/* Platform Toggle */}
          <div className="flex items-center justify-center space-x-4 animate-fade-in">
            <div className="flex items-center space-x-3 bg-background/20 backdrop-blur-sm rounded-full px-6 py-3 border border-border/20">
              <div className={`flex items-center space-x-2 transition-all ${platform === 'youtube' ? 'text-red-400' : 'text-muted-foreground'}`}>
                <Youtube className="h-5 w-5" />
                <span className="font-medium">YouTube</span>
              </div>
              <Switch 
                checked={platform === 'twitter'} 
                onCheckedChange={(checked) => setPlatform(checked ? 'twitter' : 'youtube')}
                className="transition-all hover:scale-105"
              />
              <div className={`flex items-center space-x-2 transition-all ${platform === 'twitter' ? 'text-blue-400' : 'text-muted-foreground'}`}>
                <Twitter className="h-5 w-5" />
                <span className="font-medium">Twitter/X</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Scissors className="h-8 w-8 text-primary animate-pulse" />
              <h2 className="text-2xl font-bold neon-text">Clip Your {platform === 'youtube' ? 'Video' : 'Clip'}</h2>
            </div>
            <p className="text-muted-foreground animate-fade-in">
              {content.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder={content.placeholder}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 glass text-foreground placeholder:text-muted-foreground border-primary/20 focus:border-primary transition-all"
              />
              <AnimatedButton
                variant="glass"
                size="icon"
                onClick={handlePaste}
                className="shrink-0 hover:scale-110 transition-all"
              >
                <Clipboard className="h-4 w-4" />
              </AnimatedButton>
            </div>

            <div className="flex space-x-2">
              <AnimatedButton
                variant="neon"
                onClick={handleProcess}
                disabled={isProcessing}
                className="flex-1 hover:scale-105 transition-all"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Load {platform === 'youtube' ? 'Video' : 'Clip'}
                  </>
                )}
              </AnimatedButton>
              
              <AnimatedButton
                variant="glow"
                disabled={!url || isProcessing}
                className="px-8 hover:scale-105 transition-all"
              >
                <Download className="h-4 w-4" />
                Download
              </AnimatedButton>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center animate-fade-in">
            {content.supportText}
          </div>
        </div>
      </GradientCard>
    </div>
  )
}