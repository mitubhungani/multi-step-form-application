"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAddressInformationForm from "@/store/AddressInformationFormStore/form";

export default function Validation({
  children,
}: {
  children: React.ReactNode;
}) {
    const addressInfo = useAddressInformationForm((s) => s.basic);
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const data = addressInfo
    if (!data) {
      router.replace("/residential-info/addressinformationform");
    } else {
        router.replace('/residential-info/termsandconditionsform');
      setIsValid(true);
    }
  }, []);

  if (isValid === null) return null;

  return <>{children}</>;
}
