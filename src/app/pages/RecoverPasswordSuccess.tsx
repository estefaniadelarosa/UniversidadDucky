import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { useEffect } from 'react';

export default function RecoverPasswordSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir automáticamente al login después de 3 segundos
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoToLogin = () => {
    navigate('/');
  };

  return (
    <Layout showBackButton>
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-sm mx-auto text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Contraseña guardada
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6">
          Serás redirigido a la pantalla de inicio
        </p>

        {/* Manual redirect button */}
        <button
          onClick={handleGoToLogin}
          className="text-blue-600 hover:text-blue-700 underline font-medium text-sm"
        >
          Ir al inicio ahora
        </button>
      </div>
    </Layout>
  );
}
