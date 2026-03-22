import { AdminLayout } from '../components/AdminLayout';
import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export default function AdminUsersList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('todos');

  // Datos de ejemplo
  const allUsers: User[] = [
    {
      id: '619782',
      name: 'Ana Paola Loredo Moreno',
      role: 'Bibliotecario',
      email: 'ana.loredo@ducky.edu',
      phone: '8111111111'
    },
    {
      id: '614978',
      name: 'Estefania Nájera de la Rosa',
      role: 'Bibliotecario',
      email: 'estefania.najera@ducky.edu',
      phone: '8111111111'
    },
    {
      id: '650374',
      name: 'Raquel de la Garza von Rossum',
      role: 'Bibliotecario',
      email: 'raquel.delagarza@ducky.edu',
      phone: '8111111111'
    },
    {
      id: '123456',
      name: 'Juan Pérez García',
      role: 'Alumno',
      email: 'juan.perez@ducky.edu',
      phone: '8112345678'
    },
    {
      id: '789012',
      name: 'María González López',
      role: 'Alumno',
      email: 'maria.gonzalez@ducky.edu',
      phone: '8187654321'
    },
    {
      id: '111222',
      name: 'Carlos Rodríguez Sánchez',
      role: 'Administrador',
      email: 'admin@ducky.edu',
      phone: '8155555555'
    }
  ];

  // Filtrar usuarios
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.includes(searchQuery);
    
    const matchesRole = roleFilter === 'todos' || user.role.toLowerCase() === roleFilter.toLowerCase();
    
    return matchesSearch && matchesRole;
  });

  const handleEdit = (userId: string) => {
    navigate('/admin/user/edit', { state: { userId } });
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestión de Usuarios</h1>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Crear nuevo button */}
          <button
            onClick={() => navigate('/admin/user/register')}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full transition-colors font-medium"
          >
            Crear nuevo
          </button>

          {/* Filtrar por rol dropdown */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none px-6 py-2.5 pr-10 bg-white border border-gray-300 rounded-full text-gray-700 font-medium cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <option value="todos">Filtrar por rol</option>
              <option value="administrador">Administrador</option>
              <option value="bibliotecario">Bibliotecario</option>
              <option value="alumno">Alumno</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>

          {/* Search bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Búsqueda"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-2.5 pr-12 bg-white border border-gray-300 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1.5fr_2fr_1.5fr_1fr] gap-4 px-6 py-4 text-sm font-semibold text-gray-900 border-b border-gray-200">
          <div>Nombre</div>
          <div>ID</div>
          <div>Rol</div>
          <div>Correo electrónico</div>
          <div>Teléfono</div>
          <div>Acciones</div>
        </div>

        {/* User Rows */}
        <div className="space-y-4 mt-4">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No se encontraron usuarios
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-[2fr_1fr_1.5fr_2fr_1.5fr_1fr] gap-4 px-6 py-5 bg-white border-2 border-gray-900 rounded-[20px] items-center hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-gray-700">{user.id}</div>
                <div className="text-gray-700">{user.role}</div>
                <div className="text-gray-700">{user.email}</div>
                <div className="text-gray-700">{user.phone}</div>
                <div>
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full transition-colors font-medium text-sm"
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results count */}
        {filteredUsers.length > 0 && (
          <div className="mt-6 text-sm text-gray-600">
            Mostrando {filteredUsers.length} de {allUsers.length} usuarios
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
