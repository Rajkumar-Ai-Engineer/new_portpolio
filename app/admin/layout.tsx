import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';

export const metadata = {
  title: 'Admin Governance Console | Rajkumar V. Portfolio',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#07090E] text-white">
      <AdminHeader />
      <main>{children}</main>
    </div>
  );
}
