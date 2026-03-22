import { useState, useRef } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useNavigate } from 'react-router';
import { Upload, Loader2, Check, X, ChevronDown } from 'lucide-react';

type UserData = {
  firstName: string;
  lastName: string;
  motherLastName: string;
  fatherLastName: string;
  email: string;
  phone: string;
  career: string;
  idNumber: string; // Matrícula o Nómina
  idType: 'matricula' | 'nomina';
  userType: 'Alumno' | 'Maestro' | 'Colaborador';
  role: string;
  permissions: string[];
};

// Mock database - en producción vendría de una API
const mockDatabase: Record<string, UserData> = {
  '612345': {
    firstName: 'Ana Paola',
    lastName: 'Loredo Moreno',
    motherLastName: 'Moreno',
    fatherLastName: 'Loredo',
    email: 'ana.loredo@ducky.edu',
    phone: '8187654321',
    career: 'Ingeniería en Tecnologías Computacionales',
    idNumber: '612345',
    idType: 'matricula',
    userType: 'Alumno',
    role: 'Alumno',
    permissions: ['borrow_books', 'view_history', 'digital_library', 'make_reservations'],
  },
  '614978': {
    firstName: 'Estefania',
    lastName: 'Nájera de la Rosa',
    motherLastName: 'de la Rosa',
    fatherLastName: 'Nájera',
    email: 'estefania.najera@ducky.edu',
    phone: '8123456789',
    career: 'Ingeniería en Tecnologías Computacionales',
    idNumber: '614978',
    idType: 'matricula',
    userType: 'Alumno',
    role: 'Alumno',
    permissions: ['borrow_books', 'view_history', 'digital_library', 'make_reservations'],
  },
};

// Role definitions with their default permissions
const rolePermissions: Record<string, string[]> = {
  'Alumno': ['borrow_books', 'view_history', 'digital_library', 'make_reservations'],
  'Bibliotecario': ['register_loans', 'register_returns', 'view_users', 'manage_loans', 'internal_books', 'manage_books'],
  'Administrador': ['create_users', 'delete_users', 'edit_users', 'assign_roles', 'system_config', 'view_reports', 'register_loans', 'register_returns', 'view_users', 'manage_loans'],
};

const permissionLabels: Record<string, string> = {
  'borrow_books': 'Solicitar préstamo',
  'view_history': 'Ver historial',
  'digital_library': 'Acceso a biblioteca digital',
  'make_reservations': 'Hacer reservaciones',
  'register_loans': 'Registrar préstamos',
  'register_returns': 'Registrar devoluciones',
  'view_users': 'Ver usuarios',
  'manage_loans': 'Gestión de préstamo de libros',
  'internal_books': 'Internos de libros',
  'manage_books': 'Gestión de libros',
  'create_users': 'Alta de usuarios',
  'delete_users': 'Baja de usuarios',
  'edit_users': 'Cambio de usuarios',
  'assign_roles': 'Asignar roles',
  'system_config': 'Configuración del sistema',
  'view_reports': 'Ver reportes',
};

