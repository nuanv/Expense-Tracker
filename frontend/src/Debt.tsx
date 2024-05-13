import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableCell, TableRow, TableBody, Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CardContent, Card } from "@/components/ui/card";
import { toast } from "sonner";

interface Transaction {
  _id: string;
  name: string;
  amount: number;
}

export default function DebtCreditHistory() {
  const [debts, setDebts] = useState<Transaction[]>([]);
  const [credits, setCredits] = useState<Transaction[]>([]);
  const [selectedType, setSelectedType] = useState<"Debt" | "Credit">("Debt");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultDebts = await axios.get<Transaction[]>("http://localhost:8000/api/debts",{headers: {
          'Authorization': `Bearer ${document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1]}`}
      }
        );
        setDebts(resultDebts.data);
        console.log(resultDebts.data)
        const resultCredits = await axios.get<Transaction[]>("http://localhost:8000/api/credits",{headers: {
          'Authorization': `Bearer ${document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1]}`}
      });
        setCredits(resultCredits.data);
        console.log(resultCredits.data)
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleAddTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.currentTarget.elements.namedItem('transactionName') as HTMLInputElement).value;
    const amount = parseFloat((e.currentTarget.elements.namedItem('transactionAmount') as HTMLInputElement).value); // Convert to number

    try {
      const { data } = await axios.post<Transaction>(
        selectedType === "Debt" ? "http://localhost:8000/api/debts" : "http://localhost:8000/api/credits",
        { name, amount },{headers: {
          'Authorization': `Bearer ${document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1]}`}
      }
      );

      if (selectedType === "Debt") {
        setDebts([...debts, data]);
      } else {
        setCredits([...credits, data]);
      }
      if(e.currentTarget){
        e.currentTarget.reset();
        toast.success("Transaction added successfully");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction");
    }

  };

  const handleDeleteTransaction = async (id: string, type: "Debt" | "Credit") => {
    try {
      await axios.delete(`http://localhost:8000/api/${type.toLowerCase()}s/${id}`,{headers: {
        'Authorization': `Bearer ${document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1]}`}
    });
      if (type === "Debt") {
        setDebts(debts.filter((debt) => debt._id !== id));
      } else {
        setCredits(credits.filter((credit) => credit._id !== id));
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 mt-8">
        <div className="space-y-6">
        <Card>
            <CardContent className="p-4">
              <form onSubmit={handleAddTransaction} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                <select
                  name="transactionType"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as "Debt" | "Credit")}
                  className="border border-gray-50 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-200"
                >
                  <option value="Debt">Debt</option>
                  <option value="Credit">Credit</option>
                </select>
                <input
                  name="transactionName"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-200"
                  placeholder={`Enter ${selectedType} Name`}
                  type="text"
                />
                <input
                  name="transactionAmount"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-200"
                  placeholder={`Enter ${selectedType} Amount`}
                  type="number"
                />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                  Add {selectedType}
                </button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  {debts.map((debt) => (
                    <TableRow key={debt._id} className="text-center bg-gray-50">
                      <TableCell className="px-4 py-2">
                        <Badge className="text-sm" variant="outline">
                          Debt
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-2">{debt.name}</TableCell>
                      <TableCell className="px-4 py-2">${isNaN(debt.amount) ? "N/A" : debt.amount.toFixed(2)}</TableCell>
                      <TableCell className="px-4 py-2">
                        <button onClick={() => handleDeleteTransaction(debt._id, "Debt")} className="text-red-600 hover:text-red-800">
                          <TrashBinIcon />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {credits.map((credit) => (
                    <TableRow key={credit._id} className="text-center bg-gray-50">
                      <TableCell className="px-4 py-2">
                        <Badge className="text-sm" variant="outline">
                          Credit
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-2">{credit.name}</TableCell>
                      <TableCell className="px-4 py-2">${isNaN(credit.amount) ? "N/A" : credit.amount.toFixed(2)}</TableCell>
                      <TableCell className="px-4 py-2">
                        <button onClick={() => handleDeleteTransaction(credit._id, "Credit")} className="text-red-600 hover:text-red-800">
                          <TrashBinIcon />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
}

function TrashBinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
        fill="black"
        fillRule="evenodd"
      />
      <path d="M9 9H11V17H9V9Z" fill="black" />
      <path d="M13 9H15V17H13V9Z" fill="black" />
    </svg>
  );
}
