import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <main className="mx-auto flex w-full max-w-md flex-col px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
