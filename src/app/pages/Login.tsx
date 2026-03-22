import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sistema de roles basado en el email
    // Admin: admin@ducky.edu o cualquier email con "admin"
    // Usuario: cualquier otro email
    
    const isAdmin = email.toLowerCase().includes('admin') || 
                    email.toLowerCase() === 'admin@ducky.edu' ||
                    email.toLowerCase() === 'bibliotecario@ducky.edu';
    
    // Guardar información del usuario en localStorage
    const userRole = isAdmin ? 'admin' : 'user';
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userEmail', email);
    
    // Redirigir según el rol
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/user/home');
    }
  };

  return (
    <Layout>
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#2c1810] rounded-full p-6 shadow-2xl border-4 border-yellow-600">
          <div className="text-center">
            <div className="text-5xl mb-2">🦆</div>
            <div className="text-yellow-400 font-bold text-xs">BIBLIOTECA</div>
            <div className="text-white font-bold text-sm">UNIVERSIDAD DUCKY</div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-3.5 rounded-lg bg-white/95 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-6 py-3.5 rounded-lg bg-white/95 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3.5 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg"
        >
          Iniciar sesión
        </button>
      </form>

      {/* Links */}
      <div className="mt-6 text-center space-y-2">
        <p className="text-white text-sm">
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors"
          >
            Regístrate
          </button>
        </p>
        <p className="text-white text-sm">
          ¿Olvidaste tu contraseña?{' '}
          <button
            onClick={() => navigate('/recover-password')}
            className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors"
          >
            Restablecer contraseña
          </button>
        </p>
      </div>
    </Layout>
  );
}