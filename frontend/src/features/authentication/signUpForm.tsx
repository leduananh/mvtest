import React from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAlert, useFormikSubmit } from "../../shared/hooks";
import { OverLayLoading } from "../../shared/components/OverLayLoading";

interface SignUpForm {
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

export const SignUpForm: React.FC<{}> = () => {
  const { showAlert } = useAlert()

  const { handleSubmit, isLoading } = useFormikSubmit<SignUpForm>({
    onSubmit: async () => {
      showAlert("asdasdasdasd");
    },
    validationSchema: validationSchema,
  });

  return (
    <Container maxWidth="sm">
      <OverLayLoading open={isLoading} />

      <Typography variant="h4" pb={2}>
        Register Form
      </Typography>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              type="email"
              variant="outlined"
              color="secondary"
              label="Email"
              name="email"
              fullWidth
              required
              helperText={touched.email && errors.email}
              error={touched.email && Boolean(errors.email)}
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
              helperText={touched.password && errors.password}
              error={touched.password && Boolean(errors.password)}
              sx={{ mb: 4 }}
            />

            <Field
              as={TextField}
              type="password"
              variant="outlined"
              color="secondary"
              label="Confirm Password"
              name="confirmPassword"
              fullWidth
              required
              helperText={touched.confirmPassword && errors.confirmPassword}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              sx={{ mb: 4 }}
            />

            <Button variant="outlined" color="secondary" type="submit" disabled={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body2">
        Already have an account? <Link to="/login">Login Here</Link>
      </Typography>
    </Container>
  );
};
