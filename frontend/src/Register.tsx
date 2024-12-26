import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

interface UserData {
    name: string;
    email: string;
    password: string;
    verifyPassword: string;
}

export default function Component(): JSX.Element {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [data, setData] = useState<UserData>({
        name: '',
        email: '',
        password: '',
        verifyPassword: ''
    });

    const registerUser = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        const { name, email, password, verifyPassword } = data;

        if (password !== verifyPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const { data: responseData } = await axios.post('/register', { name, email, password });
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                setData({ name: '', email: '', password: '', verifyPassword: '' });
                toast.success('Registration successful. Welcome');
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md rounded-xl border">
                <CardHeader className="p-6 rounded-t-xl">
                    <div>Register</div>
                    <p className="mt-2 text-sm font-medium leading-none">Enter your information to create an account.</p>
                </CardHeader>
                <CardContent className="p-6 flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                            id="name" 
                            placeholder="Enter your name" 
                            required 
                            value={data.name} 
                            onChange={(e) => setData({ ...data, name: e.target.value })} 
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email" 
                            placeholder="Enter your email" 
                            required 
                            type="email" 
                            value={data.email} 
                            onChange={(e) => setData({ ...data, email: e.target.value })} 
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input 
                                id="password" 
                                placeholder="Enter your password" 
                                required 
                                type={showPassword ? "text" : "password"}
                                value={data.password} 
                                onChange={(e) => setData({ ...data, password: e.target.value })} 
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Label htmlFor="verifyPassword">Verify Password</Label>
                        <div className="relative">
                            <Input 
                                id="verifyPassword" 
                                placeholder="Verify your password" 
                                required 
                                type={showVerifyPassword ? "text" : "password"}
                                value={data.verifyPassword} 
                                onChange={(e) => setData({ ...data, verifyPassword: e.target.value })} 
                            />
                            <button
                                type="button"
                                onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showVerifyPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <Button className="mt-4 w-full" type="submit" onClick={registerUser}>
                        Register
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}