import { AdminLayout } from '../components/AdminLayout';

export default function AdminUsersList() {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Lista de Usuarios</h1>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600">Contenido de la lista de usuarios próximamente...</p>
        </div>
      </div>
    </AdminLayout>
  );
}
