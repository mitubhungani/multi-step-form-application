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

// import useCreateAccountForm from "@/store/BasicInformationFormStore/form";
// import useAddressInfoForm from "@/store/AddressInformationFormStore/form";
// import useTermsAndConditionsForm from "@/store/TermsAndConditionsFormStore/form";
// import useEducationInfoForm from "@/store/EducationInformationFormStore/from";

// const Dashboard = () => {
//   const router = useRouter();

//   const formInfo = {
//     basic: {
//       data: useCreateAccountForm((s) => s.basic),
//       reset: useCreateAccountForm((s) => s.resetForm),
//     },
//     education: {
//       data: useEducationInfoForm((s) => s.basic),
//       reset: useEducationInfoForm((s) => s.resetForm),
//     },
//     address: {
//       data: useAddressInfoForm((s) => s.basic),
//       reset: useAddressInfoForm((s) => s.resetForm),
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
//       navigateTo("/personal-info/create-account");
//     } else if (!formInfo.education.data?.filled) {
//       navigateTo("/personal-info/education-info");
//     } else if (!formInfo.address.data?.filled) {
//       navigateTo("/residential-info/address-info");
//     } else {
//       navigateTo("/residential-info/terms&conditions");
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
//           "/personal-info/create-account"
//         )}
//         {renderTable(
//           "Education Information",
//           formInfo.education.data,
//           formInfo.education.data?.filled,
//           "/personal-info/education-info"
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
//           "/residential-info/address-info"
//         )}
//         {renderTable(
//           "Terms & Conditions",
//           { Accepted: formInfo.terms.data?.filled ? "Yes" : "No" },
//           formInfo.terms.data?.filled,
//           "/residential-info/terms&conditions"
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

import useCreateAccountForm from "@/store/Create-Account-Store/form";
import useAddressInfoForm from "@/store/Address-Info-Store/form";
import useTermsAndConditionsForm from "@/store/Terms&Conditions-Store/form";
import useEducationInfoForm from "@/store/Education-Info-Store/from";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Dashboard = () => {
  const t = useTranslations("dashboard");
  const router = useRouter();

  const formInfo = {
    createaccount: {
      data: useCreateAccountForm((s) => s.basic),
      reset: useCreateAccountForm((s) => s.resetForm),
    },
    education: {
      data: useEducationInfoForm((s) => s.basic),
      reset: useEducationInfoForm((s) => s.resetForm),
    },
    address: {
      data: useAddressInfoForm((s) => s.basic),
      reset: useAddressInfoForm((s) => s.resetForm),
    },
    terms: {
      data: useTermsAndConditionsForm((s) => s.basic),
      reset: useTermsAndConditionsForm((s) => s.resetForm),
    },
  };

  const navigateTo = (path: string) => router.push(path);

  const totalForms = 4;
  const filledForms = [
    formInfo.createaccount.data?.filled,
    formInfo.education.data?.filled,
    formInfo.address.data?.filled,
    formInfo.terms.data?.filled,
  ].filter(Boolean).length;

  const percentage = Math.round((filledForms / totalForms) * 100);

  const completeForm = () => {
    if (!formInfo.createaccount.data?.filled) {
      navigateTo("/personal-info/create-account");
    } else if (!formInfo.education.data?.filled) {
      navigateTo("/personal-info/education-info");
    } else if (!formInfo.address.data?.filled) {
      navigateTo("/residential-info/address-info");
    } else {
      navigateTo("/residential-info/terms&conditions");
    }
  };

  const resetForm = () => {
    formInfo.createaccount.reset();
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
    <div className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-lg my-3">
      <span className="text-sm font-medium text-gray-800">{title}</span>
      <div className="flex items-center gap-3">
        <span
          className={`text-sm ${filled ? "text-green-600" : "text-red-500"}`}
        >
          {filled ? t("status.filled") : t("status.notdone")}
        </span>

        {filled && (
          <Button variant="outline" onClick={() => navigateTo(path)}>
            {t("buttons.view")} <FaRegEye />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 ">
      {/* Progress bar */}
      <div className="bg-gray-50 rounded-lg border p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {t("progreshbar.title")}
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
            {percentage === 100
              ? t("progreshbar.completebtn")
              : t("progreshbar.continueformbtn")}
          </Button>
          <Button variant="destructive" onClick={resetForm}>
            {t("progreshbar.resetbtn")}
          </Button>
        </div>
      </div>
              <div>
                <h1 className="text-3xl font-semibold">{t("form.title")}</h1>
              </div>
      {/* Dropdown Sections */}
      <Accordion type="multiple" className="space-y-4">
        <AccordionItem
          value="personal-info"
          className="my-4 border rounded-xl p-3"
        >
          <AccordionTrigger className="text-lg font-semibold">
            {t("personalinfo.title")}
          </AccordionTrigger>
          <AccordionContent>
            <Link href="/personal-info/create-account">
              {renderFormRow(
                t("personalinform.title"),
                formInfo.createaccount.data?.filled,
                "/personal-info/create-account"
              )}
            </Link>
            <Link href="/personal-info/education-info">
              {renderFormRow(
                t("educationinfo.title"),
                formInfo.education.data?.filled,
                "/personal-info/education-info"
              )}
            </Link>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="residential-info"
          className="my-4 border rounded-xl p-3"
        >
          <AccordionTrigger className="text-lg font-semibold">
            {t("residentialinfo.title")}
          </AccordionTrigger>
          <AccordionContent>
            <Link href="/residential-info/address-info">
              {renderFormRow(
                t("addressinfo.title"),
                formInfo.address.data?.filled,
                "/residential-info/address-info"
              )}
            </Link>
            <Link href="/residential-info/terms&conditions">
              {renderFormRow(
                t("termsandconditions.title"),
                formInfo.terms.data?.filled,
                "/residential-info/terms&conditions"
              )}
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Dashboard;
