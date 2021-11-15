import React, { useRef, FC, ChangeEvent, useCallback } from "react";

interface IProps {
  onFileSelectError: (error: any) => void;
  onFileSelectSuccess: (file: File) => void;
}

const FileUploader: FC<IProps> = ({ onFileSelectError, onFileSelectSuccess }) => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleFileInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // handle validations
      const file = e.target.files?.[0];
      if (file) {
        console.log(file.size);
        if (file.size > 10000 * 1000) {
          onFileSelectError({ error: "File size cannot exceed more than 10MB" });
        } else {
          onFileSelectSuccess(file);
        }
      }
    },
    [onFileSelectError, onFileSelectSuccess]
  );

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileInput}></input>
    </div>
  );
};
export default FileUploader;
