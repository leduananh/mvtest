import React, { useCallback, useMemo } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Field, FormikProps, FormikValues } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAlert } from "../../shared/hooks";
import {
  FormBase,
  FormBaseFields,
  FormFieldRenderFunction,
} from "../../shared/components/FormBase";
import config from "../../app/config";

interface LoginForm extends FormBaseFields {
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginForm: React.FC<{}> = () => {
  const { showAlert } = useAlert();

  const createJsxCb: FormFieldRenderFunction = useCallback(
    (formikState: FormikProps<FormikValues>) => {
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
            helperText={formikState.touched.email && formikState.errors.email}
            error={formikState.touched.email && Boolean(formikState.errors.email)}
            sx={{ mb: 4 }}
          />
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
            helperText={formikState.touched.password && formikState.errors.password}
            error={formikState.touched.password && Boolean(formikState.errors.password)}
            sx={{ mb: 4 }}
          />
        ),
        [formikState],
      );

      const confirmPasswordField = useMemo(
        () => (
          <Field
            as={TextField}
            type="password"
            variant="outlined"
            color="secondary"
            label="Confirm Password"
            name="confirmPassword"
            fullWidth
            required
            helperText={formikState.touched.confirmPassword && formikState.errors.confirmPassword}
            error={
              formikState.touched.confirmPassword && Boolean(formikState.errors.confirmPassword)
            }
            sx={{ mb: 4 }}
          />
        ),
        [formikState],
      );

      const submitBtn = useMemo(
        () => (
          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            disabled={formikState.isSubmitting}
          >
            {"Login"}
          </Button>
        ),
        [formikState],
      );
      return (
        <>
          {emailField}
          {passwordField}
          {confirmPasswordField}
          {submitBtn}
        </>
      );
    },
    [],
  );

  const onSubmit = useCallback(async () => {
    // TODO update call api
    showAlert("asdasdasdasd");
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" pb={2}>
        Login Form
      </Typography>
      <FormBase
        initialFieldValues={config.RULES.FORM.LOGIN.initValues}
        onSubmit={onSubmit}
        createFormJsxFieldCb={createJsxCb}
        validationSchema={config.RULES.FORM.LOGIN.constrains}
      />
      <Typography variant="body2">
        Don't had account yet? <Link to={config.ROUTES.REGISTER}>Sign up here!</Link>
      </Typography>
    </Container>
  );
};

export default LoginForm;
