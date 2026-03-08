import Form from '@/app/ui/orders/create-form';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main className="bg-slate-50/30 min-h-screen">
      <Form customers={customers} />
    </main>
  );
}
