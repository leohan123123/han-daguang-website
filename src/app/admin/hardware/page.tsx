'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/services/storage'
import { hardwareData } from '@/data/hardware'
import type { Hardware } from '@/types'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ImageUpload from '@/components/ImageUpload'
import { imageUtils } from '@/utils/imageUtils'

export default function AdminHardwarePage() {
  const [hardware, setHardware] = useState<Hardware[]>(hardwareData)

  // 从本地存储加载数据
  useEffect(() => {
    const savedData = storage.get('HARDWARE')
    if (savedData) {
      setHardware(savedData)
    } else {
      // 如果没有保存的数据，使用默认数据并保存
      storage.save('HARDWARE', hardwareData)
      setHardware(hardwareData)
    }
  }, [])

  // 监听数据变化并保存
  useEffect(() => {
    if (hardware.length > 0) {
      storage.save('HARDWARE', hardware)
    }
  }, [hardware])

  const handleAddHardware = () => {
    const newHardware: Hardware = {
      id: String(Date.now()),
      name: '',
      description: '',
      features: [],
      specifications: {
        dimensions: '',
        weight: '',
        powerSupply: '',
        connectivity: [],
        other: {}
      },
      images: {
        main: '',
        gallery: []
      },
      status: '开发中'
    }
    setHardware([...hardware, newHardware])
  }

  const handleDeleteHardware = (id: string) => {
    setHardware(hardware.filter(item => item.id !== id))
  }

  const handleSave = () => {
    storage.save('HARDWARE', hardware)
    alert('保存成功！')
  }

  // 添加新特性
  const handleAddFeature = (hardwareId: string) => {
    setHardware(hardware.map(item => {
      if (item.id === hardwareId) {
        return {
          ...item,
          features: [...item.features, '']
        }
      }
      return item
    }))
  }

  // 更新特性
  const handleFeatureChange = (hardwareId: string, featureIndex: number, value: string) => {
    setHardware(hardware.map(item => {
      if (item.id === hardwareId) {
        const newFeatures = [...item.features]
        newFeatures[featureIndex] = value
        return {
          ...item,
          features: newFeatures
        }
      }
      return item
    }))
  }

  // 删除特性
  const handleDeleteFeature = (hardwareId: string, featureIndex: number) => {
    setHardware(hardware.map(item => {
      if (item.id === hardwareId) {
        return {
          ...item,
          features: item.features.filter((_, index) => index !== featureIndex)
        }
      }
      return item
    }))
  }

  // 更新规格参数
  const handleSpecificationChange = (
    hardwareId: string,
    field: keyof Hardware['specifications'],
    value: string | string[]
  ) => {
    setHardware(hardware.map(item => {
      if (item.id === hardwareId) {
        return {
          ...item,
          specifications: {
            ...item.specifications,
            [field]: value
          }
        }
      }
      return item
    }))
  }

  // 添加连接方式
  const handleAddConnectivity = (hardwareId: string) => {
    setHardware(hardware.map(item => {
      if (item.id === hardwareId) {
        return {
          ...item,
          specifications: {
            ...item.specifications,
            connectivity: [...item.specifications.connectivity, '']
          }
        }
      }
      return item
    }))
  }

  // 更新连接方式
  const handleConnectivityChange = (hardwareId: string, index: number, value: string) => {
    setHardware(hardware.map(item => {
      if (item.id === hardwareId) {
        const newConnectivity = [...item.specifications.connectivity]
        newConnectivity[index] = value
        return {
          ...item,
          specifications: {
            ...item.specifications,
            connectivity: newConnectivity
          }
        }
      }
      return item
    }))
  }

  // 删除连接方式
  const handleDeleteConnectivity = (hardwareId: string, index: number) => {
    setHardware(hardware.map(item => {
      if (item.id === hardwareId) {
        return {
          ...item,
          specifications: {
            ...item.specifications,
            connectivity: item.specifications.connectivity.filter((_, i) => i !== index)
          }
        }
      }
      return item
    }))
  }

  // 处理主图片变更
  const handleMainImageChange = async (hardwareId: string, file: File | null) => {
    if (file) {
      // 生成文件名
      const fileName = imageUtils.generateFileName(file.name, hardwareId)
      const filePath = `/images/hardware/${fileName}`

      // 创建 FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('path', filePath)

      try {
        // 上传文件
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error(await response.text())
        }

        // 更新产品数据
        setHardware(hardware.map(item => {
          if (item.id === hardwareId) {
            return {
              ...item,
              images: {
                ...item.images,
                main: filePath
              }
            }
          }
          return item
        }))

        // 保存到本地存储
        storage.save('HARDWARE', hardware)
      } catch (error) {
        const errorMessage = imageUtils.handleUploadError(error)
        alert(errorMessage)
      }
    }
  }

  // 处理主图片删除
  const handleMainImageRemove = async (hardwareId: string) => {
    try {
      // 获取当前图片路径
      const currentItem = hardware.find(item => item.id === hardwareId)
      if (currentItem?.images.main) {
        // 这里可以添加删除服务器文件的API调用
        // await fetch(`/api/upload?path=${currentItem.images.main}`, { method: 'DELETE' })
      }

      // 更新产品数据
      setHardware(hardware.map(item => {
        if (item.id === hardwareId) {
          return {
            ...item,
            images: {
              ...item.images,
              main: ''
            }
          }
        }
        return item
      }))

      // 保存到本地存储
      storage.save('HARDWARE', hardware)
    } catch (error) {
      console.error('删除图片失败:', error)
      alert('删除图片失败，请重试')
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">硬件产品管理</h1>
        <p className="mt-2 text-gray-600">
          管理硬件产品信息，包括产品描述、规格参数和图片等。
        </p>
      </div>

      <div className="space-y-6">
        {hardware.map((item) => (
          <div key={item.id} className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  产品名称
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    const updated = hardware.map(h =>
                      h.id === item.id ? { ...h, name: e.target.value } : h
                    )
                    setHardware(updated)
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  产品描述
                </label>
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const updated = hardware.map(h =>
                      h.id === item.id ? { ...h, description: e.target.value } : h
                    )
                    setHardware(updated)
                  }}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  产品主图
                </label>
                <div className="mt-1">
                  <ImageUpload
                    currentImage={item.images.main}
                    onImageChange={(file) => handleMainImageChange(item.id, file)}
                    onImageRemove={() => handleMainImageRemove(item.id)}
                  />
                </div>
              </div>

              {/* 产品特性管理 */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    产品特性
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddFeature(item.id)}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-500"
                  >
                    <PlusIcon className="mr-1 h-4 w-4" />
                    添加特性
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {item.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(item.id, index, e.target.value)}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="输入产品特性"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteFeature(item.id, index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  产品状态
                </label>
                <select
                  value={item.status}
                  onChange={(e) => {
                    const updated = hardware.map(h =>
                      h.id === item.id ? { ...h, status: e.target.value as Hardware['status'] } : h
                    )
                    setHardware(updated)
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>开发中</option>
                  <option>预售</option>
                  <option>已发布</option>
                  <option>停产</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  价格（元）
                </label>
                <input
                  type="number"
                  value={item.price || ''}
                  onChange={(e) => {
                    const updated = hardware.map(h =>
                      h.id === item.id ? { ...h, price: Number(e.target.value) } : h
                    )
                    setHardware(updated)
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 规格参数管理 */}
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900">规格参数</h3>
              <div className="mt-4 grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    尺寸
                  </label>
                  <input
                    type="text"
                    value={item.specifications.dimensions}
                    onChange={(e) => handleSpecificationChange(item.id, 'dimensions', e.target.value)}
                    placeholder="例如：200 x 150 x 50 mm"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    重量
                  </label>
                  <input
                    type="text"
                    value={item.specifications.weight}
                    onChange={(e) => handleSpecificationChange(item.id, 'weight', e.target.value)}
                    placeholder="例如：300g"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    供电方式
                  </label>
                  <input
                    type="text"
                    value={item.specifications.powerSupply}
                    onChange={(e) => handleSpecificationChange(item.id, 'powerSupply', e.target.value)}
                    placeholder="例如：可充电锂电池，续航8小时"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      连接方式
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddConnectivity(item.id)}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-500"
                    >
                      <PlusIcon className="mr-1 h-4 w-4" />
                      添加连接方式
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    {item.specifications.connectivity.map((conn, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={conn}
                          onChange={(e) => handleConnectivityChange(item.id, index, e.target.value)}
                          placeholder="例如：USB Type-C"
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteConnectivity(item.id, index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => handleDeleteHardware(item.id)}
                className="text-sm text-red-600 hover:text-red-500"
              >
                删除产品
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleAddHardware}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            添加新产品
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            保存更改
          </button>
        </div>
      </div>
    </div>
  )
} 