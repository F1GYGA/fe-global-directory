type Image = {
  name: string;
  type: string;
  imageEncoded: string | ArrayBuffer;
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
  id: number;
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
