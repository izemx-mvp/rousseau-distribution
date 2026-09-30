import { Link } from "@tanstack/react-router";
import logo from "@/assets/rousseau-logo.png";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "default",
  className,
}: {
  variant?: "default" | "light";
  className?: string;
}) {
  return (
    <Link
      to="/"
      aria-label="Rousseau Distribution — accueil"
      className={cn("inline-flex items-center focus-rd", className)}
    >
      <img
        src={logo}
        alt="Rousseau Distribution"
        className={cn(
          "h-8 w-auto transition-all duration-300 md:h-9",
          variant === "light" && "brightness-0 invert",
        )}
      />
    </Link>
  );
}

/** Marque compacte (carré navy + swoosh) pour les avatars, le chatbot, etc. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-navy",
        className,
      )}
      aria-hidden="true"
    >
      <span className="font-mono text-[11px] font-bold tracking-tight text-white">RD</span>
      <span className="absolute bottom-1 left-1.5 h-[2px] w-4 bg-rouge" />
    </span>
  );
}
