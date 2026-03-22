import { useState, useRef } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useNavigate } from 'react-router';
import { Upload, Check, Loader2, Search } from 'lucide-react';

type BookData = {
  title: string;
  author: string;
  editorial: string;
  idioma: string;
  genre: string;
  publicationDate: string;
  pages: string;
  isbn10: string;
  isbn13: string;
  copies: string;
  location: string;
  description: string;
};

// Mock database
const mockBooksDatabase: Record<string, BookData> = {
  '9780316769174': {
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    editorial: 'Doubleday',
    idioma: 'Inglés',
    genre: 'Ficción contemporánea',
    publicationDate: '2015-03-10',
    pages: '720',
    isbn10: '0316769177',
    isbn13: '9780316769174',
    copies: '5',
    location: 'Estantería A-12',
    description: 'Una novela épica sobre la amistad, el trauma y la redención.',
  },
  '9780375502392': {
    title: 'American Prometheus',
    author: 'Kai Bird, Martin J. Sherwin',
    editorial: 'Knopf',
    idioma: 'Inglés',
    genre: 'Biografía',
    publicationDate: '2005-04-05',
    pages: '721',
    isbn10: '0375502394',
    isbn13: '9780375502392',
    copies: '3',
    location: 'Estantería B-08',
    description: 'Biografía ganadora del Premio Pulitzer sobre J. Robert Oppenheimer.',
  },
};

export default function AdminBooksDelete() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [bookFound, setBookFound] = useState(false);
  const [formData, setFormData] = useState<BookData>({
    title: '',
    author: '',
    editorial: '',
    idioma: '',
    genre: '',
    publicationDate: '',
    pages: '',
    isbn10: '',
    isbn13: '',
    copies: '',
    location: '',
    description: '',
  });

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      const book = mockBooksDatabase[searchTerm];
      if (book) {
        setFormData(book);
        setBookFound(true);
      } else {
        alert('Libro no encontrado');
        setBookFound(false);
      }
      setIsSearching(false);
    }, 500);
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
    console.log('Libro eliminado:', formData);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate('/admin/books/catalog');
    }, 2000);
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Baja de Ficha Bibliográfica
          </h1>
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <label className="block text-sm text-gray-600 mb-4">
            Buscar libro por ISBN o Título
          </label>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ingresa ISBN o título del libro"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSearching || bookFound}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleSearch}
              disabled={isSearching || bookFound}
              className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Buscar
            </button>
          </div>
          {bookFound && (
            <div className="mt-4 flex items-center gap-2 text-green-600">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">Libro encontrado</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Title */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm text-gray-600 mb-2">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  disabled
                  required
                />
              </div>

              {/* Genre */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm text-gray-600 mb-2">Género</label>
                <input
                  type="text"
                  value={formData.genre}
                  onChange={(e) =>
                    setFormData({ ...formData, genre: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  disabled
                  required
                />
              </div>

              {/* Numero-Copias */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm text-gray-600 mb-2">
                  Número-Copias
                </label>
                <input
                  type="number"
                  value={formData.copies}
                  onChange={(e) =>
                    setFormData({ ...formData, copies: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  disabled
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Autor */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm text-gray-600 mb-2">Autor</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  disabled
                  required
                />
              </div>

              {/* Fecha de publicación */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm text-gray-600 mb-2">
                  Fecha de publicación
                </label>
                <input
                  type="date"
                  value={formData.publicationDate}
                  onChange={(e) =>
                    setFormData({ ...formData, publicationDate: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  disabled
                  required
                />
              </div>

              {/* ISBNs */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      ISBN 10
                    </label>
                    <input
                      type="text"
                      value={formData.isbn10}
                      onChange={(e) =>
                        setFormData({ ...formData, isbn10: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      ISBN 13
                    </label>
                    <input
                      type="text"
                      value={formData.isbn13}
                      onChange={(e) =>
                        setFormData({ ...formData, isbn13: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Editorial */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <label className="block text-sm text-gray-600 mb-2">Editorial</label>
              <input
                type="text"
                value={formData.editorial}
                onChange={(e) =>
                  setFormData({ ...formData, editorial: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                disabled
                required
              />
            </div>

            {/* Idioma */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <label className="block text-sm text-gray-600 mb-2">Idioma</label>
              <input
                type="text"
                value={formData.idioma}
                onChange={(e) =>
                  setFormData({ ...formData, idioma: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                disabled
                required
              />
            </div>

            {/* Numero de páginas */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <label className="block text-sm text-gray-600 mb-2">
                Número de páginas
              </label>
              <input
                type="number"
                value={formData.pages}
                onChange={(e) =>
                  setFormData({ ...formData, pages: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                disabled
                required
              />
            </div>

            {/* Ubicación Biblioteca */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <label className="block text-sm text-gray-600 mb-2">
                Ubicación Biblioteca
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                disabled
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <label className="block text-sm text-gray-600 mb-2">
              Descripción de libro
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50"
              disabled
              required
            />
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <label className="block text-sm text-gray-600 mb-4">
              Imagen Libro
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
            >
              {imagePreview ? (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-48 h-64 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600">
                    Click para cambiar imagen
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Upload className="w-12 h-12 text-gray-400" />
                  <p className="text-sm text-gray-600">Imagen Libro</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!bookFound}
            className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Baja exitosa
            </h2>
            <p className="text-gray-600">
              Redireccionarte a tu página de libros...
            </p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
