import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';
import americanPrometheusImg from 'figma:asset/29e6500adb9064f79a357531a9c1f73781977f2a.png';

type BookLocationInfo = {
  clave: string;
  piso: string;
  seccion: string;
  estante: string;
};

type ReturnDetails = {
  id: string;
  title: string;
  author: string;
  editorial: string;
  idioma: string;
  genero: string;
  publicationDate: string;
  pages: string;
  isbn10: string;
  isbn13: string;
  copies: string;
  image: string;
  requestedBy: string;
  loanDate: string;
  returnDate: string;
  location: BookLocationInfo;
};

const mockReturnDetails: Record<string, ReturnDetails> = {
  '1': {
    id: '1',
    title: 'American Prometheus',
    author: 'Kai Bird, Martin J. Sherwin',
    editorial: 'Knopf',
    idioma: 'Inglés',
    genero: 'Biografía',
    publicationDate: '2006',
    pages: '784',
    isbn10: '0375726268',
    isbn13: '978-0375726262',
    copies: '5',
    image: americanPrometheusImg,
    requestedBy: 'Estefania Nájera de la Rosa',
    loanDate: '01/03/2026',
    returnDate: '08/03/2026',
    location: {
      clave: '2IE',
      piso: '2',
      seccion: 'Ingeniería y Tecnologías',
      estante: 'E',
    },
  },
};

export default function AdminReturnReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const returnDetails = id ? mockReturnDetails[id] : null;

  if (!returnDetails) {
    return (
      <AdminLayout>
        <div className="p-8">
          <p>Devolución no encontrada</p>
        </div>
      </AdminLayout>
    );
  }

  const handleRegresarLocalizacion = () => {
    setModalMessage('Libro regresado a localización exitosamente');
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate('/admin/system/returns');
    }, 2000);
  };

  const handleGenerarMulta = () => {
    setModalMessage('Multa generada exitosamente');
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate('/admin/system/returns');
    }, 2000);
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/admin/system/returns')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Atrás</span>
          </button>
          <div className="w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Book Image and Info */}
          <div className="lg:col-span-2">
            <div className="flex gap-8">
              {/* Book Image */}
              <div className="flex-shrink-0">
                <img
                  src={returnDetails.image}
                  alt={returnDetails.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Book Information */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  {returnDetails.title}
                </h1>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Autor:</p>
                    <p className="text-base font-medium text-gray-900">
                      {returnDetails.author}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Editorial:</p>
                    <p className="text-base text-gray-900">{returnDetails.editorial}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Idioma:</p>
                    <p className="text-base text-gray-900">{returnDetails.idioma}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Género:</p>
                    <p className="text-base text-gray-900">{returnDetails.genero}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Fecha de publicación:</p>
                    <p className="text-base text-gray-900">
                      {returnDetails.publicationDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Número de páginas:</p>
                    <p className="text-base text-gray-900">{returnDetails.pages}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Número de copias:</p>
                    <p className="text-base text-gray-900">{returnDetails.copies}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">ISBN 10:</p>
                    <p className="text-base text-gray-900">{returnDetails.isbn10}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">ISBN 13:</p>
                    <p className="text-base text-gray-900">{returnDetails.isbn13}</p>
                  </div>
                </div>

                {/* Return Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Información de Devolución
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Devolución por:</span>{' '}
                      {returnDetails.requestedBy}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Fecha de préstamo:</span>{' '}
                      {returnDetails.loanDate}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Fecha de devolución:</span>{' '}
                      {returnDetails.returnDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Location Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Localización:
              </h2>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Clave:</p>
                  <p className="text-lg font-medium text-gray-900">
                    {returnDetails.location.clave}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Piso:</p>
                  <p className="text-lg font-medium text-gray-900">
                    {returnDetails.location.piso}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Sección:</p>
                  <p className="text-lg font-medium text-gray-900">
                    {returnDetails.location.seccion}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Estante:</p>
                  <p className="text-lg font-medium text-gray-900">
                    {returnDetails.location.estante}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleRegresarLocalizacion}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Regresar a localización
                </button>
                <button
                  onClick={handleGenerarMulta}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Generar multa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {modalMessage}
            </h2>
            <p className="text-gray-600">Redirigiendo...</p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
