import React, { useCallback, useEffect, useMemo } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Field, FormikValues, FormikProps } from "formik";
import { AlertType, useAlert, useNavigateLink } from "../../shared/hooks";
import { ShareVideosBtn } from "../videos";
import config from "../../app/config";
import { useLocation } from "react-router-dom";
import {
  FormBase,
  FormBaseFields,
  FormFieldRenderFunction,
} from "../../shared/components/FormBase";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "./authSelector";
import useLogin from "./useLogin";
import LoginForm from "./loginForm";
import { loginAction, useLogOut } from ".";
import { OverLayLoading } from "../../shared/components/OverLayLoading";

interface HeaderLoginForm extends FormBaseFields {
  email: string;
  password: string;
}

const HeaderLoginForm: React.FC<{}> = () => {
  const { apiError: loginError, sendLoginRequest, loginResponse } = useLogin()
  const { isLoading: logoutIsLoading, sendLogOut, apiError: logoutError } = useLogOut()
  const dispatch = useDispatch();
  const navigate = useNavigateLink();
  const location = useLocation();
  const { showAlert } = useAlert()
  const { isLoggedIn, userInfo } = useSelector(selectAuthState)

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
            sx={{ mb: 4 }}
            style={{
              margin: "auto",
            }}
            error={!_.isEmpty(formikState.errors.email) && Boolean(formikState.touched.password)}
          />
        ),
        [formikState, isLoggedIn],
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
            error={!_.isEmpty(formikState.errors.password) && Boolean(formikState.touched.password)}
          />
        ),
        [formikState, isLoggedIn],
      );

      const loginBtn = useMemo(
        () => (
          <Button variant="contained" type="submit">
            {"Login"}
          </Button>
        ),
        [isLoggedIn],
      );

      const logoutBtn = useMemo(
        () => (
          <Button variant="contained" onClick={() => {
            sendLogOut()
          }}>
            {"Logout"}
          </Button>
        ),
        [isLoggedIn],
      );

      const signUpBtn = useMemo(
        () => (
          <Button
            variant="contained"
            style={{ textWrap: 'nowrap', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, paddingTop: 10 }}
            onClick={() => {
              navigate(config.ROUTES.REGISTER);
            }}
          >
            {"SignUp"}
          </Button >
        ),
        [isLoggedIn],
      );

      const shareVideosBtn = useMemo(() => <ShareVideosBtn />, [isLoggedIn]);

      const loggedUserEmailText = useMemo(() => {
        return (<Typography variant="body1" component="div" sx={{ marginLeft: 'auto' }}>
          {`Welcome ${userInfo?.email}`}
        </Typography>)
      }, [isLoggedIn])

      const isLoginPage = location.pathname === config.ROUTES.LOGIN;
      const isSignUpPage = location.pathname === config.ROUTES.REGISTER;
      const fields = Object.keys(formikState.values);
      const isAllFieldFullFill = fields.every(
        (field) => formikState.touched[field] && !!formikState.values[field],
      );

      return (
        <>
          {!isLoggedIn && !isLoginPage && emailField}

          {!isLoggedIn && !isLoginPage && passwordField}

          {isLoggedIn && loggedUserEmailText}

          {isLoggedIn && shareVideosBtn}

          {!isLoggedIn && isLoginPage && !isSignUpPage && signUpBtn}

          {!isLoggedIn && isSignUpPage && !isLoginPage && loginBtn}

          {isLoggedIn && logoutBtn}

          {!isLoggedIn && !isSignUpPage && !isLoginPage && !isAllFieldFullFill
            ? signUpBtn
            : !isLoggedIn && !isSignUpPage && !isLoginPage && isAllFieldFullFill && loginBtn}
        </>
      );
    },
    [isLoggedIn, location],
  );

  const onSubmit = useCallback(async (payload: LoginForm) => {
    await sendLoginRequest(payload);
  }, []);

  useEffect(() => {
    if (!_.isNull(loginError)) {
      showAlert(loginError.message, { type: AlertType.Error });
    }
  }, [loginError]);

  useEffect(() => {
    if (!_.isNull(logoutError)) {
      showAlert(logoutError.message, { type: AlertType.Error });
    }
  }, [logoutError]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(config.ROUTES.HOME)
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!_.isNil(loginResponse)) {
      showAlert('Login success')
      dispatch(loginAction(loginResponse));
    }
  }, [loginResponse]);

  return (
    <>
      <OverLayLoading open={logoutIsLoading} options={{ isBlackOut: true, showText: { text: "logging out", isBold: true } }} />

      <FormBase
        createFormJsxFieldCb={createJsxCb}
        initialFieldValues={config.RULES.FORM.HEADER_LOGIN.initValues}
        validationSchema={config.RULES.FORM.HEADER_LOGIN.constrains}
        onSubmit={onSubmit}
        style={{ display: "flex", gap: 10, alignItems: "center" }}
      />
    </>
  );
};

export default HeaderLoginForm;
