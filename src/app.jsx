import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ProductList from './components/product-list';

function App() {
  return (
    <div className="min-h-screen bg-secondary-gray flex flex-col">
      <header className="bg-primary-blue text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            <Link to="/">
              Apple Product Update Guide
            </Link>
          </h1>
          <p className="text-sm">
            by <a href="https://apple-rumors.com">Apple Rumors</a>
          </p>
        </div>
        <nav>
          <a href="https://apple-rumors.com/about" className="ml-4 text-white hover:underline">About</a>
        </nav>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="w-full md:w-1/4 p-4 bg-white shadow-md md:min-h-screen">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <ProductList />
        </aside>
        <main className="flex-1 p-4">
          <Outlet />
          <div className="text-center text-gray-600 mt-8">
            <h2 className="text-3xl font-bold mb-4">Welcome to the Apple Product Update Guide</h2>
            <p>Select a product category from the list on the left to view detailed update information.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
