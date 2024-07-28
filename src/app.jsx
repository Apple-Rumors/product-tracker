import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ProductList from './components/product-list';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary-gray">
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
      <div className="flex flex-1">
        <aside className="w-1/4 p-4 bg-white shadow-md min-h-full">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <ProductList />
        </aside>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
