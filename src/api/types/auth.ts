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

type Image = {
  name: string;
  type: string;
  base64Img: string | ArrayBuffer;
};

export type RegisterPayloadData = {
  image?: Image;
  firstName: string;
  lastName: string;
  department: string;
  team: string;
  jobTitle: string;
  dateOfEmployment: string;
  email: string;
  password: string;
};

type ImageData = {
  id: number;
  image: Image;
};

type Authority = {
  authority: string;
};

export type RegistrationResponse = {
  id: number;
  email: string;
  password: null;
  approved: boolean;
  active: boolean;
  role: 'ADMIN' | 'USER';
  firstName: string;
  lastName: string;
  dateOfEmployment: string;
  profileImage: ImageData | null;
  department: string;
  team: string;
  jobTitle: string;
  skills: string[];
  hobbies: string[];
  previousExperience: string[];
  tokens: null;
  enabled: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  username: string;
  accountNonLocked: boolean;
  authorities: Authority[];
};

export type ForgotPasswordFormData = {
  email: string;
};

export type ResetPasswordFormData = {
  newPassword: string;
  token: string;
};
