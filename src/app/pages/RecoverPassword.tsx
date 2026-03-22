import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';

export default function RecoverPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Guardar email en sessionStorage para usarlo en las siguientes pantallas
      sessionStorage.setItem('recoveryEmail', email);
      navigate('/recover-password/confirmation');
    }
  };

  return (
    <Layout showBackButton>
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-auto">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Recuperar contraseña
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md"
          >
            Enviar
          </button>
        </form>
      </div>
    </Layout>
  );
}
