import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/meeting/', '/select-role']
    },
    sitemap: 'https://codegate-indol.vercel.app/sitemap.xml'
  }
}
