import db from '@/utils/indexedDB'

export default async function initDB() {
  const storeConfig = [
    {
      name: 'apps',
      options: { keyPath: 'id' },
      indexes: [{ name: 'name', keyPath: 'name' }],
    },
  ]
  try {
    await db.init(storeConfig)
    console.log('IndexedDB 已初始化')
  } catch (error) {
    console.error('数据库初始化失败:', error)
  }
}
