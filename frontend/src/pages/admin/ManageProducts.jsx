import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { deleteProduct, getProducts, productCategories, updateProduct } from '../../services/adminService'
import { Icon } from './AdminIcons'

const pageSize = 6

export default function ManageProducts() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editing, setEditing] = useState(null)

  const loadProducts = () => {
    getProducts().then(setProducts).catch(() => setProducts([]))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = [product.title, product.description, product.category]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesCategory = category === 'All' || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [products, search, category])

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await deleteProduct(deleteTarget._id)
    setDeleteTarget(null)
    loadProducts()
  }

  const saveEdit = async (event) => {
    event.preventDefault()
    await updateProduct(editing._id, {
      title: editing.title,
      price: Number(editing.price),
      stock: Number(editing.stock || 0),
      category: editing.category,
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">Inventory</p>
            <h1 className="mt-2 font-serif text-5xl text-[#3A221A]">Manage products</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
              placeholder="Search products..."
              className="rounded-2xl border border-[#ead9bf] bg-white/64 px-4 py-3 text-sm outline-none focus:border-[#C89B3C]"
            />
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value)
                setPage(1)
              }}
              className="rounded-2xl border border-[#ead9bf] bg-white/64 px-4 py-3 text-sm outline-none focus:border-[#C89B3C]"
            >
              <option>All</option>
              {productCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((product, index) => (
          <motion.article
            key={product._id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ y: -8 }}
            className="overflow-hidden rounded-[32px] border border-white/70 bg-[#fffaf2]/92 shadow-[0_24px_70px_rgba(0,0,0,0.14)]"
          >
            <div className="relative h-56 bg-gradient-to-br from-[#f5e3c6] to-[#d0a75e]">
              {product.image ? (
                <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center font-serif text-4xl text-[#3A221A]/40">
                  {product.title?.[0] || 'W'}
                </div>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-[#fffaf2]/86 px-3 py-1 text-xs font-bold text-[#6f4527] backdrop-blur">
                {product.category}
              </span>
              <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${product.available ? 'bg-[#dff1cf] text-[#456f25]' : 'bg-[#f4d2c6] text-[#8a3b26]'}`}>
                {product.available ? 'Available' : 'Hidden'}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-3xl text-[#3A221A]">{product.title}</h2>
                  <p className="mt-1 text-sm text-[#7b5c49]">Stock {product.stock ?? 0}</p>
                </div>
                <p className="font-serif text-2xl text-[#7f4b1d]">Rs {Number(product.price).toLocaleString()}</p>
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#7b5c49]">{product.description || 'No description added.'}</p>
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(product)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#ead9bf] bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#3A221A] hover:bg-white"
                >
                  <Icon name="edit" className="h-4 w-4" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(product)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#3A221A] px-4 py-2.5 text-sm font-semibold text-[#fff8ed] hover:bg-[#23120d]"
                >
                  <Icon name="trash" className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      {!visible.length && (
        <div className="rounded-[30px] border border-white/70 bg-[#fffaf2]/92 p-10 text-center text-[#7b5c49]">
          No products found. Add your first bakery or meal item.
        </div>
      )}

      <div className="flex items-center justify-center gap-3">
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index + 1}
            type="button"
            onClick={() => setPage(index + 1)}
            className={`h-10 w-10 rounded-full text-sm font-bold ${page === index + 1 ? 'bg-[#C89B3C] text-[#201008]' : 'bg-[#fffaf2] text-[#7b5c49]'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {deleteTarget && (
          <Modal title="Delete product?" onClose={() => setDeleteTarget(null)}>
            <p className="text-[#7b5c49]">
              This will remove <span className="font-semibold text-[#3A221A]">{deleteTarget.title}</span> from the menu.
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 rounded-full border border-[#ead9bf] px-5 py-3 font-semibold">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 rounded-full bg-[#3A221A] px-5 py-3 font-semibold text-[#fff8ed]">Delete</button>
            </div>
          </Modal>
        )}

        {editing && (
          <Modal title="Edit product" onClose={() => setEditing(null)}>
            <form onSubmit={saveEdit} className="space-y-4">
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputClass} />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className={inputClass} />
                <input type="number" value={editing.stock || 0} onChange={(e) => setEditing({ ...editing, stock: e.target.value })} className={inputClass} />
              </div>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputClass}>
                {productCategories.map((item) => <option key={item}>{item}</option>)}
              </select>
              <label className="flex items-center gap-3 text-sm font-semibold text-[#3A221A]">
                <input type="checkbox" checked={editing.available} onChange={(e) => setEditing({ ...editing, available: e.target.checked })} />
                Available
              </label>
              <button className="w-full rounded-full bg-gradient-to-r from-[#E8C56A] to-[#C89B3C] px-5 py-3 font-bold text-[#201008]">Save changes</button>
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
          <h2 className="font-serif text-3xl text-[#3A221A]">{title}</h2>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0dfc8] text-[#3A221A]">×</button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}

const inputClass = 'w-full rounded-2xl border border-[#ead9bf] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#C89B3C]'
