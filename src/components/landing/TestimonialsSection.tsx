import { Card, CardContent } from '../ui/card';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    content:
      'Từ khi sử dụng AgriManage, việc quản lý thu chi và phân công công việc cho 20 nhân công trở nên dễ dàng hơn bao giờ hết. Năng suất trang trại tăng rõ rệt.',
    author: 'Nguyễn Văn Hải',
    role: 'Chủ trang trại rau sạch, Đà Lạt',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    content:
      'Tính năng theo dõi mùa vụ rất chi tiết. Tôi có thể biết chính xác lô đất nào cần bón phân, tưới nước vào lúc nào. Rất đáng để đầu tư.',
    author: 'Trần Thị Mai',
    role: 'Quản lý hợp tác xã nông nghiệp, Cần Thơ',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    content:
      'Báo cáo tài chính trực quan giúp tôi dễ dàng nắm bắt tình hình kinh doanh và đưa ra quyết định đầu tư chính xác cho vụ mùa tiếp theo.',
    author: 'Lê Hoàng Nam',
    role: 'Chủ trang trại trái cây, Tiền Giang',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-muted/30 overflow-hidden">
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
            Đánh giá
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mt-2 mb-4">
            Được tin dùng bởi hàng ngàn nông dân
          </h2>
          <p className="text-lg text-muted-foreground">
            Khám phá cách AgriManage giúp các trang trại trên toàn quốc tối ưu hóa hoạt động và tăng cường lợi nhuận.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={cardVariants} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="bg-background border-none shadow-md hover:shadow-xl transition-shadow h-full relative overflow-hidden">
                {/* Quote decoration */}
                <div className="absolute top-4 right-4 opacity-5">
                  <Quote className="h-16 w-16 text-primary" />
                </div>

                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + i * 0.08, duration: 0.3 }}
                      >
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 italic flex-1 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t">
                    <motion.img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}