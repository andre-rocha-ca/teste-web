import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 bg-background text-foreground">
      <div className="max-w-xl text-center space-y-4">
        <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
          Teste · Foundation
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Hello, world.
        </h1>
        <p className="text-muted-foreground">
          This is the scaffold. Real product surface lands here next.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild>
            <a href="/api/health">Check health</a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/vercel/next.js"
              target="_blank"
              rel="noreferrer"
            >
              Stack
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
