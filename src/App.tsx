import { useState } from 'react';
import DoctorCard from './components/DoctorCard';
import BookingModal from './components/BookingModal';
import AppointmentsList from './components/AppointmentsList';
import { useBookingStore } from './stores/bookingStore';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const { doctors, filterSpecialty, setFilterSpecialty, appointments } = useBookingStore();

  const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))];
  const filteredDoctors = filterSpecialty
    ? doctors.filter((doctor) => doctor.specialty === filterSpecialty)
    : doctors;

  return (
    <div className="min-h-screen bg-gray-50">
      <head>
        <title>Doctor Booking App</title>
        <meta name="description" content="Book appointments with doctors" />
      </head>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Doctor Booking System
        </h1>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-md shadow overflow-hidden border border-gray-200">
            <button
              className={`px-6 py-2 text-sm font-medium transition ${
                activeTab === 0
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(0)}
            >
              Find a Doctor
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium transition ${
                activeTab === 1
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(1)}
            >
              My Appointments
            </button>
          </div>
        </div>

        {activeTab === 0 && (
          <section>
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-700">Available Doctors</h2>
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500 min-w-[200px]"
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 1 && (
          <section className="mt-4">
            <AppointmentsList appointments={appointments} doctors={doctors} />
          </section>
        )}

        <BookingModal />
      </main>
    </div>
  );
}

export default App;
