import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import breadImg from '../assets/images/bread.jpg'
import heroImg from '../assets/images/home.jpg'
import logoImg from '../assets/images/logo.png.jpg'
import storyImg from '../assets/images/wijaya nandana hotel 02.jpg'
import { useCart } from '../context/useCart'
import { bakeryCategories, getBakeryProducts, getMeals, mealCategories } from '../services/adminService'

const imageBank = {
  breakfast: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=85',
  lunch: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=85',
  dinner: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
  rice: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=85',
  kottu: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=85',
  cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
  pastry: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85',
  baker: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
}

const fallbackMeals = [
  { mealName: 'String Hoppers', category: 'Breakfast', description: 'Soft idi appa with coconut sambol, dhal curry and kiri hodi.', price: 480, image: imageBank.breakfast, rating: 4.9, available: true },
  { mealName: 'Kiri Bath', category: 'Breakfast', description: 'Creamy milk rice with lunu miris, seeni sambol and hot tea.', price: 420, image: imageBank.rice, rating: 4.8, available: true },
  { mealName: 'Egg Roti', category: 'Breakfast', description: 'Layered roti folded with egg, onion, chilli and herbs.', price: 390, image: imageBank.kottu, rating: 4.7, available: true },
  { mealName: 'Fish Bun', category: 'Breakfast', description: 'Golden bakery bun filled with spiced tuna and curry leaves.', price: 260, image: imageBank.pastry, rating: 4.8, available: true },
  { mealName: 'Rice & Curry', category: 'Lunch', description: 'Steamed rice, chicken curry, dhal, mallung and papadam.', price: 890, image: imageBank.rice, rating: 4.9, available: true },
  { mealName: 'Chicken Kottu', category: 'Lunch', description: 'Chopped roti, roast chicken, vegetables and rich curry gravy.', price: 1180, image: imageBank.kottu, rating: 4.8, available: true },
  { mealName: 'Fried Rice', category: 'Lunch', description: 'Wok-tossed rice with egg, vegetables and house chilli paste.', price: 980, image: imageBank.lunch, rating: 4.7, available: true },
  { mealName: 'Nasi Goreng', category: 'Lunch', description: 'Spiced island-style nasi with fried egg, sambol and satay notes.', price: 1250, image: imageBank.lunch, rating: 4.9, available: true },
  { mealName: 'Cheese Kottu', category: 'Dinner', description: 'Late-night kottu folded with melted cheese and roast gravy.', price: 1390, image: imageBank.kottu, rating: 5, available: true },
  { mealName: 'Hopper Set', category: 'Dinner', description: 'Plain hoppers, egg hopper, seeni sambol and katta sambol.', price: 760, image: imageBank.breakfast, rating: 4.8, available: true },
  { mealName: 'BBQ Submarine', category: 'Dinner', description: 'Toasted bakery sub with smoky chicken and house sauce.', price: 1280, image: imageBank.dinner, rating: 4.7, available: true },
  { mealName: 'Seafood Fried Rice', category: 'Dinner', description: 'Prawns, calamari, vegetables and wok-charred rice.', price: 1580, image: imageBank.lunch, rating: 4.9, available: true },
]

