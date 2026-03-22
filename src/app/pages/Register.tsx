import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    lastNamePaternal: '',
    lastNameMaternal: '',
    email: '',
    matriculaOrNomina: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registro:', formData);
    alert('Usuario registrado exitosamente');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      {/* Header with profile icon */}
      <div className="absolute top-8 right-8">
        <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
          🦆
        </div>
      </div>

      {/* Registration Form Container */}
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Registro
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Primer nombre */}
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="Primer nombre"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              />
            </div>

            {/* Segundo nombre */}
            <div>
              <input
                type="text"
                name="secondName"
                placeholder="Segundo nombre"
                value={formData.secondName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              />
            </div>

            {/* Apellido paterno */}
            <div>
              <input
                type="text"
                name="lastNamePaternal"
                placeholder="Apellido paterno"
                value={formData.lastNamePaternal}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              />
            </div>

            {/* Apellido materno */}
            <div>
              <input
                type="text"
                name="lastNameMaternal"
                placeholder="Apellido materno"
                value={formData.lastNameMaternal}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              />
            </div>

            {/* Correo electrónico */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              />
            </div>

            {/* Matrícula o Nómina */}
            <div>
              <input
                type="text"
                name="matriculaOrNomina"
                placeholder="Matrícula o Nómina"
                value={formData.matriculaOrNomina}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              />
            </div>

            {/* Teléfono */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              />
            </div>

            {/* Contraseña */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all pr-12"
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

            {/* Avatar placeholder */}
            <div className="flex justify-end pt-2">
              <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3.5 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg mt-6"
            >
              Guardar
            </button>
          </form>

          {/* Link to login */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => navigate('/')}
                className="text-blue-600 hover:text-blue-700 underline font-medium"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
