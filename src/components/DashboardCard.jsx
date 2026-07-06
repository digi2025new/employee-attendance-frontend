const colors = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  red: "bg-red-600",
  yellow: "bg-yellow-500",
};

export default function DashboardCard({
  title,
  value,
  color = "blue",
}) {
  return (
    <div
      className={`
        ${colors[color]}
        text-white
        rounded-2xl
        shadow-lg
        p-6
        transition-all
        duration-300
        hover:shadow-2xl
        hover:-translate-y-1
      `}
    >
      <h3 className="text-lg font-semibold opacity-90">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-4 break-words">
        {value}
      </p>
    </div>
  );
}