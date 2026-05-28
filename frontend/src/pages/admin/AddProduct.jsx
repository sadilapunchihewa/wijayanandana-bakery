import { useState } from 'react'
import { motion } from 'framer-motion'
import { createProduct, productCategories } from '../../services/adminService'

const emptyForm = {
  title: '',
  category: 'Cakes',
  description: '',
  price: '',
  discount: '',
  tags: '',
  stock: '',
  available: true,
  image: '',
}

export default function AddProduct() {
  const [form, setForm] = useState(emptyForm)
  const [preview, setPreview] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const handleImage = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
      updateField('image', reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      await createProduct({
        ...form,
        price: Number(form.price),
        discount: Number(form.discount || 0),
        stock: Number(form.stock || 0),
      })
      setForm(emptyForm)
      setPreview('')
      setMessage('Product added successfully.')
    } catch (error) {
      setMessage(error.message || 'Unable to add product.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[34px] border border-[#ead9bf] bg-[#fffaf2]/96 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.14)]"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">New product</p>
        <h1 className="mt-2 font-serif text-5xl text-[#3A221A]">Add menu item</h1>
        <p className="mt-3 text-sm leading-6 text-[#7b5c49]">
          Upload cakes, bakery items, Sri Lankan foods, drinks, and breakfast or dinner specials.
        </p>

        <label
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            handleImage(event.dataTransfer.files?.[0])
          }}
          className="mt-8 flex min-h-[300px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-[#C89B3C]/55 bg-gradient-to-br from-[#fff8ec] to-[#ead7ba] p-5 text-center transition hover:border-[#C89B3C] xl:min-h-[420px]"
        >
          {preview ? (
            <img src={preview} alt="Product preview" className="h-full max-h-[320px] w-full rounded-[24px] object-cover shadow-[0_22px_60px_rgba(58,34,26,0.18)]" />
          ) : (
            <>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3A221A] text-3xl text-[#F6F0E8]">+</span>
              <span className="mt-5 font-serif text-3xl text-[#3A221A]">Drop product image</span>
              <span className="mt-2 text-sm text-[#7b5c49]">or click to choose from your device</span>
            </>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={(event) => handleImage(event.target.files?.[0])} />
        </label>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="rounded-[34px] border border-[#ead9bf] bg-[#fffaf2]/96 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.14)]"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Product title">
            <input required value={form.title} onChange={(e) => updateField('title', e.target.value)} className={inputClass} placeholder="Butter Cake" />
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className={inputClass}>
              {productCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </Field>
          <Field label="Price">
            <input required type="number" min="0" value={form.price} onChange={(e) => updateField('price', e.target.value)} className={inputClass} placeholder="1250" />
          </Field>
          <Field label="Discount">
            <input type="number" min="0" value={form.discount} onChange={(e) => updateField('discount', e.target.value)} className={inputClass} placeholder="100" />
          </Field>
          <Field label="Stock">
            <input type="number" min="0" value={form.stock} onChange={(e) => updateField('stock', e.target.value)} className={inputClass} placeholder="24" />
          </Field>
          <Field label="Product tags">
            <input value={form.tags} onChange={(e) => updateField('tags', e.target.value)} className={inputClass} placeholder="breakfast, tea, fresh" />
          </Field>
        </div>

        <Field label="Description" className="mt-4">
          <textarea value={form.description} onChange={(e) => updateField('description', e.target.value)} className={`${inputClass} min-h-36 resize-none py-4`} placeholder="Describe taste, ingredients, and serving style." />
        </Field>

        <div className="mt-6 flex flex-col gap-4 rounded-[26px] border border-[#ead9bf] bg-white/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-[#3A221A]">Availability</p>
            <p className="text-sm text-[#7b5c49]">Visible and available for orders</p>
          </div>
          <button
            type="button"
            onClick={() => updateField('available', !form.available)}
            className={`relative h-9 w-16 rounded-full transition ${form.available ? 'bg-[#C89B3C]' : 'bg-[#cdbca7]'}`}
          >
            <span className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow transition ${form.available ? 'left-8' : 'left-1'}`} />
          </button>
        </div>

        {message && <p className="mt-5 rounded-2xl bg-[#f4e6d3] px-4 py-3 text-sm font-medium text-[#6f4527]">{message}</p>}

        <motion.button
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-[#E8C56A] via-[#C89B3C] to-[#8A5A24] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#201008] shadow-[0_18px_40px_rgba(200,155,60,0.3)] disabled:opacity-60"
        >
          {submitting ? 'Uploading...' : 'Upload Product'}
        </motion.button>
      </motion.section>
    </form>
  )
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#8a6a4c]">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-2xl border border-[#ead9bf] bg-white/62 px-4 py-3 text-sm text-[#3A221A] shadow-sm outline-none transition placeholder:text-[#b59a80] focus:border-[#C89B3C] focus:bg-white'
