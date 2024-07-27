import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ListPage } from "./pages/ListPage";
import { DetailPage } from "./pages/DetailPage";
import { CreatePage } from "./pages/CreatePage";
import { UpdatePage } from "./pages/UpdatePage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  {/* @ts-ignore */}
                  <Link to="/" className="text-xl font-bold text-blue-600">
                    AnamnesisApp
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                  <Link to="/">
                    <div className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Home
                    </div>
                  </Link>
                  <Link to="/create">
                    <div className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Create New Form
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 max-w-full mx-auto py-6 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="px-4 py-6 sm:px-0">
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/form/:id" element={<DetailPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/update/:id" element={<UpdatePage />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-white shadow-md mt-8">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © 2024 AnamnesisApp. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