const fallbackBakery = [
  { productName: 'Sandwich Bread', category: 'Breads', description: 'Soft premium loaf baked for breakfast and cafe sandwiches.', price: 520, image: breadImg, rating: 4.8, available: true },
  { productName: 'Garlic Bread', category: 'Breads', description: 'Toasted bakery bread with butter, garlic and herb aroma.', price: 620, image: imageBank.pastry, rating: 4.7, available: true },
  { productName: 'Brown Bread', category: 'Breads', description: 'Wholesome brown loaf with a soft crumb and nutty finish.', price: 580, image: breadImg, rating: 4.8, available: true },
  { productName: 'Fish Bun', category: 'Buns', description: 'Wijayanandana classic with spiced fish filling and soft dough.', price: 260, image: imageBank.pastry, rating: 4.9, available: true },
  { productName: 'Chicken Bun', category: 'Buns', description: 'Savory chicken filling wrapped in golden bakery dough.', price: 300, image: imageBank.pastry, rating: 4.8, available: true },
  { productName: 'Sausage Bun', category: 'Buns', description: 'Tea-time favorite with a tender bun and seasoned sausage.', price: 280, image: imageBank.pastry, rating: 4.7, available: true },
  { productName: 'Chocolate Cake', category: 'Cakes', description: 'Rich chocolate sponge, smooth cream and celebration finish.', price: 2450, image: imageBank.cake, rating: 4.9, available: true },
  { productName: 'Ribbon Cake', category: 'Cakes', description: 'Soft Sri Lankan celebration layers with vanilla butter cream.', price: 2250, image: imageBank.cake, rating: 4.9, available: true },
  { productName: 'Butter Cake', category: 'Cakes', description: 'Golden butter cake with a nostalgic bakery crumb.', price: 1850, image: imageBank.cake, rating: 4.8, available: true },
  { productName: 'Birthday Cake', category: 'Cakes', description: 'Custom celebration cake with premium icing and fresh sponge.', price: 3900, image: imageBank.cake, rating: 5, available: true },
  { productName: 'Chicken Pastry', category: 'Pastries', description: 'Flaky pastry with creamy chicken filling.', price: 340, image: imageBank.pastry, rating: 4.8, available: true },
  { productName: 'Vegetable Pastry', category: 'Pastries', description: 'Crisp pastry filled with lightly spiced vegetables.', price: 290, image: imageBank.pastry, rating: 4.7, available: true },
  { productName: 'Patties', category: 'Snacks', description: 'Crispy short eats with a warm Sri Lankan filling.', price: 210, image: imageBank.pastry, rating: 4.8, available: true },
  { productName: 'Rolls', category: 'Snacks', description: 'Golden crumbed rolls for tea, lunch boxes and parties.', price: 230, image: imageBank.pastry, rating: 4.8, available: true },
  { productName: 'Cutlets', category: 'Snacks', description: 'Spiced potato and fish bites fried golden and crisp.', price: 200, image: imageBank.pastry, rating: 4.7, available: true },
  { productName: 'Milk Tea', category: 'Beverages', description: 'Strong Ceylon tea with creamy milk and bakery warmth.', price: 180, image: imageBank.coffee, rating: 4.9, available: true },
  { productName: 'Iced Coffee', category: 'Beverages', description: 'Cold creamy coffee with a smooth bakery-cafe finish.', price: 390, image: imageBank.coffee, rating: 4.8, available: true },
  { productName: 'Fresh Juice', category: 'Beverages', description: 'Seasonal tropical fruit juice made fresh to order.', price: 420, image: imageBank.coffee, rating: 4.7, available: true },
]

const reviews = [
  ['Nethmi Perera', 'The bakery feels premium but still tastes like home. Their fish buns and ribbon cake are always fresh.'],
  ['Dilan Silva', 'Breakfast, lunch and dinner in one place. The ordering experience feels modern and very easy to scan.'],
  ['Sachini Fernando', 'The cakes look elegant, the kottu is comforting, and the brand finally feels as good online as it tastes.'],
]

const timeline = [
  ['1998', 'A family bakery counter begins with bread, buns and tea-time short eats.'],
  ['2008', 'Daily Sri Lankan meals join the bakery, serving breakfast, lunch and dinner.'],
  ['2018', 'Cake orders, party snacks and takeaway meals become a trusted local routine.'],
  ['2026', 'Wijayanandana grows into a premium digital bakery and restaurant platform.'],
]

const stats = [
  ['25+', 'Years Experience'],
  ['50k+', 'Happy Customers'],
  ['400+', 'Daily Orders'],
  ['03', 'Bakery Branches'],
]

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.19, 1, 0.22, 1] } },
}

