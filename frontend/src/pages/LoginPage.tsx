import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      // Lưu token vào localStorage để dùng cho các request sau
      localStorage.setItem("access_token", res.data.result.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.result.user));
      
      toast.success("Chào mừng bạn quay trở lại!");
      navigate("/"); // Chuyển về trang chủ
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fefcff] relative overflow-hidden">
      {/* Glow Effect đồng bộ với HomePage */}
      <div className="absolute inset-0 z-0" style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.3), transparent 60%)`,
      }} />
      
      <Card className="w-full max-w-md p-8 relative z-10 border-0 shadow-custom-lg bg-white/80 backdrop-blur-sm">
        <Header />
        <form onSubmit={handleLogin} className="space-y-4 mt-8">
          <Input 
            type="email" 
            placeholder="Email của bạn" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <Input 
            type="password" 
            placeholder="Mật khẩu" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <Button variant="default" className="w-full h-12 text-base" type="submit">
            Đăng Nhập
          </Button>
        </form>
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Chưa có tài khoản? <Link to="/register" className="text-primary font-medium">Đăng ký ngay</Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;