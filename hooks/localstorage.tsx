// "use client";

// import { useEffect, useState } from "react";

// interface BasicInformationForm {
//   email: string;
//   filled: boolean;
//   gender: string;
//   password?: string;
//   username: string;
// }

// interface EducationInformationForm {
//   cgpa: number;
//   degree: string;
//   filled: boolean;
//   passingYear: number;
//   university: string;
// }

// interface AddressInformationForm {
//   address: string;
//   city: string;
//   filled: boolean;
//   postalCode: number;
//   state: string;
// }

// interface TermsAndConditionsForm {
//   filled: boolean;
// }

// interface UserData {
//   "personal-info"?: {
//     basicinformationform: BasicInformationForm;
//     educationinformationform: EducationInformationForm;
//   };
//   "residential-info"?: {
//     addressinformationform: AddressInformationForm;
//     termsandconditionsform?: TermsAndConditionsForm;
//   };
// }

// export function useUserData() {
//   const [userData, setUserData] = useState<UserData>({});

  

//   useEffect(() => {
//     try {
//       const data = JSON.parse(localStorage.getItem("User-Data") || "{}");
//       setUserData(data);
//     } catch (error) {
//       console.error("Failed to parse user data:", error);
//       setUserData({});
//     }
//   }, []);

//   const resetUserData = () => {
//     localStorage.removeItem("User-Data");
//     setUserData({});
//   };


//   const basic = userData["personal-info"]?.basicinformationform;
//   const education = userData["personal-info"]?.educationinformationform;
//   const address = userData["residential-info"]?.addressinformationform;
//   const terms = userData["residential-info"]?.termsandconditionsform;

//   return { userData, basic, education, address, terms, resetUserData };
// }



"use client";

import { useEffect, useState } from "react";

interface BasicInformationForm {
  email: string;
  filled: boolean;
  gender: string;
  password?: string;
  username: string;
}

interface EducationInformationForm {
  cgpa: number;
  degree: string;
  filled: boolean;
  passingYear: number;
  university: string;
}

interface AddressInformationForm {
  address: string;
  city: string;
  filled: boolean;
  postalCode: number;
  state: string;
}

interface TermsAndConditionsForm {
  filled: boolean;
}

interface UserData {
  "personal-info"?: {
    basicinformationform: BasicInformationForm;
    educationinformationform: EducationInformationForm;
  };
  "residential-info"?: {
    addressinformationform: AddressInformationForm;
    termsandconditionsform?: TermsAndConditionsForm;
  };
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData>({});
  const [basic, setBasic] = useState<BasicInformationForm | undefined>();
  const [education, setEducation] = useState<EducationInformationForm | undefined>();
  const [address, setAddress] = useState<AddressInformationForm | undefined>();
  const [terms, setTerms] = useState<TermsAndConditionsForm | undefined>();

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("User-Data") || "{}");
      setUserData(data);
      setBasic(data["personal-info"]?.basicinformationform);
      setEducation(data["personal-info"]?.educationinformationform);
      setAddress(data["residential-info"]?.addressinformationform);
      setTerms(data["residential-info"]?.termsandconditionsform);
    } catch (error) {
      console.error("Failed to parse user data:", error);
      setUserData({});
      setBasic(undefined);
      setEducation(undefined);
      setAddress(undefined);
      setTerms(undefined);
    }
  }, []);

  const resetUserData = () => {
    localStorage.removeItem("User-Data");
    setUserData({});
    setBasic(undefined);
    setEducation(undefined);
    setAddress(undefined);
    setTerms(undefined);
  };

  return { userData, basic, education, address, terms, resetUserData };
}
