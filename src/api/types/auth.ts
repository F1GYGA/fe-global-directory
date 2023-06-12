export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  profilePhoto: File | null;
  firstName: string;
  lastName: string;
  department: string;
  team: string;
  jobTitle: string;
  employmentDate: string;
  email: string;
  password: string;
};

export type ForgotPasswordFormData = {
  email: string;
};

export type ResetPasswordFormData = {
  newPassword: string;
};
