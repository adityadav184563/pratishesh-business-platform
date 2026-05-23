/**
 * Default contact settings for Pratishesh
 * Used across the website for consistent phone, email, and address display
 */

export const DEFAULT_PHONE = "+91 9517690666";
export const DEFAULT_WHATSAPP = "919517690666";
export const DEFAULT_EMAIL = "info@pratishesh.com";
export const DEFAULT_ADDRESS = "KBC-22 The Businees Arcade Complex, Barabirwa Rd, Sector B, Bargawan, Alambagh, Lucknow, Uttar Pradesh 226012";
export const DEFAULT_COMPANY_NAME = "Pratishesh Associate & Consultancy";
export const DEFAULT_FOOTER_TEXT =
  "Technology Solutions, Legal & Compliance, Industrial Training, and Job Placement — empowering businesses across India.";

// URL constructors for contact actions
export const getWhatsAppUrl = (phone?: string) => {
  const whatsappNumber = phone || DEFAULT_WHATSAPP;
  return `https://wa.me/${whatsappNumber}`;
};

export const getPhoneUrl = (phone?: string) => {
  const phoneNumber = phone || DEFAULT_PHONE;
  return `tel:${phoneNumber.replace(/\s+/g, "")}`;
};
