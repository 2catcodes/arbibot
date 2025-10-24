// Your code imports "@/components/ui/toaster" but you’re using Sonner.
// Provide a no-op Toaster so older shadcn code compiles.
// (We already render the real <Toaster /> from "@/components/ui/sonner".)
export function Toaster() {
  return null;
}
