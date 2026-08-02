import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
        <p className="text-muted-foreground">Manage client reviews and case studies.</p>
      </div>
      
      <Card className="bg-card border-border/40 rounded-3xl overflow-hidden shadow-sm mt-8">
         <CardHeader className="bg-secondary/20 border-b border-border/40 p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
               <Wrench className="w-10 h-10" />
            </div>
            <CardTitle className="text-3xl font-extrabold mb-4">Coming Soon in v2.1</CardTitle>
            <CardDescription className="text-base max-w-lg mx-auto">
               We are working hard to bring this feature to the Kazzona OS. It will be available in the next major update. Stay tuned for seamless integrations and advanced capabilities.
            </CardDescription>
         </CardHeader>
      </Card>
    </div>
  );
}
