import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { bakeryCategories, deleteBakeryProduct, getBakeryProducts, updateBakeryProduct } from '../../services/adminService'
import { Icon } from './AdminIcons'

const pageSize = 6

export default function ManageBakeryProducts() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editing, setEditing] = useState(null)

  const loadProducts = () => {
    getBakeryProducts().then(setProducts).catch(() => setProducts([]))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = [product.productName, product.description, product.category].join(' ').toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [products, search, category])

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await deleteBakeryProduct(deleteTarget._id)
    setDeleteTarget(null)
    loadProducts()
  }

  const saveEdit = async (event) => {
    event.preventDefault()
    await updateBakeryProduct(editing._id, {
      productName: editing.productName,
      price: Number(editing.price),
      rating: Number(editing.rating || 4.8),
      category: editing.category,
      description: editing.description,
      available: editing.available,
    })
    setEditing(null)
    loadProducts()
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[34px] border border-white/70 bg-[#fffaf2]/92 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D97706]">Bakery inventory</p>
            <h1 className="mt-2 font-display text-5xl font-extrabold text-[#1F2937]">Manage bakery items</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search bakery items..." className={inputClass} />
            <select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1) }} className={inputClass}>
              <option>All</option>
              {bakeryCategories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((product, index) => (
          <motion.article key={product._id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} whileHover={{ y: -8 }} className="overflow-hidden rounded-[32px] border border-white/70 bg-[#fffaf2]/92 shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
            <div className="relative h-56 bg-gradient-to-br from-[#fed7aa] to-[#D97706]">
              {product.image ? (
                <img src={product.image} alt={product.productName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center font-display text-4xl font-extrabold text-white/70">{product.productName?.[0] || 'W'}</div>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-[#fffaf2]/86 px-3 py-1 text-xs font-bold text-[#7c2d12] backdrop-blur">{product.category}</span>
              <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${product.available ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'}`}>
                {product.available ? 'Available' : 'Hidden'}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-[#1F2937]">{product.productName}</h2>
                  <p className="mt-1 text-sm text-[#7b5c49]">Rating {Number(product.rating || 0).toFixed(1)}</p>
                </div>
                <p className="font-display text-xl font-extrabold text-[#D97706]">Rs {Number(product.price).toLocaleString()}</p>
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#7b5c49]">{product.description || 'No description added.'}</p>
              <div className="mt-5 flex gap-2">
                <button type="button" onClick={() => setEditing(product)} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#ead9bf] bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#1F2937] hover:bg-white">
                  <Icon name="edit" className="h-4 w-4" /> Edit
                </button>
                <button type="button" onClick={() => setDeleteTarget(product)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1F2937] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#111827]">
                  <Icon name="trash" className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      {!visible.length && <div className="rounded-[30px] border border-white/70 bg-[#fffaf2]/92 p-10 text-center text-[#7b5c49]">No bakery items found. Add your first bread, bun, cake, pastry, snack or beverage.</div>}

      <div className="flex items-center justify-center gap-3">
        {Array.from({ length: pages }, (_, index) => (
          <button key={index + 1} type="button" onClick={() => setPage(index + 1)} className={`h-10 w-10 rounded-full text-sm font-bold ${page === index + 1 ? 'bg-[#D97706] text-white' : 'bg-[#fffaf2] text-[#7b5c49]'}`}>
            {index + 1}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {deleteTarget && (
          <Modal title="Delete bakery item?" onClose={() => setDeleteTarget(null)}>
            <p className="text-[#7b5c49]">This will remove <span className="font-semibold text-[#1F2937]">{deleteTarget.productName}</span> from the bakery section.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 rounded-full border border-[#ead9bf] px-5 py-3 font-semibold">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 rounded-full bg-[#1F2937] px-5 py-3 font-semibold text-white">Delete</button>
            </div>
          </Modal>
        )}

        {editing && (
          <Modal title="Edit bakery item" onClose={() => setEditing(null)}>
            <form onSubmit={saveEdit} className="space-y-4">
              <input value={editing.productName} onChange={(e) => setEditing({ ...editing, productName: e.target.value })} className={inputClass} />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className={inputClass} />
                <input type="number" min="0" max="5" step="0.1" value={editing.rating || 4.8} onChange={(e) => setEditing({ ...editing, rating: e.target.value })} className={inputClass} />
              </div>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputClass}>
                {bakeryCategories.map((item) => <option key={item}>{item}</option>)}
              </select>
              <textarea value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={`${inputClass} min-h-24 resize-none py-3`} />
              <label className="flex items-center gap-3 text-sm font-semibold text-[#1F2937]">
                <input type="checkbox" checked={editing.available} onChange={(e) => setEditing({ ...editing, available: e.target.checked })} />
                Available
              </label>
              <button className="w-full rounded-full bg-gradient-to-r from-[#DC2626] to-[#F59E0B] px-5 py-3 font-bold text-white">Save changes</button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

function Modal({ title, children, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
      <motion.div initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }} className="w-full max-w-md rounded-[30px] bg-[#fffaf2] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-3xl font-extrabold text-[#1F2937]">{title}</h2>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0dfc8] text-[#1F2937]">x</button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}

const inputClass = 'rounded-2xl border border-[#ead9bf] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#D97706]'
