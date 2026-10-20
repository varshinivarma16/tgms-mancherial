// Outline icons (24×24, stroke = currentColor). Add new ones to `paths`.
const paths = {
  pin: ["M12 21s-7-6.5-7-12a7 7 0 1114 0c0 5.5-7 12-7 12z", "M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"],
  map: ["M9 20l-5.45-2.73A1 1 0 013 16.38V5.62a1 1 0 011.45-.9L9 7m0 13l6-3m-6 3V7m6 10l4.55 2.28A1 1 0 0021 18.38V7.62a1 1 0 00-.55-.9L15 4m0 13V4m0 0L9 7"],
  phone: ["M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"],
  mail: ["M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"],
  globe: ["M12 21a9 9 0 100-18 9 9 0 000 18z", "M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18"],
  clock: ["M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"],
  notice: ["M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2zM7 9h6M7 13h10M7 17h10"],
  calendar: ["M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"],
  graduation: ["M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.16-9.42A12 12 0 0012 20a12 12 0 006.16-9.42"],
  award: ["M9 12l2 2 4-4M7.84 4.7a3.42 3.42 0 001.95-.8 3.42 3.42 0 014.42 0 3.42 3.42 0 001.95.8 3.42 3.42 0 013.14 3.14c.06.72.34 1.4.8 1.95a3.42 3.42 0 010 4.42 3.42 3.42 0 00-.8 1.95 3.42 3.42 0 01-3.14 3.14 3.42 3.42 0 00-1.95.8 3.42 3.42 0 01-4.42 0 3.42 3.42 0 00-1.95-.8 3.42 3.42 0 01-3.14-3.14 3.42 3.42 0 00-.8-1.95 3.42 3.42 0 010-4.42 3.42 3.42 0 00.8-1.95A3.42 3.42 0 017.84 4.7z"],
  eye: ["M15 12a3 3 0 11-6 0 3 3 0 016 0z", "M2.46 12C3.73 7.94 7.52 5 12 5s8.27 2.94 9.54 7c-1.27 4.06-5.06 7-9.54 7s-8.27-2.94-9.54-7z"],
  menu: ["M4 6h16M4 12h16M4 18h16"],
  close: ["M6 18L18 6M6 6l12 12"],
  chevronLeft: ["M15 19l-7-7 7-7"],
  chevronRight: ["M9 5l7 7-7 7"],
  chevronDown: ["M19 9l-7 7-7-7"],
  search: ["M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"],
  download: ["M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"],
  check: ["M5 13l4 4L19 7"],
};

const WHATSAPP =
  "M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.98 6.68 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.26 0 11.36-5.1 11.36-11.37 0-3.03-1.18-5.89-3.33-8.03z";

export default function Icon({ name, className = "h-5 w-5" }) {
  if (name === "whatsapp") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={WHATSAPP} />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]?.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

// Rounded square with an icon inside, used in front of headings and list items.
export function IconTile({ name, size = "md", tone = "primary", className = "" }) {
  const sizes = { sm: "h-10 w-10 rounded-lg", md: "h-11 w-11 rounded-xl sm:h-12 sm:w-12", lg: "h-14 w-14 rounded-2xl" };
  const tones = { primary: "bg-primary text-white", accent: "bg-white/15 text-white" };
  return (
    <span className={`flex shrink-0 items-center justify-center ${sizes[size]} ${tones[tone]} ${className}`}>
      <Icon name={name} className={size === "sm" ? "h-5 w-5" : "h-6 w-6"} />
    </span>
  );
}
