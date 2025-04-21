import { useBookingStore } from '../stores/bookingStore';

export default function BookingModal() {
  const {
    isModalOpen,
    selectedDoctor,
    selectedTime,
    closeModal,
    selectTime,
    confirmAppointment,
  } = useBookingStore();

  if (!isModalOpen || !selectedDoctor) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <h2 id="booking-modal-title" className="text-xl font-semibold mb-2">
          Book Appointment with {selectedDoctor.name}
        </h2>

        <p className="text-sm text-gray-700 mb-1">
          <strong>Specialty:</strong> {selectedDoctor.specialty}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          <strong>Location:</strong> {selectedDoctor.location}
        </p>

        <hr className="my-4" />

        <h3 className="text-lg font-semibold mb-3">Available Time Slots</h3>
        <ul className="space-y-2 overflow-y-auto max-h-60 mb-6">
          {selectedDoctor.availability.map((timeSlot) => {
            const [date, time] = timeSlot.split(' ');
            const formattedDate = new Date(date).toLocaleDateString();

            return (
              <li key={timeSlot}>
                <button
                  onClick={() => selectTime(timeSlot)}
                  className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                    selectedTime === timeSlot
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-100 border-gray-300 text-gray-800'
                  }`}
                  aria-label={`Select appointment on ${formattedDate} at ${time}`}
                >
                  {formattedDate} at {time}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            aria-label="Cancel booking"
          >
            Cancel
          </button>
          <button
            onClick={confirmAppointment}
            disabled={!selectedTime}
            className={`px-4 py-2 rounded-md font-medium transition ${
              selectedTime
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label="Confirm appointment"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
