import { AdminLayout } from '../components/AdminLayout';
import littleLifeImg from 'figma:asset/5c7095bbae2212d513899c097ffefd972810d587.png';
import americanPrometheusImg from 'figma:asset/7adae386d85d1e41572c3a1a1c48ed33956a2818.png';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { User, X } from 'lucide-react';

export default function AdminDashboard() {
  const newReturn = {
    title: 'American Prometheus',
    author: 'American Prometheus',
    returnedBy: 'Estefania Najera de la Rosa',
    loanDate: '03/01/2025',
    returnDate: '08/03/2025',
    image: americanPrometheusImg,
  };

  const navigate = useNavigate();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showReturnUserModal, setShowReturnUserModal] = useState(false);

  const stats = [
    { label: 'Libros', count: 567, link: '/admin/books/catalog' },
    { label: 'Usuarios', count: 140, link: '/admin/users-management' },
    { label: 'Solicitudes de Préstamo', count: 14, link: '/admin/system/loans' },
    { label: 'Devoluciones', count: 2, link: '/admin/system/returns' },
  ];

  const newLoanRequest = {
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    requestedBy: 'Ana Paola Loredo Moreno',
    realizationDate: '03/03/2099',
    status: 'Pendiente a revisión',
    image: littleLifeImg,
  };

  const requesterInfo = {
    name: 'Ana Paola Loredo Moreno',
    matricula: '612345',
    email: 'ana.loredo@ducky.edu',
    phone: '8187654321',
    career: 'Ingeniería en Tecnologías Computacionales',
    hasLateLoans: false,
  };

  const returnUserInfo = {
    name: 'Estefania Najera de la Rosa',
    matricula: '614978',
    email: 'estefania.najera@ducky.edu',
    phone: '8123456789',
    career: 'Ingeniería en Tecnologías Computacionales',
    hasLateLoans: true,
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header with profile */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Hola, Admin</h1>
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                {stat.label}
              </h3>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-gray-900">{stat.count}</p>
              </div>
              {stat.link && (
                <button
                  onClick={() => navigate(stat.link)}
                  className="text-sm text-blue-600 hover:text-blue-800 underline mt-2"
                >
                  {stat.label === 'Libros' && 'Ir a libros'}
                  {stat.label === 'Usuarios' && 'Gestión de usuarios'}
                  {stat.label === 'Solicitudes de Préstamo' && 'Ir a préstamos'}
                  {stat.label === 'Devoluciones' && 'Ir a devoluciones'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Cards Section */}
        <div className="space-y-8">
          {/* Nueva Solicitud De Préstamo */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Nueva Solicitud De Préstamo
            </h2>
            <div className="flex gap-6">
              <img
                src={newLoanRequest.image}
                alt={newLoanRequest.title}
                className="w-32 h-48 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {newLoanRequest.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Solicitado por:</span>{' '}
                  <button
                    onClick={() => setShowUserModal(true)}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {newLoanRequest.requestedBy}
                  </button>
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Fecha de realización:</span>{' '}
                  {newLoanRequest.realizationDate}
                </p>
                <p className="text-gray-600 mb-6">
                  <span className="font-medium">Estatus:</span>{' '}
                  {newLoanRequest.status}
                </p>
                <button
                  onClick={() => navigate('/admin/system/loans/2')}
                  className="w-full max-w-md bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Revisar
                </button>
              </div>
            </div>
          </div>

          {/* Nueva Devolución Pendiente */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Nueva Devolución Pendiente
            </h2>
            <div className="flex gap-6">
              <img
                src={newReturn.image}
                alt={newReturn.title}
                className="w-32 h-48 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {newReturn.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Devuelto por:</span>{' '}
                  <button
                    onClick={() => setShowReturnUserModal(true)}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {newReturn.returnedBy}
                  </button>
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Fecha de préstamo:</span>{' '}
                  {newReturn.loanDate}
                </p>
                <p className="text-gray-600 mb-6">
                  <span className="font-medium">Fecha de realización:</span>{' '}
                  {newReturn.returnDate}
                </p>
                <button
                  onClick={() => navigate('/admin/system/returns/review/1')}
                  className="w-full max-w-md bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Revisar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Info Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Atrás</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{requesterInfo.name}</h4>
                <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                  Ver más
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Matrícula</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                  {requesterInfo.matricula}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Correo electrónico</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                  {requesterInfo.email}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Teléfono</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                  {requesterInfo.phone}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Carrera</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                  {requesterInfo.career}
                </div>
              </div>
            </div>

            {requesterInfo.hasLateLoans && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-900">Alumno con multa</p>
                <button
                  onClick={() => navigate('/user/fines')}
                  className="text-sm text-blue-600 hover:text-blue-800 underline mt-1"
                >
                  Más información.
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Return User Info Modal */}
      {showReturnUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Atrás</h3>
              <button
                onClick={() => setShowReturnUserModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{returnUserInfo.name}</h4>
                <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                  Ver más
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Matrícula</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                  {returnUserInfo.matricula}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Correo electrónico</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                  {returnUserInfo.email}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Teléfono</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                  {returnUserInfo.phone}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Carrera</label>
                <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                  {returnUserInfo.career}
                </div>
              </div>
            </div>

            {returnUserInfo.hasLateLoans && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-900">Alumno con multa</p>
                <button
                  onClick={() => navigate('/user/fines')}
                  className="text-sm text-blue-600 hover:text-blue-800 underline mt-1"
                >
                  Más información.
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
