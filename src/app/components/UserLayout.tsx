import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Menu, Home, BookOpen, History, LogOut, X, DollarSign, ChevronDown, ChevronRight, Search, FileText, Database, HelpCircle, Info, User } from 'lucide-react';

interface UserLayoutProps {
  children: ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      // Limpiar datos del usuario
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col fixed h-full z-50 w-64 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Menú</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Búsqueda y catálogo */}
          <div>
            <button
              onClick={() => setSearchMenuOpen(!searchMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-gray-900 hover:bg-gray-50 font-medium"
            >
              <span className="text-sm">Búsqueda y catálogo</span>
              {searchMenuOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {searchMenuOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <button
                  onClick={() => {
                    navigate('/user/catalog');
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Libros
                </button>
                <button
                  onClick={() => {
                    navigate('/user/catalog?type=revistas');
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Revistas
                </button>
                <button
                  onClick={() => {
                    navigate('/user/catalog?type=ebooks');
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  E-books
                </button>
                <button
                  onClick={() => {
                    navigate('/user/catalog?type=tesis');
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Tesis
                </button>
                <button
                  onClick={() => {
                    navigate('/user/catalog?type=bases');
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
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
            <span className="text-sm font-medium">Recursos digitales</span>
          </button>

          {/* Servicios de la biblioteca */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
          >
            <span className="text-sm font-medium">Servicios de la biblioteca</span>
          </button>

          {/* Ayuda e investigación */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
          >
            <span className="text-sm font-medium">Ayuda e investigación</span>
          </button>

          {/* Información de la biblioteca */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
          >
            <span className="text-sm font-medium">Información de la biblioteca</span>
          </button>

          {/* Mi cuenta */}
          <button
            onClick={() => {
              navigate('/user/account');
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
          >
            <span className="text-sm font-medium">Mi cuenta</span>
          </button>

          {/* Accesos rápidos */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
          >
            <span className="text-sm font-medium">Accesos rápidos</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors font-medium"
          >
            <span className="text-sm">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}