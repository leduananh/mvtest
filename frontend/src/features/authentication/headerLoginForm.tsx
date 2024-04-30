import React, { useCallback, useMemo } from "react";
import { Button, TextField } from "@mui/material";
import { Field, FormikValues, FormikProps } from "formik";
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
import _ from "lodash";

interface HeaderLoginForm extends FormBaseFields {
  email: string;
  password: string;
}

const HeaderLoginForm: React.FC<{}> = () => {
  const navigate = useNavigateLink();
  const location = useLocation();

  const createJsxCb: FormFieldRenderFunction = useCallback(
    (formikState: FormikProps<FormikValues>) => {
      const shareVideosBtn = useMemo(() => <ShareVideosBtn />, []);

      const loginBtn = useMemo(
        () => (
          <Button variant="contained" type="submit">
            {"Login"}
          </Button>
        ),
        [formikState],
      );

      const emailField = useMemo(
        () => (
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
            style={{
              margin: "auto",
            }}
            error={!_.isEmpty(formikState.errors.email)}
          />
        ),
        [formikState],
      );

      const signUpBtn = useMemo(
        () => (
          <Button
            variant="contained"
            onClick={() => {
              navigate(config.ROUTES.REGISTER);
            }}
          >
            {"Sign Up"}
          </Button>
        ),
        [formikState],
      );
      const passwordField = useMemo(
        () => (
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
            style={{
              margin: "auto",
            }}
            error={!_.isEmpty(formikState.errors.password)}
          />
        ),
        [],
      );
      const isLoginPage = location.pathname === config.ROUTES.LOGIN;
      const isSignUpPage = location.pathname === config.ROUTES.REGISTER;
      const fields = Object.keys(formikState.values);
      const isAllFieldFullFill = fields.every(
        (field) => formikState.touched[field] && !!formikState.values[field],
      );

      return (
        <>
          {emailField}
          {passwordField}
          {shareVideosBtn}

          {isLoginPage && !isSignUpPage && signUpBtn}

          {isSignUpPage && !isLoginPage && loginBtn}

          {!isSignUpPage && !isLoginPage && !isAllFieldFullFill
            ? signUpBtn
            : !isSignUpPage && !isLoginPage && isAllFieldFullFill && loginBtn}
        </>
      );
    },
    [location],
  );

  const onSubmit = useCallback(async () => {
    // TODO update call api
    console.log("asdasdasdasd");
  }, []);

  return (
    <FormBase
      createFormJsxFieldCb={createJsxCb}
      initialFieldValues={config.RULES.FORM.HEADER_LOGIN.initValues}
      validationSchema={config.RULES.FORM.HEADER_LOGIN.constrains}
      onSubmit={onSubmit}
      style={{ display: "flex", gap: 10, alignItems: "center" }}
    />
  );
};

export default HeaderLoginForm;
