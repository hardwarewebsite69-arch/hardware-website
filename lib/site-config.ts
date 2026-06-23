export const siteConfig = {
  businessName: "Amroz Traders",
  phone: "0713355507",
  whatsappNumber: "0713355507",
  telHref: "tel:0713355507",
  whatsappHref: "https://wa.me/254713355507",
  cloudinaryCloudName: "dxyngeag4",
} as const;

export const heroOpenerVideos = {
  mobile: {
    mp4: "https://res.cloudinary.com/dxyngeag4/video/upload/v1782231018/opener-mobile-optimized_hx0snp.mp4",
    webm: "https://res.cloudinary.com/dxyngeag4/video/upload/f_webm/v1782231018/opener-mobile-optimized_hx0snp.webm",
    poster: "https://res.cloudinary.com/dxyngeag4/video/upload/v1782231018/opener-mobile-optimized_hx0snp.jpg",
  },
  desktop: {
    mp4: "https://res.cloudinary.com/dxyngeag4/video/upload/v1782231019/opener-optimized_fkyjnr.mp4",
    webm: "https://res.cloudinary.com/dxyngeag4/video/upload/f_webm/v1782231019/opener-optimized_fkyjnr.webm",
    poster: "https://res.cloudinary.com/dxyngeag4/video/upload/v1782231019/opener-optimized_fkyjnr.jpg",
  },
} as const;

export const adminSettingsDefaults = {
  business_name: siteConfig.businessName,
  phone: siteConfig.phone,
  whatsapp_number: siteConfig.whatsappNumber,
} as const;
