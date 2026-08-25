import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Package, Plus, Pencil } from 'lucide-react'
import { DeleteProductButton } from './DeleteProductButton'

export default async function AdminProductsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif font-bold text-2xl text-[#2c0e68]">Store products</h1>
          <p className="text-slate-500 text-sm mt-1">{products?.length ?? 0} products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-teleiosis-gold text-[#2c0e68] text-sm font-bold hover:bg-teleiosis-gold/85 transition-colors"
        >
          <Plus size={16} />
          New product
        </Link>
      </div>

      {!products?.length ? (
        <div className="text-center py-20 rounded-2xl bg-slate-50">
          <Package size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No products yet. Add your first one.</p>
        </div>
      ) : (
        <div className="shadow-sm rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Name</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Stock</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-[#2c0e68]">{product.name}</td>
                  <td className="px-4 py-3 text-slate-500 hidden sm:table-cell capitalize">{product.category}</td>
                  <td className="px-4 py-3 text-slate-600">ZMW {Number(product.price).toLocaleString()}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`text-xs font-semibold px-2 py-0.5 ${product.in_stock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {product.in_stock ? 'In stock' : 'Out of stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <Link href={`/admin/products/${product.id}/edit`} className="text-slate-400 hover:text-[#2c0e68] transition-colors">
                        <Pencil size={15} />
                      </Link>
                      <DeleteProductButton id={product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
