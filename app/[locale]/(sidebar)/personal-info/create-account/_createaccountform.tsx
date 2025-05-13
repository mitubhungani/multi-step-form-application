// ///personal-info/create-account
// "use client";

// import React, { useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useUserData } from "@/hooks/localstorage";

// // Schema
// const schema = z.object({
//   username: z.string().min(2, "Username must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
//   filled: z.boolean().default(false).optional(),
// });

// type FormData = z.infer<typeof schema>;

// const BasicInformationForm = () => {
//   const { address, education, terms } = useUserData();

//   const route = useRouter();

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const isFilled = watch("filled");

//   const onSubmit = (data: FormData) => {
//     const userData = JSON.parse(localStorage.getItem("User-Data") || "{}");

//     userData["personal-info"] = { ...userData["personal-info"],
//       basicinformationform: {
//         ...data,
//         filled: true,
//       },
//     };

//     localStorage.setItem("User-Data", JSON.stringify(userData));
//     if (!education?.filled) {
//       route.push("/personal-info/education-info");
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
//     if (isFilled) {
//       route.push("/personal-info/education-info");
//     }
//   };

//   useEffect(() => {
//     // if (typeof window !== "undefined") {
//     //   console.log(window);

//     const localData = JSON.parse(localStorage.getItem("User-Data") || "{}");
//     const formFilledData = localData["personal-info"]?.["basicinformationform"];
//     if (formFilledData) {
//       reset(formFilledData);
//     }
//     // }
//   }, [reset]);

//   return (
//     <div className="flex items-center justify-center min-h-[91.2vh] bg-gradient-to-br from-gray-100 to-white px-4 py-8">
//       <Card className="w-full max-w-xl border border-gray-300 shadow-lg rounded-3xl">
//         <CardHeader className="pb-2 border-b">
//           <CardTitle className="text-center text-3xl font-semibold text-gray-800">
//             Create Account
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-6 space-y-6">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Username */}
//             <div className="space-y-2">
//               <Label htmlFor="username" className="text-gray-700 font-medium">
//                 Username
//               </Label>
//               <Input
//                 id="username"
//                 placeholder="e.g. john_doe"
//                 {...register("username")}
//                 disabled={isFilled}
//               />
//               {errors.username && (
//                 <p className="text-sm text-red-600">
//                   {errors.username.message}
//                 </p>
//               )}
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-gray-700 font-medium">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="example@mail.com"
//                 {...register("email")}
//                 disabled={isFilled}
//               />
//               {errors.email && (
//                 <p className="text-sm text-red-600">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-gray-700 font-medium">
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 {...register("password")}
//                 disabled={isFilled}
//               />
//               {errors.password && (
//                 <p className="text-sm text-red-600">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Gender */}
//             <div className="space-y-2">
//               <Label className="text-gray-700 font-medium">Gender</Label>
//               <Controller
//                 name="gender"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     value={field.value}
//                     onValueChange={field.onChange}
//                     disabled={isFilled}
//                     className="flex gap-8"
//                   >
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="male" id="male" />
//                       <Label htmlFor="male">Male</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="female" id="female" />
//                       <Label htmlFor="female">Female</Label>
//                     </div>
//                   </RadioGroup>
//                 )}
//               />
//               {errors.gender && (
//                 <p className="text-sm text-red-600">{errors.gender.message}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               className="w-full text-white py-2 rounded-xl"
//               disabled={isFilled}
//             >
//               Submit
//             </Button>
//           </form>
//         </CardContent>

//         {/* extra button */}
//         <div className="px-4 ">
//           <Button
//             className="w-1/4 float-end"
//             disabled={!isFilled}
//             onClick={nextButton}
//           >
//             Next
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default BasicInformationForm;

"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { useUserData } from "@/hooks/localstorage";
import useCreateAccountForm from "@/store/Create-Account-Store/form";
import useEducationInfoForm from "@/store/Education-Info-Store/from";
import useAddressInfoForm from "@/store/Address-Info-Store/form";
import useTermsAndConditionsForm from "@/store/Terms&Conditions-Store/form";
import { useTranslations } from "next-intl";

// Schema
const schema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  filled: z.boolean().default(false).optional(),
});

type FormData = z.infer<typeof schema>;

const CreateAccountForm = () => {
  // const { address, education, terms } = useUserData();

  const tAccount = useTranslations("account");

  const { addFormValues, basic: basicinfo } = useCreateAccountForm();
  const eduinfo = useEducationInfoForm((s) => s.basic);
  const addinfo = useAddressInfoForm((s) => s.basic);
  const tandcinfo = useTermsAndConditionsForm((s) => s.basic);

  const route = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const isFilled = watch("filled");

  const onSubmit = (data: FormData) => {
    addFormValues({ ...data, filled: true });

    if (!eduinfo) {
      return route.push("/personal-info/education-info");
    } else if (!addinfo) {
      return route.push("/residential-info/address-info");
    } else if (!tandcinfo) {
      return route.push("/residential-info/terms&conditions");
    } else {
      route.push("/dashboard");
    }
  };

  const nextButton = () => {
    if (isFilled) {
      route.push("/personal-info/education-info");
    }
  };

  useEffect(() => {
    if (basicinfo) {
      reset({
        ...basicinfo,
        gender: basicinfo.gender as "male" | "female" | undefined,
      });
    }
  }, [basicinfo, reset]);

  return (
    <div className="flex items-center justify-center min-h-[91.2vh] bg-gradient-to-br from-gray-100 to-white px-4 py-8">
      <Card className="w-full max-w-xl border border-gray-300 shadow-lg rounded-3xl">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-center text-3xl font-semibold text-gray-800">
            {tAccount("header.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                {tAccount("username")}
              </Label>
              <Input
                id="username"
                placeholder="e.g. john_doe"
                {...register("username")}
                disabled={isFilled}
              />
              {errors.username && (
                <p className="text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                {tAccount("email")}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                {...register("email")}
                disabled={isFilled}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                {tAccount("password")}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isFilled}
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">
                {tAccount("gender")}
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isFilled}
                    className="flex gap-8"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">{tAccount("male")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">{tAccount("female")}</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.gender && (
                <p className="text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-white py-2 rounded-xl"
              disabled={isFilled}
            >
              {tAccount("submit")}
            </Button>
          </form>
        </CardContent>

        {/* extra button */}
        <div className="px-4 ">
          <Button
            className="w-1/4 float-end"
            disabled={!isFilled}
            onClick={nextButton}
          >
            {tAccount("nextbtn")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreateAccountForm;
