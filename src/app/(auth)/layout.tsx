export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full -z-10" />
      
      {/* Auth Content Container */}
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl mb-4 shadow-lg shadow-primary/20">
            D
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Kazzona <span className="text-primary font-normal">OS</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Enterprise Access Portal</p>
        </div>
        
        {children}
      </div>
    </div>
  );
}
