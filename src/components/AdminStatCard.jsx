export default function AdminStatCard({
  title,
  value,
  color,
}) {

  return (

    <div className={`${color} text-white rounded-xl p-6 shadow`}>

      <h2 className="text-lg">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-4">
        {value}
      </p>

    </div>

  );

}