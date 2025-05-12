// // /residential-info/termsandconditionsform
// "use client";

// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";
// import { useUserData } from "@/hooks/localstorage";

// const TAndCForm = () => {
//   const {education,basic,address} =useUserData()
//   const route = useRouter();

//   const [isChecked, setIsChecked] = useState(false);
//   const [isFormFilled, setIsFormFilled] = useState(false);

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIsChecked(event.target.checked);
//   };

//   const handleSubmit = () => {
//     if (isChecked) {
//       const userData = JSON.parse(localStorage.getItem("User-Data") || "{}");
//       userData["residential-info"] = {...userData["residential-info"],termsandconditionsform: {filled: true}};
//       localStorage.setItem("User-Data", JSON.stringify(userData));
//       if(!basic?.filled){
//         route.push("/personal-info/basicinformationform");
//         return null
//       }
//       else if(!education?.filled){
//         route.push("/personal-info/educationinformationform");
//         return null
//       }
//       else if(!address?.filled){
//         route.push("/residential-info/addressinformationform");
//         return null
//       }
//       else{
//         route.push("/dashboard");
//       }
//     }
//   };

//   const previousButton = () => {
//     route.push("/residential-info/addressinformationform");
//   };

//   useEffect(() => {
//     const localData = JSON.parse(localStorage.getItem("User-Data") || "{}");
//     const formFilledData =localData["residential-info"]?.["termsandconditionsform"];
//     if (formFilledData?.filled) {
//       setIsFormFilled(true);
//       setIsChecked(true);
//     }
//   }, []);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white px-4 py-8">
//       <Card className="w-full max-w-xl border border-gray-300 shadow-lg rounded-3xl">
//         <CardHeader className="pb-2 border-b">
//           <CardTitle className="text-center text-3xl font-semibold text-gray-800">
//             Terms and Conditions
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-6 space-y-6">
//           {/* Terms and Conditions Content */}
//           <div className="space-y-4">
//             <p className="text-gray-800 font-semibold">Terms and Conditions</p>
//             <p className="text-gray-600">
//               These are the terms and conditions for using our website. By
//               accessing and using our service, you agree to comply with the
//               following terms:
//             </p>
//             <ul className="list-disc pl-5 text-gray-600">
//               <li>Use of the service is at your own risk.</li>
//               <li>
//                 We do not guarantee the accuracy of the information on the
//                 website.
//               </li>
//               <li>All content on the site is protected by copyright laws.</li>
//               <li>
//                 We may update these terms periodically without prior notice.
//               </li>
//               <li>
//                 You are responsible for maintaining the confidentiality of your
//                 account information.
//               </li>
//             </ul>
//           </div>

//           {/* Checkbox */}
//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               id="acceptTAndC"
//               checked={isChecked}
//               onChange={handleCheckboxChange}
//               className="h-5 w-5 text-black border-gray-300 rounded"
//               disabled={isFormFilled}
//             />
//             <Label htmlFor="acceptTAndC" className="text-gray-700 font-medium">
//               I accept the terms and conditions
//             </Label>
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="button"
//             onClick={handleSubmit}
//             className={`w-full text-white py-2 rounded-xl ${
//               !isChecked ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={!isChecked || isFormFilled}
//           >
//             {isFormFilled ? "Already Submitted" : "Submit"}
//           </Button>
//         </CardContent>
//         {/* extra button */}
//         <div className="px-4 ">
//           <Button className="w-1/4 float-start" onClick={previousButton}>
//             Previous
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default TAndCForm;

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import useBasicInformationForm from "@/store/BasicInformationFormStore/form";
import useEducationInformationForm from "@/store/EducationInformationFormStore/from";
import useAddressInformationForm from "@/store/AddressInformationFormStore/form";
import useTermsAndConditionsForm from "@/store/TermsAndConditionsFormStore/form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function TAndCForm() {
  const taccount = useTranslations('account')
  const ttandc = useTranslations('tandc')
  const router = useRouter();

  const basicinfo = useBasicInformationForm((s) => s.basic);
  const eduinfo = useEducationInformationForm((s) => s.basic);
  const addinfo = useAddressInformationForm((s) => s.basic);
  const { addFormValues, basic: tanscinfo } = useTermsAndConditionsForm();

  const [isChecked, setIsChecked] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = () => {
    addFormValues({ filled: true });
    setIsFormFilled(true);
    if (!basicinfo) {
      router.push("/personal-info/basicinformationform");
    } else if (!eduinfo) {
      router.push("/personal-info/educationinformationform");
    } else if (!addinfo) {
      router.push("/residential-info/addressinformationform");
    } else {
      router.push("/dashboard");
    }

    toast.success("Form submitted successfully!");
  };

  const previousButton = () => {
    router.push("/residential-info/addressinformationform");
  };

  useEffect(() => {
    if (tanscinfo?.filled) {
      setIsChecked(true);
      setIsFormFilled(true);
    }
  }, [tanscinfo]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white px-4 py-8">
      <Card className="w-full max-w-xl border border-gray-300 shadow-lg rounded-3xl">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-center text-3xl font-semibold text-gray-800">
            {ttandc('header.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* T&C Text */}
          <div className="space-y-4 text-gray-600">
            <p className="font-semibold text-gray-800">
              {ttandc('title')}
            </p>
            <ul className="list-disc pl-5">
              <li>{ttandc('line1')}</li>
              <li>{ttandc('line2')}</li>
              <li>{ttandc('line3')}</li>
              <li>{ttandc('line4')}</li>
              <li>{ttandc('line5')}</li>
            </ul>
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="acceptTAndC"
              checked={isChecked}
              onChange={handleCheckboxChange}
              disabled={isFormFilled}
              className="h-5 w-5 text-black border-gray-300 rounded"
            />
            <Label htmlFor="acceptTAndC" className="text-gray-700 font-medium">
              {ttandc('checkbtn')}
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isChecked || isFormFilled}
            className="w-full text-white py-2 rounded-xl"
          >
            {isFormFilled ? ttandc('tandcsubmitbtn') : taccount("submit")}
          </Button>
        </CardContent>

        {/* Previous Button */}
        <div className="px-4">
          <Button className="w-1/4" onClick={previousButton}>
            {taccount('previous')}
          </Button>
        </div>
      </Card>
    </div>
  );
}
