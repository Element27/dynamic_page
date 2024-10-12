import { heroData } from "@/store/indexdbstore";

// indexedDbUtility.ts
export const dbName = "heroDatabase";
export const storeName = "heroStore";

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(storeName, { keyPath: "key" });
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject("Failed to open IndexedDB");
    };
  });
};

export const setItemInDB = async (
  key: string,
  value: unknown
): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction([storeName], "readwrite");
  const store = transaction.objectStore(storeName);
  store.put({ key, value });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject("Failed to set item in IndexedDB");
  });
};

export const getIndexedDB = async (key: string): Promise<heroData | null> => {
  const db = await openDB();
  const transaction = db.transaction("sections", "readonly");
  const store = transaction.objectStore("sections");
  const request = store.get(key);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const result = request.result ? request.result.data : null;
      if (
        result &&
        typeof result === "object" &&
        "title" in result &&
        "description" in result &&
        "btn_text" in result &&
        "imageUrl" in result
      ) {
        resolve(result as heroData); // Ensure the returned data matches the heroData interface
      } else {
        resolve(null);
      }
    };
    request.onerror = () => {
      reject("Error retrieving data from IndexedDB");
    };
  });
};

// DfghNbvcTyui
