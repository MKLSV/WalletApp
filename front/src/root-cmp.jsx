import React from 'react'
import { Routes, Route } from 'react-router'
import { HomeView } from './views/HomeView';
// import { IncomesView } from './views/IncomesView';
// import { SpendsView } from './views/SpendsView';

export default function RootCmp() {

  return (
    <div className='app'>
      <div className='app-container'>
        <Routes>
          <Route path="/" element={<HomeView />} />
          {/* <Route path="/incomes" element={<IncomesView />} />
          <Route path="/spends" element={<SpendsView />} /> */}
        </Routes>
      </div>
    </div>
  );
}

