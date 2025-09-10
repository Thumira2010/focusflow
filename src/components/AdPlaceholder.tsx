import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface AdPlaceholderProps {
  type: "sidebar" | "footer";
}

export const AdPlaceholder = ({ type }: AdPlaceholderProps) => {
  const sidebarContent = {
    title: "Google AdSense",
    subtitle: "Advertisement Space",
    dimensions: "300x250",
    description: "Sidebar banner placement"
  };

  const footerContent = {
    title: "Google AdSense",
    subtitle: "Advertisement Banner",
    dimensions: "728x90",
    description: "Footer banner placement"
  };

  const content = type === "sidebar" ? sidebarContent : footerContent;
  const heightClass = type === "sidebar" ? "h-64" : "h-24";

  return (
    <Card className={`bg-gradient-glass backdrop-blur-glass border-glass-border border-dashed p-4 ${heightClass} flex flex-col items-center justify-center text-center opacity-60 hover:opacity-80 transition-all duration-300`}>
      <div className="space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm font-medium text-muted-foreground">{content.title}</h4>
        </div>
        
        <p className="text-xs text-muted-foreground">{content.subtitle}</p>
        
        <div className="text-xs text-muted-foreground/60 space-y-1">
          <p>{content.dimensions}</p>
          <p>{content.description}</p>
        </div>
        
        <div className="text-xs text-muted-foreground/40 mt-2">
          {type === "sidebar" ? (
            <div className="space-y-1">
              <div className="w-full h-2 bg-muted/20 rounded"></div>
              <div className="w-3/4 h-2 bg-muted/20 rounded mx-auto"></div>
              <div className="w-1/2 h-2 bg-muted/20 rounded mx-auto"></div>
            </div>
          ) : (
            <div className="flex space-x-2 justify-center">
              <div className="w-16 h-2 bg-muted/20 rounded"></div>
              <div className="w-12 h-2 bg-muted/20 rounded"></div>
              <div className="w-20 h-2 bg-muted/20 rounded"></div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};