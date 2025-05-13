"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";
import { Locale, routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcher({ defaultValue, label }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const onChange = (nextLocale: string) => {
    router.replace(
      { pathname },
      { locale: nextLocale as Locale }
    );
  };


  return (
    <div>
      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] cursor-pointer" aria-label={label}>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {routing.locales.map((locale) => (
            <SelectItem key={locale} value={locale} className="cursor-pointer">
              {locale.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
