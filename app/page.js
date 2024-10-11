"use client";
import * as React from 'react';
import CustomerList from './components/CustomerList';  // default import

export default function HomeV2() {
  return (
    <main>
      <div className="w-full h-full my-10 mx-10">
          <CustomerList />
      </div>
    </main>
  );
}