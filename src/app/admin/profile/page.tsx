'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/services/storage'
import { profileData } from '@/data/profile'

export default function AdminProfilePage() {
  const [formData, setFormData] = useState(profileData)

  // 从本地存储加载数据
  useEffect(() => {
    const savedData = storage.get('PROFILE')
    if (savedData) {
      setFormData(savedData)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    storage.save('PROFILE', formData)
    alert('保存成功！')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 添加研究方向
  const handleAddResearchArea = () => {
    setFormData(prev => ({
      ...prev,
      researchAreas: [
        ...prev.researchAreas,
        { title: '', description: '' }
      ]
    }))
  }

  // 删除研究方向
  const handleDeleteResearchArea = (index: number) => {
    setFormData(prev => ({
      ...prev,
      researchAreas: prev.researchAreas.filter((_, i) => i !== index)
    }))
  }

  // 更新研究方向
  const handleResearchAreaChange = (index: number, field: 'title' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      researchAreas: prev.researchAreas.map((area, i) => 
        i === index ? { ...area, [field]: value } : area
      )
    }))
  }

  // 添加教育经历
  const handleAddEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: '', school: '', period: '' }
      ]
    }))
  }

  // 删除教育经历
  const handleDeleteEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }))
  }

  // 更新教育经历
  const handleEducationChange = (index: number, field: 'degree' | 'school' | 'period', value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">个人信息管理</h1>
        <p className="mt-2 text-gray-600">
          在这里更新您的个人信息、研究方向和教育背景。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 基本信息 */}
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">基本信息</h2>
          <div className="mt-4 grid gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                姓名
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                头衔/标语
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                个人简介
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* 统计数据 */}
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">统计数据</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="researchYears" className="block text-sm font-medium text-gray-700">
                研究年限
              </label>
              <input
                type="number"
                name="researchYears"
                id="researchYears"
                value={formData.stats.researchYears}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="papers" className="block text-sm font-medium text-gray-700">
                发表论文
              </label>
              <input
                type="number"
                name="papers"
                id="papers"
                value={formData.stats.papers}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="patents" className="block text-sm font-medium text-gray-700">
                专利数量
              </label>
              <input
                type="number"
                name="patents"
                id="patents"
                value={formData.stats.patents}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="projects" className="block text-sm font-medium text-gray-700">
                重大项目
              </label>
              <input
                type="number"
                name="projects"
                id="projects"
                value={formData.stats.projects}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* 研究方向 */}
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">研究方向</h2>
            <button
              type="button"
              onClick={handleAddResearchArea}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              添加研究方向
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {formData.researchAreas.map((area, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      方向名称
                    </label>
                    <input
                      type="text"
                      value={area.title}
                      onChange={(e) => handleResearchAreaChange(index, 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      方向描述
                    </label>
                    <textarea
                      value={area.description}
                      onChange={(e) => handleResearchAreaChange(index, 'description', e.target.value)}
                      rows={2}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteResearchArea(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-500"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 教育背景 */}
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">教育背景</h2>
            <button
              type="button"
              onClick={handleAddEducation}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              添加教育经历
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      学位
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      学校
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      时间段
                    </label>
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) => handleEducationChange(index, 'period', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteEducation(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-500"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            保存更改
          </button>
        </div>
      </form>
    </div>
  )
} 