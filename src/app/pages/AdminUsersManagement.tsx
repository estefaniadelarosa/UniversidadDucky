import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useNavigate } from 'react-router';
import { Search, ChevronDown } from 'lucide-react';

type User = {
  id: string;
  name: string;
  idNumber: string; // Matrícula o Nómina
  idType: 'matricula' | 'nomina';
  userType: 'Alumno' | 'Maestro' | 'Colaborador';
  role: string;
  email: string;
  phone: string;
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Paola Loredo Moreno',
    idNumber: '619782',
    idType: 'matricula',
    userType: 'Alumno',
    role: 'Bibliotecario',
    email: 'ana.loredo@ducky.edu',
    phone: '8111111111',
  },
  {
    id: '2',
    name: 'Estefania Nájera de la Rosa',
    idNumber: '614978',
    idType: 'matricula',
    userType: 'Alumno',
    role: 'Bibliotecario',
    email: 'estefania.najera@ducky.edu',
    phone: '8111111111',
  },
  {
    id: '3',
    name: 'Raquel de la Garza von Rossum',
    idNumber: '650374',
    idType: 'nomina',
    userType: 'Maestro',
    role: 'Bibliotecario',
    email: 'raquel.delagarza@ducky.edu',
    phone: '8111111111',
  },
  {
    id: '4',
    name: 'Galia Sejudo Mireles',
    idNumber: '612890',
    idType: 'matricula',
    userType: 'Alumno',
    role: 'Alumno',
    email: 'galia.sejudo@ducky.edu',
    phone: '8111111111',
  },
  {
    id: '5',
    name: 'María González Pérez',
    idNumber: '500123',
    idType: 'nomina',
    userType: 'Colaborador',
    role: 'Bibliotecario',
    email: 'maria.gonzalez@ducky.edu',
    phone: '8122222222',
  },
];

export default function AdminUsersManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.idNumber.includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === '' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const roles = ['Alumno', 'Bibliotecario', 'Administrador'];

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/admin/user/register')}
            className="px-6 py-2 bg-gray-200 text-gray-900 rounded-full font-medium hover:bg-gray-300 transition-colors"
          >
            Crear nuevo
          </button>

          {/* Role Filter */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="px-6 py-2 bg-gray-200 text-gray-900 rounded-full font-medium hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              {roleFilter || 'Filtrar por rol'}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showRoleDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showRoleDropdown && (
              <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    setRoleFilter('');
                    setShowRoleDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Todos los roles
                </button>
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setRoleFilter(role);
                      setShowRoleDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Búsqueda"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-bold text-gray-900">
                    Nombre
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-gray-900">
                    ID
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-gray-900">
                    Tipo
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-gray-900">
                    Rol
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-gray-900">
                    Correo electrónico
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-gray-900">
                    Teléfono
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="py-4 px-6 text-gray-900">{user.name}</td>
                    <td className="py-4 px-6 text-gray-700">
                      <div className="flex flex-col">
                        <span>{user.idNumber}</span>
                        <span className="text-xs text-gray-500">
                          {user.idType === 'matricula' ? 'Matrícula' : 'Nómina'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {user.userType}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{user.role}</td>
                    <td className="py-4 px-6 text-gray-700">{user.email}</td>
                    <td className="py-4 px-6 text-gray-700">{user.phone}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => navigate('/admin/user/edit')}
                        className="px-4 py-1 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No se encontraron usuarios
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
