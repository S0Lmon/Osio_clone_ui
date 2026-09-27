import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Leaf, AlertTriangle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const mockHealthData = [
  { name: 'Cây khỏe mạnh', value: 72, color: '#00FF88' },
  { name: 'Nghi nhiễm', value: 18, color: '#FFCC00' },
  { name: 'Rỉ sắt', value: 7, color: '#FF6B35' },
  { name: 'Đốm mắt cua', value: 3, color: '#FF3366' },
]

export default function HealthAnalyticsWidget() {
  const [data, setData] = useState(mockHealthData)
  const [hovered, setHovered] = useState(null)
  const [stats, setStats] = useState({
    totalArea: 45.2,
    scannedArea: 38.7,
    diseaseCount: 12,
    lastScan: '10:30'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(item => ({
        ...item,
        value: Math.max(0, Math.min(100, item.value + (Math.random() - 0.5) * 2))
      })))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const healthyPercent = ((data[0].value / total) * 100).toFixed(1)
  const diseasePercent = (((data[2].value + data[3].value) / total) * 100).toFixed(1)

  return (
    <div className="bg-forest-dark/80 backdrop-blur-sm rounded-xl p-4 border border-white/5 h-full">
      <h3 className="text-xs font-orbitron text-neon-green uppercase tracking-wider mb-4 flex items-center gap-2">
        <Leaf className="w-4 h-4" />
        Phân tích sức khỏe cây
      </h3>

      {/* Pie Chart */}
      <div className="relative h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={(_, index) => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="transparent"
                  style={{
                    filter: hovered === index ? `drop-shadow(0 0 8px ${entry.color})` : 'none',
                    transform: hovered === index ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center',
                    transition: 'transform 0.2s'
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#141F1A',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#E8F5E9' }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-orbitron text-neon-green">{healthyPercent}%</div>
            <div className="text-xs text-text-muted">Khỏe</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {data.map((item, idx) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
              hovered === idx ? 'bg-white/10' : 'bg-forest-black/30'
            }`}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-text-muted truncate">{item.name}</div>
              <div className="text-sm font-orbitron" style={{ color: item.color }}>
                {item.value.toFixed(1)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="space-y-2 border-t border-white/10 pt-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-text-muted">
            <CheckCircle className="w-3 h-3 text-neon-green" />
            Tổng diện tích
          </div>
          <span className="font-mono text-text-primary">{stats.totalArea} ha</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-text-muted">
            <Leaf className="w-3 h-3 text-tech-cyan" />
            Đã quét
          </div>
          <span className="font-mono text-tech-cyan">{stats.scannedArea} ha</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-text-muted">
            <AlertTriangle className="w-3 h-3 text-rust-orange" />
            Điểm bệnh
          </div>
          <span className="font-mono text-rust-orange">{stats.diseaseCount}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-white/5">
          <span>Quét lần cuối:</span>
          <span className="font-mono text-text-muted">{stats.lastScan}</span>
        </div>
      </div>
    </div>
  )
}