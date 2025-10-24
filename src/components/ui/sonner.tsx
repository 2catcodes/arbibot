// Wrapper for the "sonner" toaster so you can import it from @/components/ui/sonner
import { Toaster as SonnerToaster } from "sonner";

export { toast } from "sonner";

export function Toaster(props: React.ComponentProps<typeof SonnerToaster>) {
  // nice defaults; tweak as you like
  return (
    <SonnerToaster
      position="bottom-right"
      richColors
      closeButton
      expand={false}
      duration={3500}
      {...props}
    />
  );
}
