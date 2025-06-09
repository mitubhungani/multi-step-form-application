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
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

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
    <div className="flex items-center justify-between px-5 py-4 bg-gray-100 rounded-xl my-4">
      {/* Status Icon */}
      <div className="flex items-center gap-3">
        <div
          className={`text-2xl ${filled ? "text-green-600" : "text-red-500"}`}
        >
          {filled ? <IoCheckmarkDoneCircle /> : <IoIosCloseCircle />}
        </div>
        <span className="text-base font-semibold text-gray-700">{title}</span>
      </div>

      {/* Action Button */}
      <div>
        {filled && (
          <Button
            variant="outline"
            className="flex items-center gap-2 text-sm font-medium hover:bg-gray-100"
            onClick={() => navigateTo(path)}
          >
            <FaRegEye className="text-base" />
            {t("buttons.view")}
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
          {percentage <= 99 ? (
            <Button disabled variant="destructive" onClick={resetForm}>
              {t("progreshbar.resetbtn")}
            </Button>
          ) : (
            <Button variant="destructive" onClick={resetForm}>
              {t("progreshbar.resetbtn")}
            </Button>
          )}
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
