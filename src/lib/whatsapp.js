// wa.me chat link for a number like "91 98765 43210", with an optional pre-filled message.
export function whatsappLink(number, text = "") {
  const digits = String(number || "").replace(/\D/g, "");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export const telLink = (phone) => `tel:${String(phone || "").replace(/\s/g, "")}`;
