// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from "@/components/ui/table";
// import { toast } from "sonner";

// import useBasicInformationForm from "@/store/BasicInformationFormStore/form";
// import useAddressInformationForm from "@/store/AddressInformationFormStore/form";
// import useTermsAndConditionsForm from "@/store/TermsAndConditionsFormStore/form";
// import useEducationInformationForm from "@/store/EducationInformationFormStore/from";

// const Dashboard = () => {
//   const router = useRouter();

//   const formInfo = {
//     basic: {
//       data: useBasicInformationForm((s) => s.basic),
//       reset: useBasicInformationForm((s) => s.resetForm),
//     },
//     education: {
//       data: useEducationInformationForm((s) => s.basic),
//       reset: useEducationInformationForm((s) => s.resetForm),
//     },
//     address: {
//       data: useAddressInformationForm((s) => s.basic),
//       reset: useAddressInformationForm((s) => s.resetForm),
//     },
//     terms: {
//       data: useTermsAndConditionsForm((s) => s.basic),
//       reset: useTermsAndConditionsForm((s) => s.resetForm),
//     },
//   };

//   console.log(formInfo.basic.data?.filled);

//   const navigateTo = (path: string) => router.push(path);

//   const renderTable = (
//     title: string,
//     data: any,
//     filled: boolean | undefined,
//     path: string
//   ) => (
//     <div className="mb-8 border rounded-md p-4 shadow-sm bg-white">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

//         {filled && (
//         <Button variant="outline" onClick={() => navigateTo(path)}>
//           View Details
//         </Button>
//       )}
//       </div>

//       {filled ? (
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 {data &&
//                   Object.keys(data)
//                     .filter((key) => key !== "filled")
//                     .map((key) => (
//                       <TableHead key={key} className="capitalize text-gray-600">
//                         {key}
//                       </TableHead>
//                     ))}
//                 <TableHead className="text-gray-600">Status</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               <TableRow>
//                 {data &&
//                   Object.entries(data).map(([key, val]) =>
//                     key === "filled" ? null : (
//                       <TableCell key={key} className="text-gray-700">
//                         {String(val)}
//                       </TableCell>
//                     )
//                   )}
//                 <TableCell className="text-green-600 font-medium">
//                   Filled
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </div>
//       ) : (
//         <p className="text-red-500 italic">Status: Not Filled</p>
//       )}
//     </div>
//   );

//   // Progress bar data
//   const totalForms = 4;
//   const filledForms = [
//     formInfo.basic.data?.filled,
//     formInfo.education.data?.filled,
//     formInfo.address.data?.filled,
//     formInfo.terms.data?.filled,
//   ].filter(Boolean).length;
//   const percentage = Math.round((filledForms / totalForms) * 100);

//   //  Continue button logic
//   const completeForm = () => {
//     if (!formInfo.basic.data?.filled) {
//       navigateTo("/personal-info/basicinformationform");
//     } else if (!formInfo.education.data?.filled) {
//       navigateTo("/personal-info/educationinformationform");
//     } else if (!formInfo.address.data?.filled) {
//       navigateTo("/residential-info/addressinformationform");
//     } else {
//       navigateTo("/residential-info/termsandconditionsform");
//     }
//   };

//   const resetForm = () => {
//     formInfo.basic.reset();
//     formInfo.education.reset();
//     formInfo.address.reset();
//     formInfo.terms.reset();
//     toast.success("Forms reset successfully!");
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       {/* Progress Section */}
//       <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">
//           Form Completion Status
//         </h2>
//         <div className="flex items-center gap-4 mb-6">
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className={`h-2.5 rounded-full ${
//                 percentage === 100 ? "bg-green-600" : "bg-blue-500"
//               }`}
//               style={{ width: `${percentage}%` }}
//             ></div>
//           </div>
//           <span className="text-sm font-medium text-gray-700">
//             {percentage}% ({filledForms}/{totalForms})
//           </span>
//         </div>

//         <div className="flex gap-4">
//           <Button
//             onClick={completeForm}
//             disabled={percentage === 100}
//             className={
//               percentage === 100 ? "opacity-50 cursor-not-allowed" : ""
//             }
//           >
//             {percentage === 100 ? "Form Complete" : "Continue Filling Form"}
//           </Button>
//           <Button variant="destructive" onClick={resetForm}>
//             Reset Forms
//           </Button>
//         </div>
//       </div>

//       {/* Personal Info Tables */}
//       <div className="mb-8">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">Personal Info</h2>
//         {renderTable(
//           "Basic Information",
//           formInfo.basic.data,
//           formInfo.basic.data?.filled,
//           "/personal-info/basicinformationform"
//         )}
//         {renderTable(
//           "Education Information",
//           formInfo.education.data,
//           formInfo.education.data?.filled,
//           "/personal-info/educationinformationform"
//         )}
//       </div>

//       {/* Residential Info Tables */}
//       <div>
//         <h2 className="text-xl font-bold mb-4 text-gray-800">
//           Residential Info
//         </h2>
//         {renderTable(
//           "Address Information",
//           formInfo.address.data,
//           formInfo.address.data?.filled,
//           "/residential-info/addressinformationform"
//         )}
//         {renderTable(
//           "Terms & Conditions",
//           { Accepted: formInfo.terms.data?.filled ? "Yes" : "No" },
//           formInfo.terms.data?.filled,
//           "/residential-info/termsandconditionsform"
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaRegEye } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import useBasicInformationForm from "@/store/BasicInformationFormStore/form";
import useAddressInformationForm from "@/store/AddressInformationFormStore/form";
import useTermsAndConditionsForm from "@/store/TermsAndConditionsFormStore/form";
import useEducationInformationForm from "@/store/EducationInformationFormStore/from";

