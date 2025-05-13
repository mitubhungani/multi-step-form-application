"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAddressInfoForm from "@/store/Address-Info-Store/form";

export default function Validation({
  children,
}: {
  children: React.ReactNode;
}) {
    const addressInfo = useAddressInfoForm((s) => s.basic);
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!addressInfo) {
      router.replace("/residential-info/address-info");
    } else {
        router.replace('/residential-info/terms&conditions');
      setIsValid(true);
    }
  }, [addressInfo]);

  if (isValid === null) return null;

  return <>{children}</>;
}
