
import {  TermsAndConditionsForm } from "@/types/type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TermsAndConditionsFormStore {
  basic: TermsAndConditionsForm | null;
  addFormValues: (values: TermsAndConditionsForm) => void;
  getFormValues: () => TermsAndConditionsForm | null;
  resetForm: () => void;
}

const useTermsAndConditionsForm = create<TermsAndConditionsFormStore>()(
  devtools(
    persist(
      (set, get) => ({
        basic: null,
        addFormValues: (values) => set({ basic: values }),
        getFormValues: () => get().basic,
        resetForm: () => set({ basic: null }),
      }),
      { name: "TandC-info" }
    )
  )
);

export default useTermsAndConditionsForm;
