"use client";

import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import useAddressInfoForm from "@/store/Address-Info-Store/form";
import useCreateAccountForm from "@/store/Create-Account-Store/form";
import useEducationInfoForm from "@/store/Education-Info-Store/from";
import useTermsAndConditionsForm from "@/store/Terms&Conditions-Store/form";
import { useTranslations } from "next-intl";
import { AddressInformationForm } from "@/types/type";

const AddressInfoForm = () => {
  // multilanguage support
  const taddress = useTranslations("address");
  const taccount = useTranslations("account");
  const tError = useTranslations("address.errors");
  const tPlaceholder = useTranslations("address.placeholder");

  // route navigation
  const router = useRouter();

  //zustand form values
  const basicinfo = useCreateAccountForm((s) => s.basic);
  const eduinfo = useEducationInfoForm((s) => s.basic);
  const tandcinfo = useTermsAndConditionsForm((s) => s.basic);
  const addFormValues = useAddressInfoForm((s) => s.addFormValues);
  const addinfo = useAddressInfoForm((s) => s.basic);

  // zode form validation
  const schema = z.object({
    address: z.string().min(1, { message: tError("address_required") }),
    city: z.string().min(1, { message: tError("city_required") }),
    state: z.string().min(1, { message: tError("state_required") }),
    postalCode: z.coerce
      .number()
      .gte(10000, { message: tError("postalcode_invalid") })
      .lte(999999, { message: tError("postalcode_invalid") }),

    filled: z.boolean().default(false).optional(),
  });

  // form initial values
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressInformationForm>({
    resolver: zodResolver(schema),
  });

  // form field values
  const isFilled = addinfo?.filled ?? false;

  // form submission
  const onSubmit = useCallback(
    (data: AddressInformationForm) => {
      addFormValues({ ...data, filled: true });

      if (!basicinfo) {
        router.push("/personal-info/create-account");
      } else if (!eduinfo) {
        router.push("/personal-info/education-info");
      } else if (!tandcinfo) {
        router.push("/residential-info/terms&conditions");
      } else {
        router.push("/dashboard");
      }
    },
    [addFormValues, basicinfo, eduinfo, tandcinfo, router]
  );

  // form navigation
  const nextButton = useCallback(() => {
    if (isFilled) {
      router.push("/residential-info/terms&conditions");
    }
  }, [isFilled, router]);

  // form navigation
  const previousButton = useCallback(() => {
    router.push("/personal-info/education-info");
  }, [router]);

  // reset form values on page change
  useEffect(() => {
    if (addinfo) {
      reset(addinfo);
    }
  }, [addinfo, reset]);

  return (
    <div className="flex items-center justify-center min-h-[91.2vh]  px-4">
      <Card className="w-full max-w-xl border border-gray-300 shadow-lg rounded-3xl">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-center text-3xl font-semibold text-gray-800">
            {taddress("header.title")}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-700 font-medium">
                {taddress("addresslabel")}
              </Label>
              <Input
                id="address"
                placeholder={tPlaceholder("address")}
                disabled={isFilled}
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city" className="text-gray-700 font-medium">
                {taddress("city")}
              </Label>
              <Input
                id="city"
                placeholder={tPlaceholder("city")}
                disabled={isFilled}
                {...register("city")}
              />
              {errors.city && (
                <p className="text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state" className="text-gray-700 font-medium">
                {taddress("state")}
              </Label>
              <Input
                id="state"
                placeholder={tPlaceholder("state")}
                disabled={isFilled}
                {...register("state")}
              />
              {errors.state && (
                <p className="text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>

            {/* Postal Code */}
            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-gray-700 font-medium">
                {taddress("postalcode")}
              </Label>
              <Input
                id="postalCode"
                placeholder={tPlaceholder("postalcode")}
                disabled={isFilled}
                {...register("postalCode")}
              />
              {errors.postalCode && (
                <p className="text-sm text-red-600">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-white py-2 rounded-xl"
              disabled={isFilled}
            >
              {taccount("submit")}
            </Button>
          </form>
        </CardContent>

        {/* Navigation Buttons */}
        <div className="px-4 flex justify-between pb-4">
          <Button className="w-1/4" onClick={previousButton}>
            {taccount("previous")}
          </Button>
          <Button className="w-1/4" disabled={!isFilled} onClick={nextButton}>
            {taccount("nextbtn")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddressInfoForm;
