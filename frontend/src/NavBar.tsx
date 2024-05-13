import { Link, useLocation } from "react-router-dom";
import React from "react";
import "./index.css";

export default function NavBar() {
  return (
    <div className="bg-white shadow sticky top-0 z-50 bg-opacity-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center h-16">
          <Link className="text-lg font-semibold" to="/">
            <span className="sr-only">Home</span>
            <img
              className="h-8 w-auto"
              src="https://www.svgrepo.com/show/502621/dollar-coin.svg"
              alt="Workflow"
            />
          </Link>
          <nav className="hidden sm:flex flex-row items-center gap-4 text-base lg:gap-7 ml-auto">
            <CustomLink to="/home">Dashboard</CustomLink>
            <CustomLink to="/expense">Expenses</CustomLink>
            <CustomLink to="/categories">Categories</CustomLink>
            <CustomLink to="/debt">Debts</CustomLink>
            <CustomLink to="/reports">Report</CustomLink>
          </nav>
          <MobileMenu />
        </header>
      </div>
    </div>
  );
}

function CustomLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation().pathname;
  return (
    <Link className={location !== to ? "text-gray-500 dark:text-gray-400" : "font-bold"} to={to}>
      {children}
    </Link>
  );
}

function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="ml-auto sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:bg-gray-100 transition duration-150 ease-in-out"
        aria-label="Main menu"
        aria-expanded={isOpen}
      >
        <svg
          className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <svg
          className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-0 right-0 mt-12 w-56 origin-top-right bg-gray-100 divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="px-2 py-2">
            <div className="block">
              <CustomLink to="/home">Dashboard</CustomLink>
            </div>
            <div className="block">
              <CustomLink to="/expense">Expenses</CustomLink>
            </div>
            <div className="block">
              <CustomLink to="/categories">Categories</CustomLink>
            </div>
            <div className="block">
              <CustomLink to="/debt">Debts</CustomLink>
            </div>
            <div className="block">
              <CustomLink to="/reports">Report</CustomLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