const Dashboard = () => {
  const router = useRouter();

  const formInfo = {
    basic: {
      data: useBasicInformationForm((s) => s.basic),
      reset: useBasicInformationForm((s) => s.resetForm),
    },
    education: {
      data: useEducationInformationForm((s) => s.basic),
      reset: useEducationInformationForm((s) => s.resetForm),
    },
    address: {
      data: useAddressInformationForm((s) => s.basic),
      reset: useAddressInformationForm((s) => s.resetForm),
    },
    terms: {
      data: useTermsAndConditionsForm((s) => s.basic),
      reset: useTermsAndConditionsForm((s) => s.resetForm),
    },
  };

  const navigateTo = (path: string) => router.push(path);

  const totalForms = 4;
  const filledForms = [
    formInfo.basic.data?.filled,
    formInfo.education.data?.filled,
    formInfo.address.data?.filled,
    formInfo.terms.data?.filled,
  ].filter(Boolean).length;

  const percentage = Math.round((filledForms / totalForms) * 100);

  const completeForm = () => {
    if (!formInfo.basic.data?.filled) {
      navigateTo("/personal-info/basicinformationform");
    } else if (!formInfo.education.data?.filled) {
      navigateTo("/personal-info/educationinformationform");
    } else if (!formInfo.address.data?.filled) {
      navigateTo("/residential-info/addressinformationform");
    } else {
      navigateTo("/residential-info/termsandconditionsform");
    }
  };

  const resetForm = () => {
    formInfo.basic.reset();
    formInfo.education.reset();
    formInfo.address.reset();
    formInfo.terms.reset();
    toast.success("Forms reset successfully!");
  };

  const renderFormRow = (
    title: string,
    filled: boolean | undefined,
    path: string
  ) => (
    <div className="flex justify-between items-center py-2 px-4 border rounded-lg mb-3">
      <span className="text-sm font-medium text-gray-800">{title}</span>
      <div className="flex items-center gap-3">
        <span
          className={`text-sm ${filled ? "text-green-600" : "text-red-500"}`}
        >
          {filled ? "Filled ✅" : "Not Done ❌"}
        </span>

        {filled && (
          <Button variant="outline" onClick={() => navigateTo(path)}>
            View <FaRegEye />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Progress bar */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Form Completion Status
        </h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                percentage === 100 ? "bg-green-600" : "bg-blue-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {percentage}% ({filledForms}/{totalForms})
          </span>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={completeForm}
            disabled={percentage === 100}
            className={
              percentage === 100 ? "opacity-50 cursor-not-allowed" : ""
            }
          >
            {percentage === 100 ? "Form Complete" : "Continue Form"}
          </Button>
          <Button variant="destructive" onClick={resetForm}>
            Reset Forms
          </Button>
        </div>
      </div>

      {/* Dropdown Sections */}
      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="personal-info">
          <AccordionTrigger className="text-lg font-semibold">
            Personal Info
          </AccordionTrigger>
          <AccordionContent>
            {renderFormRow(
              "Basic Information",
              formInfo.basic.data?.filled,
              "/personal-info/basicinformationform"
            )}
            {renderFormRow(
              "Education Information",
              formInfo.education.data?.filled,
              "/personal-info/educationinformationform"
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="residential-info">
          <AccordionTrigger className="text-lg font-semibold">
            Residential Info
          </AccordionTrigger>
          <AccordionContent>
            {renderFormRow(
              "Address Information",
              formInfo.address.data?.filled,
              "/residential-info/addressinformationform"
            )}
            {renderFormRow(
              "Terms & Conditions",
              formInfo.terms.data?.filled,
              "/residential-info/termsandconditionsform"
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Dashboard;
