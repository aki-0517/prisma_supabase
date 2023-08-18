/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ["ogcaqwmivxdceagxoajr.supabase.co"]
    }
}

module.exports = nextConfig
