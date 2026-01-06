import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication (UI only)
    if (email && password) {
      toast({
        title: 'Login Successful',
        description: 'Redirecting to dashboard...',
      });
      navigate('/admin');
    } else {
      toast({
        title: 'Please enter credentials',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl text-primary-foreground font-medium tracking-tight mb-2">
            ATELIER
          </h1>
          <p className="text-sm text-primary-foreground/60">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-background p-8">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-6 bg-secondary rounded-full">
            <Lock size={20} className="text-muted-foreground" />
          </div>

          <h2 className="font-display text-2xl text-center mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="admin@atelier.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button variant="hero" className="w-full" type="submit">
              Sign In
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            This is a demo admin panel. Enter any credentials to continue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
