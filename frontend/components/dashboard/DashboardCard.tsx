interface Props {
  title: string;
  value: string;
}

export default function DashboardCard({
  title,
  value,
}: Props) {

  return (

    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-gray-500">
        {title}
      </h2>

      <h1 className="text-3xl font-bold mt-2">
        {value}
      </h1>

    </div>
  );
}