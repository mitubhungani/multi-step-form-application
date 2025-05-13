export interface CreateAccountForm {
  username: string;
  email: string;
  password: string;
  gender: "male"| "female";
  filled?: boolean;
}

export interface EducationInformationForm {
degree: "bca" | "mca" | "btech" | "bcom"; // Restricted to specific values
  university: string;
  passingYear: number;
  cgpa: number;
  filled?: boolean;
}

export interface AddressInformationForm {
  address: string;
  city: string;
  state: string;
  postalCode: number;
  filled?: boolean;
}

export interface TermsAndConditionsForm {
  filled: boolean;
}
