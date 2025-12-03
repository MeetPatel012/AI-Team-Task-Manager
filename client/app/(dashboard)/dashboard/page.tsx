export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome to your task management dashboard
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats cards - will be populated with real data later */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Total Projects</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Tasks Assigned</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">In Progress</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Completed</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>
    </div>
  );
}
