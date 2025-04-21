import { useBookingStore } from '../stores/bookingStore';

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    availability: string[];
    location: string;
    photo: string;
  };
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const { openModal } = useBookingStore();

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col overflow-hidden">
      <div className="w-full h-[200px]">
        <img
          src={doctor.photo}
          alt={`Photo of ${doctor.name}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-grow px-5 py-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
        <p className="text-sm text-gray-600">{doctor.specialty}</p>

        <div className="flex items-center">
          <div className="flex text-yellow-400 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>
                {i < Math.floor(doctor.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {doctor.rating.toFixed(1)}
          </span>
        </div>

        <p className="text-sm text-gray-700">📍 {doctor.location}</p>

        <p className="text-sm text-gray-600">
          Next available:{' '}
          <span className="text-blue-600 font-medium">
            {new Date(doctor.availability[0]).toLocaleString()}
          </span>
        </p>
      </div>

      <div className="px-5 pb-5 mt-auto">
        <button
          onClick={() => openModal(doctor)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          aria-label={`Book appointment with ${doctor.name}`}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
