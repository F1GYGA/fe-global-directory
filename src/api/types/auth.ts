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
  dateOfEmployment: string;
  email: string;
  password: string;
};

type ProfilePhoto = {
  name: string;
  type: string;
  base64Img: string | ArrayBuffer;
};

export type RegisterPayloadData = {
  image?: ProfilePhoto;
  firstName: string;
  lastName: string;
  department: string;
  team: string;
  jobTitle: string;
  dateOfEmployment: string;
  email: string;
  password: string;
};

export type ForgotPasswordFormData = {
  email: string;
};

export type ResetPasswordFormData = {
  newPassword: string;
};
