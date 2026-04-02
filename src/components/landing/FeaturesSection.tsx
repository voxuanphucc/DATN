import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tractor, Sprout, LineChart, Users, CloudSun, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Quản lý mùa vụ',
    description: 'Theo dõi tiến độ gieo trồng, chăm sóc và thu hoạch chi tiết cho từng khu vực canh tác.',
    icon: Sprout,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    title: 'Quản lý tài chính',
    description: 'Kiểm soát thu chi, báo cáo lợi nhuận và dự báo dòng tiền chính xác cho trang trại.',
    icon: Wallet,
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    title: 'Phân công công việc',
    description: 'Giao việc cho nhân viên, theo dõi tiến độ và đánh giá hiệu suất làm việc dễ dàng.',
    icon: Users,
    color: 'text-violet-600',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
  },
  {
    title: 'Quản lý vật tư',
    description: 'Theo dõi tồn kho phân bón, thuốc bảo vệ thực vật và thiết bị nông nghiệp.',
    icon: Tractor,
    color: 'text-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    title: 'Báo cáo & Phân tích',
    description: 'Biểu đồ trực quan về năng suất, chi phí và doanh thu giúp ra quyết định tốt hơn.',
    icon: LineChart,
    color: 'text-rose-600',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
  },
  {
    title: 'Thời tiết & Cảnh báo',
    description: 'Cập nhật dự báo thời tiết và nhận cảnh báo sớm về dịch bệnh, thiên tai.',
    icon: CloudSun,
    color: 'text-sky-600',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider bg-primary/10 px-4 py-1.5 rounded-full mb-4"
          >
            Tính năng nổi bật
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mt-2 mb-4">
            Tính năng toàn diện cho trang trại của bạn
          </h2>
          <p className="text-lg text-muted-foreground">
            AgriManage cung cấp đầy đủ các công cụ cần thiết để bạn quản lý mọi
            hoạt động của trang trại từ một nền tảng duy nhất.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-background group hover:-translate-y-2 h-full cursor-default">
                <CardHeader>
                  <motion.div
                    className={`h-12 w-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 transition-transform duration-300`}
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </motion.div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}