export interface Doctor {
  id: string;
  name: string;
  crm: string;
  phone: string;
  email: string;
  specialties: string[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
