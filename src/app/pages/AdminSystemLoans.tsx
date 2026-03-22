import { AdminLayout } from '../components/AdminLayout';
import { useNavigate } from 'react-router';
import americanPrometheusImg from 'figma:asset/7adae386d85d1e41572c3a1a1c48ed33956a2818.png';
import littleLifeImg from 'figma:asset/5c7095bbae2212d513899c097ffefd972810d587.png';

export default function AdminSystemLoans() {
  const navigate = useNavigate();

  const loans = [
    {
      id: 1,
      title: 'American Prometheus',
      author: 'Kai Bird, Martin J. Sherwin',
      requestedBy: 'Estefania Nájera de la Rosa',
      realizationDate: '09/03/2026',
      status: 'Pendiente a revisión',
      image: americanPrometheusImg,
    },
    {
      id: 2,
      title: 'A Little Life',
      author: 'Hanya Yanagihara',
      requestedBy: 'Ana Paola Loredo Moreno',
      realizationDate: '08/03/2026',
      status: 'Pendiente a revisión',
      image: littleLifeImg,
    },
    {
      id: 3,
      title: 'Kim Ji Young, born 1982',
      author: 'Cho Nam-joo',
      requestedBy: 'Raquel de la Garza von Rossum',
      realizationDate: '07/03/2026',
      status: 'Pendiente a revisión',
      image: 'https://images.unsplash.com/photo-1661723648631-c17d85c74c76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBub3ZlbCUyMGJvb2slMjBjb3ZlciUyMHdvbWFufGVufDF8fHx8MTc3NDIwMjMxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      title: 'La Metamorfosis',
      author: 'Franz Kafka',
      requestedBy: 'Galia Sejudo Mireles',
      realizationDate: '06/03/2026',
      status: 'Pendiente a revisión',
      image: 'https://images.unsplash.com/photo-1752243779921-965ef048defc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbW9ycGhvc2lzJTIwa2Fma2ElMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzc0MjAyMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Hola, Admin</h1>
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>
        <p className="text-gray-600 mb-8">Estos son los prestamos pendientes</p>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Solicitudes de Préstamo</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                <img
                  src={loan.image}
                  alt={loan.title}
                  className="w-24 h-36 object-cover rounded-lg shadow-md flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {loan.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Solicitado por:</span>{' '}
                    {loan.requestedBy}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Fecha de realización:</span>{' '}
                    {loan.realizationDate}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Estatus:</span> {loan.status}
                  </p>
                  <button
                    onClick={() => navigate(`/admin/system/loans/${loan.id}`)}
                    className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                  >
                    Revisar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}