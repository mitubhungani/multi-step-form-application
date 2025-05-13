import { CreateAccountForm } from "@/types/type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CreateAccountFormStore {
  basic: CreateAccountForm | null;
  addFormValues: (values: CreateAccountForm) => void;
  getFormValues: () => CreateAccountForm | null;
  resetForm: () => void;
}

const useCreateAccountForm = create<CreateAccountFormStore>()(
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

export default useCreateAccountForm;
