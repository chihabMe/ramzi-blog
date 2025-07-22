interface StatsProps {
  totalPosts: number;
  totalCategories: number;
  totalAuthors: number;
}

export default function StatsSection({
  totalPosts,
  totalCategories,
  totalAuthors,
}: StatsProps) {
  const stats = [
    { label: "Total Posts", value: totalPosts, icon: "📝" },
    { label: "Categories", value: totalCategories, icon: "🏷️" },
    { label: "Authors", value: totalAuthors, icon: "✍️" },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
