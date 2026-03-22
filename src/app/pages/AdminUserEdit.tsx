import { useState, useRef } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useNavigate } from 'react-router';
import { Upload, Search, Check, Loader2, ChevronDown } from 'lucide-react';

type UserData = {
  firstName: string;
  lastName: string;
  area: string;
  profile: string;
  career: string;
  matricula: string;
  permissions: string[];
  image?: string;
};

// Mock database
const mockUsers: Record<string, UserData> = {
  '612345': {
    firstName: 'Ana Paola',
    lastName: 'Loredo Moreno',
    area: 'Ingeniería',
    profile: 'Alumno',
    career: 'Ingeniería en Tecnologías Computacionales',
    matricula: '612345',
    permissions: ['Solicitar préstamo', 'Ver historial', 'Acceso a biblioteca digital'],
  },
  '614978': {
    firstName: 'Estefania',
    lastName: 'Nájera de la Rosa',
    area: 'Ingeniería',
    profile: 'Alumno',
    career: 'Ingeniería en Tecnologías Computacionales',
    matricula: '614978',
    permissions: ['Solicitar préstamo', 'Ver historial'],
  },
};

// Available permissions by role
const rolePermissions: Record<string, string[]> = {
  'Alumno': [
    'Solicitar préstamo',
    'Ver historial',
    'Acceso a biblioteca digital',
    'Hacer reservaciones',
  ],
  'Bibliotecario': [
    'Registrar préstamos',
    'Registrar devoluciones',
    'Ver usuarios',
    'Gestión de préstamo de libros',
    'Internos de libros',
  ],
  'Administrador': [
    'Alta de usuarios',
    'Baja de usuarios',
    'Cambio de usuarios',
    'Registrar préstamos',
    'Registrar devoluciones',
    'Ver usuarios',
    'Gestión de préstamo de libros',
    'Internos de libros',
    'Configuración del sistema',
  ],
};

export default function AdminUserEdit() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchCriteria, setSearchCriteria] = useState({
    area: '',
    profile: '',
    career: '',
    matricula: '',
  });

  const [isSearching, setIsSearching] = useState(false);
  const [userFound, setUserFound] = useState<UserData | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPermissionsDropdown, setShowPermissionsDropdown] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleSearch = () => {
    if (!searchCriteria.matricula.trim()) {
      alert('Por favor ingresa una matrícula para buscar');
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = mockUsers[searchCriteria.matricula];
      
      if (user) {
        setUserFound(user);
        setSearchCriteria({
          area: user.area,
          profile: user.profile,
          career: user.career,
          matricula: user.matricula,
        });
        setSelectedPermissions(user.permissions);
      } else {
        alert('Usuario no encontrado');
        setUserFound(null);
      }
      setIsSearching(false);
    }, 1000);
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

  const handlePermissionToggle = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleSubmit = () => {
    if (!userFound) {
      alert('No hay usuario seleccionado para editar');
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/admin/users-list');
    }, 2000);
  };

  const availablePermissions = userFound 
    ? rolePermissions[searchCriteria.profile] || []
    : [];

  return (
    <AdminLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cambio de Usuario</h1>
            <button
              onClick={() => navigate('/admin/users-list')}
              className="text-sm text-blue-600 hover:text-blue-800 underline mt-1"
            >
              Atrás
            </button>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>

        <div className="space-y-6">
          {/* Search Criteria */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Área</label>
                <input
                  type="text"
                  value={searchCriteria.area}
                  onChange={(e) =>
                    setSearchCriteria({ ...searchCriteria, area: e.target.value })
                  }
                  placeholder="Área"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!!userFound}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Perfil</label>
                <input
                  type="text"
                  value={searchCriteria.profile}
                  onChange={(e) =>
                    setSearchCriteria({ ...searchCriteria, profile: e.target.value })
                  }
                  placeholder="Perfil"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!!userFound}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Carrera</label>
                <input
                  type="text"
                  value={searchCriteria.career}
                  onChange={(e) =>
                    setSearchCriteria({ ...searchCriteria, career: e.target.value })
                  }
                  placeholder="Carrera"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!!userFound}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Matrícula *</label>
                <input
                  type="text"
                  value={searchCriteria.matricula}
                  onChange={(e) =>
                    setSearchCriteria({ ...searchCriteria, matricula: e.target.value })
                  }
                  placeholder="Matrícula"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!!userFound}
                />
              </div>
            </div>

            {!userFound && (
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Buscar
                  </>
                )}
              </button>
            )}

            {userFound && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-900">
                  ✓ Usuario encontrado: {userFound.firstName} {userFound.lastName}
                </p>
                <button
                  onClick={() => {
                    setUserFound(null);
                    setSearchCriteria({ area: '', profile: '', career: '', matricula: '' });
                    setImagePreview(null);
                    setSelectedPermissions([]);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 underline mt-1"
                >
                  Buscar otro usuario
                </button>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors"
            >
              {imagePreview || userFound ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">👤</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {userFound ? `${userFound.firstName} ${userFound.lastName}` : 'Click para cargar imagen'}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Upload className="w-12 h-12 text-gray-400" />
                  <p className="text-sm text-gray-600">usuarioalimpronarrenovar.jpg</p>
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

          {/* Permissions Dropdown */}
          {userFound && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <label className="block text-sm text-gray-600 mb-2">
                Permisos de usuario seleccionado
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowPermissionsDropdown(!showPermissionsDropdown)}
                  className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">
                    {selectedPermissions.length > 0
                      ? `${selectedPermissions.length} permisos seleccionados`
                      : 'Seleccionar permisos'}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      showPermissionsDropdown ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showPermissionsDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    <div className="p-2">
                      {availablePermissions.length > 0 ? (
                        availablePermissions.map((permission) => (
                          <label
                            key={permission}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPermissions.includes(permission)}
                              onChange={() => handlePermissionToggle(permission)}
                              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{permission}</span>
                          </label>
                        ))
                      ) : (
                        <p className="p-3 text-sm text-gray-500">
                          No hay permisos disponibles para este rol
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Permissions Display */}
              {selectedPermissions.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600 font-medium">
                    Permisos activos:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPermissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          {userFound && (
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Guardar
            </button>
          )}
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Cambio éxitoso
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
