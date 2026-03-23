import { UserLayout } from '../components/UserLayout';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import littleLifeImg from 'figma:asset/5c7095bbae2212d513899c097ffefd972810d587.png';
import americanPrometheusImg from 'figma:asset/7adae386d85d1e41572c3a1a1c48ed33956a2818.png';
import invisibleWomenImg from 'figma:asset/128ea057d14d1dd8739244b6a18d835f06de8683.png';
import steveJobsImg from 'figma:asset/45814255d43bb0e13adbf2c7ddedb3c26462a8d8.png';
import grokkingAlgorithmsImg from 'figma:asset/df3057e17365c270f3060e17b4de21ea7136dee9.png';
import greatGatsbyImg from 'figma:asset/0500f0cd1b5cc95648466359f7ef38b573fe8b4d.png';
import frankensteinImg from 'figma:asset/561609609a8206cb2b2c6c19d0607e6699e52696.png';
import courageDislikedImg from 'figma:asset/dc8d66e53a3ec96b15976fc27bb265a4c0325e5a.png';
import hamnetImg from 'figma:asset/e0f40724686f6ae8c979fa0989a1da50ec185564.png';
import toEngineerImg from 'figma:asset/aed8d75499b4637c3a895d42667062395ca8e7c5.png';
import kimJiyoungImg from 'figma:asset/8289f6382199271fe555aff22e019a036734c5bc.png';
import beforeCoffeeImg from 'figma:asset/8049789b1cdf5811ec1fe89c88b457635b2d975a.png';
import fleshImg from 'figma:asset/6110dc4a67372a53d95032713fe0776df90c0ec4.png';
import metamorfosisImg from 'figma:asset/5da663f971b7acaeb8b1578e489bdef336b74aa6.png';
import bibliotecaMedianocheImg from 'figma:asset/846a02481be14c2c6c4a01b75c99519bef18a18c.png';

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
    image: bibliotecaMedianocheImg,
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
    image: hamnetImg,
    available: true,
    location: 'Plan 1 | Estante 3',
  },
  {
    id: '4',
    title: 'Before the Coffee Gets Cold',
    author: 'Toshikazu Kawaguchi',
    image: beforeCoffeeImg,
    available: false,
    location: 'Plan 1 | Estante 1',
  },
  {
    id: '5',
    title: 'The Courage to Be Disliked',
    author: 'Ichiro Kishimi',
    image: courageDislikedImg,
    available: false,
    location: 'Plan 2 | Estante 5',
  },
  {
    id: '6',
    title: 'Grokking Algorithms',
    author: 'Aditya Bhargava',
    image: grokkingAlgorithmsImg,
    available: true,
    location: 'Plan 1 | Estante 1',
  },
  {
    id: '7',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    image: steveJobsImg,
    available: true,
    location: 'Plan 1 | Estante 6',
  },
  {
    id: '8',
    title: 'La Metamorfosis',
    author: 'Franz Kafka',
    image: 'https://images.unsplash.com/photo-1752243779921-965ef048defc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbW9ycGhvc2lzJTIwa2Fma2ElMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzc0MjAyMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
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
    image: toEngineerImg,
    available: true,
    location: 'Plan 1 | Estante 7',
  },
  {
    id: '11',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    image: frankensteinImg,
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
  {
    id: '13',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    image: greatGatsbyImg,
    available: true,
    location: 'Plan 1 | Estante 9',
  },
  {
    id: '14',
    title: 'Invisible Women',
    author: 'Caroline Criado Perez',
    image: invisibleWomenImg,
    available: true,
    location: 'Plan 1 | Estante 10',
  },
  {
    id: '15',
    title: 'Kim Ji Young, born 1982',
    author: 'Cho Nam-joo',
    image: 'https://images.unsplash.com/photo-1661723648631-c17d85c74c76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBub3ZlbCUyMGJvb2slMjBjb3ZlciUyMHdvbWFufGVufDF8fHx8MTc3NDIwMjMxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    location: 'Plan 1 | Estante 11',
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