'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/services/storage'
import { profileData } from '@/data/profile'
import Image from 'next/image'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '韩达光',
    title: 'AI智能体研发者 | 脑波技术探索者 | 未来科技布道者',
    description: '在过去的十年中，我一直致力于人工智能与脑机接口技术的研究。作为一名跨学科研究者，我的研究横跨计算机科学、神经科学和量子物理等多个领域。目前，我正专注于开发下一代人工智能系统，这些系统能够更好地理解和模拟人类认知过程。',
    stats: {
      researchYears: 10,
      papers: 60,
      patents: 31,
      projects: 5
    },
    researchAreas: [
      {
        title: '智能感知与数字孪生技术',
        description: '专注于开发智能化传感系统，包括 MEMS 环境感知传感器和应变应力感知芯片，结合数字孪生技术，推动智慧城市、智能建筑和基础设施全生命周期的物-数双向监测与管理。'
      },
      {
        title: 'AI 赋能智能建造与人机协同',
        description: '研究基于大语言模型和AI智能体工程协同调度、结构设计与优化，以及智能建造领域的创新技术，提升工程建设的数字化、智能化水平。'
      },
      {
        title: 'Web3.0 与区块链技术创新',
        description: '探索区块链在技能证明、学习科研成果确权及去中心化教学平台中的应用，致力于构建面向未来的个性化学习和实践连接生态。'
      }
    ],
    education: [
      {
        degree: '工学博士，土木工程与数字化方向',
        school: '德国慕尼黑联邦国防军大学',
        period: '2008 - 2011'
      },
      {
        degree: '结构工程硕士',
        school: '沈阳建筑大学',
        period: '2005 - 2008'
      },
      {
        degree: '土木工程学士',
        school: '沈阳建筑大学',
        period: '2001 - 2005'
      }
    ]
  })

  // 从本地存储加载数据
  useEffect(() => {
    const loadData = () => {
      const savedData = storage.get('PROFILE')
      if (savedData) {
        setProfile(savedData)
      }
    }
    
    // 初始加载
    loadData()
    
    // 添加存储事件监听器
    window.addEventListener('storage', loadData)
    
    // 清理函数
    return () => {
      window.removeEventListener('storage', loadData)
    }
  }, [])

  // 添加轮询检查数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      const savedData = storage.get('PROFILE')
      if (savedData) {
        setProfile(savedData)
      }
    }, 5000) // 每5秒检查一次

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="ml-48 space-y-12">
      {/* 个人简介 */}
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
        <p className="mt-2 text-xl text-gray-600">{profile.title}</p>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-lg text-gray-600">{profile.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-2xl font-bold text-blue-600">{profile.stats.researchYears}+</div>
                <div className="text-sm text-gray-600">年研究经验</div>
              </div>
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-2xl font-bold text-blue-600">{profile.stats.papers}+</div>
                <div className="text-sm text-gray-600">发表论文</div>
              </div>
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-2xl font-bold text-blue-600">{profile.stats.patents}+</div>
                <div className="text-sm text-gray-600">项专利</div>
              </div>
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-2xl font-bold text-blue-600">{profile.stats.projects}+</div>
                <div className="text-sm text-gray-600">重大项目</div>
              </div>
            </div>
          </div>
          <div className="relative h-64 overflow-hidden rounded-xl lg:h-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-20"></div>
            <div className="relative h-full">
              {/* 这里可以放置个人照片 */}
              <div className="flex h-full items-center justify-center text-gray-400">
                照片待更新
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 研究方向 */}
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">研究方向</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profile.researchAreas.map((area, index) => (
            <div key={index} className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold text-gray-900">{area.title}</h3>
              <p className="mt-2 text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 教育背景 */}
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">教育背景</h2>
        <div className="mt-6 space-y-6">
          {profile.education.map((edu, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                <p className="mt-1 text-gray-600">{edu.school}</p>
                <p className="mt-1 text-sm text-gray-500">{edu.period}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 主要任职 */}
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">主要任职</h2>
        <div className="mt-6 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">东南大学</h3>
              <p className="mt-1 text-gray-600">2022.06-至今 副教授、未来工程智能虚拟实验室主任</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">重庆鲁汶智慧城市与可持续发展研究院</h3>
              <p className="mt-1 text-gray-600">2019.04-至今 院长</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">挪威奥斯陆城市大学</h3>
              <p className="mt-1 text-gray-600">2019.08-2022.05（终身职位） 副教授</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">ISO标准编委</h3>
              <p className="mt-1 text-gray-600">&lt;ISO/TC 59/SC 13 JWG 14 &gt; GIS与BIM 标准 （ISO）</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">中国工程建设标准化协会标准数字化工作委员会</h3>
              <p className="mt-1 text-gray-600">副主任委员</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">中国公路学会交通智能建造分会</h3>
              <p className="mt-1 text-gray-600">理事</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
} 