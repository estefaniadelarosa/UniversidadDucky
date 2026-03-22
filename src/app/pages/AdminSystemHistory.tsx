import { AdminLayout } from '../components/AdminLayout';

export default function AdminSystemHistory() {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Historial del Sistema</h1>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600">Historial de actividades próximamente...</p>
        </div>
      </div>
    </AdminLayout>
  );
}
