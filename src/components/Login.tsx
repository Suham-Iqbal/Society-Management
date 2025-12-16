import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import {
  Building,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

interface LoginProps {
  onLogin: () => void;
  onNavigateToSignup: () => void;
  onNavigateToServiceProviderLogin: () => void;
}

export function Login({
  onLogin,
  onNavigateToSignup,
  onNavigateToServiceProviderLogin,
}: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally validate credentials
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-100 dark:from-black dark:via-green-950 dark:to-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-lg mb-4">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 dark:text-white text-2xl mb-2">
            GreenView Residency
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Welcome back! Please login to continue
          </p>
        </div>

        {/* Login Card */}
        <Card className="border border-slate-200 dark:border-zinc-800 shadow-xl dark:bg-zinc-950">
          <CardHeader className="space-y-1">
            <CardTitle className="text-slate-900 dark:text-white text-xl">
              Login to your account
            </CardTitle>
            <CardDescription className="dark:text-slate-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email/Phone Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="dark:text-slate-200"
                >
                  Email or Phone
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="john.smith@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="dark:text-slate-200"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="pl-10 pr-10 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label
                    htmlFor="remember"
                    className="text-sm cursor-pointer dark:text-slate-300"
                  >
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white h-11"
              >
                Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-zinc-950 px-2 text-slate-500 dark:text-slate-400">
                    Or
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={onNavigateToSignup}
                    className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    Sign up now
                  </button>
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  If you are a service provider,{" "}
                  <button
                    type="button"
                    onClick={onNavigateToServiceProviderLogin}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Log in here
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-slate-500 dark:text-slate-600">
            © 2025 GreenView Residency. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}