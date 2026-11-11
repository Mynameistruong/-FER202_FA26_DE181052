import Counter from './Counter';

export default function CounterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50 px-6 py-16 text-gray-900">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Slot 20 · Bài 1</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Redux Toolkit Counter</h1>
        <p className="mt-3 text-gray-500">Store + createSlice + typed hooks</p>
      </div>
      <Counter />
    </main>
  );
}
