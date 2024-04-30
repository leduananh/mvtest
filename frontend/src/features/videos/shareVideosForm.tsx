import React, { useCallback, useMemo } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Field, FormikProps, FormikValues } from "formik";
import { useAlert } from "../../shared/hooks";
import {
  FormBase,
  FormBaseFields,
  FormFieldRenderFunction,
} from "../../shared/components/FormBase";
import config from "../../app/config";

interface VideoShareForm extends FormBaseFields {
  youtubeUrl: string;
}

const VideoShareForm: React.FC = () => {
  const { showAlert } = useAlert();

  const createJsxCb: FormFieldRenderFunction = useCallback(
    (formikState: FormikProps<FormikValues>) => {
      const shareYoutubeUrlField = useMemo(
        () => (
          <Field
            as={TextField}
            variant="outlined"
            label="Share Videos"
            name="email"
            fullWidth
            required
            // helperText={formikState.touched.email && formikState.errors.email}
            // error={formikState.touched.email && Boolean(formikState.errors.email)}
            sx={{ mb: 2 }}
          />
        ),
        [formikState],
      );

      const submitBtn = useMemo(
        () => (
          <Button variant="contained" type="submit" fullWidth>
            Share
          </Button>
        ),
        [formikState],
      );

      return (
        <>
          {shareYoutubeUrlField}
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
      <Box
        sx={{
          border: 1,
          borderColor: "primary.main",
          borderRadius: 2,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography variant="h6" sx={{ alignSelf: "flex-start", mb: 2 }}>
          Youtube shareable url
        </Typography>
        <FormBase
          style={{ width: "100%" }}
          onSubmit={onSubmit}
          initialFieldValues={config.RULES.FORM.VIDEO_SHARE.initValues}
          validationSchema={config.RULES.FORM.VIDEO_SHARE.constrains}
          createFormJsxFieldCb={createJsxCb}
        />
        {/* <TextField label="Share Videos" variant="outlined" fullWidth sx={{ mb: 2 }} />
        <Button variant="contained" fullWidth>
          Share
        </Button> */}
      </Box>
    </Container>
  );
};

export default VideoShareForm;
