// 图片处理工具函数
interface ImageDimensions {
  width: number;
  height: number;
}

interface ImageError {
  response?: {
    data?: {
      error?: string;
    };
  };
  message?: string;
}

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
  handleUploadError: (error: ImageError): string => {
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
  },

  // 获取图片尺寸
  getDimensions: (file: File): Promise<ImageDimensions> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height
          })
        }
        img.onerror = reject
        img.src = e.target?.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  },

  // 压缩图片
  compress: async (file: File, maxWidth = 1920, maxHeight = 1080): Promise<File> => {
    const dimensions = await imageUtils.getDimensions(file)
    
    // 如果图片尺寸已经小于最大值，直接返回
    if (dimensions.width <= maxWidth && dimensions.height <= maxHeight) {
      return file
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          // 计算新的尺寸
          let newWidth = img.width
          let newHeight = img.height
          
          if (newWidth > maxWidth) {
            newHeight = (maxWidth * newHeight) / newWidth
            newWidth = maxWidth
          }
          
          if (newHeight > maxHeight) {
            newWidth = (maxHeight * newWidth) / newHeight
            newHeight = maxHeight
          }

          // 创建 canvas 并绘制压缩后的图片
          const canvas = document.createElement('canvas')
          canvas.width = newWidth
          canvas.height = newHeight
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, newWidth, newHeight)

          // 转换为 Blob
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'))
              return
            }
            resolve(new File([blob], file.name, {
              type: file.type,
              lastModified: file.lastModified,
            }))
          }, file.type)
        }
        img.onerror = reject
        img.src = e.target?.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
} 