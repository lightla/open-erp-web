import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchRevenue() {
  try {
    const response = await fetch(`${API_BASE_URL}/revenue`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices/latest`);
    const data = await response.json();
    return data.map((invoice: any) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCustomers() {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`);
    const customers = await response.json();
    return Array.isArray(customers) ? customers : [];
  } catch (err) {
    console.error('API Error:', err);
    return [];
  }
}

export async function fetchOrders() {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    const orders = await response.json();
    return Array.isArray(orders) ? orders : [];
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function fetchOrderById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    const order = await response.json();
    return order;
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

// Giữ lại các hàm cũ dùng SQL nếu bạn vẫn muốn dùng cho Dashboard mặc định
// Hoặc mình có thể chuyển hết sang API nếu NestJS đã có đủ endpoint
export async function fetchCardData() {
  // Logic này có thể gọi tới API chung của NestJS
  return {
    numberOfCustomers: 0,
    numberOfInvoices: 0,
    totalPaidInvoices: '0',
    totalPendingInvoices: '0',
  };
}
