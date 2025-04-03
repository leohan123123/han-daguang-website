'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/services/storage'
import type { CurrentStatus, StatusUpdate } from '@/types'

export default function StatusManagementPage() {
  const [currentStatus, setCurrentStatus] = useState<CurrentStatus>({
    updates: []
  })

  const [newUpdate, setNewUpdate] = useState({
    content: '',
    image: ''
  })

  useEffect(() => {
    const savedStatus = storage.get('CURRENT_STATUS')
    if (savedStatus) {
      setCurrentStatus(savedStatus)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const update: StatusUpdate = {
      id: Date.now().toString(),
      content: newUpdate.content,
      createdAt: '刚刚',
      ...(newUpdate.image ? { image: newUpdate.image } : {})
    }

    const updatedStatus = {
      updates: [update, ...currentStatus.updates]
    }

    storage.save('CURRENT_STATUS', updatedStatus)
    setCurrentStatus(updatedStatus)
    setNewUpdate({ content: '', image: '' })
  }

  const handleDelete = (id: string) => {
    const updatedStatus = {
      updates: currentStatus.updates.filter(update => update.id !== id)
    }
    storage.save('CURRENT_STATUS', updatedStatus)
    setCurrentStatus(updatedStatus)
  }

  return (
    <div className="ml-48 space-y-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">动态管理</h1>

      {/* 发布新动态 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">发布新动态</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              内容
            </label>
            <textarea
              value={newUpdate.content}
              onChange={e => setNewUpdate(prev => ({ ...prev, content: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
              placeholder="分享你的想法..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              图片URL（可选）
            </label>
            <input
              type="text"
              value={newUpdate.image}
              onChange={e => setNewUpdate(prev => ({ ...prev, image: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="输入图片URL"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            发布
          </button>
        </form>
      </section>

      {/* 动态列表 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">动态列表</h2>
        <div className="mt-4 space-y-4">
          {currentStatus.updates.map(update => (
            <div key={update.id} className="flex items-start justify-between rounded-lg border p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">韩达光</span>
                  <span className="text-sm text-gray-500">{update.createdAt}</span>
                </div>
                <p className="text-gray-700">{update.content}</p>
                {update.image && (
                  <img src={update.image} alt="" className="mt-2 h-32 rounded-lg object-cover" />
                )}
              </div>
              <button
                onClick={() => handleDelete(update.id)}
                className="text-red-600 hover:text-red-700"
              >
                删除
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 