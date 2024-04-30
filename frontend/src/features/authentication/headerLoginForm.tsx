import React from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAlert, useFormikSubmit, useNavigateLink } from "../../shared/hooks";
import { OverLayLoading } from "../../shared/components/OverLayLoading";
import { ShareVideosBtn } from "../videos";
import config from "../../app/config";
import _ from "lodash";
import { useLocation } from "react-router-dom";

interface HeaderLoginForm {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required").max(3),
});

export const HeaderLoginForm: React.FC<{}> = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigateLink();
  const location = useLocation();

  const { handleSubmit, isLoading } = useFormikSubmit<HeaderLoginForm>({
    onSubmit: async () => {
      showAlert("asdasdasdasd");
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      <OverLayLoading open={isLoading} />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, values, isValid, isValidating }) => {
          const isFormValid = !_.isEmpty(values.password) && !_.isEmpty(values.email);
          const isLoginPage = location.pathname === config.ROUTES.LOGIN;
          const isSignUpPage = location.pathname === config.ROUTES.REGISTER;
          if (isSubmitting) {
            if (!isValid && isValidating) {
              Object.entries(errors).forEach(([k, v]: [string, string]) => {
                if (!_.isNil(v) && !_.isEmpty(v)) {
                  showAlert(v);
                }
              });
            }
          }

          return (
            <Form style={{ display: "flex", gap: 2, alignItems: "center" }}>
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
                <Button variant="contained" disabled={isSubmitting} type="submit">
                  {"Login"}
                </Button>
              )}

              {!isSignUpPage && !isLoginPage && !isFormValid ? (
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
                isFormValid && (
                  <Button variant="contained" disabled={isSubmitting} type="submit">
                    {"Login"}
                  </Button>
                )
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default HeaderLoginForm;
