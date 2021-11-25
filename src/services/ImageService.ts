import { axios } from "utils/axios";
import { formatId } from "utils";
import { BaseService } from "./BaseService";
import { ImageObject } from "shared/interfaces";

interface IImageService {
  uploadImage: (authorId: string, image: FormData) => Promise<ImageObject>;
}

export class ImageService extends BaseService<string> implements IImageService {
  public async uploadImage(authorId: string, image: FormData): Promise<ImageObject> {
    const { data } = await axios.post(`${formatId(authorId)}/images/`, image);
    return data;
  }
}
