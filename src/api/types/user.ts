type Image = {
  name: string;
  type: string;
  imageEncoded?: string | ArrayBuffer;
};

export type RegistrationRequest = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  team: string;
  jobTitle: string;
  dateOfEmployment: string;
  profileImage: Image | null;
};

export type User = {
  forEach(arg0: (user: any) => void): unknown;
  id: number;
  role: string;
  active: boolean;
  approved: boolean;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  team: string;
  jobTitle: string;
  dateOfEmployment: string;
  skills: string[];
  hobbies: string[];
  previousExperience: string[];
  profileImage: Image | null;
};

export type UserProfile = {
  profileImage: Image | null;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  team: string;
  jobTitle: string;
  dateOfEmployment: string;
  skills: string[];
  hobbies: string[];
  previousExperience: string[];
};

export type EditProfileFormData = {
  profilePhoto: File | null;
  firstName: string;
  lastName: string;
  department: string;
  team: string;
  jobTitle: string;
  email: string;
  previousExperience: string[];
  skills: string[];
  hobbies: string[];
};

export type UpdateProfilePayloadData = {
  profileImage?: {
    name: string;
    type: string;
    base64Img: string | ArrayBuffer;
  };
  firstName: string;
  lastName: string;
  department: string;
  team: string;
  jobTitle: string;
  email: string;
  previousExperience: string[];
  skills: string[];
  hobbies: string[];
};