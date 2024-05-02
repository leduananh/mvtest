import React, { useCallback, useEffect, useMemo } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Field, FormikProps, FormikValues } from "formik";
import { Link } from "react-router-dom";
import { AlertType, useAlert, useNavigateLink } from "../../shared/hooks";
import { FormBase, FormFieldRenderFunction } from "../../shared/components/FormBase";
import config from "../../app/config";
import useLogin from "./useLogin";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, selectAuthState } from ".";
import _ from "lodash";

interface LoginForm {
  email: string;
  password: string;
}

const LoginForm: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { sendLoginRequest, apiError, loginResponse } = useLogin();
  const { showAlert } = useAlert();
  const { isLoggedIn } = useSelector(selectAuthState)
  const navigate = useNavigateLink()

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
            {"Login"}
          </Button>
        ),
        [formikState],
      );
      return (
        <>
          {emailField}
          {passwordField}
          {submitBtn}
        </>
      );
    },
    [isLoggedIn],
  );

  const onSubmit = useCallback(async (payload: LoginForm) => {
    await sendLoginRequest(payload);
  }, []);

  useEffect(() => {
    if (!_.isNil(apiError)) {
      showAlert(apiError.message, { type: AlertType.Error });
    }
  }, [apiError]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(config.ROUTES.HOME)
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!_.isNil(loginResponse)) {
      dispatch(loginAction(loginResponse));
      showAlert('Login success')
    }
  }, [loginResponse]);

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
