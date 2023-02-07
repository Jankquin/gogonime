/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// module.exports = nextConfig

module.exports = {
    images: {
        domains: ["res.cloudinary.com"],
        formats: ['image/webp'],
    },
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
};