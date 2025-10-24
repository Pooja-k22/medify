import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  TextField,
  Divider,
  useTheme,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { setItem } from "../utils/localStorageUtils";
import { useToast } from "../hooks/useToast";
// Validation schema
const schema = yup.object().shape({
  image: yup
    .mixed()
    .required("Please select an image")
    .test("fileType", "Only JPG, JPEG, PNG files are allowed", (value) => {
      if (!value) return false; 
      return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
    }),
});

export default function Settings() {
  const theme = useTheme();
  const { showToast } = useToast();
  const [preview, setPreview] = useState(null);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
        formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedFile = watch("image");

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  const onSubmit = (data) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setItem("bannerImage", reader.result);
      showToast("successfully added", "success");
    };
    reader.readAsDataURL(data.image);
  };

  return (
    <Box
      sx={{
        //p: 2,
        bgcolor:theme.palette.background.paper ,
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: "full",
          borderRadius: 2,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          bgcolor:theme.palette.background.default
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Settings
            </Typography>

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 3,
                    px: 3,
                  }}
                >
                  Add Image
                  <input
                    type="file"
                    hidden
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => field.onChange(e.target.files[0])}
                  // onChange={(e) => setValue("image", e.target.files[0], { shouldValidate: true })}

                  />
                </Button>
              )}
            />
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Image upload */}
            <Stack alignItems="center">
              <Avatar
                src={preview || ""}
                sx={{
                  width: "100%",
                  height: 200,

                  boxShadow: "0 0 10px rgba(0,0,0,0.15)",
                  borderRadius: 2,
                }}
              />

              {errors.image && (
                <Typography color="error" variant="body2">
                  {errors.image.message}
                </Typography>
              )}
            </Stack>

            {/* Submit */}
            <Button
              type="submit"
              variant="outlined"
              sx={{
                mt: 4,
                textTransform: "none",
                borderRadius: 2,
                py: 1.2,
              }}
            >
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
