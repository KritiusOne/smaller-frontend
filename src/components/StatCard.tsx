interface StatCardProps {
  label: string;
  value: string | number;
  color?: 'indigo' | 'green' | 'blue' | 'purple' | 'red' | 'yellow';
  icon?: string;
}

export function StatCard({ label, value, color = 'indigo', icon }: StatCardProps) {
  const colorClasses = {
    indigo: 'text-indigo-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-lg">
      {icon && (
        <div className="text-2xl mb-2">{icon}</div>
      )}
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>
        {value}
      </p>
    </div>
  );
}
