import { BasicInformationForm } from "@/types/type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BasicInformationFormStore {
  basic: BasicInformationForm | null;
  addFormValues: (values: BasicInformationForm) => void;
  getFormValues: () => BasicInformationForm | null;
  resetForm: () => void;
}

const useBasicInformationForm = create<BasicInformationFormStore>()(
  devtools(
    persist(
      (set, get) => ({
        basic: null,
        addFormValues: (values) => set({ basic: values }),
        getFormValues: () => get().basic,
        resetForm: () => set({ basic: null }),
      }),
      { name: "Basicinfo-info" }
    )
  )
);

export default useBasicInformationForm;
