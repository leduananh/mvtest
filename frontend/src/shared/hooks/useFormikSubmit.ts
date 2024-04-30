import { useState } from "react";
import * as Yup from "yup";
import { FormikHelpers } from "formik";

type FormValues = {
  [key: string]: any;
};

interface SubmitFunction<T extends FormValues> {
  (values: T): Promise<any>;
}

interface FormikSubmitHookArgs<T extends FormValues> {
  onSubmit: SubmitFunction<T>;
  validationSchema: Yup.AnyObjectSchema;
}

interface FormSubmitHook<T extends FormValues> {
  isLoading: boolean;
  handleSubmit: (values: T, action: FormikHelpers<T>) => Promise<any>;
}
function pause(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const useFormikSubmit = <T extends FormValues>({
  onSubmit,
  validationSchema,
}: FormikSubmitHookArgs<T>): FormSubmitHook<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (values: T, action: FormikHelpers<T>) => {
    setIsLoading(true);
    try {
      await validationSchema.validate(values);
      await pause(1000);
      return await onSubmit(values);
    } catch (error: any) {
      console.error("Validation error:", error.message);
    } finally {
      action.setSubmitting(false);
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading };
};

export default useFormikSubmit;
