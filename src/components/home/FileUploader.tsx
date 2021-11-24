import React, { useRef, FC, ChangeEvent, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { MouseEvent } from "react-router/node_modules/@types/react";

interface IProps {
  onFileSelectError: (error: any) => void;
  onFileSelectSuccess: (file: File) => void;
}

const Input = styled("input")({
  display: "none",
});

const FileUploader: FC<IProps> = ({ onFileSelectError, onFileSelectSuccess }) => {
  const handleFileInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // handle validations
      const file = e.target.files?.[0];
      if (file) {
        console.log(file.size);
        if (file.size > 10000 * 1000) {
          onFileSelectError({
            error: "File size cannot exceed more than 10MB",
          });
        } else {
          onFileSelectSuccess(file);
        }
      }
    },
    [onFileSelectError, onFileSelectSuccess]
  );

  return (
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" onChange={handleFileInput} type="file" />
      <Button sx={{ marginTop: 1, padding: 1 }} fullWidth variant="outlined" component="span" color="secondary">
        Upload Image
      </Button>
    </label>
  );
};
export default FileUploader;
