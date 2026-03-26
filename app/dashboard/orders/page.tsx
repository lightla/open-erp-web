'use client';

import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  Eye, 
  ShoppingBag, 
  RefreshCw,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

// IMPORT HÀM TỪ ORVAL:
import { orderControllerFindAll } from '@/app/lib/api/generated/order/order';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderControllerFindAll();
      const result = response.data as unknown as { data?: unknown[] } | unknown[];

      setOrders(Array.isArray(result) ? result : Array.isArray(result?.data) ? result.data : []);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-2 uppercase text-[10px] font-bold tracking-wider">Đã thanh toán</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="px-2 uppercase text-[10px] font-bold tracking-wider">Đã hủy</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 px-2 uppercase text-[10px] font-bold tracking-wider">Chờ xử lý</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-blue-600" /> QUẢN LÝ ĐƠN HÀNG
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Theo dõi dữ liệu thực tế từ NestJS + Prisma API.</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-100 px-6 py-6 h-auto transition-all transform hover:scale-105">
          <Link href="/dashboard/orders/create">
            <Plus className="w-5 h-5 mr-2" /> TẠO ĐƠN HÀNG MỚI
          </Link>
        </Button>
      </div>

      <Card className="border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden bg-white">
        <CardHeader className="bg-white border-b border-slate-100 flex flex-row items-center justify-between py-6 px-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Tìm kiếm mã đơn, khách hàng..." 
              className="pl-10 h-11 border-slate-200 focus-visible:ring-blue-500 bg-slate-50/50" 
            />
          </div>
          <Button variant="outline" size="icon" onClick={fetchOrders} className="h-11 w-11 text-slate-500 hover:text-blue-600 transition-colors">
            <RefreshCw className={loading ? "animate-spin" : ""} size={18} />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50 border-b border-slate-100">
                <TableRow>
                  <TableHead className="w-[120px] py-5 px-8 font-bold text-slate-700 uppercase text-[10px]">Mã đơn (UUID)</TableHead>
                  <TableHead className="py-5 font-bold text-slate-700 uppercase text-[10px]">Tên khách hàng</TableHead>
                  <TableHead className="py-5 font-bold text-slate-700 text-center uppercase text-[10px]">Ngày tạo</TableHead>
                  <TableHead className="py-5 font-bold text-slate-700 text-center uppercase text-[10px]">Trạng thái</TableHead>
                  <TableHead className="py-5 font-bold text-slate-700 text-right uppercase text-[10px]">Tổng cộng</TableHead>
                  <TableHead className="w-[100px] text-right px-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i} className="animate-pulse">
                      <TableCell colSpan={6} className="py-10 bg-slate-50/10"></TableCell>
                    </TableRow>
                  ))
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-4 text-slate-400">
                        <FileText size={48} className="opacity-20" />
                        <p className="text-lg font-medium tracking-tight">Backend chưa có đơn hàng nào.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order: any) => (
                    <TableRow key={order.id} className="hover:bg-blue-50/30 transition-colors group border-b border-slate-100">
                      <TableCell className="px-8 font-mono font-bold text-blue-600 text-[11px]">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </TableCell>
                      <TableCell className="font-bold text-slate-900">
                        {order.customerName || 'N/A'}
                      </TableCell>
                      <TableCell className="text-center text-xs font-semibold text-slate-500">
                        {new Date(order.createdAt).toLocaleString('vi-VN')}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell className="text-right text-lg font-black text-slate-900 pr-4">
                        ${Number(order.totalAmount || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="px-8 text-right">
                        <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                          <Link href={`/dashboard/orders/${order.id}`}>
                            <Eye className="w-5 h-5" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center px-8">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sync: NestJS Controller • {orders.length} ĐƠN HÀNG
           </p>
        </div>
      </Card>
    </div>
  );
}
