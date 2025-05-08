
import { EducationInformationForm } from "@/types/type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface EducationInformationFormStore {
  basic: EducationInformationForm | null;
  addFormValues: (values: EducationInformationForm) => void;
  getFormValues: () => EducationInformationForm | null;
  resetForm: () => void;
}

const useEducationInformationForm = create<EducationInformationFormStore>()(
  devtools(
    persist(
      (set, get) => ({
        basic: null,
        addFormValues: (values) => set({ basic: values }),
        getFormValues: () => get().basic,
        resetForm: () => set({ basic: null }),
      }),
      { name: "Education-info" }
    )
  )
);

export default useEducationInformationForm;
