import { UserLayout } from '../components/UserLayout';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import littleLifeImg from 'figma:asset/5c7095bbae2212d513899c097ffefd972810d587.png';
import americanPrometheusImg from 'figma:asset/7adae386d85d1e41572c3a1a1c48ed33956a2818.png';

type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
  available: boolean;
  location: string;
};

const allBooks: Book[] = [
  {
    id: '1',
    title: 'La Biblioteca de la Medianoche',
    author: 'Matt Haig',
    image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=600&fit=crop',
    available: true,
    location: 'Plan 1 | Estante 4',
  },
  {
    id: '2',
    title: 'American Prometheus',
    author: 'Kai Bird & Martin J. Sherwin',
    image: americanPrometheusImg,
    available: true,
    location: 'Plan 1 | Estante 2',
  },
  {
    id: '3',
    title: 'Hamnet',
    author: "Maggie O'Farrell",
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    available: true,
    location: 'Plan 1 | Estante 3',
  },
  {
    id: '4',
    title: 'Before the Coffee Gets Cold',
    author: 'Toshikazu Kawaguchi',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    available: false,
    location: 'Plan 1 | Estante 1',
  },
  {
    id: '5',
    title: 'The Courage to Be Disliked',
    author: 'Ichiro Kishimi',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    available: false,
    location: 'Plan 2 | Estante 5',
  },
  {
    id: '6',
    title: 'Grokking Algorithms',
    author: 'Aditya Bhargava',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
    available: true,
    location: 'Plan 1 | Estante 1',
  },
  {
    id: '7',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
    available: true,
    location: 'Plan 1 | Estante 6',
  },
  {
    id: '8',
    title: 'La Metamorfosis',
    author: 'Franz Kafka',
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
    available: true,
    location: 'Plan 2 | Estante 3',
  },
  {
    id: '9',
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    image: littleLifeImg,
    available: false,
    location: 'Plan 1 | Estante 2',
  },
  {
    id: '10',
    title: 'To Engineer is Human',
    author: 'Henry Petroski',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
    available: true,
    location: 'Plan 1 | Estante 7',
  },
  {
    id: '11',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    available: true,
    location: 'Plan 2 | Estante 4',
  },
  {
    id: '12',
    title: 'Algorithms',
    author: 'Panos Louridas',
    image: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400&h=600&fit=crop',
    available: true,
    location: 'Plan 1 | Estante 8',
  },
];

export default function UserBookSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState(allBooks);

  const filterOptions = ['Editorial', 'Autor', 'Sección', 'Publicación'];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredBooks(allBooks);
      return;
    }

    const filtered = allBooks.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <UserLayout>
      <div className="min-h-screen bg-white">
        {/* Header with logo */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Búsqueda De Libros Ducky
          </h1>

          {/* Search Section */}
          <div className="mb-8">
            <div className="flex gap-4 mb-4">
              {/* Search Input */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Buscar...."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-6 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-gray-400 text-gray-900"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="px-8 py-3 border-2 border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[150px] justify-between"
                >
                  <span className="text-gray-900">
                    {selectedFilter || 'Filtro'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {filterOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedFilter(option);
                          setShowFilterDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Add Filter Link */}
            <button className="text-gray-500 text-sm hover:text-gray-700">
              + Agregar Filtro De Búsqueda
            </button>

            {/* Search Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSearch}
                className="px-12 py-3 bg-[#F5C842] hover:bg-[#E5B832] text-gray-900 font-medium rounded-full transition-colors"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[2/3] mb-3 overflow-hidden rounded-lg">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Status Badge */}
                <div className="mb-2">
                  {book.available ? (
                    <div className="bg-[#8B9D7C] text-white text-xs font-medium py-1.5 px-3 rounded-full text-center">
                      Disponible
                    </div>
                  ) : (
                    <div className="bg-[#B88B8B] text-white text-xs font-medium py-1.5 px-3 rounded-full text-center">
                      No disponible
                    </div>
                  )}
                </div>

                {/* Location Button */}
                <button className="w-full bg-[#F5C842] hover:bg-[#E5B832] text-gray-900 text-xs font-medium py-2 px-3 rounded-full transition-colors">
                  {book.location}
                </button>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No se encontraron libros con esa búsqueda
              </p>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
