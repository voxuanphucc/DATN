import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 5000, suffix: '+', label: 'Trang trại đang sử dụng', emoji: '🌾' },
  { value: 10000, suffix: '+', label: 'Người dùng tích cực', emoji: '👨‍🌾' },
  { value: 30, suffix: '%', label: 'Tăng trưởng năng suất TB', emoji: '📈' },
  { value: 99.9, suffix: '%', label: 'Thời gian hoạt động', emoji: '⚡' },
];

function CountUp({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(target % 1 !== 0 ? 1 : 0)));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  const formatted = target >= 1000
    ? (count >= 1000 ? `${Math.floor(count / 1000)},${String(Math.floor(count % 1000)).padStart(3, '0')}` : String(Math.floor(count)))
    : String(count);

  return <span ref={ref}>{formatted}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2000&auto=format&fit=crop"
          alt="Ruộng bậc thang"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-900/85" />

        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald-400/30"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-3">
            Con số ấn tượng
          </h2>
          <p className="text-emerald-200/80 text-lg">
            Được tin dùng bởi hàng ngàn nông dân trên toàn quốc
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex flex-col gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-default"
            >
              <motion.span
                className="text-3xl mb-1"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ delay: index * 0.3 + 1, duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
              >
                {stat.emoji}
              </motion.span>
              <div className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-emerald-200/80 font-medium text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}