import { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
  totalExpense: number;
}

export default function Reports() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        const response = await axios.get('http://localhost:8000/rep/get/report', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col gap-2">
          <main className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <header className="mb-4">
                <h1 className="text-2xl font-bold">Expense Report</h1>
              </header>
              <div className="overflow-x-auto rounded-lg border shadow-sm">
                <table className="w-full divide-y divide-gray-200 bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {categories.map(category => (
                      <tr key={category._id}>
                        <td className="px-6 py-4 text-sm font-medium">{category.name}</td>
                        <td className="px-6 py-4 text-right text-sm">${category.totalExpense}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}