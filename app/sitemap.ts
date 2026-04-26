import { MetadataRoute } from 'next'
import { createSupabaseServerClient } from '@/lib/supabase-server'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://teleiosis.org'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createSupabaseServerClient()

  const [{ data: posts }, { data: events }, { data: series }] = await Promise.all([
    supabase.from('blog_posts').select('slug, published_at').order('published_at', { ascending: false }),
    supabase.from('events').select('id, date').gte('date', new Date().toISOString().split('T')[0]),
    supabase.from('teaching_series').select('slug, created_at'),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                         lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/teachings`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/events`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/blog`,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/partnership`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/store`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/contact`,            lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.published_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const eventRoutes: MetadataRoute.Sitemap = (events ?? []).map((e) => ({
    url: `${BASE}/events/${e.id}`,
    lastModified: new Date(e.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const seriesRoutes: MetadataRoute.Sitemap = (series ?? []).map((s) => ({
    url: `${BASE}/teachings/series/${s.slug}`,
    lastModified: new Date(s.created_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes, ...eventRoutes, ...seriesRoutes]
}
