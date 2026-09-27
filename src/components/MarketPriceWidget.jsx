import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const mockPrices = [
  {
    id: 1,
    name: 'Cà phê Robusta',
    unit: 'kg',
    price: 42000,
    change: 2.3,
    history: [38, 39, 41, 40, 42, 41, 42]
  },
  {
    id: 2,
    name: 'Cà phê Arabica',
    unit: 'kg',
    price: 68000,
    change: -1.2,
    history: [70, 71, 69, 68, 67, 68, 68]
  },
  {
    id: 3,
    name: 'Hạt tiêu đen',
    unit: 'kg',
    price: 95000,
    change: 0.8,
    history: [92, 93, 94, 93, 95, 94, 95]
  },
  {
    id: 4,
    name: 'Cao su SVR3',
    unit: 'kg',
    price: 28500,
    change: -0.5,
    history: [29, 28.5, 29, 28, 29, 28.5, 28.5]
  }
]

function Sparkline({ data, positive }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((val - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox="0 0 100 40" className="w-20 h-6">
      <polyline
        fill="none"
        stroke={positive ? '#00FF88' : '#FF3366'}
        strokeWidth="2"
        points={points}
      />
    </svg>
  )
}

export default function MarketPriceWidget() {
  const [prices, setPrices] = useState(mockPrices)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(item => ({
        ...item,
        price: item.price * (1 + (Math.random() - 0.5) * 0.02),
        change: item.change + (Math.random() - 0.5) * 0.5
      })))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-forest-dark/80 backdrop-blur-sm rounded-xl p-4 border border-white/5">
      <h3 className="text-xs font-orbitron text-rust-orange uppercase tracking-wider mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        Giá thị trường
      </h3>

      <div className="space-y-3">
        {prices.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelected(item.id === selected ? null : item.id)}
            className={`p-3 rounded-lg cursor-pointer transition-all ${
              selected === item.id
                ? 'bg-neon-green/10 border border-neon-green/30'
                : 'bg-forest-black/50 border border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-medium text-text-primary">{item.name}</div>
                <div className="text-xs text-text-muted">{item.unit}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-orbitron text-text-primary">
                  {item.price.toLocaleString('vi-VN')} ₫
                </div>
                <div className={`text-xs font-mono flex items-center justify-end gap-1 ${
                  item.change >= 0 ? 'text-neon-green' : 'text-alert-red'
                }`}>
                  {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sparkline data={item.history} positive={item.change >= 0} />
              <span className="text-xs text-text-muted">7 ngày</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2 px-3 bg-forest-black/50 rounded-lg border border-white/10 text-xs text-text-muted hover:text-tech-cyan flex items-center justify-center gap-2"
      >
        Xem chi tiết <ArrowRight className="w-3 h-3" />
      </motion.button>
    </div>
  )
}