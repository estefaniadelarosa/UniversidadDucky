import { UserLayout } from '../components/UserLayout';
import littleLifeImg from 'figma:asset/5c7095bbae2212d513899c097ffefd972810d587.png';
import americanPrometheusImg from 'figma:asset/7adae386d85d1e41572c3a1a1c48ed33956a2818.png';

type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
};

const popularBooks: Book[] = [
  {
    id: '1',
    title: 'To Engineer is Human',
    author: 'Henry Petroski',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'American Prometheus',
    author: 'Kai Bird & Martin J. Sherwin',
    image: americanPrometheusImg,
  },
  {
    id: '3',
    title: 'Hamnet',
    author: "Maggie O'Farrell",
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
  },
  {
    id: '4',
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    image: littleLifeImg,
  },
  {
    id: '5',
    title: 'The Courage to Be Disliked',
    author: 'Ichiro Kishimi',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
  },
  {
    id: '6',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
  },
  {
    id: '7',
    title: 'Born a Crime',
    author: 'Trevor Noah',
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
  },
];

const recommendedBooks: Book[] = [
  {
    id: '8',
    title: 'Grokking Algorithms',
    author: 'Aditya Bhargava',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
  },
  {
    id: '9',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
  },
  {
    id: '10',
    title: 'Invisible Women',
    author: 'Caroline Criado Perez',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
  },
  {
    id: '11',
    title: 'La Biblioteca de la Medianoche',
    author: 'Matt Haig',
    image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=600&fit=crop',
  },
  {
    id: '12',
    title: 'La Metamorfosis',
    author: 'Franz Kafka',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
  },
  {
    id: '13',
    title: 'Flesh',
    author: 'Various Authors',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
  },
  {
    id: '14',
    title: 'Before the Coffee Gets Cold',
    author: 'Toshikazu Kawaguchi',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
  },
];

export default function UserHomepage() {
  return (
    <UserLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Hola, Estefanina</h1>
          <p className="text-lg text-gray-600">Descubre tu siguiente lectura</p>
        </div>

        {/* Más populares */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Más populares</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {popularBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex-shrink-0 w-40 cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md mb-2 aspect-[2/3] group-hover:shadow-xl transition-shadow">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recomendados para ti */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recomendados para ti</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {recommendedBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex-shrink-0 w-40 cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md mb-2 aspect-[2/3] group-hover:shadow-xl transition-shadow">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </UserLayout>
  );
}
