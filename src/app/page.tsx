'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { storage } from '@/services/storage'
import { userStatusData } from '@/data/status'
import type { UserStatus, CurrentStatus } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [status, setStatus] = useState<UserStatus>(userStatusData)

  useEffect(() => {
    const savedStatus = storage.get('STATUS')
    if (savedStatus) {
      setStatus(savedStatus)
    }
  }, [])

  const [currentStatus, setCurrentStatus] = useState<CurrentStatus>({
    updates: [
      {
        id: '1',
        content: '今天完成了量子计算领域的新研究，发现了一个有趣的现象...',
        createdAt: '2小时前'
      },
      {
        id: '2',
        content: '完成了今天的晨跑，感觉能量满满！',
        createdAt: '5小时前',
        image: '/images/exercise.jpg'
      }
    ]
  })

  useEffect(() => {
    const savedCurrentStatus = storage.get('CURRENT_STATUS')
    if (savedCurrentStatus) {
      setCurrentStatus(savedCurrentStatus)
    }
  }, [])

  return (
    <div className="ml-48 space-y-8">
      {/* 个人信息卡片 - 移到最上面并添加头像 */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 p-8 text-white">
        <div className="relative z-10 flex items-start space-x-8">
          <div className="flex-shrink-0">
            <Image
              src="/images/avatar.jpg"
              alt="韩达光"
              width={120}
              height={120}
              className="h-48 w-48 rounded-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold">韩达光</h1>
            <p className="mt-2 text-xl">AI智能体研发者 | 人类生存空间开拓者 | 未来科技布道者</p>
            <p className="mt-4 max-w-2xl">
              作为一名致力于智能体研发与新空间结构技术的科研工作者，我专注于打造人类通向数字高维世界和从数字世界获取科技与灵感联通的桥梁，始终探索尖端技术并致力于为人类延展边界并创造更多可能。
            </p>
            <div className="mt-6 flex space-x-4">
              <Link
                href="/academic"
                className="rounded-md bg-white px-4 py-2 text-blue-900 hover:bg-gray-100"
              >
                学术成果
              </Link>
              <Link
                href="/hardware"
                className="rounded-md bg-white px-4 py-2 text-blue-900 hover:bg-gray-100"
              >
                智能产品
              </Link>
              <Link
                href="/community"
                className="rounded-md border border-white px-4 py-2 hover:bg-white/10"
              >
                加入社区
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 实时状态 - 移到个人信息下面 */}
      <div className="rounded-xl bg-gray-900 p-6 text-white">
        <h2 className="mb-6 text-2xl font-bold">实时状态</h2>
        
        {/* 运动状态 */}
        <div className="mb-6 rounded-lg bg-gray-800 p-4">
          <div className="mb-2 flex items-center">
            <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-lg font-semibold">运动状态</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-400">{status.exercise.steps}</div>
              <div className="text-sm text-gray-400">今日步数</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{status.exercise.duration}</div>
              <div className="text-sm text-gray-400">运动时长</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{status.exercise.calories}千卡</div>
              <div className="text-sm text-gray-400">消耗热量</div>
            </div>
          </div>
        </div>

        {/* 脑波状态 */}
        <div className="mb-6 rounded-lg bg-gray-800 p-4">
          <div className="mb-2 flex items-center">
            <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h.01M15 10h.01M12 14h.01" />
            </svg>
            <h3 className="text-lg font-semibold">脑波状态</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-purple-400">{status.brain.meditation}</div>
              <div className="text-sm text-gray-400">今日冥想</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{status.brain.focus}%</div>
              <div className="text-sm text-gray-400">专注度</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{status.brain.quality}</div>
              <div className="text-sm text-gray-400">脑波质量</div>
            </div>
          </div>
        </div>

        {/* 学习状态 */}
        <div className="rounded-lg bg-gray-800 p-4">
          <div className="mb-2 flex items-center">
            <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-semibold">学习状态</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-green-400">{status.study.readingTime}</div>
              <div className="text-sm text-gray-400">今日阅读</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{status.study.topic}</div>
              <div className="text-sm text-gray-400">学习主题</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{status.study.absorption}%</div>
              <div className="text-sm text-gray-400">知识吸收</div>
            </div>
          </div>
        </div>

        {/* 最新动态 */}
        <div className="space-y-4">
          <div className="mb-2 flex items-center">
            <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h3 className="text-lg font-semibold">最新动态</h3>
          </div>
          <div className="space-y-4">
            {currentStatus.updates.map((update) => (
              <div key={update.id} className="rounded-lg bg-gray-800 p-4">
                <div className="flex items-start space-x-3">
                  <Image
                    src="/images/avatar.jpg"
                    alt="韩达光"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">韩达光</span>
                      <span className="text-sm text-gray-400">{update.createdAt}</span>
                    </div>
                    <p className="mt-2 text-gray-300">{update.content}</p>
                    {update.image && (
                      <div className="mt-3">
                        <Image
                          src={update.image}
                          alt=""
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />
                      </div>
                    )}
                    <div className="mt-3 flex items-center space-x-4 text-sm text-gray-400">
                      <button className="flex items-center hover:text-gray-300">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        点赞
                      </button>
                      <button className="flex items-center hover:text-gray-300">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        评论
                      </button>
                      <button className="flex items-center hover:text-gray-300">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        分享
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 研究成果展示 - 保持在最下面 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">最新研究成果</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 研究成果卡片 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">量子计算与人工智能的融合</h3>
            <p className="mt-2 text-gray-600">
              发表于 Nature Computing Science，2023年
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>引用次数：128</span>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">脑波控制技术的新突破</h3>
            <p className="mt-2 text-gray-600">
              发表于 Science Robotics，2023年
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>引用次数：256</span>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">人工智能伦理课题研究</h3>
            <p className="mt-2 text-gray-600">
              发表于 AI Ethics，2023年
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>引用次数：89</span>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/admin"
        className="fixed bottom-4 right-4 rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
      >
        进入管理后台
      </Link>
    </div>
  );
}
