import { useState } from "react"
import { Clipboard, Download, Play, Scissors } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AnimatedButton } from "@/components/ui/animated-button"
import { GradientCard } from "@/components/ui/gradient-card"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

export function VideoInput() {
  const [url, setUrl] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

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
        description: "Please enter a YouTube URL to process.",
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
    <GradientCard variant="glass" className="w-full max-w-2xl mx-auto animate-fadeInUp">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Scissors className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold neon-text">Clip Your Video</h2>
          </div>
          <p className="text-muted-foreground">
            Paste your YouTube URL below and download just the parts you need
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Paste YouTube URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 glass text-foreground placeholder:text-muted-foreground border-primary/20 focus:border-primary"
            />
            <AnimatedButton
              variant="glass"
              size="icon"
              onClick={handlePaste}
              className="shrink-0"
            >
              <Clipboard className="h-4 w-4" />
            </AnimatedButton>
          </div>

          <div className="flex space-x-2">
            <AnimatedButton
              variant="neon"
              onClick={handleProcess}
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Load Video
                </>
              )}
            </AnimatedButton>
            
            <AnimatedButton
              variant="glow"
              disabled={!url || isProcessing}
              className="px-8"
            >
              <Download className="h-4 w-4" />
              Download
            </AnimatedButton>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Supports YouTube links from youtube.com and youtu.be
        </div>
      </div>
    </GradientCard>
  )
}