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

interface SignUpForm extends FormBaseFields {
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required").min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const initData: SignUpForm = { email: "", password: "", confirmPassword: "" };

const SignUpForm: React.FC<{}> = () => {
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

      const submitBtn = useMemo(
        () => (
          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            disabled={formikState.isSubmitting}
          >
            Register
          </Button>
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
        Register Form
      </Typography>
      <FormBase
        initialFieldValues={initData}
        onSubmit={onSubmit}
        createFormJsxFieldCb={createJsxCb}
        validationSchema={validationSchema}
      />
      <Typography variant="body2">
        Already have an account? <Link to="/login">Login Here</Link>
      </Typography>
    </Container>
  );
};

export default SignUpForm;
