import React, { useState, useEffect } from 'react'
import { Battery, Gauge, TrendingUp, HardDrive, Wifi, WifiOff, Radio } from 'lucide-react'
import { motion } from 'framer-motion'

const mockDroneStatus = {
  battery: 78,
  speed: 12.5,
  altitude: 25.0,
  storage: { used: 12.4, total: 64 },
  signal: 92,
  status: 'SCANNING',
  mode: 'AUTONOMOUS',
  satellite: 14,
  flightTime: '02:34:15'
}

export default function DroneStatusWidget() {
  const [status, setStatus] = useState(mockDroneStatus)
  const [connected, setConnected] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        altitude: 25 + Math.sin(Date.now() / 2000) * 2,
        speed: 12 + Math.random() * 2,
        signal: Math.max(80, prev.signal + (Math.random() - 0.5) * 5)
      }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const getBatteryColor = (level) => {
    if (level > 50) return 'text-neon-green'
    if (level > 20) return 'text-rust-orange'
    return 'text-alert-red'
  }

  const getSignalBars = (signal) => {
    if (signal >= 80) return 4
    if (signal >= 60) return 3
    if (signal >= 40) return 2
    return 1
  }

  return (
    <div className="bg-forest-dark/80 backdrop-blur-sm rounded-xl p-4 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-orbitron text-tech-cyan uppercase tracking-wider flex items-center gap-2">
          <Radio className="w-4 h-4" />
          Drone Status
        </h3>
        <div className={`flex items-center gap-2 px-2 py-1 rounded-full ${
          connected ? 'bg-neon-green/20' : 'bg-alert-red/20'
        }`}>
          {connected ? (
            <Wifi className="w-3 h-3 text-neon-green" />
          ) : (
            <WifiOff className="w-3 h-3 text-alert-red" />
          )}
          <span className={`text-xs font-mono ${connected ? 'text-neon-green' : 'text-alert-red'}`}>
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-center mb-4">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="px-4 py-2 rounded-full bg-rust-orange/20 border border-rust-orange/50"
        >
          <span className="text-sm font-orbitron text-rust-orange">{status.status}</span>
        </motion.div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Battery */}
        <div className="col-span-2 p-3 bg-forest-black/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Battery className={`w-5 h-5 ${getBatteryColor(status.battery)}`} />
              <span className="text-xs text-text-muted">PIN</span>
            </div>
            <span className={`text-lg font-orbitron ${getBatteryColor(status.battery)}`}>
              {status.battery}%
            </span>
          </div>
          <div className="h-2 bg-forest-dark rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${status.battery > 50 ? 'bg-neon-green' : status.battery > 20 ? 'bg-rust-orange' : 'bg-alert-red'}`}
              initial={{ width: 0 }}
              animate={{ width: `${status.battery}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Speed */}
        <div className="p-3 bg-forest-black/50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="w-4 h-4 text-tech-cyan" />
            <span className="text-xs text-text-muted">Tốc độ</span>
          </div>
          <div className="text-lg font-orbitron text-tech-cyan">
            {status.speed.toFixed(1)} <span className="text-xs">m/s</span>
          </div>
        </div>

        {/* Altitude - using TrendingUp as substitute */}
        <div className="p-3 bg-forest-black/50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-neon-green" />
            <span className="text-xs text-text-muted">Độ cao</span>
          </div>
          <div className="text-lg font-orbitron text-neon-green">
            {status.altitude.toFixed(1)} <span className="text-xs">m</span>
          </div>
        </div>

        {/* Storage */}
        <div className="col-span-2 p-3 bg-forest-black/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-rust-orange" />
              <span className="text-xs text-text-muted">BỘ NHỚ</span>
            </div>
            <span className="text-sm font-mono text-text-primary">
              {status.storage.used.toFixed(1)} / {status.storage.total} GB
            </span>
          </div>
          <div className="h-1.5 bg-forest-dark rounded-full overflow-hidden">
            <div
              className="h-full bg-rust-orange"
              style={{ width: `${(status.storage.used / status.storage.total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Signal & Satellite */}
      <div className="flex items-center justify-between p-3 bg-forest-black/30 rounded-lg mb-3">
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-neon-green" />
          <span className="text-xs text-text-muted">Signal</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full ${
                i < getSignalBars(status.signal)
                  ? 'bg-neon-green'
                  : 'bg-forest-dark'
              }`}
              style={{ height: 8 + i * 4 }}
            />
          ))}
          <span className="ml-2 text-sm font-mono text-neon-green">{status.signal.toFixed(0)}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="text-text-muted">
          <span>Satellite: </span>
          <span className="font-mono text-tech-cyan">{status.satellite}</span>
        </div>
        <div className="text-text-muted">
          <span>Flight Time: </span>
          <span className="font-mono text-text-primary">{status.flightTime}</span>
        </div>
      </div>
    </div>
  )
}