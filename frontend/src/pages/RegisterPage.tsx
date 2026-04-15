import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  // State quản lý việc ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/register", formData);
      toast.success("Đăng ký thành công! Hãy đăng nhập nhé.");
      navigate("/login");
    } catch (error: any) {
      // Backend của bạn yêu cầu mật khẩu mạnh (chữ hoa, số, ký tự đặc biệt)
      // Lỗi sẽ được bắt và hiển thị tại đây
      toast.error(error.response?.data?.message || "Đăng ký thất bại, vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fefcff] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.3), transparent 60%)`,
      }} />
      
      <Card className="w-full max-w-md p-8 relative z-10 border-0 shadow-custom-lg bg-white/80 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center text-transparent bg-primary bg-clip-text mb-2">
          Tạo tài khoản
        </h2>
        <p className="text-center text-muted-foreground mb-8 text-sm">
          Bắt đầu quản lý công việc hiệu quả hơn
        </p>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <Input 
            placeholder="Họ và tên" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <Input 
            type="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
          
          {/* Ô nhập Mật khẩu */}
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"} 
              placeholder="Mật khẩu (ít nhất 6 ký tự)" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              className="pr-10"
              required 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Ô nhập Xác nhận mật khẩu */}
          <div className="relative">
            <Input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Xác nhận mật khẩu" 
              value={formData.confirm_password}
              onChange={(e) => setFormData({...formData, confirm_password: e.target.value})} 
              className="pr-10"
              required 
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button variant="default" className="w-full h-12" type="submit">
            Đăng Ký
          </Button>
        </form>
        
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Đã có tài khoản? <Link to="/login" className="text-primary font-medium">Đăng nhập</Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;