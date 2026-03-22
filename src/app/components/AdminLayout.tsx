import { useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
  Menu, 
  Home, 
  Users, 
  BookOpen, 
  History, 
  LogOut,
  ChevronDown,
  ChevronRight,
  X,
  DollarSign
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [usersMenuOpen, setUsersMenuOpen] = useState(false);
  const [booksMenuOpen, setBooksMenuOpen] = useState(false);
  const [systemMenuOpen, setSystemMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      // Limpiar datos del usuario
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      navigate('/');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col fixed h-full z-50 ${ 
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 lg:translate-x-0 lg:w-20'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {isOpen ? (
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Inicio */}
          <button
            onClick={() => {
              navigate('/admin');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/admin')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Inicio</span>}
          </button>

          {/* Gestión de usuarios */}
          <div>
            <button
              onClick={() => setUsersMenuOpen(!usersMenuOpen)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 ${
                !isOpen ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">Usuarios</span>}
              </div>
              {isOpen && (
                usersMenuOpen ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )
              )}
            </button>
            {isOpen && usersMenuOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <button
                  onClick={() => {
                    navigate('/admin/users-list');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/users-list')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Lista de Usuarios
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/user/register');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/user/register')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Alta de Usuario
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/user/delete');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/user/delete')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Baja de Usuario
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/user/edit');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/user/edit')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Cambio de Usuario
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/roles-permissions');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/roles-permissions')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Roles y Permisos
                </button>
              </div>
            )}
          </div>

          {/* Gestión de libros */}
          <div>
            <button
              onClick={() => setBooksMenuOpen(!booksMenuOpen)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 ${
                !isOpen ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">Gestión de libros</span>}
              </div>
              {isOpen && (
                booksMenuOpen ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )
              )}
            </button>
            {isOpen && booksMenuOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <button
                  onClick={() => {
                    navigate('/admin/books/register');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/books/register')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Registrar libro
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/books/edit');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/books/edit')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Editar libro
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/books/delete');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/books/delete')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Eliminar libro
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/books/catalog');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/books/catalog')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Ver catálogo
                </button>
              </div>
            )}
          </div>

          {/* Sistema */}
          <div>
            <button
              onClick={() => setSystemMenuOpen(!systemMenuOpen)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 ${
                !isOpen ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">Sistema</span>}
              </div>
              {isOpen && (
                systemMenuOpen ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )
              )}
            </button>
            {isOpen && systemMenuOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <button
                  onClick={() => {
                    navigate('/admin/system/history');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/system/history')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Ver historial
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/system/loans');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/system/loans')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Préstamos
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/system/returns');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/admin/system/returns')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Devoluciones
                </button>
              </div>
            )}
          </div>

          {/* Multas */}
          <button
            onClick={() => {
              navigate('/user/fines');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/user/fines')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <DollarSign className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Multas</span>}
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:pl-20">
        {/* Mobile menu button */}
        <div className="lg:hidden p-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}