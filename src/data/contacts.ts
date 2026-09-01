/**
 * Al Rehman Garden Phase 2 — Contact Information
 */

const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '+923000000000';
const whatsappDefaultMessage = 'Hello! I am interested in Al Rehman Garden Phase 2 properties.';
const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

export const CONTACTS = {
  phone: {
    primary: import.meta.env.PUBLIC_CONTACT_PHONE || '+923000000000',
    display: '+92 300 0000000',
  },
  whatsapp: {
    number: whatsappNumber,
    message: whatsappDefaultMessage,
    url: `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(whatsappDefaultMessage)}`,
  },
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || 'info@alrehmangarden.pk',
  address: {
    full: 'Al Rehman Garden Phase 2, Main Sharaqpur Road, Lahore, Punjab, Pakistan',
    short: 'Main Sharaqpur Road, Lahore',
    city: 'Lahore',
    province: 'Punjab',
    country: 'Pakistan',
  },
  officeHours: {
    weekdays: '9:00 AM – 6:00 PM',
    saturday: '10:00 AM – 4:00 PM',
    sunday: 'Closed',
  },
} as const;
