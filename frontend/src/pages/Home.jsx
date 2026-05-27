import { motion, useScroll, useTransform } from 'framer-motion'
import heroImg from '../assets/hero.png'
import GlassCard from '../components/ui/GlassCard'
import PrimaryButton from '../components/ui/PrimaryButton'

const featuredCakes = [
  {
    name: 'Midnight Ganache Torte',
    description: 'Single-origin dark chocolate, burnt caramel, gold leaf finish.',
    price: 'Rs 4,800',
    rating: 4.9,
    tag: 'Signature',
  },
  {
    name: 'Lotus Biscoff Cloud',
    description: 'Biscoff crumble, whipped mascarpone, brown sugar sponge.',
    price: 'Rs 3,950',
    rating: 4.8,
    tag: 'Limited',
  },
  {
    name: 'Tropical Vanilla Mille-Feuille',
    description: 'Sri Lankan vanilla, caramelized puff pastry, mango compote.',
    price: 'Rs 4,200',
    rating: 4.7,
    tag: 'Hotel Favourite',
  },
]

const categories = [
  { name: 'Cakes', description: 'Occasion, couture & daily cakes.', count: '48' },
  { name: 'Artisan Bread', description: 'Sourdoughs, baguettes, soft loaves.', count: '24' },
  { name: 'Hotel Foods', description: 'Curries, grills, and breakfast spreads.', count: '32' },
  { name: 'Pastry Bar', description: 'Éclairs, tartlets and patisserie.', count: '18' },
]

const hotelDishes = [
  {
    name: 'Slow-Cooked Lamb Kalia',
    description: 'Spiced coconut reduction, charred flatbread, herb oil.',
    tag: 'Chef’s table',
  },
  {
    name: 'Coconut & Lime Seared Barramundi',
    description: 'Tamarind glaze, citrus leaves, smoked rice.',
    tag: 'Weekend special',
  },
  {
    name: 'Cinnamon Butter Brioche French Toast',
    description: 'Kithul treacle, roasted cashew, vanilla cream.',
    tag: 'Brunch',
  },
]

const reviews = [
  {
    name: 'Isuri Perera',
    role: 'Event Planner',
    quote:
      'Every cake we serve from Wijayanandana feels couture. The textures, the finishes, the flavours – consistently world class.',
    rating: 5,
  },
  {
    name: 'Tharindu Jayasinghe',
    role: 'Hotel Guest',
    quote:
      'Breakfast spread is a dream. The breads taste like they came out of a European boulangerie, but with Sri Lankan warmth.',
    rating: 4.9,
  },
  {
    name: 'Dilushi Fernando',
    role: 'Bride',
    quote:
      'Our wedding cake was a sculpture. Guests still speak about the balance of flavours and how light it felt.',
    rating: 5,
  },
]

function Stars({ value }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  return (
    <div className="flex items-center gap-0.5 text-[0.7rem] text-[#d4af37]">
      {stars.map((s) => (
        <span key={s}>{s <= Math.round(value) ? '★' : '☆'}</span>
      ))}
      <span className="ml-1 text-[0.7rem] text-[#a67b49]">{value.toFixed(1)}</span>
    </div>
  )
}

