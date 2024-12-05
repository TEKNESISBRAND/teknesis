import {
  FaXTwitter,
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";

export default function SocialLinks() {
  return (
    <div className="flex order-1 md:order-2 py-[24px] relative z-10 gap-8">
      <a
        href="https://www.instagram.com/teknesis_?igsh=ZmRzOXRxaTVzamF5"
        target="_blank"
        className="w-[24px] h-[24px]"
      >
        <FaLinkedinIn />
      </a>
      <a
        href="https://x.com/Teknesis_?t=ndcqAjaFuCtfKJrfm2U5Kw&s=08"
        target="_blank"
        className="w-[24px] h-[24px]"
      >
        <FaXTwitter />
      </a>

      <a
        href="https://wa.me/message/BJT2IA7ODEBHF1"
        target="_blank"
        className="w-[24px] h-[24px]"
      >
        <FaWhatsapp />
      </a>

      <a
        href="https://www.facebook.com/teknesis?mibextid=ZbWKwL"
        target="_blank"
        className="w-[24px] h-[24px]"
      >
        <FaFacebookF />
      </a>

      <a
        href="https://www.instagram.com/teknesis_?igsh=OWJ1OWxzMWplZGNi"
        target="_blank"
        className="w-[24px] h-[24px]"
      >
        <FaInstagram />
      </a>
    </div>
  );
}
