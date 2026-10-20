import { cn } from "@/lib/cn";
import Container from "./Container";

const tones = {
  white: "bg-white",
  surface: "bg-surface",
  fade: "bg-surface",
};

const spacing = {
  sm: "py-10 sm:py-12",
  md: "py-12 sm:py-16 lg:py-20",
};

// Full-width page section with a background tone and a centered Container inside.
export default function Section({ id, tone = "white", size = "xl", spacing: space = "md", className, containerClassName, children }) {
  return (
    <section id={id} className={cn(tones[tone], spacing[space], className)}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
