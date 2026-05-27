type Props = {
  doctorName: string;
  appointmentDate: string;
  timeSlot: string;
  status: string;
  onCancel?: () => void;
};

export default function AppointmentCard({
  doctorName,
  appointmentDate,
  timeSlot,
  status,
  onCancel,
}: Props) {

  const formattedDate = appointmentDate
    ? new Date(appointmentDate).toLocaleDateString("en-GB")
    : "No Date";

  return (

    <div className="bg-white p-6 rounded-2xl shadow-md border">

      <h2 className="text-2xl font-semibold mb-3">
        Dr. {doctorName}
      </h2>

      <p className="text-gray-600">
        Date: {formattedDate}
      </p>

      <p className="text-gray-600 mt-1">
        Time: {timeSlot}
      </p>

      <div className="flex items-center justify-between mt-5">

        <span
          className={`
            px-4 py-2 rounded-full text-sm font-medium
            ${
              status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : status === "confirmed"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {status}
        </span>

        {status === "pending" && (
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
          >
            Cancel
          </button>
        )}

      </div>

    </div>
  );
}