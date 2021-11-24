import { useCallback, useMemo } from "react";
import { ImagePayload, ImageService } from "services/ImageService";
import { Author } from "shared/interfaces";

interface IImageHook {
  uploadImage: (file: ImagePayload) => Promise<string | null>;
}

const useImage = (user: Author | null): IImageHook => {
  const imageService = useMemo(() => new ImageService(), []);

  const uploadImage = useCallback(
    async (file: ImagePayload) => {
      if (user) {
        const url = await imageService.uploadImage(user.id, file);
        return url;
      } else {
        return null;
      }
    },
    [imageService, user]
  );

  return { uploadImage };
};

export default useImage;
