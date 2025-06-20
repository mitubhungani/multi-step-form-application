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
import { CreateAccountForm } from "@/types/type";

const CreateAccountFormm = () => {
  const tAccount = useTranslations("account");
  const tError = useTranslations("account.errors");
  const tPlaceholder = useTranslations("account.placeholder");

  const route = useRouter();

  const { addFormValues, basic: basicinfo } = useCreateAccountForm();
  const eduinfo = useEducationInfoForm((s) => s.basic);
  const addinfo = useAddressInfoForm((s) => s.basic);
  const tandcinfo = useTermsAndConditionsForm((s) => s.basic);

  const schema = z.object({
    username: z.string().min(2, { message: tError("username_min") }),
    email: z.string().email({ message: tError("email_invalid") }),
    password: z.string().min(6, { message: tError("password_min") }),
    gender: z.enum(["male", "female"], {
      required_error: tError("gender_required"),
    }),
    filled: z.boolean().default(false).optional(),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateAccountForm>({
    resolver: zodResolver(schema),
  });

  const isFilled = watch("filled");

  const onSubmit = (data: CreateAccountForm) => {
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
      reset({ ...basicinfo });
    }
  }, [basicinfo, reset]);
  

  return (
    <div className="flex items-center justify-center min-h-[91.2vh]  px-4 ">
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
                placeholder={tPlaceholder("username")}
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
                placeholder={tPlaceholder("email")}
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
                placeholder={tPlaceholder("password")}
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

export default CreateAccountFormm;
