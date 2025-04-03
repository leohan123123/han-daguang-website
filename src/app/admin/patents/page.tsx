'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/services/storage'
import { patentData } from '@/data/patents'
import type { Patent } from '@/types'
import { 
  PencilIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline'

export default function AdminPatentsPage() {
  const [patents, setPatents] = useState<Patent[]>(patentData)

  // 从本地存储加载数据
  useEffect(() => {
    const savedData = storage.get('PATENTS')
    if (savedData) {
      setPatents(savedData)
    } else {
      // 如果没有保存的数据，使用默认数据并保存
      storage.save('PATENTS', patentData)
      setPatents(patentData)
    }
  }, [])

  // 监听数据变化并保存
  useEffect(() => {
    if (patents.length > 0) {
      storage.save('PATENTS', patents)
    }
  }, [patents])

  const handleAddPatent = () => {
    const newPatent: Patent = {
      id: Date.now(),
      title: '',
      category: '',
      status: '审查中',
      publicationDate: '',
      number: '',
      description: ''
    }
    setPatents([...patents, newPatent])
  }

  const handleDeletePatent = (id: number) => {
    setPatents(patents.filter(item => item.id !== id))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">专利技术管理</h1>
        <p className="mt-2 text-gray-600">
          管理专利技术信息，包括专利标题、类别、状态等。
        </p>
      </div>

      <div className="space-y-6">
        {patents.map((patent) => (
          <div key={patent.id} className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  专利标题
                </label>
                <input
                  type="text"
                  value={patent.title}
                  onChange={(e) => {
                    const updated = patents.map(p =>
                      p.id === patent.id ? { ...p, title: e.target.value } : p
                    )
                    setPatents(updated)
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  专利类别
                </label>
                <input
                  type="text"
                  value={patent.category}
                  onChange={(e) => {
                    const updated = patents.map(p =>
                      p.id === patent.id ? { ...p, category: e.target.value } : p
                    )
                    setPatents(updated)
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  专利状态
                </label>
                <select
                  value={patent.status}
                  onChange={(e) => {
                    const updated = patents.map(p =>
                      p.id === patent.id ? { ...p, status: e.target.value as Patent['status'] } : p
                    )
                    setPatents(updated)
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>已授权</option>
                  <option>审查中</option>
                  <option>公开</option>
                  <option>失效</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  公开日期
                </label>
                <input
                  type="date"
                  value={patent.publicationDate}
                  onChange={(e) => {
                    const updated = patents.map(p =>
                      p.id === patent.id ? { ...p, publicationDate: e.target.value } : p
                    )
                    setPatents(updated)
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  专利号
                </label>
                <input
                  type="text"
                  value={patent.number}
                  onChange={(e) => {
                    const updated = patents.map(p =>
                      p.id === patent.id ? { ...p, number: e.target.value } : p
                    )
                    setPatents(updated)
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  专利描述
                </label>
                <textarea
                  value={patent.description}
                  onChange={(e) => {
                    const updated = patents.map(p =>
                      p.id === patent.id ? { ...p, description: e.target.value } : p
                    )
                    setPatents(updated)
                  }}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => handleDeletePatent(patent.id)}
                className="text-sm text-red-600 hover:text-red-500"
              >
                删除专利
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleAddPatent}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            添加新专利
          </button>
        </div>
      </div>
    </div>
  )
} 