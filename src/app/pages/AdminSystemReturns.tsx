import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useNavigate } from 'react-router';
import americanPrometheusImg from 'figma:asset/29e6500adb9064f79a357531a9c1f73781977f2a.png';
import littleLifeImg from 'figma:asset/0783ca7cd862b05f779604b8cec978dba4019f37.png';

type Return = {
  id: string;
  bookTitle: string;
  requestedBy: string;
  loanDate: string;
  returnDate: string;
  status: string;
  image: string;
};

const mockReturns: Return[] = [
  {
    id: '1',
    bookTitle: 'American Prometheus',
    requestedBy: 'Estefania Nájera de la Rosa',
    loanDate: '01/03/2026',
    returnDate: '08/03/2026',
    status: 'Pendiente a revisión',
    image: americanPrometheusImg,
  },
  {
    id: '2',
    bookTitle: 'A Little Life',
    requestedBy: 'Ana Paola Loredo Moreno',
    loanDate: '08/03/2026',
    returnDate: '08/03/2026',
    status: 'Pendiente a revisión',
    image: littleLifeImg,
  },
];

export default function AdminSystemReturns() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-4xl font-bold text-gray-900">Hola, Admin</h1>
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>

        <p className="text-gray-600 mb-8">
          Estos son las devoluciones a revisar
        </p>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Devoluciones De Libro
        </h2>

        {/* Returns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockReturns.map((returnItem) => (
            <div
              key={returnItem.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-6">
                {/* Book Image */}
                <div className="flex-shrink-0">
                  <img
                    src={returnItem.image}
                    alt={returnItem.bookTitle}
                    className="w-32 h-48 object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Return Details */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {returnItem.bookTitle}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-700">
                      <span className="font-medium">Solicitad por:</span>{' '}
                      {returnItem.requestedBy}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Fecha de realización:</span>{' '}
                      {returnItem.returnDate}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Estatus:</span>{' '}
                      {returnItem.status}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/admin/system/returns/review/${returnItem.id}`)
                    }
                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
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