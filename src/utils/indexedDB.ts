import dbConfig from '@/config/db.json'

export interface App {
  id: number
  name: string
  icon: string
  externalUrl?: string
  internalUrl?: string
  description?: string
  category?: string
  tags?: string[]
  isFavorite?: boolean
  isDeleted?: boolean
}

export interface Tables {
  apps: App
}

export interface StoreConfig {
  name: string
  options?: IDBObjectStoreParameters
  indexes?: Array<{
    name: string
    keyPath: string | string[]
    options?: IDBIndexParameters
  }>
}

export class IndexedDB<T extends Record<string, any>> {
  public static deleteDatabase(dbName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(dbName)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
      request.onblocked = () => reject(new Error('数据库删除被阻止'))
    })
  }

  private readonly dbName: string
  private readonly version: number
  private db: IDBDatabase | null = null

  public constructor(dbName: string, version = 1) {
    this.dbName = dbName
    this.version = version
  }

  public async init(stores: StoreConfig[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      /**
       * 在数据库升级时添加对象存储和索引
       */
      request.onupgradeneeded = (event) => {
        const db = request.result
        stores.forEach(({ name, options, indexes }) => {
          if (!db.objectStoreNames.contains(name)) {
            const store = db.createObjectStore(name, options || {})
            indexes?.forEach(({ name: indexName, keyPath, options }) => {
              store.createIndex(indexName, keyPath, options || {})
            })
          }
        })
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onerror = () => {
        reject(new Error(`IndexedDB 初始化失败: ${request.error}`))
      }
    })
  }

  public add<K extends keyof T>(storeName: K, value: T[K], key?: IDBValidKey): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore(storeName, 'readwrite')
      const request = store.add(value, key)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  public put<K extends keyof T>(storeName: K, value: T[K], key?: IDBValidKey): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore(storeName, 'readwrite')
      const request = store.put(value, key)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  public delete<K extends keyof T>(storeName: K, key: IDBValidKey): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore(storeName, 'readwrite')
      const request = store.delete(key)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  public get<K extends keyof T>(storeName: K, key: IDBValidKey): Promise<T[K] | undefined> {
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore(storeName)
      const request = store.get(key)

      request.onsuccess = () => resolve(request.result as T[K])
      request.onerror = () => reject(request.error)
    })
  }

  public getAll<K extends keyof T>(storeName: K): Promise<T[K][]> {
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore(storeName)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result as T[K][])
      request.onerror = () => reject(request.error)
    })
  }

  public clear<K extends keyof T>(storeName: K): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore(storeName, 'readwrite')
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  private getObjectStore(storeName: keyof T, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) {
      throw new Error('IndexedDB 未初始化，请调用 init 方法')
    }
    return this.db.transaction(storeName as string, mode).objectStore(storeName as string)
  }
}

const db = new IndexedDB<Tables>(dbConfig.name, dbConfig.version)

export default db
