//import React from 'react';
import {
  BarChartIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  FolderIcon,
} from "lucide-react";
import "./index.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";



export default function Component() {
  const location = useLocation().pathname;
  return (
    <>
      <div className="fliex flex-col gap-2">
        {location !== "/" && location !=="/login" && location !=="/register" ? (
          <div>
          <NavBar />
        <div>
          <Outlet />
        </div>
        </div>
      ) : (
        <>
        <Outlet />
<div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 py-4 lg:py-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  className="h-8 w-auto"
                  src="https://www.svgrepo.com/show/502621/dollar-coin.svg"
                  alt="Workflow"
                />
                <span className="text-2xl font-bold tracking-tighter">
                  Expense
                </span>
                <span className="text-2xl font-bold tracking-tighter text-gray-500 dark:text-gray-400">
                  Tracker
                </span>
              </div>
              <div className="flex items-center">
                {" "}
                {}
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-slate-800 bg-gray-800 px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </header>
            <main className="flex-1">
              <section className="w-full py-12 md:py-24 lg:py-32 border-b">
                <div className="container flex flex-col items-center justify-center space-y-4 text-center px-4 md:px-6">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Take Control of Your Finances
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Track your spending, manage your budget, and save more
                      money with the Expense Tracker app.
                    </p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Link
                      className="inline-flex h-9 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      to="https://github.com/Expe-Track/Expense-Tracker"
                    >
                      <svg
                        className="h-6 w-6 mr-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        viewBox="0 0 98 96"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                          fill="#24292f"
                        />
                      </svg>
                      GitHub
                    </Link>
                    <Link
                      className="inline-flex h-9 items-center justify-center rounded-md border border-slate-800 bg-gray-800 px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                      to="/register"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </section>
              <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Key Features
                    </h2>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      The Expense Tracker app comes with a range of powerful
                      features to help you manage your finances.
                    </p>
                  </div>
                  <div className="mx-auto grid max-w-3xl items-start gap-8 sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-4">
                    <div className="flex flex-col items-center space-y-2">
                      <CheckCircleIcon className="h-8 w-8" />
                      <h3 className="font-bold">Track Expenses</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Easily record your spending and categorize transactions.
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <TrendingUpIcon className="h-8 w-8" />
                      <h3 className="font-bold">Set Budgets</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Create monthly budgets and track your progress.
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <FolderIcon className="h-8 w-8" />
                      <h3 className="font-bold">Manage Categories</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Organize your expenses into custom categories.
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <BarChartIcon className="h-8 w-8" />
                      <h3 className="font-bold">Generate Reports</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        View detailed reports to analyze your spending habits.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="w-full py-12 md:py-24 lg:py-32 border-t">
                <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                      Contributors
                    </h2>
                    <div className="space-x-11">
                      <a
                        className="underline underline-offset-2"
                        href="https://github.com/niharPat"
                      >
                        Patel Nihar
                      </a>
                      <a
                        className="underline underline-offset-2"
                        href="https://github.com/punitParmar2033"
                      >
                        Parmar Punit
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
          </>
        )}
      </div>
    </>
  );
}
