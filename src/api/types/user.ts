export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  profilePhoto: File | null;
  firstName: string;
  lastName: string;
  department: string;
  team: string;
  jobTitle: string;
  employmentDate: string;
  email: string;
  password: string;
}
