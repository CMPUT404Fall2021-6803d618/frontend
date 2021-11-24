import { axios } from "utils/axios";
import { Visibility } from "shared/enums";

import { formatId } from "utils";
import { BaseService } from "./BaseService";

export interface ImagePayload {
  file: File;
  visibility: Visibility;
  unlisted: boolean;
}

interface IImageService {
  uploadImage: (authorId: string, image: ImagePayload) => Promise<string>;
}

export class ImageService extends BaseService<string> implements IImageService {
  public async uploadImage(authorId: string, image: ImagePayload): Promise<string> {
    const { data } = await axios.post(`${formatId(authorId)}/images/`, {
      ...image,
    });
    return data;
  }
}
