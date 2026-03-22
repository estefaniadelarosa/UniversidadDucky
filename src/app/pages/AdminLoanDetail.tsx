import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, User, X, Check } from 'lucide-react';
import americanPrometheusImg from 'figma:asset/7adae386d85d1e41572c3a1a1c48ed33956a2818.png';
import littleLifeImg from 'figma:asset/5c7095bbae2212d513899c097ffefd972810d587.png';

export default function AdminLoanDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRejectReasonInput, setShowRejectReasonInput] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRejectedModal, setShowRejectedModal] = useState(false);

  // Mock data - en producción vendría de una API
  const loansData: Record<string, any> = {
    '1': {
      book: {
        title: 'American Prometheus',
        author: 'Kai Bird, Martin J. Sherwin',
        editorial: '',
        language: 'Inglés',
        genre: 'Biografía',
        publicationYear: '2006',
        pages: '784',
        copies: '5',
        isbn10: '0375726268',
        isbn13: '978-0375726262',
        image: americanPrometheusImg,
      },
      location: {
        clave: '2IE',
        piso: '2',
        section: 'Ingeniería y Tecnologías',
        shelf: 'E',
      },
      requester: {
        name: 'Estefania Nájera de la Rosa',
        matricula: '614978',
        email: 'estefania.najera@ducky.edu',
        phone: '8123456789',
        career: 'Ingeniería en Tecnologías Computacionales',
        hasLateLoans: true,
      },
      realizationDate: '09/03/2026',
      status: 'Pendiente a revisión',
    },
    '2': {
      book: {
        title: 'A Little Life',
        author: 'Hanya Yanagihara',
        editorial: '',
        language: 'Inglés',
        genre: 'Ficción',
        publicationYear: '2015',
        pages: '720',
        copies: '3',
        isbn10: '0385539258',
        isbn13: '978-0385539258',
        image: littleLifeImg,
      },
      location: {
        clave: '3FI',
        piso: '3',
        section: 'Ficción',
        shelf: 'C',
      },
      requester: {
        name: 'Ana Paola Loredo Moreno',
        matricula: '612345',
        email: 'ana.loredo@ducky.edu',
        phone: '8187654321',
        career: 'Ingeniería en Tecnologías Computacionales',
        hasLateLoans: false,
      },
      realizationDate: '08/03/2026',
      status: 'Pendiente a revisión',
    },
  };

  const loanData = loansData[id || '1'] || loansData['1'];

  const handleAccept = () => {
    setShowAcceptModal(false);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate('/admin/system/loans');
    }, 2000);
  };

  const handleReject = () => {
    if (!showRejectReasonInput) {
      setShowRejectReasonInput(true);
    } else if (rejectReason.trim()) {
      setShowRejectModal(false);
      setShowRejectedModal(true);
      setTimeout(() => {
        setShowRejectedModal(false);
        navigate('/admin/system/loans');
      }, 2000);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Atrás</h1>
          <div className="ml-auto w-12 h-12 rounded-full bg-[#2c1810] flex items-center justify-center text-2xl border-2 border-yellow-600">
            🦆
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Information */}
          <div className="lg:col-span-2">
            <div className="flex gap-6 mb-8">
              <img
                src={loanData.book.image}
                alt={loanData.book.title}
                className="w-64 h-96 object-cover rounded-lg shadow-lg flex-shrink-0"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {loanData.book.title}
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-medium">Autor:</span> {loanData.book.author}
                  </p>
                  {loanData.book.editorial && (
                    <p>
                      <span className="font-medium">Editorial:</span> {loanData.book.editorial}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Idioma:</span> {loanData.book.language}
                  </p>
                  <p>
                    <span className="font-medium">Género:</span> {loanData.book.genre}
                  </p>
                  <p>
                    <span className="font-medium">Fecha de publicación:</span>{' '}
                    {loanData.book.publicationYear}
                  </p>
                  <p>
                    <span className="font-medium">Número de páginas:</span> {loanData.book.pages}
                  </p>
                  <p>
                    <span className="font-medium">Número de copias:</span> {loanData.book.copies}
                  </p>
                  <p>
                    <span className="font-medium">ISBN 10:</span> {loanData.book.isbn10}
                  </p>
                  <p>
                    <span className="font-medium">ISBN 13:</span> {loanData.book.isbn13}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-gray-700 mb-4">
                    <span className="font-medium">Solicitado por:</span>{' '}
                    <button
                      onClick={() => setShowUserModal(true)}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {loanData.requester.name}
                    </button>
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Fecha de realización:</span>{' '}
                    {loanData.realizationDate}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Estatus:</span> {loanData.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Localización:</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Clave:</span> {loanData.location.clave}
                </p>
                <p>
                  <span className="font-medium">Piso:</span> {loanData.location.piso}
                </p>
                <p>
                  <span className="font-medium">Sección:</span> {loanData.location.section}
                </p>
                <p>
                  <span className="font-medium">Estante:</span> {loanData.location.shelf}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAcceptModal(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Aceptar préstamo
            </button>

            <button
              onClick={() => setShowRejectModal(true)}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Rechazar préstamo
            </button>
          </div>
        </div>

        {/* User Info Modal */}
        {showUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Atrás</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{loanData.requester.name}</h4>
                  <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                    Ver más
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Matrícula</label>
                  <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                    {loanData.requester.matricula}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Correo electrónico</label>
                  <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                    {loanData.requester.email}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Teléfono</label>
                  <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                    {loanData.requester.phone}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Carrera</label>
                  <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
                    {loanData.requester.career}
                  </div>
                </div>
              </div>

              {loanData.requester.hasLateLoans && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-medium text-red-900">Alumno con multa</p>
                  <button
                    onClick={() => navigate('/user/fines')}
                    className="text-sm text-blue-600 hover:text-blue-800 underline mt-1"
                  >
                    Más información.
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Accept Confirmation Modal */}
        {showAcceptModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-8 text-center">
              <p className="text-gray-700 mb-6">
                ¿Estás seguro de que quieres aceptar este préstamo?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowAcceptModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
              {!showRejectReasonInput ? (
                <div className="text-center">
                  <p className="text-gray-700 mb-6">
                    ¿Estás seguro de que quieres denegar este préstamo?
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowRejectModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleReject}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Denegar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">
                    Razón por préstamo denegado
                  </h3>
                  <select
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar razón</option>
                    <option value="Libro no disponible">Libro no disponible</option>
                    <option value="Usuario con multa">Usuario con multa</option>
                    <option value="Libro dañado">Libro dañado</option>
                    <option value="Otro">Otro</option>
                  </select>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setShowRejectReasonInput(false);
                        setRejectReason('');
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Volver
                    </button>
                    <button
                      onClick={handleReject}
                      disabled={!rejectReason.trim()}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Préstamo aceptado
              </h3>
              <p className="text-sm text-gray-600">
                Redireccionando a la página de inicio...
              </p>
            </div>
          </div>
        )}

        {/* Rejected Modal */}
        {showRejectedModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <X className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Denegado éxitosamente
              </h3>
              <p className="text-sm text-gray-600">
                Redireccionando a la página de inicio...
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}