import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'sonner'; // Import react-hot-toast

interface UserData {
    name: string;
    email: string;
    password: string;
}

export default function Component(): JSX.Element {
    const navigate = useNavigate();
    const [data, setData] = useState<UserData>({
        name: '',
        email: '',
        password: ''
    });

    const registerUser = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        const { name, email, password } = data;
        try {
            const { data } = await axios.post('/register', { name, email, password });
            if (data.error) {
                toast.error(data.error); // Display error toast
            } else {
                setData({ name: '', email: '', password: '' });
                toast.success('Registration successful. Welcome'); // Display success toast
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred'); // Display error toast
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md rounded-xl border">
                    <CardHeader className="p-6 rounded-t-xl">
                        <div>Register</div>
                        <p className="mt-2 text-sm font-medium leading-none">Enter your information to create an account.</p>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter your name" required value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Enter your email" required type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="Enter your password" required type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                        </div>
                        <Button className="mt-4 w-full" type="submit" onClick={registerUser}>
                            Register
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}