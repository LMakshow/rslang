import { BaseObject } from '../models/base.interface';
import { mapToURLParams } from './api-services/param.helper';
import { Words } from '../models/words.interface';
import { setStorageValues } from './api-services/storage';
import { UsersWord } from '../models/users-words.interface';

export const SERVER = 'https://rslang-team-bam.herokuapp.com/';

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

  private static autorizedLoad(
    url: URL,
    method: string,
    token:string,
    data?: BaseObject | UsersWord,
  ): Promise<Response> {
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

  public static autorizedGet<T>(url: string, token:string, params?: BaseObject): Promise<T> {
    const query = new URL(url, SERVER);

    if (params) {
      query.search = new URLSearchParams(mapToURLParams(params)).toString();
    }

    return Loader.autorizedLoad(query, 'GET', token).then((res) => res.json());
  }

  public static createUser(user: BaseObject) {
    return Loader.load(new URL('users', SERVER), 'POST', user).then((res: Response) => res.json());
  }

  public static loginUser(user: BaseObject) {
    return Loader.load(new URL('signin', SERVER), 'POST', user).then((res: Response) => res.json()).then((data) => {
      setStorageValues(['userId', data.userId], ['name', data.name], ['token', data.token], ['refreshToken', data.refreshToken], ['tokenTime', `${Date.now()}`]);
    });
  }

  public static createWord = (wordId: string, params: UsersWord) => {
    const token = localStorage.getItem('token');
    const query = new URL(`users/${localStorage.getItem('userId')}/words/${wordId}`, SERVER);

    return Loader.autorizedLoad(query, 'POST', token, params);
  };

  public static udateWord = (wordId: string, params: UsersWord) => {
    const token = localStorage.getItem('token');
    const query = new URL(`users/${localStorage.getItem('userId')}/words/${wordId}`, SERVER);

    return Loader.autorizedLoad(query, 'PUT', token, params);
  };

  public static deleteWord = (wordId: string) => {
    const token = localStorage.getItem('token');
    const query = new URL(`users/${localStorage.getItem('userId')}/words/${wordId}`, SERVER);

    return Loader.autorizedLoad(query, 'DELETE', token);
  };
}
