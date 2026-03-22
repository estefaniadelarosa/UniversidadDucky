import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, Plus } from 'lucide-react';

type Fine = {
  id: string;
  fecha: string;
  fineId: string;
  razon: string;
  estatus: 'Solucionado' | 'Pendiente';
};

const mockFines: Fine[] = [
  {
    id: '1',
    fecha: '19/03/2024',
    fineId: '00001',
    razon: 'Entrega tarde',
    estatus: 'Solucionado',
  },
  {
    id: '2',
    fecha: '27/05/2025',
    fineId: '00002',
    razon: 'Libro perdido',
    estatus: 'Solucionado',
  },
  {
    id: '3',
    fecha: '09/02/2026',
    fineId: '00003',
    razon: 'Entrega tarde',
    estatus: 'Pendiente',
  },
];

export default function UserFines() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [fines] = useState<Fine[]>(mockFines);

  const filteredFines = fines.filter(
    (fine) =>
      fine.fineId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.razon.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.estatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Atrás</span>
          </button>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-4xl font-bold text-gray-900">Multas</h1>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2">
                Crear nuevo
              </button>
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Búsqueda"
                  className="w-full sm:w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-white rounded-t-lg border border-gray-200 px-6 py-4">
          <div className="grid grid-cols-5 gap-4">
            <div className="font-semibold text-gray-900">Fecha</div>
            <div className="font-semibold text-gray-900">ID</div>
            <div className="font-semibold text-gray-900">Razón</div>
            <div className="font-semibold text-gray-900">Estatus</div>
            <div className="font-semibold text-gray-900">Acciones</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-3 mt-3">
          {filteredFines.map((fine) => (
            <div
              key={fine.id}
              className="bg-white rounded-lg border border-gray-300 px-6 py-4 hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="text-gray-900">{fine.fecha}</div>
                <div className="text-gray-900">{fine.fineId}</div>
                <div className="text-gray-900">{fine.razon}</div>
                <div className="text-gray-900">{fine.estatus}</div>
                <div>
                  <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFines.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center mt-3">
            <p className="text-gray-500">No se encontraron multas</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
