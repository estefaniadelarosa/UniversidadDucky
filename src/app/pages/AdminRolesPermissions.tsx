import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useNavigate } from 'react-router';
import { Shield, Check, X } from 'lucide-react';

type Permission = {
  id: string;
  name: string;
  description: string;
};

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
};

const allPermissions: Permission[] = [
  // Permisos de Alumno
  { id: 'borrow_books', name: 'Solicitar préstamo', description: 'Puede solicitar libros en préstamo' },
  { id: 'view_history', name: 'Ver historial', description: 'Puede ver su historial de préstamos' },
  { id: 'digital_library', name: 'Acceso a biblioteca digital', description: 'Puede acceder a recursos digitales' },
  { id: 'make_reservations', name: 'Hacer reservaciones', description: 'Puede reservar libros' },
  
  // Permisos de Bibliotecario
  { id: 'register_loans', name: 'Registrar préstamos', description: 'Puede registrar nuevos préstamos' },
  { id: 'register_returns', name: 'Registrar devoluciones', description: 'Puede procesar devoluciones' },
  { id: 'view_users', name: 'Ver usuarios', description: 'Puede consultar información de usuarios' },
  { id: 'manage_loans', name: 'Gestión de préstamo de libros', description: 'Puede gestionar el proceso completo de préstamos' },
  { id: 'internal_books', name: 'Internos de libros', description: 'Puede gestionar libros de uso interno' },
  { id: 'manage_books', name: 'Gestión de libros', description: 'Puede agregar, editar y eliminar libros' },
  
  // Permisos de Administrador
  { id: 'create_users', name: 'Alta de usuarios', description: 'Puede crear nuevos usuarios en el sistema' },
  { id: 'delete_users', name: 'Baja de usuarios', description: 'Puede eliminar usuarios del sistema' },
  { id: 'edit_users', name: 'Cambio de usuarios', description: 'Puede modificar información de usuarios' },
  { id: 'assign_roles', name: 'Asignar roles', description: 'Puede asignar y modificar roles de usuarios' },
  { id: 'system_config', name: 'Configuración del sistema', description: 'Puede modificar configuración general' },
  { id: 'view_reports', name: 'Ver reportes', description: 'Puede generar y ver reportes del sistema' },
];

export default function AdminRolesPermissions() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'student',
      name: 'Alumno',
      description: 'Usuario estudiante con permisos básicos de biblioteca',
      permissions: ['borrow_books', 'view_history', 'digital_library', 'make_reservations'],
    },
    {
      id: 'librarian',
      name: 'Bibliotecario',
      description: 'Empleado de biblioteca con permisos de gestión',
      permissions: [
        'borrow_books',
        'view_history',
        'digital_library',
        'register_loans',
        'register_returns',
        'view_users',
        'manage_loans',
        'internal_books',
        'manage_books',
      ],
    },
    {
      id: 'admin',
      name: 'Administrador',
      description: 'Administrador del sistema con todos los permisos',
      permissions: allPermissions.map(p => p.id),
    },
  ]);

  const [selectedRole, setSelectedRole] = useState<string>('student');

  const handlePermissionToggle = (roleId: string, permissionId: string) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const hasPermission = role.permissions.includes(permissionId);
        return {
          ...role,
          permissions: hasPermission
            ? role.permissions.filter(p => p !== permissionId)
            : [...role.permissions, permissionId],
        };
      }
      return role;
    }));
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const currentRole = roles.find(r => r.id === selectedRole);

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Configuración de Roles y Permisos
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Define qué puede hacer cada tipo de usuario en el sistema
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Role Selector */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Roles del Sistema</h2>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedRole === role.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Shield className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      selectedRole === role.id ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{role.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {role.permissions.length} permisos activos
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Permissions Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Permisos de {currentRole?.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Selecciona los permisos que tendrá este rol
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>

              <div className="space-y-3">
                {allPermissions.map((permission) => {
                  const isActive = currentRole?.permissions.includes(permission.id) || false;
                  
                  return (
                    <label
                      key={permission.id}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isActive
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => handlePermissionToggle(selectedRole, permission.id)}
                        className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{permission.name}</h3>
                          {isActive && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                              Activo
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Permissions Summary Table */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Resumen de Permisos por Rol
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-900">
                        Permiso
                      </th>
                      {roles.map((role) => (
                        <th
                          key={role.id}
                          className="text-center py-3 px-4 text-sm font-bold text-gray-900"
                        >
                          {role.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allPermissions.map((permission, index) => (
                      <tr
                        key={permission.id}
                        className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      >
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {permission.name}
                        </td>
                        {roles.map((role) => (
                          <td key={role.id} className="text-center py-3 px-4">
                            {role.permissions.includes(permission.id) ? (
                              <div className="flex items-center justify-center">
                                <Check className="w-5 h-5 text-green-600" />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center">
                                <X className="w-5 h-5 text-red-400" />
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-50">
            <Check className="w-5 h-5" />
            <p className="font-medium">Cambios guardados exitosamente</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
