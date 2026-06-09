import { environment } from '../environments/environment';

/**
 * Central API route constants – must match backend [Route] attributes.
 * Full URLs point at the .NET backend (environment.apiBaseUrl).
 */
const API_ROOT = environment.apiBaseUrl;
const AUTH_BASE = `${API_ROOT}/api/Auth`;
const DOCTORS_BASE = `${API_ROOT}/api/doctors`;
const DOCTOR_BASE = `${API_ROOT}/api/Doctor`;
const CUSTOMER_BASE = `${API_ROOT}/api/customer`;
const CUSTOMER_BOOKING_BASE = `${API_ROOT}/api/CustomerBooking`;

export const API_ROUTES = {
  authLogin: `${AUTH_BASE}/login`,

  /** DoctorsController – plural */
  doctorsList: `${DOCTORS_BASE}/list`,
  doctorProfile: (doctorId: string) =>
    `${DOCTORS_BASE}/${encodeURIComponent(doctorId)}/profile`,

  /** DoctorController – singular (clinical operations, requires Doctor JWT) */
  doctor: DOCTOR_BASE,
  doctorPatients: (doctorId: string) =>
    `${DOCTOR_BASE}/${encodeURIComponent(doctorId)}/patients`,
  doctorShifts: (doctorId: string) =>
    `${DOCTOR_BASE}/${encodeURIComponent(doctorId)}/shifts`,
  doctorAppointmentsToday: (doctorId: string) =>
    `${DOCTOR_BASE}/${encodeURIComponent(doctorId)}/appointments/today`,
  doctorUpdateDescription: (appointmentId: number) =>
    `${DOCTOR_BASE}/update-description/${appointmentId}`,
  doctorAppointmentById: (appointmentId: number) =>
    `${DOCTOR_BASE}/appointments/${appointmentId}`,
  doctorFinishAppointment: (appointmentId: number) =>
    `${DOCTOR_BASE}/finish/${appointmentId}`,

  /** CustomerController + CustomerProfileController */
  customer: CUSTOMER_BASE,
  customerAppointments: (customerId: string) =>
    `${CUSTOMER_BASE}/appointments/${encodeURIComponent(customerId)}`,
  customerHistory: (customerId: string) =>
    `${CUSTOMER_BASE}/history/${encodeURIComponent(customerId)}`,
  customerProfile: (customerId: string) =>
    `${CUSTOMER_BASE}/${encodeURIComponent(customerId)}`,
  customerAppointmentUpdate: (customerId: string, appointmentId: number) =>
    `${CUSTOMER_BASE}/appointments/${encodeURIComponent(customerId)}/${appointmentId}`,
  customerSettings: (customerId: string) =>
    `${CUSTOMER_BASE}/settings/${encodeURIComponent(customerId)}`,

  /** CustomerBookingController */
  customerBooking: CUSTOMER_BOOKING_BASE,
  customerBookingAvailability: `${CUSTOMER_BOOKING_BASE}/availability`,
} as const;
