'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/services/storage'
import { communityData } from '@/data/community'
import type { CommunityPost } from '@/types'
import { PlusIcon, HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline'

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(communityData)
  const [newPost, setNewPost] = useState({
    content: '',
    images: [] as string[]
  })

  // 从本地存储加载数据
  useEffect(() => {
    const savedData = storage.get('COMMUNITY')
    if (savedData) {
      setPosts(savedData)
    } else {
      storage.save('COMMUNITY', communityData)
    }
  }, [])

  // 处理发布新帖子
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.content.trim()) return

    const post: CommunityPost = {
      id: String(Date.now()),
      author: {
        name: '韩达光',
        avatar: '/images/avatars/default.jpg'
      },
      content: newPost.content,
      images: newPost.images,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
      tags: []
    }

    const updatedPosts = [post, ...posts]
    setPosts(updatedPosts)
    storage.save('COMMUNITY', updatedPosts)
    setNewPost({ content: '', images: [] })
  }

  // 处理图片上传
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('path', `/images/community/${Date.now()}-${file.name}`)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('上传失败')
        }

        const { path } = await response.json()
        setNewPost(prev => ({
          ...prev,
          images: [...prev.images, path]
        }))
      } catch (error) {
        console.error('上传图片失败:', error)
        alert('上传图片失败，请重试')
      }
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-8">
      {/* 发布框 */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit}>
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="分享你的想法..."
            className="min-h-[100px] w-full rounded-lg border p-4 focus:border-blue-500 focus:outline-none"
          />
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex cursor-pointer items-center rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                添加图片
              </label>
              {newPost.images.length > 0 && (
                <span className="text-sm text-gray-500">
                  已选择 {newPost.images.length} 张图片
                </span>
              )}
            </div>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              发布
            </button>
          </div>
        </form>
      </div>

      {/* 帖子列表 */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="rounded-xl bg-white p-6 shadow-sm">
            {/* 作者信息 */}
            <div className="mb-4 flex items-center">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                {post.author.avatar ? (
                  <img src={post.author.avatar} alt={post.author.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blue-500 text-white">
                    {post.author.name[0]}
                  </div>
                )}
              </div>
              <div className="ml-3">
                <div className="font-semibold">{post.author.name}</div>
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleString('zh-CN')}
                </div>
              </div>
            </div>

            {/* 帖子内容 */}
            <div className="mb-4">
              <p className="whitespace-pre-wrap text-gray-800">{post.content}</p>
              {post.images && post.images.length > 0 && (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {post.images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 标签 */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 互动按钮 */}
            <div className="flex items-center space-x-6 text-gray-500">
              <button className="flex items-center hover:text-blue-600">
                <HeartIcon className="mr-1 h-5 w-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center hover:text-blue-600">
                <ChatBubbleLeftIcon className="mr-1 h-5 w-5" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center hover:text-blue-600">
                <ShareIcon className="mr-1 h-5 w-5" />
                <span>{post.shares}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 