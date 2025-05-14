// "use client";

// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import { useUserData } from "@/hooks/localstorage";

// // Updated Schema
// const educationSchema = z.object({
//   degree: z.enum(["bca", "mca", "btech", "bcom"], {
//     required_error: "Degree is required",
//   }),
//   university: z.string().min(1, "University name is required"),
//   passingYear: z.coerce.number().min(1900, "Enter valid year"),
//   cgpa: z.coerce.number().refine((val) => val >= 0 && val <= 10, {
//     message: "CGPA must be a number between 0 and 10",
//   }),
//   filled: z.boolean().default(false).optional(),
// });

// type EducationFormData = z.infer<typeof educationSchema>;

// const EducationInfoForm = () => {
//   const { address, terms, basic } = useUserData();

//   const route = useRouter();

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm<EducationFormData>({
//     resolver: zodResolver(educationSchema),
//   });

//   const [formData, setFormData] = useState<EducationFormData>(
//     {} as EducationFormData
//   );
//   // console.log(formData);

//   const onSubmit = (data: EducationFormData) => {
//     const userData = JSON.parse(localStorage.getItem("User-Data") || "{}");

//     userData["personal-info"] = {
//       ...userData["personal-info"],
//       educationinformationform: {
//         ...data,
//         filled: true,
//       },
//     };
//     localStorage.setItem("User-Data", JSON.stringify(userData));
//     if (!basic?.filled) {
//       route.push("/personal-info/create-account");
//       return null;
//     } else if (!address?.filled) {
//       route.push("/residential-info/address-info");
//       return null;
//     } else if (!terms?.filled) {
//       route.push("/residential-info/terms&conditions");
//       return null;
//     } else {
//       route.push("/dashboard");
//     }
//   };

//   const nextButton = () => {
//     if (formData?.filled) {
//       route.push("/residential-info/address-info");
//     }
//   };

//   const previousButton = () => {
//     route.push("/personal-info/create-account");
//   };

//   useEffect(() => {
//     const localData = JSON.parse(localStorage.getItem("User-Data") || "{}");
//     const formFilledData =
//       localData["personal-info"]?.["educationinformationform"];
//     if (formFilledData) {
//       setFormData(formFilledData);
//       reset(formFilledData);
//     }
//   }, []);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <Card className="w-full max-w-xl border border-gray-300 shadow-lg rounded-2xl">
//         <CardHeader>
//           <CardTitle className="text-center text-2xl font-semibold text-gray-800">
//             Education Information
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             {/* Degree */}
//             <div className="space-y-1">
//               <Label htmlFor="degree">Degree</Label>
//               <Controller
//                 name="degree"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     onValueChange={field.onChange}
//                     value={field.value || formData?.degree}
//                     disabled={formData?.filled}
//                   >
//                     <SelectTrigger id="degree">
//                       <SelectValue placeholder="Select your degree" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="bca">BCA</SelectItem>
//                       <SelectItem value="mca">MCA</SelectItem>
//                       <SelectItem value="btech">B.Tech</SelectItem>
//                       <SelectItem value="bcom">B.Com</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//               {errors.degree && (
//                 <p className="text-sm text-red-600">{errors.degree.message}</p>
//               )}
//             </div>

//             {/* University */}
//             <div className="space-y-1">
//               <Label htmlFor="university">University</Label>
//               <Input
//                 disabled={formData?.filled}
//                 id="university"
//                 placeholder="Enter university name"
//                 {...register("university")}
//               />
//               {errors.university && (
//                 <p className="text-sm text-red-600">
//                   {errors.university.message}
//                 </p>
//               )}
//             </div>

//             {/* Passing Year */}
//             <div className="space-y-1">
//               <Label htmlFor="passingYear">Passing Year</Label>
//               <Input
//                 disabled={formData?.filled}
//                 id="passingYear"
//                 type="number"
//                 max={new Date().getFullYear()}
//                 placeholder="Enter passing year"
//                 {...register("passingYear")}
//               />
//               {errors.passingYear && (
//                 <p className="text-sm text-red-600">
//                   {errors.passingYear.message}
//                 </p>
//               )}
//             </div>

//             {/* CGPA */}
//             <div className="space-y-1">
//               <Label htmlFor="cgpa">CGPA</Label>
//               <Input
//                 disabled={formData?.filled}
//                 id="cgpa"
//                 type="number"
//                 min="0"
//                 max="10"
//                 step="0.01"
//                 placeholder="e.g. 8.50"
//                 {...register("cgpa")}
//               />
//               {errors.cgpa && (
//                 <p className="text-sm text-red-600">{errors.cgpa.message}</p>
//               )}
//             </div>

//             {/* Submit */}
//             <Button
//               type="submit"
//               className="w-full text-white"
//               disabled={formData?.filled}
//             >
//               Submit
//             </Button>
//           </form>
//         </CardContent>
//         {/* extra button */}
//         <div className="px-4 flex justify-between">
//           <Button className="w-1/4 " onClick={previousButton}>
//             Previous
//           </Button>
//           <Button
//             className="w-1/4 "
//             disabled={!formData?.filled}
//             onClick={nextButton}
//           >
//             Next
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default EducationInfoForm;

"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

import useCreateAccountForm from "@/store/Create-Account-Store/form";
import useEducationInfoForm from "@/store/Education-Info-Store/from";
import useAddressInfoForm from "@/store/Address-Info-Store/form";
import useTermsAndConditionsForm from "@/store/Terms&Conditions-Store/form";
import { useTranslations } from "next-intl";
import { EducationInformationForm } from "@/types/type";

export default function EducationInfoForm() {
  const tEducation = useTranslations("education");
  const tError = useTranslations("education.errors");
  const taccount = useTranslations("account");
  const router = useRouter();

  const basicInfo = useCreateAccountForm((s) => s.basic);
  const { basic: eduInfo, addFormValues } = useEducationInfoForm();
  const addressInfo = useAddressInfoForm((s) => s.basic);
  const termsInfo = useTermsAndConditionsForm((s) => s.basic);

  const educationSchema = z.object({
    degree: z.enum(["bca", "mca", "btech", "bcom"], {
      required_error: tError("degree_required"),
    }),
    university: z.string().min(1, { message: tError("university_required") }),
    passingYear: z.coerce
      .number()
      .min(1900, { message: tError("passing_year_invalid") })
      .max(new Date().getFullYear(), {
        message: tError("passing_year_invalid"),
      }),
    cgpa: z.coerce
      .number()
      .min(0, { message: tError("cgpa_invalid") })
      .max(10, { message: tError("cgpa_invalid") }),
    filled: z.boolean().optional(),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EducationInformationForm>({
    resolver: zodResolver(educationSchema),
  });

  const onSubmit = (data: EducationInformationForm) => {
    addFormValues({ ...data, filled: true });

    if (!basicInfo) {
      router.push("/personal-info/create-account");
    } else if (!addressInfo) {
      router.push("/residential-info/address-info");
    } else if (!termsInfo) {
      router.push("/residential-info/terms&conditions");
    } else {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (eduInfo) {
      reset({
        ...eduInfo,
        degree: eduInfo.degree as "bca" | "mca" | "btech" | "bcom" | undefined,
      });
    }
  }, [eduInfo, reset]);
  // console.log(eduInfo);

  return (
    <div className="flex items-center justify-center min-h-[91.2vh]  px-4">
      <Card className="w-full max-w-xl border border-gray-300 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-800">
            {tEducation("header.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Degree */}
            <div className="space-y-1">
              <Label htmlFor="degree">{tEducation("degree")}</Label>
              <Controller
                name="degree"
                control={control}
                render={({ field }) => (
                  <Select
                    value={eduInfo?.degree ? eduInfo?.degree : field.value}
                    onValueChange={field.onChange}
                    disabled={eduInfo?.filled}
                  >
                    <SelectTrigger id="degree">
                      <SelectValue placeholder="Select your degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bca">BCA</SelectItem>
                      <SelectItem value="mca">MCA</SelectItem>
                      <SelectItem value="btech">B.Tech</SelectItem>
                      <SelectItem value="bcom">B.Com</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.degree && (
                <p className="text-sm text-red-600">{errors.degree.message}</p>
              )}
            </div>

            {/* University */}
            <div className="space-y-1">
              <Label htmlFor="university">{tEducation("university")}</Label>
              <Input
                id="university"
                {...register("university")}
                disabled={eduInfo?.filled}
                placeholder="University name"
              />
              {errors.university && (
                <p className="text-sm text-red-600">
                  {errors.university.message}
                </p>
              )}
            </div>

            {/* Passing Year */}
            <div className="space-y-1">
              <Label htmlFor="passingYear">{tEducation("passing-year")}</Label>
              <Input
                id="passingYear"
                max={new Date().getFullYear()}
                {...register("passingYear", { valueAsNumber: true })}
                disabled={eduInfo?.filled}
                placeholder="Passing Year"
              />
              {errors.passingYear && (
                <p className="text-sm text-red-600">
                  {errors.passingYear.message}
                </p>
              )}
            </div>

            {/* CGPA */}
            <div className="space-y-1">
              <Label htmlFor="cgpa">{tEducation("cgpa")}</Label>
              <Input
                id="cgpa"
                step="0.01"
                {...register("cgpa", { valueAsNumber: true })}
                disabled={eduInfo?.filled}
                placeholder="CGPA"
              />
              {errors.cgpa && (
                <p className="text-sm text-red-600">{errors.cgpa.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full text-white"
              disabled={eduInfo?.filled}
            >
              {taccount("submit")}
            </Button>
          </form>
        </CardContent>

        {/* navigation buttons */}
        <div className="px-4 flex justify-between py-2">
          <Button onClick={() => router.push("/personal-info/create-account")}>
            {taccount("previous")}
          </Button>
          <Button
            onClick={() =>
              eduInfo?.filled && router.push("/residential-info/address-info")
            }
            disabled={!eduInfo?.filled}
          >
            {taccount("nextbtn")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
