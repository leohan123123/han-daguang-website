'use client'
import { useState, useRef, useEffect } from 'react'
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { imageUtils } from '@/utils/imageUtils'
import Image from 'next/image'

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
          <Image
            src={previewUrl}
            alt="预览图"
            width={200}
            height={200}
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
        <div className="mt-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">点击上传</span> 或拖拽文件到此处</p>
                <p className="text-xs text-gray-500">支持的文件类型: PNG, JPG, GIF</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  )
} 