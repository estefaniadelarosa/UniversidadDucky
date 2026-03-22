import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Filter, Plus, X } from 'lucide-react';
import toEngineerImg from 'figma:asset/c56f94187c5aad9ebd279b058bb61b1c964e7cb2.png';
import invisibleWomenImg from 'figma:asset/c8a7a627dcfcac0a7aa1161fee3e58b95ac6a212.png';

type Book = {
  id: string;
  title: string;
  author: string;
  editorial: string;
  isbn: string;
  ubicacion: string;
  fecha: string;
  copias: number;
  genre: string;
  image: string;
  sinopsis: string;
};

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'To Engineer is Human',
    author: 'Henry Petroski',
    editorial: 'Vintage International',
    isbn: '000-3-2839-1839-9',
    ubicacion: 'Piso 1 | Estante A',
    fecha: '2025',
    copias: 10,
    genre: 'Ingeniería',
    image: toEngineerImg,
    sinopsis:
      '"La ingeniería es humana" nos reconcilia con el error. En sus páginas, Henry Petroski analiza la ingeniería como tentativa humana y por consiguiente sujeta a error. Sin embargo, el enfoque de Petroski presenta el fallo desde un prisma novedoso demostrando que construir más allá de los límites de lo conocido y emplear materiales nunca utilizados antes no tiene por qué conducir necesariamente al fracaso. Proyectar es en definitiva evitar el fallo y conocer la forma en que otras estructuras similares han fallado nos previene de repetirlos. A lo largo del libro se analizan algunos de los fallos más relevantes en la historia de la ingeniería como el del derrumbe de las pasarelas del hotel Hyatt de Kansas City, el Puente de Tacoma Narrows o los accidentes del DC 10 o el Comet de los que podemos extraer lecciones fundamentales para el desempeño de la ingeniería. Nadie quiere aprender a base de errores, pero de los éxitos no podemos extraer conclusiones que nos permitan ir más allá. Como sostiene Petroski, el éxito puede ser grandioso, pero sin duda la decepción puede enseñarnos más.',
  },
  {
    id: '2',
    title: 'Invisible Women',
    author: 'Caroline Criado Perez',
    editorial: 'Abrams',
    isbn: '978-1-4197-3521-9',
    ubicacion: 'Piso 1 | Estante E',
    fecha: '2024',
    copias: 5,
    genre: 'Motivacional',
    image: invisibleWomenImg,
    sinopsis:
      '"Nelly, casada con un maestro, pasea por la playa recordando el pasado. En 1857, cuando tenía 18 años, conoció al famoso escritor Charles Dickens y tuvieron una relación amorosa que duró hasta la muerte del hombre. La joven, que trabajaba como actriz, llamó la atención del escritor durante una de sus apariciones en el Teatro Haymarket de Londres. A partir de ese momento, la joven y el escritor vivieron un apasionado romance en la sombra."',
  },
];

const availableGenres = ['Ingeniería', 'Motivacional', 'Ficción', 'Biografía', 'Historia'];

export default function AdminBooksCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenres.length === 0 || selectedGenres.includes(book.genre);
    return matchesSearch && matchesGenre;
  });

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Catálogo</h1>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              {selectedGenres.length > 0 && (
                <span className="text-sm font-medium text-gray-900">
                  {selectedGenres.join(' + ')}
                </span>
              )}
              <Filter className="w-5 h-5 text-gray-600" />
            </button>

            {/* Search Bar */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar...."
              className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
            />
          </div>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Filtros por género</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-2">
              {availableGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedGenres.includes(genre)
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {genre}
                </button>
              ))}
              <button
                onClick={() => setSelectedGenres([])}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-500 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Limpiar filtros
              </button>
            </div>
          </div>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-6">
                {/* Book Image */}
                <div className="flex-shrink-0">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-32 h-48 object-cover rounded-lg shadow-md"
                  />
                  <button className="w-full mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                    Disponible
                  </button>
                </div>

                {/* Book Details */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {book.title}
                  </h2>
                  <div className="space-y-1 text-sm mb-4">
                    <p className="text-gray-700">
                      <span className="font-medium">Autor:</span> {book.author}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Editorial:</span> {book.editorial}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">ISBN:</span> {book.isbn}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Ubicación:</span> {book.ubicacion}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Fecha:</span> {book.fecha}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Copias:</span> {book.copias}
                    </p>
                  </div>

                  {/* Sinopsis */}
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Sinopsis</h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-6">
                      {book.sinopsis}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron libros con los filtros seleccionados
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
