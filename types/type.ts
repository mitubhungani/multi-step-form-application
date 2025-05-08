export interface BasicInformationForm {
  email: string;
  filled: boolean;
  gender: string;
  password?: string;
  username: string;
}

export interface EducationInformationForm {
  cgpa: number;
  degree: string;
  filled: boolean;
  passingYear: number;
  university: string;
}

export interface AddressInformationForm {
  address: string;
  city: string;
  filled: boolean;
  postalCode: number;
  state: string;
}

export interface TermsAndConditionsForm {
  filled: boolean;
}
