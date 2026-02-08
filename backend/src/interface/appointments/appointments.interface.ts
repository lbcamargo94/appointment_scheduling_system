export interface Appointment {
  id: string;
  doctor_id: string;
  patient_id: string;
  date: Date;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  cancellation_reason?: string;
  created_at: Date;
  updated_at: Date;
}
