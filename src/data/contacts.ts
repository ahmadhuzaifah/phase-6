/**
 * DHA Phase 6 Lahore — Contact Information
 */

const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '+923257800001';
const whatsappDefaultMessage = 'Hello! I am interested in DHA Phase 6 Lahore properties.';
const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

export const CONTACTS = {
  phone: {
    primary: import.meta.env.PUBLIC_CONTACT_PHONE || '+923257800001',
    display: '0325 7800001',
  },
  whatsapp: {
    number: whatsappNumber,
    message: whatsappDefaultMessage,
    url: `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(whatsappDefaultMessage)}`,
  },
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || 'ahmadhuzaifah@dhaphase6lahore.pk',
  address: {
    full: 'Main Boulevard, Phase 6, DHA Lahore, Punjab, Pakistan',
    short: 'Main Boulevard, Phase 6, DHA Lahore',
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