export default function Home() {
  const { scrollY } = useScroll()
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.05])
  const heroTranslate = useTransform(scrollY, [0, 300], [0, -40])

  return (
    <div className="relative min-h-screen pb-16">
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28"
      >
        <motion.div
          style={{ scale: heroScale, y: heroTranslate }}
          className="pointer-events-none absolute inset-x-0 top-[-20%] -z-10 h-[380px] bg-[radial-gradient(circle_at_top,#ffffff,rgba(255,255,255,0)_55%)]"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-2/3 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_60%)]" />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center">
          <div className="max-w-xl space-y-5">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="text-[0.78rem] tracking-[0.28em] uppercase text-[#a67b49]"
            >
              Wijayanandana Hotel &amp; Bakery
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-semibold tracking-tight text-[#3a2518] sm:text-5xl lg:text-6xl"
            >
              Fresh baked{' '}
              <span className="lux-gold-text inline-block">luxury every day</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.6 }}
              className="max-w-md text-[0.95rem] leading-relaxed text-[#7a5b45]"
            >
              From sunrise breads to late-night patisserie and curated hotel dishes, every plate is
              crafted in-house in Matara with obsessive attention to detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <PrimaryButton
                onClick={() => {
                  const el = document.querySelector('#menu')
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                Explore menu
              </PrimaryButton>
              <PrimaryButton
                variant="ghost"
                onClick={() =>
                  window.open('https://wa.me/94771234567?text=Hi%20Wijayanandana,%20I%20would%20like%20to%20place%20an%20order.', '_blank')
                }
              >
                Order now · WhatsApp
              </PrimaryButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-4 pt-3 text-[0.8rem] text-[#8a6a4c]"
            >
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-[#f7e0b3] shadow-sm shadow-[#d4af37]/40" />
                <div>
                  <p className="font-medium text-[#5a3b29]">Stone oven since 1998</p>
                  <p className="text-[0.72rem] text-[#a67b49]">
                    Family owned · Matara, Sri Lanka
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-lg"
          >
            <GlassCard className="relative overflow-hidden rounded-[40px] px-0 pb-0 pt-0">
              <div className="relative h-[320px] w-full overflow-hidden rounded-[40px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <img
                  src={heroImg}
                  alt="Cinematic bakery counter with cakes and breads"
                  className="h-full w-full scale-105 object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#fdf6e91a,transparent_60%)]" />
                <div className="absolute bottom-0 flex w-full items-end justify-between px-5 pb-4">
                  <div>
                    <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[#f2d8af]">
                      Today&apos;s counter
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#fdf6e9]">
                      Morning viennoiserie ready · 6.00 AM
                    </p>
                  </div>
                  <div className="rounded-full bg-black/30 px-3 py-1 text-[0.7rem] text-[#fdf6e9] backdrop-blur-md">
                    40+ items, baked on-site
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <section
        id="menu"
        className="lux-section mx-auto mt-10 w-full max-w-6xl px-4 md:mt-16"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.78rem] tracking-[0.28em] uppercase text-[#a67b49]">
              Featured collection
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#3a2518] md:text-3xl">
              Couture cakes, plated like jewellery.
            </h2>
            <p className="mt-2 max-w-md text-[0.92rem] text-[#7a5b45]">
              Each signature piece is hand-finished with layered textures, light sponges and
              whisper-soft creams.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[0.8rem] text-[#a67b49]">
            <Stars value={4.9} />
            <p>Curated from 2,000+ guest tastings.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-3">
          {featuredCakes.map((cake, index) => (
            <motion.article
              key={cake.name}
              initial={{ opacity: 0, y: 18, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                delay: 0.08 * index,
                duration: 0.6,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white/80 shadow-[0_22px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="relative h-40 bg-gradient-to-tr from-[#fdf6e9] via-[#f4e0c2] to-[#f1d4aa]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff,transparent_55%)]" />
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="absolute inset-x-4 -bottom-6 rounded-[22px] bg-gradient-to-br from-[#3a2518] via-[#5a3b29] to-[#c89b3c] p-[1px]"
                >
                  <div className="flex items-center justify-between rounded-[22px] bg-[#1c120d] px-3 py-2">
                    <div>
                      <p className="text-[0.7rem] tracking-[0.22em] uppercase text-[#f2d8af]">
                        {cake.tag}
                      </p>
                      <p className="text-xs text-[#f4dec1]">Made to order</p>
                    </div>
                    <p className="text-sm font-semibold text-[#fdf6e9]">{cake.price}</p>
                  </div>
                </motion.div>
              </div>
              <div className="flex flex-1 flex-col px-4 pb-4 pt-8">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[1rem] font-semibold text-[#3a2518]">{cake.name}</h3>
                  <span className="rounded-full bg-[#f7efe3] px-2 py-0.5 text-[0.7rem] text-[#a67b49]">
                    ★ {cake.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-[0.86rem] text-[#7a5b45]">{cake.description}</p>
                <div className="mt-4 flex items-center justify-between text-[0.78rem] text-[#a67b49]">
                  <button
                    type="button"
                    className="rounded-full bg-[#f7efe3] px-3 py-1 text-[0.75rem] font-medium text-[#5a3b29] transition-colors hover:bg-[#f1e2cd]"
                  >
                    Add to cart
                  </button>
                  <button type="button" className="text-[0.75rem] hover:text-[#5a3b29]">
                    View tasting notes →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section
        id="cakes"
        className="lux-section mx-auto mt-16 w-full max-w-6xl px-4"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.78rem] tracking-[0.28em] uppercase text-[#a67b49]">
              Curated by mood
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#3a2518]">
              Cakes, breads, hotel foods &amp; more.
            </h2>
          </div>
          <p className="hidden text-[0.8rem] text-[#7a5b45] md:block">
            Swipe horizontally to explore categories, like a streaming carousel.
          </p>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 pt-1">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ y: -4, scale: 1.02 }}
              className="min-w-[180px] rounded-[24px] border border-[#e2d2b8]/70 bg-white/80 px-4 py-3 shadow-sm shadow-black/5"
            >
              <p className="text-[0.8rem] font-semibold text-[#3a2518]">{cat.name}</p>
              <p className="mt-1 text-[0.78rem] text-[#8a6a4c]">{cat.description}</p>
              <p className="mt-3 text-[0.76rem] text-[#a67b49]">
                {cat.count} items · Curated daily
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="hotel"
        className="lux-section mx-auto mt-16 w-full max-w-6xl px-4"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="text-[0.78rem] tracking-[0.28em] uppercase text-[#a67b49]">
              Hotel foods
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#3a2518] md:text-3xl">
              Elevated restaurant plates, from the same kitchen.
            </h2>
            <p className="mt-2 text-[0.92rem] text-[#7a5b45]">
              Our hotel menu leans into comfort and craft. Think slow-cooked gravies, butter-soft
              breads and brunch dishes that feel like Sunday, every day.
            </p>
          </div>

          <div className="grid flex-1 gap-4 md:grid-cols-3">
            {hotelDishes.map((dish, index) => (
              <motion.article
                key={dish.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  delay: 0.05 * index,
                  duration: 0.55,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="flex flex-col rounded-[24px] bg-white/80 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
              >
                <div className="h-24 rounded-[22px] bg-gradient-to-br from-[#f3e4cf] via-[#f0ddc5] to-[#e9cfb0]" />
                <div className="mt-3 flex flex-1 flex-col">
                  <p className="text-[0.8rem] font-semibold text-[#3a2518]">{dish.name}</p>
                  <p className="mt-1 text-[0.8rem] text-[#7a5b45]">{dish.description}</p>
                  <div className="mt-3 flex items-center justify-between text-[0.75rem] text-[#a67b49]">
                    <span className="rounded-full bg-[#f7efe3] px-2 py-0.5">{dish.tag}</span>
                    <button type="button" className="hover:text-[#5a3b29]">
                      Add to room →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="lux-section mx-auto mt-16 w-full max-w-6xl px-4"
      >
        <GlassCard className="grid gap-10 rounded-[32px] px-6 py-8 md:grid-cols-[1.3fr,1fr] md:px-8 md:py-10">
          <div>
            <p className="text-[0.78rem] tracking-[0.28em] uppercase text-[#a67b49]">
              Our story
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#3a2518] md:text-3xl">
              A neighbourhood bakery that learnt the language of luxury.
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[#7a5b45]">
              Wijayanandana began as a single stone oven in Matara, serving still-warm bread to
              early-rising locals and travellers. Over two decades, our family recipe books have
              grown into a full hotel bakery and kitchen, yet our philosophy remains simple: honest
              ingredients, patient technique, and design-led presentation.
            </p>
            <p className="mt-3 text-[0.9rem] text-[#7a5b45]">
              Today, every cake sketch, loaf score and garnish is still done by hand – just with
              better ovens, calmer lighting and more room to breathe.
            </p>
          </div>
          <div className="space-y-4 text-[0.86rem] text-[#7a5b45]">
            <div className="rounded-2xl bg-[#f7efe3] px-4 py-3">
              <p className="text-[0.8rem] font-semibold text-[#3a2518]">Daily bake schedule</p>
              <p className="mt-1">
                <span className="font-medium text-[#5a3b29]">6.00 AM</span> · Viennoiserie &
                breads
              </p>
              <p>
                <span className="font-medium text-[#5a3b29]">10.00 AM</span> · Hotel brunch prep
              </p>
              <p>
                <span className="font-medium text-[#5a3b29]">2.00 PM</span> · Cake glazing & decor
              </p>
            </div>
            <div className="rounded-2xl border border-dashed border-[#e2d2b8] px-4 py-3">
              <p className="text-[0.8rem] font-semibold text-[#3a2518]">
                Ingredients we&apos;re proud of
              </p>
              <ul className="mt-2 space-y-1">
                <li>• Sri Lankan vanilla and kithul treacle.</li>
                <li>• Flour milled to our hydration profiles.</li>
                <li>• Butter-only pastry, no margarine.</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </section>

      <section className="lux-section mx-auto mt-16 w-full max-w-6xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.78rem] tracking-[0.28em] uppercase text-[#a67b49]">
              Guest stories
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#3a2518] md:text-3xl">
              Loved by locals &amp; travellers alike.
            </h2>
          </div>
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-3">
          {reviews.map((review, index) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: 0.06 * index,
                duration: 0.55,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="min-w-[260px] max-w-xs rounded-[24px] bg-white/80 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f2d3a0] to-[#e0b268] text-[0.8rem] font-semibold text-[#3a2518]">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-[0.86rem] font-medium text-[#3a2518]">{review.name}</p>
                  <p className="text-[0.74rem] text-[#a67b49]">{review.role}</p>
                </div>
              </div>
              <p className="mt-3 text-[0.86rem] leading-relaxed text-[#7a5b45]">
                “{review.quote}”
              </p>
              <div className="mt-3 flex items-center justify-between text-[0.78rem] text-[#d4af37]">
                <span>{'★'.repeat(5)}</span>
                <span className="text-[0.74rem] text-[#a67b49]">Rated {review.rating.toFixed(1)}</span>
              </div>
            </motion.figure>
          ))}
        </div>
      </section>
    </div>
  )
}

