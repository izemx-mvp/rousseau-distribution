import { whatsappLink } from "@/config/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Écrire sur WhatsApp"
      className="focus-rd fixed bottom-5 left-5 z-40 inline-flex size-12 items-center justify-center rounded-full bg-[#25D366] shadow-lift transition-transform duration-300 hover:scale-105 md:size-14"
    >
      <span className="pulse-ring absolute inset-0 rounded-full bg-[#25D366]/50" aria-hidden />
      <svg viewBox="0 0 32 32" className="relative size-6 fill-white md:size-7" aria-hidden>
        <path d="M16.03 4C9.4 4 4.03 9.37 4.03 16c0 2.12.55 4.11 1.52 5.84L4 28l6.33-1.5A11.94 11.94 0 0 0 16.03 28c6.63 0 12-5.37 12-12s-5.37-12-12-12Zm0 21.8c-1.86 0-3.6-.5-5.1-1.38l-.37-.22-3.76.89.9-3.66-.24-.38a9.77 9.77 0 0 1-1.5-5.25c0-5.42 4.42-9.83 9.86-9.83 5.44 0 9.86 4.41 9.86 9.83 0 5.42-4.42 9.83-9.86 9.83Zm5.4-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.09 3.19 5.07 4.47.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
