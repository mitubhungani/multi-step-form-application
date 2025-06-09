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
  const tPlaceholder = useTranslations("education.placeholder");
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
                      <SelectValue placeholder={tPlaceholder("degree")} />
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
                placeholder={tPlaceholder("university")}
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
                placeholder={tPlaceholder("passing-year")}
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
                placeholder={tPlaceholder("cgpa")}
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
