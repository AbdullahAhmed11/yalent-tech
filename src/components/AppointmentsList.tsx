import { useBookingStore } from '../stores/bookingStore';

interface AppointmentsListProps {
  appointments: {
    id: string;
    doctorId: string;
    date: string;
    time: string;
  }[];
  doctors: {
    id: string;
    name: string;
    specialty: string;
    location: string;
  }[];
}

export default function AppointmentsList({ appointments, doctors }: AppointmentsListProps) {
  const { cancelAppointment } = useBookingStore();

  if (appointments.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8 text-base">
        You have no upcoming appointments.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Appointments</h2>

      <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
        {appointments.map((appointment) => {
          const doctor = doctors.find((d) => d.id === appointment.doctorId);
          if (!doctor) return null;

          const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);
          const formattedDate = appointmentDate.toLocaleString([], {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <li key={appointment.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-base font-medium text-gray-900">
                  {doctor.name}
                  <span className="text-sm text-gray-500 ml-2">({doctor.specialty})</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">{formattedDate}</p>
                <p className="text-sm text-gray-600">{doctor.location}</p>
              </div>

              <button
                onClick={() => cancelAppointment(appointment.id)}
                className="px-4 py-2 text-sm rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition"
                aria-label={`Cancel appointment with ${doctor.name}`}
              >
                Cancel
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
