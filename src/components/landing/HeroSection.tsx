import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const floatingCards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
        <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    label: 'Tăng năng suất',
    value: '+35%',
    delay: 0.5,
    floatDuration: 4,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: 'Nông dân tin dùng',
    value: '5,000+',
    delay: 0.7,
    floatDuration: 5,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    label: 'Tiết kiệm chi phí',
    value: '25%',
    delay: 0.9,
    floatDuration: 6,
  },
];

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
          alt="Cánh đồng lúa xanh mướt"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-emerald-300/10 blur-2xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white mb-6 gap-2"
            >
              <motion.span
                animate={{ rotate: [0, 15, -10, 0] }}
                transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
              >
                🌾
              </motion.span>
              Nền tảng quản lý nông nghiệp số 1 Việt Nam
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Quản lý trang trại{' '}
              <span className="text-emerald-400">thông minh</span>{' '}
              &amp; hiệu quả
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              Giải pháp toàn diện giúp nông dân tối ưu hóa năng suất, quản lý
              tài chính, theo dõi công việc và nâng cao hiệu quả kinh tế cho
              trang trại của bạn.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="h-12 px-8 min-w-[200px] text-base bg-emerald-600 hover:bg-emerald-700 text-white border-0"
              >
                <Link to="/register">
                  Bắt đầu miễn phí <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="
    relative h-12 px-8 min-w-[200px] text-base overflow-hidden
    border-2 border-[#5a7a2e]
    bg-[#3d5c1a]/20
    text-[#c8e88a]
    font-semibold tracking-wide
    transition-all duration-300 ease-out
    hover:border-[#8ab83a]
    hover:bg-[#4a7020]
    hover:text-white
    hover:shadow-[0_0_20px_rgba(90,122,46,0.6)]
    active:scale-95
    group
  "
              >
                <Link to="/login" className="flex items-center gap-2">
                  <motion.svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.path
                      d="M12 22V12M12 12C12 12 7 9 4 4c4 0 8 2 8 8zM12 12c0 0 5-3 8-8-4 0-8 2-8 8z"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        delay: 0.3 // Delay một chút đợi UI load xong mới mọc lên
                      }}
                    />
                  </motion.svg>
                  Đăng nhập
                </Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 text-sm text-white/70"
            >
              {['Không cần thẻ tín dụng', 'Hỗ trợ 24/7', 'Dùng thử 14 ngày'].map((text, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:flex flex-col gap-4 items-end"
          >
            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                className={`bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-2xl ${index === 1 ? 'w-64 mr-8' : 'w-72'}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, index % 2 === 0 ? -8 : 8, 0],
                }}
                transition={{
                  opacity: { delay: card.delay, duration: 0.6 },
                  x: { delay: card.delay, duration: 0.6 },
                  y: { duration: card.floatDuration, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 },
                }}
                whileHover={{ scale: 1.04 }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500/20 p-3 rounded-xl">{card.icon}</div>
                  <div>
                    <p className="text-sm text-white/60">{card.label}</p>
                    <p className="text-2xl font-bold text-white">{card.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span>Cuộn xuống để khám phá</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}