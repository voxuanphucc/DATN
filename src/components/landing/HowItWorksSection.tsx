import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Đăng ký tài khoản',
    description: 'Tạo tài khoản miễn phí và thiết lập thông tin cơ bản về trang trại của bạn.',
    emoji: '📝',
  },
  {
    number: '02',
    title: 'Thêm dữ liệu',
    description: 'Nhập thông tin về khu vực canh tác, cây trồng, vật nuôi và nhân sự.',
    emoji: '📊',
  },
  {
    number: '03',
    title: 'Lên kế hoạch',
    description: 'Tạo lịch trình công việc, phân công nhiệm vụ và dự trù chi phí.',
    emoji: '📅',
  },
  {
    number: '04',
    title: 'Theo dõi & Tối ưu',
    description: 'Theo dõi tiến độ hàng ngày và xem báo cáo để tối ưu hóa hiệu quả.',
    emoji: '🚀',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={titleVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-primary uppercase tracking-wider"
          >
            Quy trình
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mt-3 mb-4">
            Bắt đầu dễ dàng trong 4 bước
          </h2>
          <p className="text-lg text-muted-foreground">
            Quy trình thiết lập đơn giản giúp bạn nhanh chóng số hóa hoạt động quản lý trang trại.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div key={index} className="relative" variants={itemVariants}>
              {/* Connector line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-gradient-to-r from-primary/40 to-primary/10"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center text-center group">
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 shadow-lg shadow-primary/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {step.number}
                </motion.div>

                <span className="text-3xl mb-3">{step.emoji}</span>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}