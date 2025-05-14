import { AddressInformationForm } from "@/types/type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AddressInformationFormStore {
  basic: AddressInformationForm | null;
  addFormValues: (values: AddressInformationForm) => void;
  getFormValues: () => AddressInformationForm | null;
  resetForm: () => void;
}

const useAddressInfoForm = create<AddressInformationFormStore>()(
  devtools(
    persist(
      (set, get) => ({
        basic: null,
        addFormValues: (values) => set({ basic: values }),
        getFormValues: () => get().basic,
        resetForm: () => set({ basic: null }),
      }),
      { name: "Address-info" }
    )
  )
);

export default useAddressInfoForm;
