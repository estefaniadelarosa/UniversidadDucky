import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { Layout } from '../components/Layout';

export default function RecoverPasswordReset() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code && newPassword) {
      // Limpiar el email guardado
      sessionStorage.removeItem('recoveryEmail');
      navigate('/recover-password/success');
    }
  };

  return (
    <Layout showBackButton>
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-auto">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Restablecer contraseña
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Code Input */}
          <div>
            <input
              type="text"
              placeholder="Código recibido"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* New Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
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
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md mt-6"
          >
            Enviar
          </button>
        </form>
      </div>
    </Layout>
  );
}