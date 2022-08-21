import { BaseObject } from '../models/base.interface';
import { mapToURLParams } from './api-services/param.helper';
import { Words } from '../models/words.interface';

const SERVER = 'https://rslang-team-bam.herokuapp.com/';

export default class Loader {
  private static errorHandler(res: Response): Response {
    if (!res.ok) {
      throw Error(res.status.toString());
    }

    return res;
  }

  private static load(url: URL, method: string, data?: BaseObject): Promise<Response> {
    return fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method,
      body: data ? JSON.stringify(data) : undefined,
    })
      .then((res: Response) => Loader.errorHandler(res));
  }

  public static getPage(url: string, params?: BaseObject): Promise<Words> {
    const query = new URL(url, SERVER);

    if (params) {
      query.search = new URLSearchParams(mapToURLParams(params, true)).toString();
    }

    return Loader.load(query, 'GET')
      .then((res: Response) => res.json()
        .then((items: Words) => items));
  }

  public static get<T>(url: string, params?: BaseObject): Promise<T> {
    const query = new URL(url, SERVER);

    if (params) {
      query.search = new URLSearchParams(mapToURLParams(params)).toString();
    }

    return Loader.load(query, 'GET').then((res: Response) => res.json());
  }
}
