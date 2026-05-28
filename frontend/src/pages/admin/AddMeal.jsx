import { useState } from 'react'
import { motion } from 'framer-motion'
import { createMeal, mealCategories } from '../../services/adminService'

const emptyForm = {
  mealName: '',
  category: 'Breakfast',
  description: '',
  price: '',
  image: '',
  rating: 4.8,
  available: true,
}

export default function AddMeal() {
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
      await createMeal({
        ...form,
        price: Number(form.price),
        rating: Number(form.rating || 4.8),
      })
      setForm(emptyForm)
      setPreview('')
      setMessage('Meal added successfully.')
    } catch (error) {
      setMessage(error.message || 'Unable to add meal.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-[34px] border border-[#ead9bf] bg-[#fffaf2]/96 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D97706]">New meal</p>
        <h1 className="mt-2 font-display text-5xl font-extrabold text-[#1F2937]">Add meal</h1>
        <p className="mt-3 text-sm leading-6 text-[#7b5c49]">
          Upload breakfast, lunch and dinner meals with images, prices, ratings and availability.
        </p>

        <label
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            handleImage(event.dataTransfer.files?.[0])
          }}
          className="mt-8 flex min-h-[300px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-[#F59E0B]/70 bg-gradient-to-br from-[#fff8ec] to-[#fed7aa] p-5 text-center transition hover:border-[#D97706] xl:min-h-[420px]"
        >
          {preview ? (
            <img src={preview} alt="Meal preview" className="h-full max-h-[320px] w-full rounded-[24px] object-cover shadow-[0_22px_60px_rgba(58,34,26,0.18)]" />
          ) : (
            <>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1F2937] text-3xl text-white">+</span>
              <span className="mt-5 font-display text-3xl font-extrabold text-[#1F2937]">Drop meal image</span>
              <span className="mt-2 text-sm text-[#7b5c49]">or click to choose from your device</span>
            </>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={(event) => handleImage(event.target.files?.[0])} />
        </label>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[34px] border border-[#ead9bf] bg-[#fffaf2]/96 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Meal name">
            <input required value={form.mealName} onChange={(e) => updateField('mealName', e.target.value)} className={inputClass} placeholder="Chicken Kottu" />
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className={inputClass}>
              {mealCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </Field>
          <Field label="Price">
            <input required type="number" min="0" value={form.price} onChange={(e) => updateField('price', e.target.value)} className={inputClass} placeholder="1180" />
          </Field>
          <Field label="Rating">
            <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => updateField('rating', e.target.value)} className={inputClass} />
          </Field>
        </div>

        <Field label="Description" className="mt-4">
          <textarea value={form.description} onChange={(e) => updateField('description', e.target.value)} className={`${inputClass} min-h-36 resize-none py-4`} placeholder="Describe taste, ingredients and serving style." />
        </Field>

        <div className="mt-6 flex flex-col gap-4 rounded-[26px] border border-[#ead9bf] bg-white/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-[#1F2937]">Availability</p>
            <p className="text-sm text-[#7b5c49]">Visible and available for orders</p>
          </div>
          <button type="button" onClick={() => updateField('available', !form.available)} className={`relative h-9 w-16 rounded-full transition ${form.available ? 'bg-[#D97706]' : 'bg-[#cdbca7]'}`}>
            <span className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow transition ${form.available ? 'left-8' : 'left-1'}`} />
          </button>
        </div>

        {message && <p className="mt-5 rounded-2xl bg-[#ffedd5] px-4 py-3 text-sm font-medium text-[#7c2d12]">{message}</p>}

        <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} disabled={submitting} className="mt-6 w-full rounded-full bg-gradient-to-r from-[#DC2626] via-[#D97706] to-[#F59E0B] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(217,119,6,0.3)] disabled:opacity-60">
          {submitting ? 'Uploading...' : 'Upload Meal'}
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

const inputClass = 'w-full rounded-2xl border border-[#ead9bf] bg-white/62 px-4 py-3 text-sm text-[#1F2937] shadow-sm outline-none transition placeholder:text-[#b59a80] focus:border-[#D97706] focus:bg-white'
