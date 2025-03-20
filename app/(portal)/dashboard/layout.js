"use client";
import Container from '@/app/common/Container';
import Topbar from '@/app/components/Topbar/Topbar';
import store from '@/app/store/Store';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Provider } from 'react-redux';

export default function Layout({ children }) {
  const pathname = usePathname();

   
  const showTopbarRoutes = [
    '/dashboard',
    '/dashboard/settings',
    '/dashboard/editprofile',
    '/dashboard/subscription'
  ];

  return (
    <Provider store={store}>
      <Container>
        
        {showTopbarRoutes.includes(pathname) && <Topbar />}
        {children}
      </Container>
    </Provider>
  );
}