export default function AdminUserRegister() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [matricula, setMatricula] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    motherLastName: '',
    fatherLastName: '',
    email: '',
    phone: '',
    career: '',
    idNumber: '',
    idType: 'matricula',
    userType: 'Alumno',
    role: '',
    permissions: [],
  });

  const handleMatriculaBlur = () => {
    if (matricula.trim().length === 0) return;

    setIsSearching(true);
    setUserNotFound(false);
    setUserAlreadyExists(false);
    setUserFound(false);

    // Simulate API call
    setTimeout(() => {
      // Simulate 10% chance user already exists in library
      if (Math.random() < 0.1) {
        setIsSearching(false);
        setUserAlreadyExists(true);
        return;
      }

      const user = mockDatabase[matricula];
      
      if (user) {
        setFormData(user);
        setUserFound(true);
        setIsSearching(false);
      } else {
        setUserNotFound(true);
        setIsSearching(false);
        // Allow manual entry
        setFormData({
          ...formData,
          idNumber: matricula,
        });
      }
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/admin/users-list');
    }, 2000);
  };

  const isFieldLocked = userFound;

  return (
    <AdminLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Alta de Usuario</h1>
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Search by Matricula */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-2">
                  Tipo de identificación *
                </label>
                <select
                  value={formData.idType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      idType: e.target.value as 'matricula' | 'nomina',
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isSearching || userFound}
                  required
                >
                  <option value="matricula">Matrícula</option>
                  <option value="nomina">Nómina</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-600 mb-2">
                  {formData.idType === 'matricula' ? 'Matrícula *' : 'Número de Nómina *'}
                </label>
                <input
                  type="text"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  onBlur={handleMatriculaBlur}
                  placeholder={
                    formData.idType === 'matricula'
                      ? 'Ingresa la matrícula'
                      : 'Ingresa el número de nómina'
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isSearching || userFound}
                />
                {isSearching && (
                  <div className="absolute right-3 top-11">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-600 mb-2">
                  Tipo de usuario *
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      userType: e.target.value as 'Alumno' | 'Maestro' | 'Colaborador',
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isFieldLocked}
                  required
                >
                  <option value="Alumno">Alumno</option>
                  <option value="Maestro">Maestro</option>
                  <option value="Colaborador">Colaborador</option>
                </select>
              </div>
            </div>

            {/* Status Messages */}
            {isSearching && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-2">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <p className="text-sm text-blue-900">Buscando usuario en sistemas...</p>
              </div>
            )}

            {userFound && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-900">
                  ✓ Datos obtenidos de Escolar
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Los campos bloqueados provienen del sistema institucional
                </p>
              </div>
            )}

            {userNotFound && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm font-medium text-yellow-900">
                  ⚠ No se encontró el usuario en los sistemas
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Puedes realizar el alta manual completando los campos
                </p>
              </div>
            )}

            {userAlreadyExists && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-900">
                  ✕ Este usuario ya está registrado en biblioteca
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/admin/users-list')}
                  className="text-sm text-blue-600 hover:text-blue-800 underline mt-1"
                >
                  Ver lista de usuarios
                </button>
              </div>
            )}
          </div>

          {/* Form Fields */}
          {!userAlreadyExists && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Primer nombre
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      placeholder="Primer nombre"
                      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isFieldLocked ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      disabled={isFieldLocked}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Segundo nombre
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      placeholder="Segundo nombre"
                      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isFieldLocked ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      disabled={isFieldLocked}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Apellido paterno
                    </label>
                    <input
                      type="text"
                      value={formData.fatherLastName}
                      onChange={(e) =>
                        setFormData({ ...formData, fatherLastName: e.target.value })
                      }
                      placeholder="Apellido paterno"
                      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isFieldLocked ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      disabled={isFieldLocked}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Apellido materno
                    </label>
                    <input
                      type="text"
                      value={formData.motherLastName}
                      onChange={(e) =>
                        setFormData({ ...formData, motherLastName: e.target.value })
                      }
                      placeholder="Apellido materno"
                      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isFieldLocked ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      disabled={isFieldLocked}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Correo"
                      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isFieldLocked ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      disabled={isFieldLocked}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Teléfono"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-2">
                      Carrera
                    </label>
                    <input
                      type="text"
                      value={formData.career}
                      onChange={(e) =>
                        setFormData({ ...formData, career: e.target.value })
                      }
                      placeholder="Carrera"
                      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isFieldLocked ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      disabled={isFieldLocked}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm text-gray-600 mb-4">
                  Imagen Usuario
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors"
                >
                  {imagePreview ? (
                    <div className="flex flex-col items-center gap-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-full"
                      />
                      <p className="text-sm text-gray-600">
                        Click para cambiar imagen
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <Upload className="w-12 h-12 text-gray-400" />
                      <p className="text-sm text-gray-600">Imagen Usuario</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Role Selection */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm text-gray-600 mb-4">
                  Rol del usuario
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => {
                    const newRole = e.target.value;
                    setFormData({
                      ...formData,
                      role: newRole,
                      permissions: rolePermissions[newRole] || [],
                    });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Seleccionar rol</option>
                  <option value="Alumno">Alumno</option>
                  <option value="Bibliotecario">Bibliotecario</option>
                  <option value="Administrador">Administrador</option>
                </select>
                
                {formData.role && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900">
                      ℹ️ Permisos asignados automáticamente según el rol
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Puedes modificar los permisos individuales a continuación
                    </p>
                  </div>
                )}
              </div>

              {/* Permissions */}
              {formData.role && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <label className="block text-sm text-gray-600 mb-4">
                    Permisos de usuario seleccionado
                  </label>
                  <div className="space-y-3">
                    {formData.permissions.map((permission) => (
                      <label key={permission} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              permissions: e.target.checked
                                ? [...formData.permissions, permission]
                                : formData.permissions.filter(
                                    (perm) => perm !== permission
                                  ),
                            })
                          }
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{permissionLabels[permission]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Guardar
              </button>
            </>
          )}
        </form>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Alta éxitosa
              </h3>
              <p className="text-sm text-gray-600">
                Redireccionando a la página de inicio...
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}