// "use client";

// import { ChevronRight, type LucideIcon } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";
// import Link from "next/link";
// import { Button } from "./ui/button";
// import useCreateAccountForm from "@/store/BasicInformationFormStore/form";
// import useEducationInfoForm from "@/store/EducationInformationFormStore/from";
// import useAddressInfoForm from "@/store/AddressInformationFormStore/form";
// import LocaleSwitcher from "./locale-switcher";
// import { useLocale } from "next-intl";
// // import useTermsAndConditionsForm from "@/store/TermsAndConditionsFormStore/form";

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string;
//     url: string;
//     icon?: LucideIcon;
//     isActive?: boolean;
//     items?: {
//       title: string;
//       url: string;
//     }[];
//   }[];
// }) {
//   const locale = useLocale();

//   const basicinfo = useCreateAccountForm((s) => s.basic);
//   const eduinfo = useEducationInfoForm((s) => s.basic);
//   const addinfo = useAddressInfoForm((s) => s.basic);
//   // const tandcinfo = useTermsAndConditionsForm((s) => s.basic);

//   const isFilled = (url: string) => {
//     switch (url) {
//       case "/personal-info/education-info":
//         return !Boolean(basicinfo);
//       case "/residential-info/address-info":
//         return !Boolean(eduinfo);
//       case "/residential-info/terms&conditions":
//         return !Boolean(addinfo);
//       default:
//     }
//   };

//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Forms</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible"
//           >
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {item.items?.map((Item) => (
//                     <SidebarMenuSubItem key={Item.title}>
//                       <SidebarMenuSubButton asChild>
//                         {isFilled(Item.url) ? (
//                           <Button variant="ghost">
//                             <span className="text-red-400">{Item.title}</span>
//                           </Button>
//                         ) : (
//                           <Link href={Item.url} className="text-black">
//                             {Item.title}
//                           </Link>
//                         )}
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}

//       {/* language */}
//         <LocaleSwitcher defaultValue={locale} label="Language">
//           <span>{locale}</span>
//         </LocaleSwitcher>

//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }

"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import useCreateAccountForm from "@/store/Create-Account-Store/form";
import useEducationInfoForm from "@/store/Education-Info-Store/from";
import useAddressInfoForm from "@/store/Address-Info-Store/form";
import LocaleSwitcher from "./locale-switcher";
import { Button } from "./ui/button";

type NavItem = {
  title: string;
  url: string;
  icon?: React.ElementType;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const locale = useLocale();
  const basicinfo = useCreateAccountForm((s) => s.basic);
  const eduinfo = useEducationInfoForm((s) => s.basic);
  const addinfo = useAddressInfoForm((s) => s.basic);

  const isFilled = (url: string) => {
    switch (url) {
      case "/personal-info/education-info":
        return !basicinfo;
      case "/residential-info/address-info":
        return !eduinfo;
      case "/residential-info/terms&conditions":
        return !addinfo;
      default:
        return false;
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Forms</SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
              {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((Item) => (
                    <SidebarMenuSubItem key={Item.title}>
                      <SidebarMenuSubButton asChild>
                        {isFilled(Item.url) ? (
                          <Button variant="ghost">
                            <span className="text-red-400">{Item.title}</span>
                          </Button>
                        ) : (
                          <Link href={Item.url} className="text-black">
                            {Item.title}
                          </Link>
                        )}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}

        <div className="mt-6 px-3">
          <SidebarGroupLabel className="mb-2 text-xs text-gray-500 uppercase tracking-wide">
            Language
          </SidebarGroupLabel>
          {/* language */}
          <LocaleSwitcher defaultValue={locale} label="Language">
            <span>{locale}</span>
          </LocaleSwitcher>
        </div>
      </SidebarMenu>
    </SidebarGroup>
  );
}
