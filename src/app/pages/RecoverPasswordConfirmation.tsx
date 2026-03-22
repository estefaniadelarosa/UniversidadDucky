import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';

export default function RecoverPasswordConfirmation() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('recoveryEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      // Si no hay email guardado, redirigir al inicio del flujo
      navigate('/recover-password');
    }
  }, [navigate]);

  const handleContinue = () => {
    navigate('/recover-password/reset');
  };

  const handleResendCode = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Código reenviado a ' + email);
  };

  return (
    <Layout showBackButton>
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-auto">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Restablecer contraseña
        </h1>

        {/* Message */}
        <div className="space-y-4 mb-6">
          <p className="text-gray-600 text-center text-sm">
            Hemos enviado un código de verificación a tu correo electrónico
          </p>
          <p className="text-center text-sm">
            ¿No recibiste el código?{' '}
            <button
              onClick={handleResendCode}
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              Vuelve a enviar el código
            </button>
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md"
        >
          Continuar
        </button>
      </div>
    </Layout>
  );
}