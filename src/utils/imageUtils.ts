// 图片处理工具函数
export const imageUtils = {
  // 生成唯一的文件名
  generateFileName: (originalName: string, prefix: string = ''): string => {
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const extension = originalName.split('.').pop()
    return `${prefix}-${timestamp}-${randomStr}.${extension}`
  },

  // 验证图片类型
  validateImageType: (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    return allowedTypes.includes(file.type)
  },

  // 验证图片大小（默认最大5MB）
  validateImageSize: (file: File, maxSize: number = 5 * 1024 * 1024): boolean => {
    return file.size <= maxSize
  },

  // 获取图片的完整URL
  getImageUrl: (path: string): string => {
    if (!path) return ''
    
    // 如果是完整的URL，直接返回
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }

    // 如果是相对路径，确保以/开头
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    
    // 确保images目录存在于路径中
    if (!normalizedPath.includes('/images/')) {
      return `/images${normalizedPath}`
    }
    
    return normalizedPath
  },

  // 处理图片上传错误
  handleUploadError: (error: any): string => {
    console.error('图片上传错误:', error)
    if (error?.response?.data?.error) {
      return error.response.data.error
    }
    return '图片上传失败，请重试'
  },

  // 获取头像的URL
  getAvatarUrl: (path?: string): string => {
    if (!path) {
      return '/images/avatar.jpg' // 默认头像
    }
    return imageUtils.getImageUrl(path)
  },

  // 获取硬件图片的URL
  getHardwareImageUrl: (path: string): string => {
    if (!path) return '/images/hardware/default.jpg'
    return imageUtils.getImageUrl(path.includes('/hardware/') ? path : `hardware/${path}`)
  },

  // 获取图片的完整URL（包含域名）
  getFullImageUrl: (path: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
    return `${baseUrl}${imageUtils.getImageUrl(path)}`
  }
} 