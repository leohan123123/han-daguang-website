// 本地存储服务
export const STORAGE_KEYS = {
  PROFILE: 'PROFILE',
  PRODUCTS: 'PRODUCTS',
  SETTINGS: 'SETTINGS',
  HARDWARE: 'HARDWARE',
  PATENTS: 'PATENTS',
  STATUS: 'STATUS',
  COMMUNITY: 'COMMUNITY',
  CURRENT_STATUS: 'CURRENT_STATUS',
  ACADEMIC: 'ACADEMIC',
  PROJECTS: 'PROJECTS'
} as const

export const storage = {
  // 保存数据
  save: (key: keyof typeof STORAGE_KEYS, data: any) => {
    try {
      localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data))
      // 触发自定义事件
      window.dispatchEvent(new CustomEvent('storage', { detail: { key, data } }))
      return true
    } catch (error) {
      console.error('保存数据失败:', error)
      return false
    }
  },

  // 获取数据
  get: (key: keyof typeof STORAGE_KEYS) => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS[key])
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('获取数据失败:', error)
      return null
    }
  },

  // 删除数据
  remove: (key: keyof typeof STORAGE_KEYS) => {
    try {
      localStorage.removeItem(STORAGE_KEYS[key])
      // 触发自定义事件
      window.dispatchEvent(new CustomEvent('storage', { detail: { key, data: null } }))
      return true
    } catch (error) {
      console.error('删除数据失败:', error)
      return false
    }
  }
} 