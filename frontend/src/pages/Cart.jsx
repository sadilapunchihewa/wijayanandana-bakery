import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/useCart'

export default function Cart() {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart()

  return (
    <main className="min-h-screen bg-[#FFF7ED] px-4 pb-20 pt-32 text-[#1F2937] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#D97706]">Your cart</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-none sm:text-6xl">
            Review your bakery and meal order.
          </h1>
        </motion.div>

        {!items.length ? (
          <section className="rounded-[2rem] border border-white/80 bg-white/80 p-10 text-center shadow-[0_24px_80px_rgba(217,119,6,0.12)]">
            <h2 className="font-display text-4xl font-extrabold">Your cart is empty</h2>
            <p className="mx-auto mt-4 max-w-xl text-[#6B4A2A]">
              Add fresh breads, cakes, short eats or Sri Lankan meals from the menu.
            </p>
            <Link to="/" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#DC2626] via-[#D97706] to-[#F59E0B] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_18px_44px_rgba(217,119,6,0.28)]">
              Explore menu
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
            <section className="space-y-4">
              {items.map((item, index) => (
                <motion.article key={item.cartId} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="grid gap-4 rounded-[1.6rem] border border-white/80 bg-white/82 p-4 shadow-[0_20px_70px_rgba(217,119,6,0.1)] sm:grid-cols-[8rem_1fr_auto] sm:items-center">
                  <img src={item.image} alt={item.name} className="h-32 w-full rounded-[1.1rem] object-cover sm:w-32" />
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#D97706]">{item.category}</p>
                    <h2 className="mt-2 text-2xl font-extrabold">{item.name}</h2>
                    <p className="mt-1 text-sm text-[#6B4A2A]">{item.type}</p>
                    <p className="mt-3 font-extrabold text-[#DC2626]">Rs {Number(item.price).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <div className="flex items-center rounded-full border border-[#FED7AA] bg-[#FFF7ED] p-1">
                      <button type="button" onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-extrabold">-</button>
                      <span className="w-10 text-center text-sm font-extrabold">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-extrabold">+</button>
                    </div>
                    <button type="button" onClick={() => removeFromCart(item.cartId)} className="text-sm font-extrabold text-[#DC2626]">
                      Remove
                    </button>
                  </div>
                </motion.article>
              ))}
            </section>

            <aside className="h-fit rounded-[1.8rem] bg-[#111827] p-6 text-white shadow-[0_30px_100px_rgba(17,24,39,0.3)]">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#F59E0B]">Order summary</p>
              <div className="mt-6 space-y-4 text-sm">
                <SummaryRow label="Subtotal" value={subtotal} />
                <div className="border-t border-white/12 pt-4">
                  <SummaryRow label="Total" value={subtotal} strong />
                </div>
              </div>
              <button className="mt-6 w-full rounded-full bg-gradient-to-r from-[#DC2626] via-[#D97706] to-[#F59E0B] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white">
                Checkout
              </button>
              <button type="button" onClick={clearCart} className="mt-3 w-full rounded-full border border-white/14 px-6 py-3 text-sm font-extrabold text-white/78 hover:bg-white/10">
                Clear cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className={`flex items-center justify-between ${strong ? 'text-xl font-extrabold' : 'text-white/78'}`}>
      <span>{label}</span>
      <span>Rs {Number(value).toLocaleString()}</span>
    </div>
  )
}
