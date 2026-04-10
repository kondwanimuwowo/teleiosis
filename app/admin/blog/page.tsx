import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Plus, BookOpen, Pencil } from 'lucide-react'
import { DeleteBlogPostButton } from './DeleteBlogPostButton'

export const metadata = { title: 'Blog | Teleiosis Admin' }

export default async function AdminBlogPage() {
  const supabase = await createSupabaseServerClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, category, published_at, slug')
    .order('published_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-teleiosis-gold text-xs font-semibold tracking-[0.3em] uppercase mb-1">Manage</p>
          <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Blog Posts</h1>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2c0e68] text-white text-sm font-semibold hover:bg-[#4a2c9c] transition-colors shadow-sm"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {!posts?.length ? (
          <div className="p-12 text-center">
            <BookOpen size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">No posts yet. Write your first one.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Published</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {posts.map((p) => {
                const d = new Date(p.published_at)
                const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4 font-medium text-[#2c0e68]">{p.title}</td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4a2c9c]/10 text-[#4a2c9c]">{p.category}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 hidden md:table-cell">{dateStr}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/blog/${p.slug}`} target="_blank" className="p-1.5 rounded-lg text-slate-400 hover:text-[#4a2c9c] hover:bg-[#4a2c9c]/8 transition-colors">
                          <Pencil size={14} />
                        </Link>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
