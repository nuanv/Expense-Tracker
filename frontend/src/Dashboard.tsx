import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
} from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Category {
  _id: string;
  name: string;
  budget: string;
  udpatedBudget: string;
}
interface Expense {
  _id: string;
  date: string | number | Date;
  category: string;
  amount: number;
}

interface CategoryData {
  [key: string]: number;
}

export default function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [filterDays, setFilterDays] = useState(6);

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  // Filter expenses based on the filterDays value
  useEffect(() => {
    const currentDate = new Date();
    const filteredData = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const daysDifference = Math.floor(
        (currentDate.getTime() - expenseDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysDifference <= filterDays;
    });
    setFilteredExpenses(filteredData);
  }, [expenses, filterDays]);

  const fetchCategories = async () => {
    axios
      .get("http://localhost:8000/cat/get/categories", {
        headers: {
          Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]
            }`,
        },
      })
      .then((response) => {
        setCategories(response.data.categories.slice(0, 3));
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get<{
        expenses: Expense[];
        categories: Category[];
      }>("http://localhost:8000/exp/get/expenses", {
        headers: {
          Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]
            }`,
        },
      });
      setExpenses(response.data.expenses);
      console.log("Expenses:", response.data.expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast.error("Failed to fetch expenses");
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mx-auto">
            {categories.map((category, index) => (
              <div key={index} className="w-full">
                <Card className="p-6"> 
                  <CardHeader className="flex flex-row items-center gap-4">
                    <ShoppingBagIcon className="w-8 h-8" />
                    <div className="grid gap-1">
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>${category.budget}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
          <div className="max-w-4xl w-full mx-auto">
            <div className="flex justify-end mb-1">
              <div className="flex-grow"></div> 
              <div className="ml-auto">
                <select
                  value={filterDays}
                  onChange={(e) => setFilterDays(Number(e.target.value))}
                  className="rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-10 text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value={7}>Last 7 days</option>
                  <option value={30}>Last 30 days</option>
                </select>
              </div>
            </div>
            <BarChart
              className="max-w-screen aspect-[16/9]"
              expenses={filteredExpenses}
              filterDays={filterDays}
            />
          </div>
        </main>
      </div>
    </>
  );
}

function ShoppingBagIcon(props: any) {
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
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function BarChart(props: any) {
  const { expenses, filterDays } = props;
  const [filteredExpenses, setFilteredExpenses] = useState<CategoryData>({});

  useEffect(() => {
    const currentDate = new Date();
    const filteredData: Expense[] = expenses.filter((expense: Expense) => {
      const expenseDate = new Date(expense.date);
      const daysDifference = Math.floor(
        (currentDate.getTime() - expenseDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysDifference <= filterDays;
    });

    const categoryData: CategoryData = filteredData.reduce(
      (acc: CategoryData, expense: Expense) => {
        const category = expense.category;
        if (acc[category]) {
          acc[category] += expense.amount;
        } else {
          acc[category] = expense.amount;
        }
        return acc;
      },
      {}
    );

    setFilteredExpenses(categoryData);
  }, [expenses, filterDays]);

  const data = Object.entries(filteredExpenses).map(([name, totalAmount]) => ({
    id: name,
    name,
    data: totalAmount,
  }));

  return (
    <div {...props}>
      <ResponsiveBar
        data={data}
        keys={["data"]}
        indexBy="name"
        margin={{ top: 20, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "pastel2" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 50]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Category",
          legendPosition: "middle",
          legendOffset: 42,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Total Expenses",
          legendPosition: "middle",
          legendOffset: -55,
          truncateTickAt: 0,
        }}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
            },
          },
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}
