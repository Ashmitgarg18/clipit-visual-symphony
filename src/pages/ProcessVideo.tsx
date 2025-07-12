import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { ArrowLeft, Download, Play, Pause } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { GradientCard } from "@/components/ui/gradient-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useToast } from "@/hooks/use-toast"

const ProcessVideo = () => {
  const [searchParams] = useSearchParams()
  const videoUrl = searchParams.get('url') || ''
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      {/* Header */}
      <header className="border-b border-border/20 backdrop-blur-sm bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-all">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold neon-text">ClipIt</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Player Section */}
          <div className="space-y-4">
            <GradientCard variant="glass" className="p-6">
              <div className="aspect-video bg-muted/20 rounded-lg border border-border/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
                <div className="text-center space-y-4 z-10">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-primary" />
                    ) : (
                      <Play className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <p className="text-muted-foreground">Video Preview</p>
                  <p className="text-xs text-muted-foreground/70 max-w-xs mx-auto break-all">
                    {videoUrl}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-full"
                  variant="outline"
                >
                  {isPlaying ? "Pause" : "Play"} Preview
                </Button>
              </div>
            </GradientCard>
          </div>

          {/* Controls Section */}
          <div className="space-y-6">
            {/* Quality Settings */}
            <GradientCard variant="glass" className="p-6">
              <h3 className="text-lg font-semibold mb-4 neon-text">Quality Settings</h3>
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
            <GradientCard variant="glass" className="p-6">
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
            <GradientCard variant="glass" className="p-6">
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
              className="w-full py-3"
            >
              <Download className="h-5 w-5" />
              Download Video
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessVideo