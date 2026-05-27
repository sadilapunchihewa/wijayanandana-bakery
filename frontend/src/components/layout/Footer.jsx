export default function Footer() {
  return (
    <footer
      id="contact"
      className="mt-24 border-t border-[#e2d2b8]/70 bg-[#21140e]/98 text-[#f5e9dd]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:justify-between">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-[#e2c79a]">
            Wijayanandana Hotel &amp; Bakery
          </p>
          <p className="mt-3 max-w-xs text-sm text-[#f3dfc0]/90">
            Freshly baked breads, indulgent cakes, and curated hotel dishes crafted every dawn in
            our stone ovens.
          </p>
          <p className="mt-4 text-[0.75rem] text-[#f1dec4]/60">
            © {new Date().getFullYear()} Wijayanandana. All rights reserved.
          </p>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-8 text-[0.78rem] md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#e2c79a]">
              Visit
            </p>
            <p className="mt-3 text-[#f3dfc0]/85">
              Main Street,
              <br />
              Matara, Sri Lanka
            </p>
            <p className="mt-3 text-[#f3dfc0]/70">Open daily · 6.00 AM – 10.00 PM</p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#e2c79a]">
              Contact
            </p>
            <p className="mt-3 text-[#f3dfc0]/85">
              Phone:{' '}
              <a href="tel:+94771234567" className="hover:text-[#f8e1b3]">
                +94 77 123 4567
              </a>
            </p>
            <p className="mt-2 text-[#f3dfc0]/85">
              WhatsApp:{' '}
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#f8e1b3]"
              >
                +94 77 123 4567
              </a>
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#e2c79a]">
              Newsletter
            </p>
            <p className="mt-3 max-w-xs text-[#f3dfc0]/80">
              Be the first to taste new collections and seasonal menus.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 flex max-w-xs items-center overflow-hidden rounded-full border border-[#3d2515] bg-[#120b07]/80"
            >
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent px-3 py-2 text-[0.75rem] text-[#f5e9dd] placeholder:text-[#c1a488]/60 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-[#120b07] bg-gradient-to-r from-[#e0c067] to-[#b48a2c]"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

