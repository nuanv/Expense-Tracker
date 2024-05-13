import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'sonner'; 
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserData {
    email: string;
    password: string;
}

export default function Login(): JSX.Element {
    const navigate = useNavigate();
    const [data, setData] = useState<UserData>({
        email: '',
        password: ''
    });
    
    const loginUser = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data: responseData } = await axios.post('/login', { email, password });
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                setData({ email: '', password: '' });
                navigate('/home');
                    console.log(responseData);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md rounded-xl border">
                    <CardHeader className="p-6 rounded-t-xl">
                        <div>Login</div>
                        <p className="mt-2 text-sm font-medium leading-none">Enter your information to log into your account.</p>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Enter your email" required type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="Enter your password" required type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                        </div>
                        <Button className="mt-4 w-full" type="submit" onClick={loginUser}>
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}