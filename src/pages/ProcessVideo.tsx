import { useState, useEffect } from "react"
import { useSearchParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Download, Play, Pause, Clock, User, Eye, Youtube, Twitter, Clipboard } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { GradientCard } from "@/components/ui/gradient-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useToast } from "@/hooks/use-toast"

type PlatformMode = 'youtube' | 'twitter'

// Function to extract YouTube video ID from URL
const extractYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  const match = url.match(regex)
  return match ? match[1] : null
}

// Function to extract Twitter/X video ID from URL
const extractTwitterId = (url: string): string | null => {
  const regex = /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/
  const match = url.match(regex)
  return match ? match[1] : null
}

// Determine platform from URL
const detectPlatform = (url: string): PlatformMode => {
  if (extractYouTubeId(url)) return 'youtube'
  if (extractTwitterId(url)) return 'twitter'
  return 'youtube' // default
}

// Mock video data - in real app this would come from respective APIs
const getVideoInfo = (videoId: string, platform: PlatformMode) => {
  // This is mock data - in production you'd fetch from YouTube/Twitter API
  if (platform === 'youtube') {
    return {
      title: "Sade - Smooth Operator - Official - 1984",
      channel: "YRF",
      duration: "04:18",
      views: "2.1M views"
    }
  } else {
    return {
      title: "Amazing Twitter Video Clip",
      channel: "@username",
      duration: "00:45",
      views: "15.2K views"
    }
  }
}

