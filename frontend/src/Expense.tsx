import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Category {
  _id: string;
  name: string;
  budget: number;
  totalExpense: number;
}

interface Expense {
  _id: string;
  date: string;
  category: string;
  amount: number;
  expense: number;
}

export default function Expense() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [newExpense, setNewExpense] = useState({
    category: "",
    date: "",
    amount: "",
  });

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get<{
        expenses: Expense[];
        categories: Category[];
      }>("http://localhost:8000/exp/get/expenses", {
        headers: {
          Authorization: `Bearer ${
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]
          }`,
        },
      });
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast.error("Failed to fetch expenses");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get<{ categories: Category[] }>(
        "http://localhost:8000/cat/get/categories",
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1]
            }`,
          },
        }
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const calculateAmountColor = (expense: Expense): string => {
    const category = categories.find(
      (category) => category.name === expense.category
    );

    if (!category) {
      return "text-gray-500";
    }

    if (expense.expense > category.budget) {
      return "text-red-500";
    } else {
      return "text-green-500";
    }
  };

  const deleteAllExpenses = async () => {
    try {
      await axios.delete("http://localhost:8000/exp/delete/all", {
        headers: {
          Authorization: `Bearer ${
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]
          }`,
        },
      });
      toast.success("All expenses deleted successfully!");
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting all expenses:", error);
      toast.error("Failed to delete all expenses");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/exp/post/expenses",
        newExpense,
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1]
            }`,
          },
        }
      );
      const { updatedCategory } = response.data;

      if (updatedCategory.totalExpense > updatedCategory.budget) {
        toast.error("Expense created successfully, but budget exceeded!");
      } else {
        toast.success("Expense added successfully!");
      }

      setNewExpense({ category: "", date: "", amount: "" });
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.warning("Failed to add expense. Please try again later.");
    }
  };

  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex min-h-[calc(100vh - _theme(spacing.16))] flex-1 flex-col gap-4 p-4 bg-gray-50 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto">
          <div className="overflow-x-auto">
            <form
              className="w-full max-w-screen-xl mx-auto px-4 py-8 space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-wrap -mx-2">
                <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                  <select
                    className="border-2 border-gray-200 rounded-md p-2 w-full"
                    id="category"
                    name="category"
                    value={newExpense.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories found</option>
                    )}
                  </select>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                  <input
                    className="border-2 border-gray-200 rounded-md p-2 w-full"
                    id="date"
                    type="date"
                    name="date"
                    value={newExpense.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                  <input
                    className="border-2 border-gray-200 rounded-md p-2 w-full"
                    id="amount"
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={newExpense.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <Button variant="primary" type="submit">
                <PlusIcon className="w-8 h-8 self-end" />
              </Button>
            </form>
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold mr-auto">Expense History</h2>
              <div className="flex items-center">
                <button
                  onClick={deleteAllExpenses}
                  className="flex items-center text-white px-2 py-2 rounded-md mr-2 hover:bg-red-400"
                >
                  <TrashIcon className="h-6 w-6 mr-1" />
                </button>
                <select
                  id="categoryFilter"
                  name="categoryFilter"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="All">All</option>
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No categories found</option>
                  )}
                </select>
              </div>
            </div>
            <br></br>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExpenses.map((expense, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {expense.category}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${calculateAmountColor(
                        expense
                      )}`}
                    >
                      ${expense.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function Button(
  props: React.ComponentProps<"button"> & {
    variant?: "primary" | "secondary" | "ghost" | "outline";
  }
) {
  const { variant = "primary", children, ...rest } = props;
  let className =
    "flex items-center justify-center px-4 py-2 rounded-md font-medium ";

  switch (variant) {
    case "primary":
      className += "bg-gray-100 text-gray-600 hover:bg-black hover:text-white";
      break;
    case "secondary":
      className +=
        "bg-gray-300 text-gray-800 hover:bg-white hover:text-gray-500";
      break;
    case "ghost":
      className +=
        "bg-transparent text-gray-800 hover:bg-white hover:text-gray-500";
      break;
    case "outline":
      className +=
        "border border-gray-500 text-gray-500 hover:bg-white hover:text-gray-500";
      break;
  }

  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-current"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect fill="none" height="256" width="256" />
      <line
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="216"
        x2="40"
        y1="56"
        y2="56"
      />
      <line
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="104"
        x2="104"
        y1="104"
        y2="168"
      />
      <line
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="152"
        x2="152"
        y1="104"
        y2="168"
      />
      <path
        d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <path
        d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}
