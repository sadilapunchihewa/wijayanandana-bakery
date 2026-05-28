import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { getOrders, getProducts } from '../../services/adminService'
import { Icon } from './AdminIcons'

const sampleSales = [38, 52, 45, 74, 68, 91, 84]

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getProducts().catch(() => []), getOrders().catch(() => [])])
      .then(([productData, orderData]) => {
        setProducts(productData)
        setOrders(orderData)
      })
      .finally(() => setLoading(false))
  }, [])

  const revenue = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    [orders],
  )

  const customers = useMemo(
    () => new Set(orders.map((order) => order.customerPhone || order.customerEmail || order.customerName)).size,
    [orders],
  )

  const cards = [
    { label: 'Total Products', value: products.length, icon: 'box', note: 'Live menu items' },
    { label: 'Total Orders', value: orders.length, icon: 'orders', note: 'Kitchen workflow' },
    { label: 'Customers', value: customers, icon: 'users', note: 'Unique buyers' },
    { label: 'Revenue', value: `Rs ${revenue.toLocaleString()}`, icon: 'dashboard', note: 'Recorded orders' },
  ]

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <motion.article
            key={card.label}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="rounded-[30px] border border-white/70 bg-[#fffaf2]/92 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.14)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7657]">{card.label}</p>
                <p className="mt-3 font-serif text-4xl text-[#3A221A]">{loading ? '...' : card.value}</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C89B3C] to-[#7f4b1d] text-[#211008] shadow-[0_16px_34px_rgba(200,155,60,0.24)]">
                <Icon name={card.icon} />
              </span>
            </div>
            <p className="mt-5 text-sm text-[#7b5c49]">{card.note}</p>
          </motion.article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[34px] border border-white/70 bg-[#fffaf2]/92 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.14)]"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">Sales pulse</p>
              <h2 className="mt-2 font-serif text-4xl text-[#3A221A]">Weekly revenue rhythm</h2>
            </div>
            <p className="text-sm text-[#7b5c49]">Custom analytics preview</p>
          </div>
          <div className="mt-8 flex h-72 items-end gap-3 rounded-[28px] bg-gradient-to-b from-[#f4e6d3] to-[#fffaf2] p-5">
            {sampleSales.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-3">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ delay: index * 0.08, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  className="w-full rounded-t-2xl bg-gradient-to-t from-[#7f4b1d] via-[#C89B3C] to-[#f1d477] shadow-[0_12px_28px_rgba(200,155,60,0.24)]"
                />
                <span className="text-[0.7rem] font-semibold text-[#8a6a4c]">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-[34px] border border-white/10 bg-[#24120d]/92 p-6 text-[#fff8ed] shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C56A]">Today focus</p>
          <h2 className="mt-3 font-serif text-4xl">Kitchen command</h2>
          <div className="mt-8 space-y-4">
            {['Bake counter refill', 'Lunch rice & curry packs', 'Cake order confirmations'].map((task, index) => (
              <motion.div
                key={task}
                whileHover={{ x: 6 }}
                className="rounded-2xl border border-white/10 bg-white/7 p-4"
              >
                <p className="text-sm text-[#fff8ed]">{task}</p>
                <p className="mt-1 text-xs text-[#dcc9b6]">{index + 2} actions pending</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <RecentOrders orders={orders} />
    </div>
  )
}

function RecentOrders({ orders }) {
  const rows = orders.slice(0, 6)

  return (
    <section className="rounded-[34px] border border-white/70 bg-[#fffaf2]/92 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">Recent orders</p>
          <h2 className="mt-2 font-serif text-4xl text-[#3A221A]">Latest kitchen tickets</h2>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-y-3 text-left">
          <thead className="text-xs uppercase tracking-[0.16em] text-[#9a7657]">
            <tr>
              <th className="px-4">Customer</th>
              <th className="px-4">Items</th>
              <th className="px-4">Status</th>
              <th className="px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {(rows.length ? rows : sampleRows).map((order) => (
              <tr key={order._id || order.customerName} className="rounded-2xl bg-white/64 text-sm text-[#3A221A] shadow-sm">
                <td className="rounded-l-2xl px-4 py-4 font-semibold">{order.customerName}</td>
                <td className="px-4 py-4 text-[#7b5c49]">{order.items?.length || order.itemsText || 1} items</td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-[#f4e2bf] px-3 py-1 text-xs font-semibold text-[#7f4b1d]">
                    {order.status || 'Pending'}
                  </span>
                </td>
                <td className="rounded-r-2xl px-4 py-4 font-semibold">Rs {Number(order.total || 0).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

const sampleRows = [
  { customerName: 'Walk-in customer', itemsText: 3, status: 'Preparing', total: 2450 },
  { customerName: 'Wedding cake order', itemsText: 1, status: 'Pending', total: 12500 },
]
