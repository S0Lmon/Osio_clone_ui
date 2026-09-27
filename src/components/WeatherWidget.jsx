import React, { useState, useEffect } from 'react'
import { Cloud, Sun, Wind, Droplets, Thermometer, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const mockWeather = {
  temp: 28,
  humidity: 75,
  windSpeed: 12,
  uv: 6,
  condition: 'partly_cloudy',
  forecast: [
    { day: 'T2', icon: '☀️', high: 30, low: 24 },
    { day: 'T3', icon: '⛅', high: 29, low: 23 },
    { day: 'T4', icon: '🌧️', high: 26, low: 22 },
    { day: 'T5', icon: '⛅', high: 28, low: 23 },
    { day: 'T6', icon: '☀️', high: 31, low: 25 },
    { day: 'T7', icon: '☀️', high: 32, low: 26 },
    { day: 'CN', icon: '⛅', high: 30, low: 24 },
  ]
}

export default function WeatherWidget() {
  const [showForecast, setShowForecast] = useState(false)
  const [weather, setWeather] = useState(mockWeather)

  // Simulate real-time weather update
  useEffect(() => {
    const interval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temp: prev.temp + (Math.random() - 0.5),
        windSpeed: prev.windSpeed + (Math.random() - 0.5) * 2
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-400" />
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-400" />
      case 'partly_cloudy': return <Cloud className="w-8 h-8 text-gray-300" />
      default: return <Sun className="w-8 h-8 text-yellow-400" />
    }
  }

  const getUVLevel = (uv) => {
    if (uv <= 2) return { level: 'Thấp', color: 'text-green-400' }
    if (uv <= 5) return { level: 'Trung bình', color: 'text-yellow-400' }
    if (uv <= 7) return { level: 'Cao', color: 'text-orange-400' }
    return { level: 'Rất cao', color: 'text-red-400' }
  }

  return (
    <div className="bg-forest-dark/80 backdrop-blur-sm rounded-xl p-4 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-orbitron text-tech-cyan uppercase tracking-wider flex items-center gap-2">
          <Cloud className="w-4 h-4" />
          Thời tiết
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForecast(!showForecast)}
          className="text-xs text-text-muted hover:text-neon-green flex items-center gap-1"
        >
          <Calendar className="w-3 h-3" />
          7 ngày
        </motion.button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
          {getWeatherIcon(weather.condition)}
        </div>
        <div>
          <div className="text-3xl font-orbitron text-text-primary">
            {weather.temp.toFixed(1)}°
          </div>
          <div className="text-xs text-text-muted">Buôn Ma Thuột</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 p-2 bg-forest-black/50 rounded-lg">
          <Droplets className="w-4 h-4 text-blue-400" />
          <div>
            <div className="text-xs text-text-muted">Độ ẩm</div>
            <div className="text-sm font-mono text-text-primary">{weather.humidity}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-forest-black/50 rounded-lg">
          <Wind className="w-4 h-4 text-teal-400" />
          <div>
            <div className="text-xs text-text-muted">Gió</div>
            <div className="text-sm font-mono text-text-primary">{weather.windSpeed.toFixed(1)} km/h</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-forest-black/50 rounded-lg col-span-2">
          <Thermometer className="w-4 h-4 text-orange-400" />
          <div className="flex-1">
            <div className="text-xs text-text-muted">Chỉ số UV</div>
          </div>
          <div className={`text-sm font-mono ${getUVLevel(weather.uv).color}`}>
            {weather.uv} - {getUVLevel(weather.uv).level}
          </div>
        </div>
      </div>

      {/* 7-day forecast */}
      {showForecast && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-white/10 pt-3 mt-3"
        >
          <div className="flex justify-between gap-1">
            {weather.forecast.map((day, idx) => (
              <div key={idx} className="text-center flex-1">
                <div className="text-xs text-text-muted mb-1">{day.day}</div>
                <div className="text-lg mb-1">{day.icon}</div>
                <div className="text-xs font-mono">
                  <span className="text-rust-orange">{day.high}°</span>
                  <span className="text-text-muted">/{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}