export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "receptionist" | "user";
};

export type Doctor = {
  id: string;
  name: string;
  crm: string;
  specialties: string[];
  phone: string;
  email: string;
};
