"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCreateAccountForm from "@/store/Create-Account-Store/form";

export default function Validation({
  children,
}: {
  children: React.ReactNode;
}) {
    const basicInfo = useCreateAccountForm((s) => s.basic);
    console.log("basicInfo", basicInfo);
    
    
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    
    if (!basicInfo) {
      router.replace("/personal-info/create-account");
    } else {
      router.replace('/personal-info/education-info');
      setIsValid(true);
    }
  }, [basicInfo]);

  if (isValid === null) return null;

  return <>{children}</>;
}
