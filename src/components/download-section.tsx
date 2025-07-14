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
  return;
}