import Icon from "@/components/ui/Icon";
import { whatsappLink } from "@/lib/whatsapp";

// Floating green chat button in the bottom-right corner of every page.
export default function WhatsAppButton({ number, label }) {
  if (!number) return null;
  return (
    <a
      href={whatsappLink(number)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition hover:scale-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <Icon name="whatsapp" className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}
