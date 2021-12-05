import { axios } from "utils/axios";

interface IBaseService<T> {
  getAll: (url: string, dataKey?: string) => Promise<T[]>;
  getPaginate: (
    url: string,
    page: number,
    size: number,
    dataKey?: string
  ) => Promise<PaginateResponse<T>>;
}

export interface PaginateResponse<T> {
  page: number;
  size: number;
  count: number;
  items: T[];
}

export class BaseService<T> implements IBaseService<T> {
  private DEFAULT_PAGE = 1;
  private DEFAULT_SIZE = 1000;

  public async getAll(url: string, dataKey = "items"): Promise<T[]> {
    const res = await this.getPaginate(url, this.DEFAULT_PAGE, this.DEFAULT_SIZE, dataKey);
    const { page, size, count, items } = res;
    if (size !== undefined && count !== undefined && page !== undefined) {
      if (count <= size) {
        return items;
      } else {
        const remainingCount = count - items.length;
        const pageCount = Math.ceil(remainingCount / size);
        const pages = Array.from(Array(pageCount).keys()).map((i) => i + 2);
        const remainingItems = await Promise.all(
          pages.map(async (p) => (await this.getPaginate(url, p, size, dataKey)).items)
        );
        return [items, ...remainingItems].flat();
      }
    } else {
      return items;
    }
  }

  public async getPaginate(
    url: string,
    page: number,
    size: number = this.DEFAULT_SIZE,
    dataKey = "items"
  ): Promise<PaginateResponse<T>> {
    const { data } = await axios.get(url, {
      params: {
        page,
        size,
      },
    });
    const items: T[] = data[dataKey] ?? [];

    return {
      page: data.page,
      size: data.size,
      count: data.count,
      items,
    };
  }
}
