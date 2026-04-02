import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Agriculture background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2000&auto=format&fit=crop"
          alt="Cánh đồng lúa hoàng hôn"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6
          }}
          className="max-w-3xl mx-auto">

          <span className="text-4xl mb-4 block">🌱</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Sẵn sàng nâng tầm trang trại của bạn?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Tham gia cùng hàng ngàn nông dân khác đang sử dụng AgriManage để
            quản lý trang trại hiệu quả hơn. Đăng ký ngay hôm nay để nhận 14
            ngày dùng thử miễn phí.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="h-14 px-10 min-w-[220px] text-base bg-emerald-600 hover:bg-emerald-700 text-white border-0 rounded-full shadow-lg shadow-emerald-900/30">

              <Link to="/register">
                Đăng ký miễn phí <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="
    relative h-14 px-10 min-w-[220px] text-base overflow-hidden rounded-full
    border-2 border-[#5a7a2e] 
    bg-[#3d5c1a]/20
    text-[#c8e88a]
    font-semibold tracking-wide
    transition-all duration-300 ease-out
    hover:border-[#8ab83a]
    hover:bg-[#4a7020]
    hover:text-white
    hover:shadow-[0_0_20px_rgba(90,122,46,0.6)]
    hover:scale-105
    active:scale-95
    group
  "
            >
              <Link to="/login" className="flex items-center gap-2">
                {/* Icon lá cây / nông trại */}
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22V12M12 12C12 12 7 9 4 4c4 0 8 2 8 8zM12 12c0 0 5-3 8-8-4 0-8 2-8 8z" />
                </svg>
                Đăng nhập
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>);

}