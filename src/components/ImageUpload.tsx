'use client'
import { useState, useRef, useEffect } from 'react'
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { imageUtils } from '@/utils/imageUtils'

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (file: File | null) => void
  onImageRemove: () => void
  maxSize?: number // 单位：字节
  className?: string
}

export default function ImageUpload({
  currentImage,
  onImageChange,
  onImageRemove,
  maxSize = 5 * 1024 * 1024, // 默认5MB
  className = ''
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理当前图片的显示
  useEffect(() => {
    if (currentImage) {
      setPreviewUrl(imageUtils.getImageUrl(currentImage))
    }
  }, [currentImage])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setError('')

    if (file) {
      // 验证文件类型
      if (!imageUtils.validateImageType(file)) {
        setError('请选择正确的图片格式（JPG、PNG、GIF、WEBP）')
        return
      }
      
      // 验证文件大小
      if (!imageUtils.validateImageSize(file, maxSize)) {
        setError(`图片大小不能超过 ${maxSize / 1024 / 1024}MB`)
        return
      }

      // 创建预览URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      onImageChange(file)
    }
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onImageRemove()
  }

  // 组件卸载时清理预览URL
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
      />

      {error && (
        <div className="mb-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="预览图"
            className="h-48 w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-full bg-white p-1 text-gray-500 shadow-sm hover:text-red-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:border-blue-500"
        >
          <div className="text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-medium text-gray-600">
              点击上传图片
            </span>
            <span className="mt-1 block text-xs text-gray-500">
              支持 JPG、PNG、GIF、WEBP 格式
            </span>
          </div>
        </button>
      )}
    </div>
  )
} 