import { useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Menu, Home, BookOpen, History, LogOut, X, DollarSign, ChevronDown, ChevronRight, Search, FileText, Database, HelpCircle, Info, User } from 'lucide-react';

interface UserLayoutProps {
  children: ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
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
              navigate('/user/home');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/user/home')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Inicio</span>}
          </button>

          {/* Búsqueda y catálogo */}
          <div>
            <button
              onClick={() => setSearchMenuOpen(!searchMenuOpen)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 ${
                !isOpen ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">Búsqueda y catálogo</span>}
              </div>
              {isOpen && (
                searchMenuOpen ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )
              )}
            </button>
            
            {isOpen && searchMenuOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <button
                  onClick={() => {
                    navigate('/user/catalog');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive('/user/catalog')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Libros
                </button>
                <button
                  onClick={() => {
                    navigate('/user/catalog?type=revistas');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm text-gray-600 hover:bg-gray-50"
                >
                  Revistas
                </button>
                <button
                  onClick={() => {
                    navigate('/user/catalog?type=ebooks');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm text-gray-600 hover:bg-gray-50"
                >
                  E-books
                </button>
                <button
                  onClick={() => {
                    navigate('/user/catalog?type=tesis');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm text-gray-600 hover:bg-gray-50"
                >
                  Tesis
                </button>
                <button
                  onClick={() => {
                    navigate('/user/catalog?type=bases');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm text-gray-600 hover:bg-gray-50"
                >
                  Bases de datos
                </button>
              </div>
            )}
          </div>

          {/* Recursos digitales */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
          >
            <Database className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Recursos digitales</span>}
          </button>

          {/* Servicios de la biblioteca */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
          >
            <BookOpen className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Servicios de la biblioteca</span>}
          </button>

          {/* Ayuda e investigación */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
          >
            <HelpCircle className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Ayuda e investigación</span>}
          </button>

          {/* Información de la biblioteca */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
          >
            <Info className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Información de la biblioteca</span>}
          </button>

          {/* Mi cuenta */}
          <button
            onClick={() => {
              navigate('/user/account');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/user/account')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Mi cuenta</span>}
          </button>

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