const ProcessVideo = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const videoUrl = searchParams.get('url') || ''
  const detectedPlatform = detectPlatform(videoUrl)
  const [platform, setPlatform] = useState<PlatformMode>(detectedPlatform)
  const [newUrl, setNewUrl] = useState("")
  
  const videoId = platform === 'youtube' ? extractYouTubeId(videoUrl) : extractTwitterId(videoUrl)
  const videoInfo = videoId ? getVideoInfo(videoId, platform) : null
  const [isPlaying, setIsPlaying] = useState(false)
  const [startTime, setStartTime] = useState("00:00")
  const [endTime, setEndTime] = useState("04:18")
  const [videoQuality, setVideoQuality] = useState("")
  const [audioQuality, setAudioQuality] = useState("")
  const [resolution, setResolution] = useState("")
  const [fps, setFps] = useState("")
  const [bitrate, setBitrate] = useState("")
  const [format, setFormat] = useState("")
  const { toast } = useToast()

  const quickDurations = [
    { label: "First 30s", start: "00:00", end: "00:30" },
    { label: "First 1m", start: "00:00", end: "01:00" },
    { label: "Last 30s", start: "03:48", end: "04:18" },
    { label: "Last 1m", start: "03:18", end: "04:18" },
  ]

  const handleQuickDuration = (start: string, end: string) => {
    setStartTime(start)
    setEndTime(end)
    toast({
      title: "Time range selected",
      description: `Set to ${start} - ${end}`
    })
  }

  const handleDownload = () => {
    toast({
      title: "Download started!",
      description: "Your video is being processed and will download shortly."
    })
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setNewUrl(text)
      toast({
        title: "URL Pasted!",
        description: "URL has been pasted from clipboard."
      })
    } catch (err) {
      toast({
        title: "Paste failed",
        description: "Could not access clipboard. Please paste manually.",
        variant: "destructive"
      })
    }
  }

  const handleProcessNewUrl = () => {
    if (!newUrl) {
      toast({
        title: "No URL provided",
        description: `Please enter a ${platform === 'youtube' ? 'YouTube' : 'Twitter/X'} URL.`,
        variant: "destructive"
      })
      return
    }

    const newVideoId = platform === 'youtube' ? extractYouTubeId(newUrl) : extractTwitterId(newUrl)
    
    if (!newVideoId) {
      toast({
        title: "Invalid URL",
        description: `Please enter a valid ${platform === 'youtube' ? 'YouTube' : 'Twitter/X'} URL.`,
        variant: "destructive"
      })
      return
    }

    // Update the URL and navigate
    navigate(`/process?url=${encodeURIComponent(newUrl)}`)
    setNewUrl("")
    toast({
      title: "URL Updated!",
      description: "Processing new video URL."
    })
  }

  // Dynamic background based on platform
  const getBackgroundClass = () => {
    if (platform === 'youtube') {
      return "min-h-screen bg-gradient-to-br from-red-950/20 via-background to-red-900/10 animate-gradient-x"
    } else {
      return "min-h-screen bg-gradient-to-br from-blue-950/20 via-background to-slate-900/10 animate-gradient-x"
    }
  }

  return (
    <div className={getBackgroundClass()}>
      {/* Header */}
      <header className="border-b border-border/20 backdrop-blur-sm bg-background/50 sticky top-0 z-50 animate-fade-in">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-all animate-scale-in">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold neon-text">ClipIt</h1>
          </div>
          
          {/* Platform Toggle */}
          <div className="flex items-center space-x-4 animate-fade-in">
            <div className="flex items-center space-x-3 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 border border-border/20">
              <div className={`flex items-center space-x-2 transition-all ${platform === 'youtube' ? 'text-red-400' : 'text-muted-foreground'}`}>
                <Youtube className="h-4 w-4" />
                <span className="text-sm font-medium">YouTube</span>
              </div>
              <Switch 
                checked={platform === 'twitter'} 
                onCheckedChange={(checked) => setPlatform(checked ? 'twitter' : 'youtube')}
                className="transition-all hover:scale-105"
              />
              <div className={`flex items-center space-x-2 transition-all ${platform === 'twitter' ? 'text-blue-400' : 'text-muted-foreground'}`}>
                <Twitter className="h-4 w-4" />
                <span className="text-sm font-medium">Twitter/X</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
          {/* Video Player Section */}
          <div className="space-y-4 animate-scale-in">
            {/* Video Info */}
            {videoInfo && (
              <GradientCard variant="glass" className="p-4 hover:scale-[1.02] transition-all animate-fade-in">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-foreground animate-fade-in">{videoInfo.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <User className="h-4 w-4" />
                      <span>{videoInfo.channel}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <Clock className="h-4 w-4" />
                      <span>{videoInfo.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>{videoInfo.views}</span>
                    </div>
                  </div>
                </div>
              </GradientCard>
            )}

            {/* Video Player */}
            <GradientCard variant="glass" className="p-6 hover:scale-[1.01] transition-all animate-scale-in">
              <div className="aspect-video rounded-lg overflow-hidden border border-border/20 shadow-lg">
                {videoId ? (
                  platform === 'youtube' ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&modestbranding=1&rel=0`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full animate-fade-in"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-950/20 to-slate-900/20 flex items-center justify-center animate-fade-in">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                          <Twitter className="h-8 w-8 text-blue-400" />
                        </div>
                        <p className="text-blue-300">Twitter/X Video Preview</p>
                        <p className="text-xs text-muted-foreground">Twitter embed will be implemented with API</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full bg-muted/20 flex items-center justify-center animate-fade-in">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Play className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">Invalid {platform === 'youtube' ? 'YouTube' : 'Twitter/X'} URL</p>
                    </div>
                  </div>
                )}
              </div>
            </GradientCard>

            {/* URL Input for Invalid URLs */}
            {!videoId && (
              <GradientCard variant="glass" className="p-6 hover:scale-[1.02] transition-all animate-scale-in">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold neon-text flex items-center justify-center space-x-2">
                    <span>Enter {platform === 'youtube' ? 'YouTube' : 'Twitter/X'} URL</span>
                    {platform === 'youtube' && <Youtube className="h-5 w-5 text-red-400" />}
                    {platform === 'twitter' && <Twitter className="h-5 w-5 text-blue-400" />}
                  </h3>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder={`Paste ${platform === 'youtube' ? 'YouTube' : 'Twitter/X'} URL here...`}
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
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

                  <AnimatedButton
                    variant="neon"
                    onClick={handleProcessNewUrl}
                    className="w-full hover:scale-105 transition-all"
                  >
                    <Play className="h-4 w-4" />
                    Load {platform === 'youtube' ? 'Video' : 'Clip'}
                  </AnimatedButton>
                </div>
              </GradientCard>
            )}
          </div>

          {/* Controls Section */}
          <div className="space-y-6 animate-fade-in delay-200">
            {/* Quality Settings */}
            <GradientCard variant="glass" className="p-6 hover:scale-[1.02] transition-all animate-scale-in">
              <h3 className="text-lg font-semibold mb-4 neon-text flex items-center space-x-2">
                <span>Quality Settings</span>
                {platform === 'youtube' && <Youtube className="h-5 w-5 text-red-400" />}
                {platform === 'twitter' && <Twitter className="h-5 w-5 text-blue-400" />}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Video Quality</Label>
                  <Select value={videoQuality} onValueChange={setVideoQuality}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent className="glass backdrop-blur-md">
                      <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                      <SelectItem value="720p">720p (HD)</SelectItem>
                      <SelectItem value="480p">480p (SD)</SelectItem>
                      <SelectItem value="360p">360p</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Audio Quality</Label>
                  <Select value={audioQuality} onValueChange={setAudioQuality}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent className="glass backdrop-blur-md">
                      <SelectItem value="320">320 kbps</SelectItem>
                      <SelectItem value="256">256 kbps</SelectItem>
                      <SelectItem value="192">192 kbps</SelectItem>
                      <SelectItem value="128">128 kbps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </GradientCard>

            {/* Time Range */}
            <GradientCard variant="glass" className="p-6 hover:scale-[1.02] transition-all animate-scale-in delay-100">
              <h3 className="text-lg font-semibold mb-4 neon-text">Time Range</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="00:00"
                    className="glass"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="04:18"
                    className="glass"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Quick Selection</Label>
                <div className="grid grid-cols-2 gap-2">
                  {quickDurations.map((duration, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickDuration(duration.start, duration.end)}
                      className="glass hover:bg-primary/10"
                    >
                      {duration.label}
                    </Button>
                  ))}
                </div>
              </div>
            </GradientCard>

            {/* Conversion Options */}
            <GradientCard variant="glass" className="p-6 hover:scale-[1.02] transition-all animate-scale-in delay-200">
              <h3 className="text-lg font-semibold mb-4 neon-text">Conversion Options</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Resolution</Label>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent className="glass backdrop-blur-md">
                      <SelectItem value="1920x1080">1920x1080</SelectItem>
                      <SelectItem value="1280x720">1280x720</SelectItem>
                      <SelectItem value="854x480">854x480</SelectItem>
                      <SelectItem value="640x360">640x360</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>FPS</Label>
                  <Select value={fps} onValueChange={setFps}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Select FPS" />
                    </SelectTrigger>
                    <SelectContent className="glass backdrop-blur-md">
                      <SelectItem value="60">60 FPS</SelectItem>
                      <SelectItem value="30">30 FPS</SelectItem>
                      <SelectItem value="24">24 FPS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Bitrate</Label>
                  <Select value={bitrate} onValueChange={setBitrate}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Select bitrate" />
                    </SelectTrigger>
                    <SelectContent className="glass backdrop-blur-md">
                      <SelectItem value="10000">10 Mbps</SelectItem>
                      <SelectItem value="5000">5 Mbps</SelectItem>
                      <SelectItem value="2500">2.5 Mbps</SelectItem>
                      <SelectItem value="1000">1 Mbps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent className="glass backdrop-blur-md">
                      <SelectItem value="mp4">MP4</SelectItem>
                      <SelectItem value="webm">WebM</SelectItem>
                      <SelectItem value="avi">AVI</SelectItem>
                      <SelectItem value="mov">MOV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </GradientCard>

            {/* Download Button */}
            <AnimatedButton
              variant="neon"
              onClick={handleDownload}
              className="w-full py-3 animate-scale-in delay-300 hover:scale-105 transition-all"
            >
              <Download className="h-5 w-5" />
              Download {platform === 'youtube' ? 'Video' : 'Clip'}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessVideo