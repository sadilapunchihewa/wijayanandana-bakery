import { motion } from 'framer-motion'
import logoImg from '../../assets/images/logo.png.jpg'

const links = [
  ['Home', '#hero'],
  ['Meals', '#meals'],
  ['Bakery', '#bakery'],
  ['Our History', '#history'],
  ['Contact', '#contact'],
]

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#1A0D08] text-[#fff8ed]">
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#C89B3C]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#fff2d0]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <div className="flex items-center gap-5">
              <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
                <img src={logoImg} alt="Wijayanandana logo" className="h-full w-full object-contain p-3" />
              </span>
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#E8C56A]">
                  Wijayanandana
                </p>
                <h2 className="mt-2 font-display text-5xl font-extrabold leading-none">Bakers &amp; Restaurant</h2>
              </div>
            </div>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#ead9c1]/76">
              Sri Lankan breakfast, lunch, dinner, short eats, tea, and fresh bakery items served
              with warm Anguruwella, Ruwanwella hospitality.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
            className="rounded-[34px] border border-white/12 bg-white/8 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl"
          >
            <p className="font-display text-3xl font-extrabold">Join the tasting journal.</p>
            <p className="mt-3 text-sm leading-6 text-[#ead9c1]/70">
              Seasonal cake collections, festive menus, and private dining notes.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Email address"
                className="min-h-12 flex-1 rounded-full border border-white/12 bg-[#100805]/70 px-5 text-sm text-[#fff8ed] placeholder:text-[#bca58d] outline-none transition focus:border-[#C89B3C]"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-[#E8C56A] via-[#C89B3C] to-[#956428] px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#24130b] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Subscribe
              </button>
            </div>
          </motion.form>
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-[#E8C56A]">Visit</p>
            <p className="mt-4 text-sm leading-7 text-[#ead9c1]/76">
              Anguruwella,
              <br />
              Ruwanwella, Sri Lanka
            </p>
          </div>
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-[#E8C56A]">Hours</p>
            <p className="mt-4 text-sm leading-7 text-[#ead9c1]/76">
              Bakery 6.00 AM - 10.00 PM
              <br />
              Meals 6.00 AM - 10.00 PM
            </p>
          </div>
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-[#E8C56A]">Explore</p>
            <div className="mt-4 grid gap-2 text-sm text-[#ead9c1]/76">
              {links.map(([label, href]) => (
                <a key={label} href={href} className="transition hover:text-[#E8C56A]">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-[#E8C56A]">Social</p>
            <div className="mt-4 flex gap-3">
              {['Fb', 'Ig', 'Wa'].map((item) => (
                <a
                  key={item}
                  href={item === 'Wa' ? 'https://wa.me/94771234567' : '#hero'}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-xs font-bold uppercase tracking-[0.12em] text-[#fff8ed] transition hover:border-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#1A0D08] hover:shadow-[0_0_28px_rgba(200,155,60,0.42)]"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-[#ead9c1]/46">
          Copyright {new Date().getFullYear()} Wijayanandana Hotel & Bakers. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
