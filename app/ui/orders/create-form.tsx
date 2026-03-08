'use client';

import { useState, useEffect } from 'react';
import { CustomerField } from '@/app/lib/definitions';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderSchema, Order } from '@/app/lib/orders/definitions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Trash2, 
  Plus, 
  Save, 
  X, 
  Package, 
  User, 
  FileText, 
  CheckCircle2, 
  Clock,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function CreateOrderForm({ customers }: { customers: CustomerField[] }) {
  const [mounted, setMounted] = useState(false);

  // Fix Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<Order>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      customer_id: '',
      status: 'pending',
      items: [{ product_name: '', quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const totalAmount = form.watch('items')?.reduce((acc, item) => {
    return acc + (Number(item.quantity) || 0) * (Number(item.price) || 0);
  }, 0) || 0;

  async function onSubmit(values: Order) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        alert('Tạo đơn hàng thành công!');
        window.location.href = '/dashboard/invoices';
      } else {
        const errorData = await response.json();
        alert('Lỗi API: ' + (errorData.message || 'Không thể tạo đơn hàng'));
      }
    } catch (error) {
      alert('Không kết nối được tới Server NestJS');
    }
  }

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* ERP Header Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/dashboard/invoices"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <div className="h-8 w-[1px] bg-slate-200" />
          <div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Đơn hàng Mới
            </h1>
            <p className="text-xs text-slate-500 font-medium">Bản nháp / Chưa xác nhận</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild className="font-semibold border-slate-300">
            <Link href="/dashboard/invoices"><X className="w-4 h-4 mr-2" /> Hủy</Link>
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} className="bg-blue-600 hover:bg-blue-700 font-bold px-6 shadow-md shadow-blue-100 transition-all">
            <Save className="w-4 h-4 mr-2" /> LƯU ĐƠN HÀNG
          </Button>
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Status Progress Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-around shadow-sm">
            <div className="flex flex-col items-center gap-2 opacity-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-blue-600">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Soạn thảo</span>
            </div>
            <div className="h-[2px] flex-1 bg-slate-200 mx-4" />
            <div className="flex flex-col items-center gap-2 opacity-40">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-slate-200">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Xác nhận</span>
            </div>
            <div className="h-[2px] flex-1 bg-slate-200 mx-4" />
            <div className="flex flex-col items-center gap-2 opacity-40">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-slate-200">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Đã thanh toán</span>
            </div>
          </div>

          <Form {...form}>
            <form className="space-y-6">
              {/* Customer Info Card */}
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/80 border-b border-slate-100 py-3">
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                    <User className="w-4 h-4" /> THÔNG TIN ĐỐI TÁC
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="customer_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-slate-500 uppercase">Khách hàng / Nhà cung cấp</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 border-slate-300 focus:ring-blue-500 bg-slate-50/30">
                                <SelectValue placeholder="Tìm kiếm khách hàng..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {customers.map((customer) => (
                                <SelectItem key={customer.id} value={customer.id}>
                                  {customer.name} ({customer.email})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-slate-500 uppercase">Trạng thái hiện tại</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 border-slate-300 bg-slate-50/30">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pending">Chờ thanh toán</SelectItem>
                              <SelectItem value="paid">Đã xác nhận</SelectItem>
                              <SelectItem value="cancelled">Đã hủy</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Items Table Card */}
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/80 border-b border-slate-100 py-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                    <Package className="w-4 h-4" /> CHI TIẾT SẢN PHẨM & DỊCH VỤ
                  </CardTitle>
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-blue-600 font-bold text-xs"
                    onClick={() => append({ product_name: '', quantity: 1, price: 0 })}
                  >
                    <Plus className="w-3 h-3 mr-1" /> THÊM DÒNG
                  </Button>
                </CardHeader>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/30">
                      <TableRow>
                        <TableHead className="w-[45%] text-[10px] font-bold uppercase text-slate-500">Sản phẩm / Mô tả</TableHead>
                        <TableHead className="w-[15%] text-center text-[10px] font-bold uppercase text-slate-500">Số lượng</TableHead>
                        <TableHead className="w-[20%] text-right text-[10px] font-bold uppercase text-slate-500">Đơn giá ($)</TableHead>
                        <TableHead className="w-[20%] text-right text-[10px] font-bold uppercase text-slate-500">Thành tiền</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fields.map((field, index) => (
                        <TableRow key={field.id} className="group transition-colors">
                          <TableCell className="py-3">
                            <FormField
                              control={form.control}
                              name={`items.${index}.product_name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="Ví dụ: Laptop Dell XPS..." {...field} className="h-10 border-transparent group-hover:border-slate-300 focus:border-blue-500 transition-all shadow-none" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="py-3">
                            <FormField
                              control={form.control}
                              name={`items.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input type="number" {...field} className="h-10 text-center border-transparent group-hover:border-slate-300 focus:border-blue-500 transition-all shadow-none" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="py-3">
                            <FormField
                              control={form.control}
                              name={`items.${index}.price`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input type="number" step="0.01" {...field} className="h-10 text-right border-transparent group-hover:border-slate-300 focus:border-blue-500 transition-all shadow-none" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="py-3 text-right font-semibold text-slate-700">
                            ${((form.watch(`items.${index}.quantity`) || 0) * (form.watch(`items.${index}.price`) || 0)).toLocaleString()}
                          </TableCell>
                          <TableCell className="py-3">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all"
                              onClick={() => remove(index)}
                              disabled={fields.length === 1}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </form>
          </Form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-200 shadow-md bg-white overflow-hidden">
            <CardHeader className="bg-slate-900 text-white py-4">
              <CardTitle className="text-xs uppercase tracking-widest font-bold">Thanh toán & Thuế</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-500">Giá trị đơn hàng:</span>
                <span className="text-slate-900">${totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-500">VAT (0%):</span>
                <span className="text-slate-900">$0</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-slate-900 uppercase">Tổng cộng:</span>
                <div className="text-right">
                  <p className="text-3xl font-black text-blue-600 leading-none">${totalAmount.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Đô la Mỹ (USD)</p>
                </div>
              </div>
            </CardContent>
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold uppercase">
                <Clock className="w-3 h-3" /> Ngày tạo: {new Date().toLocaleDateString('vi-VN')}
              </div>
            </div>
          </Card>

          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 space-y-2">
            <p className="text-[11px] font-bold text-blue-800 uppercase flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3" /> Gợi ý nghiệp vụ
            </p>
            <p className="text-[11px] text-blue-600 leading-relaxed">
              Hãy đảm bảo bạn đã chọn đúng <b>Đối tác</b> để hệ thống tự động hạch toán công nợ và VAT chính xác cho đơn hàng này.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
