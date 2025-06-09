"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import useCreateAccountForm from "@/store/Create-Account-Store/form";
import useEducationInfoForm from "@/store/Education-Info-Store/from";
import useAddressInfoForm from "@/store/Address-Info-Store/form";
import useTermsAndConditionsForm from "@/store/Terms&Conditions-Store/form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function TAndCForm() {
  const taccount = useTranslations('account')
  const ttandc = useTranslations('tandc')
  const router = useRouter();

  const basicinfo = useCreateAccountForm((s) => s.basic);
  const eduinfo = useEducationInfoForm((s) => s.basic);
  const addinfo = useAddressInfoForm((s) => s.basic);
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
      router.push("/personal-info/create-account");
    } else if (!eduinfo) {
      router.push("/personal-info/education-info");
    } else if (!addinfo) {
      router.push("/residential-info/address-info");
    } else {
      router.push("/dashboard");
    }

    toast.success("Form submitted successfully!");
  };

  const previousButton = () => {
    router.push("/residential-info/address-info");
  };

  useEffect(() => {
    if (tanscinfo?.filled) {
      setIsChecked(true);
      setIsFormFilled(true);
    }
  }, [tanscinfo]);

  return (
    <div className="flex items-center justify-center min-h-[91.2vh]  px-4">
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
