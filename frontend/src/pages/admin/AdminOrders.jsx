import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { getOrders, updateOrder } from '../../services/adminService'

const statuses = ['All', 'Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const loadOrders = () => {
    getOrders().then(setOrders).catch(() => setOrders([]))
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = [order.customerName, order.customerPhone, order.customerEmail]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesStatus = status === 'All' || order.status === status
      return matchesSearch && matchesStatus
    })
  }, [orders, search, status])

  const changeStatus = async (order, nextStatus) => {
    await updateOrder(order._id, { status: nextStatus })
    loadOrders()
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[34px] border border-white/70 bg-[#fffaf2]/92 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">Orders</p>
            <h1 className="mt-2 font-serif text-5xl text-[#3A221A]">Kitchen order flow</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search orders..."
              className="rounded-2xl border border-[#ead9bf] bg-white/64 px-4 py-3 text-sm outline-none focus:border-[#C89B3C]"
            />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="rounded-2xl border border-[#ead9bf] bg-white/64 px-4 py-3 text-sm outline-none focus:border-[#C89B3C]"
            >
              {statuses.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[34px] border border-white/70 bg-[#fffaf2]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-separate border-spacing-y-3 text-left">
            <thead className="text-xs uppercase tracking-[0.16em] text-[#9a7657]">
              <tr>
                <th className="px-4">Customer</th>
                <th className="px-4">Contact</th>
                <th className="px-4">Items</th>
                <th className="px-4">Total</th>
                <th className="px-4">Status</th>
                <th className="px-4">Update</th>
              </tr>
            </thead>
            <tbody>
              {(filtered.length ? filtered : sampleOrders).map((order, index) => (
                <motion.tr
                  key={order._id || order.customerName}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="bg-white/64 text-sm text-[#3A221A] shadow-sm"
                >
                  <td className="rounded-l-2xl px-4 py-4 font-semibold">{order.customerName}</td>
                  <td className="px-4 py-4 text-[#7b5c49]">{order.customerPhone || order.customerEmail || '-'}</td>
                  <td className="px-4 py-4 text-[#7b5c49]">{order.items?.map((item) => item.title).join(', ') || 'Bakery items'}</td>
                  <td className="px-4 py-4 font-semibold">Rs {Number(order.total || 0).toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(order.status)}`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td className="rounded-r-2xl px-4 py-4">
                    {order._id ? (
                      <select
                        value={order.status}
                        onChange={(event) => changeStatus(order, event.target.value)}
                        className="rounded-xl border border-[#ead9bf] bg-white px-3 py-2 text-xs outline-none"
                      >
                        {statuses.filter((item) => item !== 'All').map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs text-[#9a7657]">Sample</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function statusClass(status) {
  switch (status) {
    case 'Delivered':
      return 'bg-[#dff1cf] text-[#456f25]'
    case 'Ready':
      return 'bg-[#d8ecff] text-[#2b5a84]'
    case 'Preparing':
      return 'bg-[#fff1c2] text-[#8a6518]'
    case 'Cancelled':
      return 'bg-[#f4d2c6] text-[#8a3b26]'
    default:
      return 'bg-[#f4e2bf] text-[#7f4b1d]'
  }
}

const sampleOrders = [
  {
    customerName: 'Breakfast counter',
    customerPhone: 'Walk-in',
    items: [{ title: 'Roast paan, dhal, tea' }],
    total: 980,
    status: 'Preparing',
  },
  {
    customerName: 'Cake order',
    customerPhone: '+94 77 000 0000',
    items: [{ title: 'Ribbon cake' }],
    total: 4500,
    status: 'Pending',
  },
]
