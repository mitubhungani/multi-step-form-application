"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useBasicInformationForm from "@/store/BasicInformationFormStore/form";

export default function Validation({
  children,
}: {
  children: React.ReactNode;
}) {
    const basicInfo = useBasicInformationForm((s) => s.basic);
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const data = basicInfo
    console.log(data);
    
    if (!data) {
        router.replace("/personal-info/basicinformationform");
    } else {
        router.replace('/personal-info/educationinformationform');
      setIsValid(true);
    }
  }, []);

  if (isValid === null) return null;

  return <>{children}</>;
}
