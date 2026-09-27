import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Newspaper, X, ExternalLink, Clock } from 'lucide-react'

const mockNews = [
  {
    id: 1,
    title: 'Bệnh rỉ sắt cà phê có nguy cơ bùng phát mùa mưa năm nay',
    source: 'Báo Nông Nghiệp',
    time: '2 giờ trước',
    thumbnail: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=100&h=60&fit=crop'
  },
  {
    id: 2,
    title: 'Giá cà phê Robusta tăng mạnh do nguồn cung khan hiếm',
    source: 'Vinanet',
    time: '4 giờ trước',
    thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100&h=60&fit=crop'
  },
  {
    id: 3,
    title: 'Bộ NN&PTNT triển khai chương trình hỗ trợ nông dân trồng cà phê',
    source: 'Cổng TTĐT Chính phủ',
    time: '6 giờ trước',
    thumbnail: 'https://images.unsplash.com/photo-1524350876685-274059332603?w=100&h=60&fit=crop'
  },
  {
    id: 4,
    title: 'Kỹ thuật bón phân hữu cơ cho cây cà phê giai đoạn ra hoa',
    source: 'Nông nghiệp Việt Nam',
    time: '8 giờ trước',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=60&fit=crop'
  },
  {
    id: 5,
    title: 'Thời tiết tháng 6: Miền Nam đón đợt mưa lớn, nông dân cần chú ý',
    source: 'Dự báo khí tượng',
    time: '10 giờ trước',
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=100&h=60&fit=crop'
  }
]

export default function NewsFeedWidget() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedNews, setSelectedNews] = useState(null)
  const [direction, setDirection] = useState(0)

  const nextNews = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % mockNews.length)
  }

  const prevNews = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + mockNews.length) % mockNews.length)
  }

  // Auto scroll
  React.useEffect(() => {
    const interval = setInterval(nextNews, 8000)
    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  return (
    <div className="bg-forest-dark/80 backdrop-blur-sm rounded-xl p-4 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-orbitron text-tech-cyan uppercase tracking-wider flex items-center gap-2">
          <Newspaper className="w-4 h-4" />
          Tin nông nghiệp
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={prevNews}
            className="w-6 h-6 rounded bg-forest-black/50 text-text-muted hover:text-neon-green flex items-center justify-center text-sm"
          >
            ‹
          </button>
          <span className="text-xs text-text-muted px-2">
            {currentIndex + 1}/{mockNews.length}
          </span>
          <button
            onClick={nextNews}
            className="w-6 h-6 rounded bg-forest-black/50 text-text-muted hover:text-neon-green flex items-center justify-center text-sm"
          >
            ›
          </button>
        </div>
      </div>

      {/* News Carousel */}
      <div className="relative h-24 overflow-hidden rounded-lg bg-forest-black/50">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-3 cursor-pointer"
            onClick={() => setSelectedNews(mockNews[currentIndex])}
          >
            <div className="flex gap-3 h-full">
              <div className="w-24 h-full rounded-lg overflow-hidden flex-shrink-0 bg-forest-dark">
                <img
                  src={mockNews[currentIndex].thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary line-clamp-2 mb-2">
                  {mockNews[currentIndex].title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span>{mockNews[currentIndex].source}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {mockNews[currentIndex].time}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1 mt-2">
        {mockNews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex
                ? 'bg-neon-green w-4'
                : 'bg-forest-dark hover:bg-text-muted'
            }`}
          />
        ))}
      </div>

      {/* News Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-forest-dark rounded-xl p-6 max-w-lg w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-orbitron text-text-primary flex-1 pr-4">
                  {selectedNews.title}
                </h3>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="text-text-muted hover:text-alert-red"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-forest-black">
                <img
                  src={selectedNews.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-text-muted">
                  <span className="text-tech-cyan">{selectedNews.source}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedNews.time}</span>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-green/20 text-neon-green hover:bg-neon-green/30 text-sm">
                  Đọc tiếp <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}