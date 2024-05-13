import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Category {
  _id: string;
  name: string;
  budget: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({ _id: "", name: "", budget: "" });
  const [editableCategory, setEditableCategory] = useState<Category | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cat/get/categories",{
        headers: {
          'Authorization': `Bearer ${document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1]}`}
      })
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editableCategory !== null) {
      setEditableCategory({
        ...editableCategory,
        [name]: value,
      });
    } else {
      setNewCategory({
        ...newCategory,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
      const response = await axios.post("http://localhost:8000/cat/post/categories", {newCategory},{
        headers: {
          'Authorization': `Bearer ${token}`}});
      setCategories([...categories, response.data.category]);
      setNewCategory({ _id: "", name: "", budget: "" });
      toast.success("Category added successfully!");
    } catch (error) {
      if(error instanceof Error){
      console.error("Error adding category:", error);
      toast.error(error.response.data.error);
    }else{
      throw error
    }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/cat/delete/categories/${id}`,{
          headers: {
            'Authorization': `Bearer ${document.cookie
              .split('; ')
              .find(row => row.startsWith('token='))
              ?.split('=')[1]}`}
        }
      );
      setCategories(categories.filter((category) => category._id !== id));
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category. Please try again later.");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const response = await axios.put(`http://localhost:8000/cat/update/categories/${id}`, editableCategory,{
        headers: {
          'Authorization': `Bearer ${document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1]}`}
      });
      const updatedCategories = categories.map((category) => {
        if (category._id === id) {
          return response.data.category;
        }
        return category;
      });
      setCategories(updatedCategories);
      toast.success("Category updated successfully!");
      setEditableCategory(null); // Disable editing mode after update
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category. Please try again later.");
    }
  };

  const toggleEdit = (id: string, category: Category) => {
    if (editableCategory && editableCategory._id === id) {
      handleUpdate(id);
    } else {
      setEditableCategory({ ...category });
    }
  };

  return (
    <div className="flex flex-col min-h-screen mt-8">
      <div className="flex flex-col gap-4">
        <div className="grid justify-center items-center gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="w-full">
                <Card className="h-full bg-gray-50">
                  <CardHeader className="flex items-start justify-center">
                    <div className="grid gap-1">
                      {editableCategory && editableCategory._id === category._id ? (
                        <>
                          <input
                            className="p-2 mb-2 border border-gray-300 dark:border-gray-700 rounded-md"
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            value={editableCategory.name}
                            onChange={handleInputChange}
                          />
                          <input
                            className="p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-md"
                            type="text"
                            name="budget"
                            placeholder="Budget"
                            value={editableCategory.budget}
                            onChange={handleInputChange}
                          />
                        </>
                      ) : (
                        <>
                          <CardTitle className="text-xl text-justify mt-1">
                            {category.name}
                          </CardTitle>
                          <CardDescription className="text-xl text-justify my-6">
                            Budget: ${category.budget}
                          </CardDescription>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      onClick={() => toggleEdit(category._id, category)}
                    >
                      <EditIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDelete(category._id)}
                    >
                      <TrashIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
            <div className="w-full">
              <Card className="h-full border-dashed border-2 border-gray-200 dark:border-gray-800">
                <CardContent className="flex flex-col items-start p-5">
                  <input
                    className="p-2 mb-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                  />
                  <input
                    className="p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-md"
                    type="text"
                    name="budget"
                    placeholder="Budget"
                    value={newCategory.budget}
                    onChange={handleInputChange}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="submit"
                    variant="ghost"
                    onClick={handleSubmit}
                  >
                    <PlusIcon className="w-8 h-8 self-center" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="none" height="256" width="256" />
      <line fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="216" x2="40" y1="56" y2="56" />
      <line fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="104" x2="104" y1="104" y2="168" />
      <line fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="152" x2="152" y1="104" y2="168" />
      <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    </svg>
  );
}



function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}


