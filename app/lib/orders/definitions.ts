import { z } from 'zod';

export const OrderItemSchema = z.object({
  product_name: z.string().min(1, 'Vui lòng nhập tên sản phẩm'),
  quantity: z.coerce.number().min(1, 'Số lượng tối thiểu là 1'),
  price: z.coerce.number().min(0, 'Giá không được âm'),
});

export const OrderSchema = z.object({
  customer_id: z.string().min(1, 'Vui lòng chọn khách hàng'),
  status: z.enum(['pending', 'paid', 'cancelled']).default('pending'),
  items: z.array(OrderItemSchema).min(1, 'Đơn hàng phải có ít nhất 1 sản phẩm'),
});

export type Order = z.infer<typeof OrderSchema>;
export type OrderFormValues = z.input<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
