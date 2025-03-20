"use client";
import Container from '@/app/common/Container';
import Topbar from '@/app/components/Topbar/Topbar';
import store from '@/app/store/Store';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Provider } from 'react-redux';

export default function Layout({ children }) {
  const pathname = usePathname();

  // Use an array to check multiple routes
  const showTopbarRoutes = [
    '/dashboard',
    '/dashboard/settings',
    '/dashboard/editprofile',
    '/dashboard/subscripation'
  ];

  return (
    <Provider store={store}>
      <Container>
        {/* Render Topbar only on specified routes */}
        {showTopbarRoutes.includes(pathname) && <Topbar />}
        {children}
      </Container>
    </Provider>
  );
}