export default function Home() {
  const [meals, setMeals] = useState([])
  const [bakeryProducts, setBakeryProducts] = useState([])
  const [mealQuery, setMealQuery] = useState('')
  const [bakeryQuery, setBakeryQuery] = useState('')
  const [activeMealCategory, setActiveMealCategory] = useState('All')
  const [activeBakeryCategory, setActiveBakeryCategory] = useState('All')

  useEffect(() => {
    getMeals()
      .then((items) => setMeals(items.filter((item) => item.available !== false)))
      .catch(() => setMeals([]))

    getBakeryProducts()
      .then((items) => setBakeryProducts(items.filter((item) => item.available !== false)))
      .catch(() => setBakeryProducts([]))
  }, [])

  const allMeals = meals.length ? meals : fallbackMeals
  const allBakery = bakeryProducts.length ? bakeryProducts : fallbackBakery

  const filteredMeals = useMemo(() => {
    return allMeals.filter((item) => {
      const matchesCategory = activeMealCategory === 'All' || item.category === activeMealCategory
      const haystack = `${item.mealName} ${item.description} ${item.category}`.toLowerCase()
      return matchesCategory && haystack.includes(mealQuery.toLowerCase())
    })
  }, [activeMealCategory, allMeals, mealQuery])

  const filteredBakery = useMemo(() => {
    return allBakery.filter((item) => {
      const matchesCategory = activeBakeryCategory === 'All' || item.category === activeBakeryCategory
      const haystack = `${item.productName} ${item.description} ${item.category}`.toLowerCase()
      return matchesCategory && haystack.includes(bakeryQuery.toLowerCase())
    })
  }, [activeBakeryCategory, allBakery, bakeryQuery])

  return (
    <main className="overflow-hidden bg-[#FFF7ED] font-sans text-[#1F2937]">
      <Hero />
      <PopularToday meals={allMeals} products={allBakery} />
      <MealsSection
        meals={filteredMeals}
        query={mealQuery}
        setQuery={setMealQuery}
        activeCategory={activeMealCategory}
        setActiveCategory={setActiveMealCategory}
      />
      <FreshBanner />
      <BakerySection
        products={filteredBakery}
        query={bakeryQuery}
        setQuery={setBakeryQuery}
        activeCategory={activeBakeryCategory}
        setActiveCategory={setActiveBakeryCategory}
      />
      <FeaturedBakeryProducts products={allBakery} />
      <DeliveryBanner />
      <HistorySection />
      <Reviews />
      <TeamSection />
      <ContactPanel />
    </main>
  )
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-4 pt-32 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(245,158,11,0.34),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(220,38,38,0.16),transparent_30%),linear-gradient(135deg,#FFF7ED_0%,#FFE7BF_48%,#FFF7ED_100%)]" />
      <motion.div animate={{ y: [0, -20, 0], scale: [1, 1.04, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[-9rem] top-24 h-[34rem] w-[34rem] rounded-full bg-[#F59E0B]/30 blur-3xl" />
      <motion.div animate={{ y: [0, 18, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-[-5rem] left-[-10rem] h-[32rem] w-[32rem] rounded-full bg-[#DC2626]/14 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-12 pb-20 lg:grid-cols-[1fr_0.95fr]">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/60 px-4 py-3 shadow-[0_24px_80px_rgba(217,119,6,0.18)] backdrop-blur-2xl">
            <span className="flex h-12 w-12 overflow-hidden rounded-full bg-white">
              <img src={logoImg} alt="Wijayanandana Bakers logo" className="h-full w-full object-contain p-1.5" />
            </span>
            <span>
              <span className="block text-xs font-extrabold uppercase tracking-[0.22em] text-[#D97706]">Wijayanandana Bakers</span>
              <span className="text-sm font-medium text-[#6B4A2A]">Premium bakery, meals and Sri Lankan hospitality</span>
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl font-display text-[clamp(3.15rem,7.6vw,7.6rem)] font-extrabold leading-[0.9] tracking-normal text-[#1F2937]">
            Fresh Sri Lankan Bakery & Meals Every Day
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#6B4A2A] sm:text-xl">
            Authentic breads, cakes, short eats and Sri Lankan meals made with family tradition,
            quality ingredients and a modern ordering experience.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ScrollButton target="#meals" primary>Order Now</ScrollButton>
            <ScrollButton target="#bakery">Explore Bakery</ScrollButton>
          </div>
        </motion.div>

        <div className="relative min-h-[560px]">
          <motion.div animate={{ y: [0, -18, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-x-4 top-4 overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_40px_110px_rgba(217,119,6,0.28)]">
            <img src={breadImg} alt="Fresh bakery bread" className="h-[455px] w-full rounded-[1.45rem] object-cover" />
          </motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-4 left-0 rounded-[1.6rem] border border-white/65 bg-white/78 p-5 shadow-[0_24px_70px_rgba(31,41,55,0.16)] backdrop-blur-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#DC2626]">Freshly baked</p>
            <p className="mt-2 text-2xl font-extrabold">Bread, buns & cakes</p>
            <p className="mt-1 text-sm text-[#6B4A2A]">Open daily from 6.00 AM</p>
          </motion.div>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-0 top-0 rounded-full bg-[#1F2937] px-5 py-4 text-sm font-extrabold text-white shadow-[0_0_42px_rgba(220,38,38,0.28)]">
            Bakery + Meals
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PopularToday({ meals, products }) {
  const items = [
    ...meals.slice(0, 3).map((item) => ({ name: item.mealName, price: item.price, image: item.image, label: item.category })),
    ...products.slice(0, 3).map((item) => ({ name: item.productName, price: item.price, image: item.image, label: item.category })),
  ]

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Popular today" title="Bakery classics and hot meals moving fast." text="A premium delivery-style shelf for the products customers reach for first." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.article key={`${item.name}-${index}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} whileHover={{ y: -8 }} className="group flex gap-4 rounded-[1.5rem] border border-white/80 bg-white/78 p-3 shadow-[0_18px_60px_rgba(217,119,6,0.12)] backdrop-blur-xl">
              <img src={item.image} alt={item.name} className="h-28 w-28 rounded-[1rem] object-cover transition duration-500 group-hover:scale-105" />
              <div className="min-w-0 py-2">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D97706]">{item.label}</p>
                <h3 className="mt-2 truncate text-xl font-extrabold">{item.name}</h3>
                <p className="mt-2 font-extrabold text-[#DC2626]">Rs {Number(item.price).toLocaleString()}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function MealsSection({ meals, query, setQuery, activeCategory, setActiveCategory }) {
  return (
    <section id="meals" className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0,rgba(245,158,11,0.22),transparent_58%)]" />
      <div className="relative mx-auto max-w-7xl">
        <SearchAndFilters
          label="Search meals"
          placeholder="Search kottu, rice, hoppers..."
          categories={mealCategories}
          query={query}
          setQuery={setQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        {mealCategories.map((category) => (
          <CatalogSection
            key={category}
            eyebrow="Meals section"
            title={category}
            text={`Premium ${category.toLowerCase()} plates prepared fresh for dine-in, takeaway and delivery.`}
            items={meals.filter((item) => item.category === category)}
            itemType="meal"
            dark={category === 'Dinner'}
          />
        ))}
      </div>
    </section>
  )
}

function BakerySection({ products, query, setQuery, activeCategory, setActiveCategory }) {
  return (
    <section id="bakery" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionTitle eyebrow="Bakery items" title="Premium breads, buns, cakes and tea-time favorites." text="A bakery-first catalog with fast category filters, rich imagery and elegant cards for everyday ordering." />
          <SearchAndFilters
            label="Search bakery"
            placeholder="Search bread, cake, pastry, tea..."
            categories={bakeryCategories}
            query={query}
            setQuery={setQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((item, index) => (
            <ProductCard key={item._id || item.productName} item={item} index={index} itemType="bakery" />
          ))}
        </div>
      </div>
    </section>
  )
}

function CatalogSection({ eyebrow, title, text, items, itemType, dark = false }) {
  return (
    <section className={`mt-16 rounded-[2rem] ${dark ? 'bg-[#111827] px-4 py-8 text-white shadow-[0_34px_110px_rgba(17,24,39,0.34)] sm:px-6' : ''}`}>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={`text-xs font-extrabold uppercase tracking-[0.24em] ${dark ? 'text-[#F59E0B]' : 'text-[#D97706]'}`}>{eyebrow}</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-normal sm:text-5xl">{title}</h2>
          <p className={`mt-3 max-w-2xl text-sm leading-6 ${dark ? 'text-white/68' : 'text-[#6B4A2A]'}`}>{text}</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <ProductCard key={`${title}-${item._id || item.mealName || item.productName}`} item={item} index={index} itemType={itemType} dark={dark} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ item, index, itemType, dark = false }) {
  const title = itemType === 'meal' ? item.mealName : item.productName
  const { addToCart } = useCart()
  const cartId = `${itemType}-${item._id || title}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.035, duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.015 }}
      className={`group overflow-hidden rounded-[1.5rem] border ${
        dark
          ? 'border-white/10 bg-white/8 shadow-[0_0_0_rgba(245,158,11,0)] hover:border-[#F59E0B]/70 hover:shadow-[0_0_44px_rgba(245,158,11,0.32)]'
          : 'border-white/80 bg-white shadow-[0_20px_60px_rgba(217,119,6,0.12)]'
      } transition`}
    >
      <div className="relative h-56 overflow-hidden">
        <img src={item.image || imageBank.pastry} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/84 text-[#DC2626] shadow-lg backdrop-blur" aria-label={`Favorite ${title}`}>
          <HeartIcon />
        </button>
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-extrabold ${item.available === false ? 'bg-[#DC2626] text-white' : 'bg-[#F59E0B] text-[#1F2937]'}`}>
          {item.available === false ? 'Sold out' : 'Available'}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-extrabold leading-6">{title}</h3>
          <span className="rounded-full bg-[#FFF7ED] px-3 py-1 text-sm font-extrabold text-[#D97706]">
            Rs {Number(item.price).toLocaleString()}
          </span>
        </div>
        <p className={`mt-3 min-h-12 text-sm leading-6 ${dark ? 'text-white/68' : 'text-[#6B4A2A]'}`}>{item.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-[#F59E0B]">
            Rating <span className={dark ? 'text-white/70' : 'text-[#6B4A2A]'}>{Number(item.rating || 4.8).toFixed(1)}</span>
          </span>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() =>
              addToCart({
                cartId,
                name: title,
                category: item.category,
                type: itemType === 'meal' ? 'Meal' : 'Bakery item',
                price: Number(item.price || 0),
                image: item.image || imageBank.pastry,
              })
            }
            className="rounded-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_14px_32px_rgba(217,119,6,0.28)]"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}

function FeaturedBakeryProducts({ products }) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Featured bakery products" title="Signature bakes with celebration-level finish." text="Bread for mornings, buns for tea, and cakes for the family table." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {products.filter((item) => ['Cakes', 'Breads', 'Buns'].includes(item.category)).slice(0, 3).map((item, index) => (
            <motion.article key={item.productName} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ y: -8 }} className="group relative min-h-[430px] overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(217,119,6,0.16)]">
              <img src={item.image} alt={item.productName} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/88 via-[#111827]/26 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-white/18 bg-white/14 p-5 text-white backdrop-blur-xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F59E0B]">{item.category}</p>
                <h3 className="mt-2 text-3xl font-extrabold">{item.productName}</h3>
                <p className="mt-2 text-sm leading-6 text-white/78">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FreshBanner() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#DC2626] via-[#D97706] to-[#F59E0B] text-white shadow-[0_30px_100px_rgba(217,119,6,0.26)] lg:grid-cols-[1fr_0.72fr]">
        <div className="p-8 sm:p-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-[#FFF7ED]">Freshly baked banner</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold sm:text-6xl">Warm bread and buns from the oven every morning.</h2>
          <p className="mt-4 max-w-xl text-white/82">Order bakery items, meals and celebration cakes from one premium Sri Lankan food platform.</p>
        </div>
        <img src={heroImg} alt="Freshly baked Wijayanandana display" className="h-full min-h-72 w-full object-cover opacity-85" />
      </motion.div>
    </section>
  )
}

function DeliveryBanner() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
        {[
          ['Fast delivery', 'Hot meals, fresh breads and cakes prepared for quick takeaway and delivery.'],
          ['Custom orders', 'Birthday cakes, party snacks, lunch packs and family dinner orders handled with care.'],
        ].map(([title, text], index) => (
          <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[2rem] border border-white/80 bg-white/76 p-8 shadow-[0_24px_80px_rgba(217,119,6,0.12)] backdrop-blur-xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#DC2626]">Delivery banner</p>
            <h3 className="mt-3 font-display text-4xl font-extrabold">{title}</h3>
            <p className="mt-4 leading-7 text-[#6B4A2A]">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function HistorySection() {
  return (
    <section id="history" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-[#111827] text-white shadow-[0_36px_120px_rgba(17,24,39,0.34)]">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[520px]">
            <img src={storyImg} alt="Wijayanandana Bakers history" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/86 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/16 bg-white/12 p-5 backdrop-blur-xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#F59E0B]">Established 1998</p>
              <p className="mt-2 text-3xl font-extrabold">Family tradition, baked daily.</p>
            </div>
          </div>
          <div className="bg-[#FFF7ED] p-7 text-[#1F2937] sm:p-10 lg:p-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#D97706]">Our history & bakery story</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-none">Our Proud History</h2>
            <p className="mt-6 text-lg leading-8 text-[#6B4A2A]">
              Wijayanandana Bakers began as a family bakery built on early mornings, honest
              ingredients and the familiar comfort of Sri Lankan taste. From soft bread and buns
              to celebration cakes, rice and curry, kottu and dinner favorites, the bakery has
              grown with the community while keeping quality at the center of every order.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {stats.map(([value, label]) => (
                <motion.div key={label} whileHover={{ y: -4 }} className="rounded-[1.3rem] border border-[#FED7AA] bg-white p-5 shadow-[0_18px_50px_rgba(217,119,6,0.1)]">
                  <p className="font-display text-4xl font-extrabold text-[#D97706]">{value}</p>
                  <p className="mt-1 text-sm font-bold text-[#6B4A2A]">{label}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              {timeline.map(([year, text], index) => (
                <motion.div key={year} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex gap-4 rounded-[1.2rem] bg-white/72 p-4">
                  <span className="flex h-12 w-16 shrink-0 items-center justify-center rounded-full bg-[#1F2937] text-sm font-extrabold text-white">{year}</span>
                  <p className="text-sm leading-6 text-[#6B4A2A]">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Customer reviews slider" title="Local love with a premium ordering feel." text="Animated review cards for the people who come back for cakes, short eats and daily meals." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map(([name, quote], index) => (
            <motion.figure key={name} animate={{ y: index === 1 ? [0, -10, 0] : [0, 8, 0] }} transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }} className="rounded-[1.5rem] border border-white/80 bg-white/72 p-6 shadow-[0_20px_70px_rgba(217,119,6,0.12)] backdrop-blur-xl">
              <div className="text-sm font-extrabold text-[#F59E0B]">Rating 5.0</div>
              <blockquote className="mt-5 text-lg font-bold leading-8">"{quote}"</blockquote>
              <figcaption className="mt-6 text-sm font-extrabold text-[#D97706]">{name}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-white p-6 shadow-[0_24px_80px_rgba(217,119,6,0.12)] lg:grid-cols-[0.8fr_1fr] lg:items-center">
        <img src={imageBank.baker} alt="Wijayanandana baker team" className="h-[420px] w-full rounded-[1.5rem] object-cover" />
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#D97706]">Chef and baker team</p>
          <h2 className="mt-4 font-display text-5xl font-extrabold leading-none">Bakers, cooks and cake makers behind the counter.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6B4A2A]">
            The team combines bakery discipline with Sri Lankan restaurant warmth: fresh dough,
            balanced curries, polished cakes and consistent service from morning to night.
          </p>
        </div>
      </div>
    </section>
  )
}

function ContactPanel() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#FED7AA] bg-[#FFF7ED] p-6 shadow-[0_24px_80px_rgba(217,119,6,0.12)]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#D97706]">Opening hours</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold">Fresh bakery and meals from 6.00 AM to 10.00 PM.</h2>
            <p className="mt-4 text-[#6B4A2A]">Anguruwella, Ruwanwella | Bakery, restaurant, dine-in, takeaway and event orders.</p>
          </div>
          <form onSubmit={(event) => event.preventDefault()} className="grid gap-3 sm:grid-cols-2">
            <input className={inputClass} placeholder="Name" />
            <input className={inputClass} placeholder="Phone" />
            <input className={`${inputClass} sm:col-span-2`} placeholder="Bread, cake, lunch order or dinner table" />
            <button className="rounded-full bg-[#DC2626] px-6 py-4 font-extrabold text-white shadow-[0_18px_44px_rgba(220,38,38,0.25)] sm:col-span-2">Send Request</button>
          </form>
        </div>
      </div>
    </section>
  )
}

function SearchAndFilters({ label, placeholder, categories, query, setQuery, activeCategory, setActiveCategory }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="rounded-[1.5rem] border border-white/80 bg-white/70 p-4 shadow-[0_24px_80px_rgba(217,119,6,0.12)] backdrop-blur-2xl">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="flex items-center rounded-[1.15rem] border border-[#FED7AA] bg-[#FFF7ED] px-4">
          <span className="sr-only">{label}</span>
          <SearchIcon />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} className="min-h-14 flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-[#9A6B42]" />
        </label>
        <div className="flex gap-2 overflow-x-auto">
          {['All', ...categories].map((category) => (
            <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-extrabold transition ${activeCategory === category ? 'bg-[#1F2937] text-white shadow-[0_14px_34px_rgba(31,41,55,0.22)]' : 'bg-white text-[#6B4A2A] hover:bg-[#F59E0B] hover:text-white'}`}>
              {category}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl">
      <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#D97706]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h2>
      <p className="mt-4 text-[#6B4A2A]">{text}</p>
    </motion.div>
  )
}

function ScrollButton({ target, primary = false, children }) {
  return (
    <motion.button whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })} className={`rounded-full px-8 py-4 text-sm font-extrabold uppercase tracking-[0.16em] shadow-lg transition ${primary ? 'bg-gradient-to-r from-[#DC2626] via-[#D97706] to-[#F59E0B] text-white shadow-[0_22px_50px_rgba(217,119,6,0.32)]' : 'border border-[#F59E0B]/50 bg-white/72 text-[#1F2937] backdrop-blur-xl'}`}>
      {children}
    </motion.button>
  )
}

function HeartIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.5 5.8c-1.7-1.8-4.4-1.8-6.1 0L12 8.2 9.6 5.8c-1.7-1.8-4.4-1.8-6.1 0-1.9 2-1.9 5.1 0 7.1l8.5 8.6 8.5-8.6c1.9-2 1.9-5.1 0-7.1Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="h-5 w-5 text-[#D97706]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const inputClass = 'min-h-14 rounded-[1rem] border border-[#FED7AA] bg-white px-4 text-sm font-semibold outline-none transition placeholder:text-[#9A6B42] focus:border-[#D97706]'
