"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useEducationInfoForm from "@/store/Education-Info-Store/from";

export default function Validation({
  children,
}: {
  children: React.ReactNode;
}) {
    const eduInfo = useEducationInfoForm((s) => s.basic);
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!eduInfo) {
        router.replace('/personal-info/education-info');
    } else {
        router.replace('/residential-info/address-info');
      setIsValid(true);
    }
  }, [eduInfo]);

  if (isValid === null) return null;

  return <>{children}</>;
}
