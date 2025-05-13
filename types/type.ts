export interface CreateAccountForm {
  username: string;
  email: string;
  password?: string;
  gender: string;
  filled: boolean;
}

export interface EducationInformationForm {
  degree: string;
  university: string;
  passingYear: number;
  cgpa: number;
  filled: boolean;
}

export interface AddressInformationForm {
  address: string;
  city: string;
  state: string;
  postalCode: number;
  filled: boolean;
}

export interface TermsAndConditionsForm {
  filled: boolean;
}
