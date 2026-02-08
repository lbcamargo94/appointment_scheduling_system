export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: "admin" | "receptionist";
  created_at: Date;
  updated_at: Date;
}
