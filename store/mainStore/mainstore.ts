// src/stores/MainStore.ts
import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";
import useCreateAccountForm from "../Create-Account-Store/form";
import useEducationInfoForm from "../Education-Info-Store/from";

// 1. Grab initial slices out of your existing stores:
const { basic: initialBasic } = useCreateAccountForm.getState();
const { basic: initialEducation } = useEducationInfoForm.getState();

// 2. Create your combined store:
const useMainStore = create(
  devtools(
    persist(
      combine(
        // First arg: the *shape* of your combined initial state
        {
          basic: initialBasic,
          education: initialEducation,
        },
        // Second arg: your actions / setters / getters
        (set, get) => ({
          // Basic slice setters/getters
          setBasic: (values: typeof initialBasic) => set({ basic: values }),
          getBasic: () => get().basic,

          // Education slice setters/getters
          setEducation: (values: typeof initialEducation) =>
            set({ education: values }),
          getEducation: () => get().education,
        })
      ),
      {
        name: "MainStore", 
      }
    )
  )
);

export default useMainStore;
