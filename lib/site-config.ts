export const siteConfig = {
  businessName: "Amroz Traders",
  phone: "0713355507",
  whatsappNumber: "0713355507",
  telHref: "tel:0713355507",
  whatsappHref: "https://wa.me/254713355507",
  cloudinaryCloudName: "dxyngeag4",
} as const;

export const adminSettingsDefaults = {
  business_name: siteConfig.businessName,
  phone: siteConfig.phone,
  whatsapp_number: siteConfig.whatsappNumber,
} as const;
