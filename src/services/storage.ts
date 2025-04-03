import { Profile, Status, Hardware, Patent, Community } from '@/types'

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

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]
type StorageData = Profile | Status | Hardware[] | Patent[] | Community[]

export const storage = {
  // 保存数据
  save: (key: keyof typeof STORAGE_KEYS, data: StorageData): boolean => {
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
  get: <T extends StorageData>(key: keyof typeof STORAGE_KEYS): T | null => {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(STORAGE_KEYS[key])
    return data ? JSON.parse(data) : null
  },

  // 删除数据
  remove: (key: keyof typeof STORAGE_KEYS): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEYS[key])
    // 触发自定义事件
    window.dispatchEvent(new CustomEvent('storage', { detail: { key, data: null } }))
  },

  // 清除所有数据
  clear: (): void => {
    if (typeof window === 'undefined') return
    localStorage.clear()
  },

  // 设置数据
  set: (key: keyof typeof STORAGE_KEYS, value: StorageData): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value))
  }
} 