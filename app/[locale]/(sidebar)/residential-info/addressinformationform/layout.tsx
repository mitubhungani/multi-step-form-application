"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useEducationInformationForm from "@/store/EducationInformationFormStore/from";

export default function Validation({
  children,
}: {
  children: React.ReactNode;
}) {
    const eduInfo = useEducationInformationForm((s) => s.basic);
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const data = eduInfo
    if (!data) {
        router.replace('/personal-info/educationinformationform');
    } else {
        router.replace('/residential-info/addressinformationform');
      setIsValid(true);
    }
  }, []);

  if (isValid === null) return null;

  return <>{children}</>;
}
