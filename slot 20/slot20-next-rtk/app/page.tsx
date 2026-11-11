import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Slot 20</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Next.js + Redux Toolkit</h1>
        <p className="mt-3 text-gray-500">Bài tập thực hành quản lý state</p>
        <Link href="/counter" className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
          Mở Counter →
        </Link>
      </div>
    </main>
  );
}
