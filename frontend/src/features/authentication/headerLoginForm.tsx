import React, { useCallback } from "react";
import { Button, TextField } from "@mui/material";
import { Field, FormikState, FormikValues } from "formik";
import * as Yup from "yup";
import { useNavigateLink } from "../../shared/hooks";
import { ShareVideosBtn } from "../videos";
import config from "../../app/config";
import { useLocation } from "react-router-dom";
import {
  FormBase,
  FormBaseFields,
  FormFieldRenderFunction,
} from "../../shared/components/FormBase";

interface HeaderLoginForm extends FormBaseFields {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required").max(3),
});

const initData: HeaderLoginForm = { email: "", password: "" };

export const HeaderLoginForm: React.FC<{}> = () => {
  const navigate = useNavigateLink();
  const location = useLocation();

  const createJsxCb: FormFieldRenderFunction = useCallback(
    (formikState: FormikState<FormikValues>) => {
      const isLoginPage = location.pathname === config.ROUTES.LOGIN;
      const isSignUpPage = location.pathname === config.ROUTES.REGISTER;

      const fields = Object.keys(formikState.values);
      const isAllFieldFullFill = fields.every(
        (field) => formikState.touched[field] && !!formikState.values[field],
      );

      return (
        <>
          <Field
            as={TextField}
            type="email"
            variant="outlined"
            color="secondary"
            label="Email"
            name="email"
            fullWidth
            required
            sx={{ mb: 4 }}
          />

          <Field
            as={TextField}
            type="password"
            variant="outlined"
            color="secondary"
            label="Password"
            name="password"
            fullWidth
            required
            sx={{ mb: 4 }}
          />

          <ShareVideosBtn />

          {isLoginPage && !isSignUpPage && (
            <Button
              variant="contained"
              onClick={() => {
                navigate(config.ROUTES.REGISTER);
              }}
            >
              {"Sign Up"}
            </Button>
          )}

          {isSignUpPage && !isLoginPage && (
            <Button variant="contained" disabled={formikState.isSubmitting} type="submit">
              {"Login"}
            </Button>
          )}

          {!isSignUpPage && !isLoginPage && !isAllFieldFullFill ? (
            <Button
              variant="contained"
              onClick={() => {
                navigate(config.ROUTES.REGISTER);
              }}
            >
              {"Sign Up"}
            </Button>
          ) : (
            !isSignUpPage &&
            !isLoginPage &&
            isAllFieldFullFill && (
              <Button variant="contained" disabled={formikState.isSubmitting} type="submit">
                {"Login"}
              </Button>
            )
          )}
        </>
      );
    },
    [location],
  );

  return (
    <FormBase
      createFormJsxFieldCb={createJsxCb}
      initialFieldValues={initData}
      validationSchema={validationSchema}
      onSubmit={async () => {
        // TODO update call api
        console.log("asdasdasdasd");
      }}
      style={{ display: "flex", gap: 2, alignItems: "center" }}
    />
  );
};

export default HeaderLoginForm;
