import { UserLayout } from '../components/UserLayout';
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
};

const popularBooks: Book[] = [
  {
    id: '1',
    title: 'To Engineer is Human',
    author: 'Henry Petroski',
    image: toEngineerImg,
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
    image: hamnetImg,
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
    image: courageDislikedImg,
  },
  {
    id: '6',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    image: frankensteinImg,
  },
  {
    id: '7',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    image: greatGatsbyImg,
  },
];

const recommendedBooks: Book[] = [
  {
    id: '8',
    title: 'Grokking Algorithms',
    author: 'Aditya Bhargava',
    image: grokkingAlgorithmsImg,
  },
  {
    id: '9',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    image: steveJobsImg,
  },
  {
    id: '10',
    title: 'Invisible Women',
    author: 'Caroline Criado Perez',
    image: invisibleWomenImg,
  },
  {
    id: '11',
    title: 'La Biblioteca de la Medianoche',
    author: 'Matt Haig',
    image: bibliotecaMedianocheImg,
  },
  {
    id: '12',
    title: 'La Metamorfosis',
    author: 'Franz Kafka',
    image: metamorfosisImg,
  },
  {
    id: '13',
    title: 'Flesh',
    author: 'Various Authors',
    image: fleshImg,
  },
  {
    id: '14',
    title: 'Before the Coffee Gets Cold',
    author: 'Toshikazu Kawaguchi',
    image: beforeCoffeeImg,
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