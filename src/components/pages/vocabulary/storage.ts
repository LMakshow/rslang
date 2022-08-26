import { BaseObject } from '../../../models/base.interface';
import { StorageObject, StoragePageMap } from '../../../models/storage-object.interface';

const CURRENT_STORAGE_STATE: string = 'currentStorageState';
const PAGE_MAP_KEY: string = 'pageMapKey';

const getAllStorage = () => {
  const storageState: string = localStorage.getItem(CURRENT_STORAGE_STATE);
  const objectStorage: StorageObject = JSON.parse(storageState);

  return objectStorage;
}

const getStorageItem = (key: string) => getAllStorage()[key];

const setStorageItem = (key: string, value: string | number | boolean | BaseObject) => {
  const object: StorageObject = { ...getAllStorage(), [key]: value };

  localStorage.setItem(CURRENT_STORAGE_STATE, JSON.stringify(object));
}

const savePages = (groupNum: number, pageNum: number) => {
  const allStorageObject: StorageObject = getAllStorage();
  const object: BaseObject = { ...(allStorageObject[PAGE_MAP_KEY] as BaseObject), [groupNum]: pageNum };

  setStorageItem(PAGE_MAP_KEY, object);
}

const getGroupPage = (groupNum: number) => {
  const page: number = (getStorageItem(PAGE_MAP_KEY) as StoragePageMap)?.[groupNum] ?? 0;

  return page;
}

export { getStorageItem, setStorageItem, savePages, getGroupPage };