'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/services/storage'
import type { AcademicAchievement, ResearchProjects } from '@/types'

export default function AcademicManagementPage() {
  const [academic, setAcademic] = useState<AcademicAchievement>({
    papers: {
      total: 58,
      sciCount: 14,
      highlights: [
        'Nature子刊论文：量子计算在机器学习中的应用',
        'Science子刊论文：脑机接口新算法研究',
        'IEEE顶级期刊论文：AI安全性评估方法'
      ]
    },
    patents: {
      total: 28,
      highlights: [
        '一种基于深度学习的脑机接口控制方法',
        '智能体自主学习系统',
        '高维数据可视化方法'
      ]
    },
    software: {
      total: 8,
      highlights: [
        '智能体训练平台',
        '脑机接口信号处理系统',
        '科研数据分析工具'
      ]
    },
    awards: {
      highlights: [
        '省部级科技进步一等奖',
        '国家自然科学基金优秀青年项目',
        '教育部创新团队奖'
      ]
    },
    transformations: {
      highlights: [
        '脑机接口技术产业化项目',
        'AI安全评估系统商业化',
        '科研数据分析平台应用'
      ]
    }
  })

  const [projects, setProjects] = useState<ResearchProjects>({
    national: [
      {
        title: '国家重点研发计划项目',
        period: '2023-2026',
        role: '项目负责人',
        description: '智能体与人类意识交互研究'
      }
    ],
    provincial: [
      {
        title: '省重点实验室开放课题',
        period: '2023-2025',
        role: '主要研究者',
        description: '高维数据可视化与交互'
      }
    ],
    enterprise: [
      {
        title: '企业合作研发项目',
        period: '2023-2024',
        role: '技术总监',
        description: 'AI产品安全性评估'
      }
    ],
    international: [
      {
        title: '国际合作研究项目',
        period: '2023-2025',
        role: '中方负责人',
        description: '跨文化AI交互研究'
      }
    ]
  })

  useEffect(() => {
    const savedAcademic = storage.get('ACADEMIC')
    if (savedAcademic) {
      setAcademic(savedAcademic)
    }
    const savedProjects = storage.get('PROJECTS')
    if (savedProjects) {
      setProjects(savedProjects)
    }
  }, [])

  const handleSave = () => {
    storage.save('ACADEMIC', academic)
    storage.save('PROJECTS', projects)
    alert('保存成功！')
  }

  const handleHighlightChange = (
    section: keyof AcademicAchievement,
    index: number,
    value: string
  ) => {
    setAcademic(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        highlights: prev[section].highlights.map((h, i) => (i === index ? value : h))
      }
    }))
  }

  const handleProjectChange = (
    section: keyof ResearchProjects,
    index: number,
    field: keyof ResearchProjects[keyof ResearchProjects][number],
    value: string
  ) => {
    setProjects(prev => ({
      ...prev,
      [section]: prev[section].map((p, i) => (i === index ? { ...p, [field]: value } : p))
    }))
  }

  return (
    <div className="ml-48 space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">学术成果管理</h1>
        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          保存更改
        </button>
      </div>

      {/* 论文专著 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">论文专著</h2>
        <div className="mt-4 space-y-4">
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">总论文数</label>
              <input
                type="number"
                value={academic.papers.total}
                onChange={e => setAcademic(prev => ({
                  ...prev,
                  papers: { ...prev.papers, total: parseInt(e.target.value) }
                }))}
                className="mt-1 block w-32 rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SCI论文数</label>
              <input
                type="number"
                value={academic.papers.sciCount}
                onChange={e => setAcademic(prev => ({
                  ...prev,
                  papers: { ...prev.papers, sciCount: parseInt(e.target.value) }
                }))}
                className="mt-1 block w-32 rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">代表性论文</label>
            {academic.papers.highlights.map((paper, index) => (
              <input
                key={index}
                type="text"
                value={paper}
                onChange={e => handleHighlightChange('papers', index, e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 专利技术 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">专利技术</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">专利总数</label>
            <input
              type="number"
              value={academic.patents.total}
              onChange={e => setAcademic(prev => ({
                ...prev,
                patents: { ...prev.patents, total: parseInt(e.target.value) }
              }))}
              className="mt-1 block w-32 rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">代表性专利</label>
            {academic.patents.highlights.map((patent, index) => (
              <input
                key={index}
                type="text"
                value={patent}
                onChange={e => handleHighlightChange('patents', index, e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 软件著作权 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">软件著作权</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">软件著作权总数</label>
            <input
              type="number"
              value={academic.software.total}
              onChange={e => setAcademic(prev => ({
                ...prev,
                software: { ...prev.software, total: parseInt(e.target.value) }
              }))}
              className="mt-1 block w-32 rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">代表性软件</label>
            {academic.software.highlights.map((software, index) => (
              <input
                key={index}
                type="text"
                value={software}
                onChange={e => handleHighlightChange('software', index, e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 荣誉奖项 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">荣誉奖项</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">代表性奖项</label>
          {academic.awards.highlights.map((award, index) => (
            <input
              key={index}
              type="text"
              value={award}
              onChange={e => handleHighlightChange('awards', index, e.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          ))}
        </div>
      </section>

      {/* 转化成果 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">转化成果</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">代表性成果</label>
          {academic.transformations.highlights.map((transformation, index) => (
            <input
              key={index}
              type="text"
              value={transformation}
              onChange={e => handleHighlightChange('transformations', index, e.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          ))}
        </div>
      </section>

      <h1 className="text-3xl font-bold text-gray-900">研究项目管理</h1>

      {/* 国家级项目 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">国家级项目</h2>
        <div className="mt-4 space-y-6">
          {projects.national.map((project, index) => (
            <div key={index} className="space-y-4 rounded-lg border p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">项目名称</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={e => handleProjectChange('national', index, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">时间周期</label>
                <input
                  type="text"
                  value={project.period}
                  onChange={e => handleProjectChange('national', index, 'period', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">角色</label>
                <input
                  type="text"
                  value={project.role}
                  onChange={e => handleProjectChange('national', index, 'role', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">项目描述</label>
                <input
                  type="text"
                  value={project.description}
                  onChange={e => handleProjectChange('national', index, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 省部级项目 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">省部级项目</h2>
        <div className="mt-4 space-y-6">
          {projects.provincial.map((project, index) => (
            <div key={index} className="space-y-4 rounded-lg border p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">项目名称</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={e => handleProjectChange('provincial', index, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">时间周期</label>
                <input
                  type="text"
                  value={project.period}
                  onChange={e => handleProjectChange('provincial', index, 'period', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">角色</label>
                <input
                  type="text"
                  value={project.role}
                  onChange={e => handleProjectChange('provincial', index, 'role', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">项目描述</label>
                <input
                  type="text"
                  value={project.description}
                  onChange={e => handleProjectChange('provincial', index, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 企业合作项目 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">企业合作项目</h2>
        <div className="mt-4 space-y-6">
          {projects.enterprise.map((project, index) => (
            <div key={index} className="space-y-4 rounded-lg border p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">项目名称</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={e => handleProjectChange('enterprise', index, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">时间周期</label>
                <input
                  type="text"
                  value={project.period}
                  onChange={e => handleProjectChange('enterprise', index, 'period', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">角色</label>
                <input
                  type="text"
                  value={project.role}
                  onChange={e => handleProjectChange('enterprise', index, 'role', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">项目描述</label>
                <input
                  type="text"
                  value={project.description}
                  onChange={e => handleProjectChange('enterprise', index, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 国际合作项目 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">国际合作项目</h2>
        <div className="mt-4 space-y-6">
          {projects.international.map((project, index) => (
            <div key={index} className="space-y-4 rounded-lg border p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">项目名称</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={e => handleProjectChange('international', index, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">时间周期</label>
                <input
                  type="text"
                  value={project.period}
                  onChange={e => handleProjectChange('international', index, 'period', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">角色</label>
                <input
                  type="text"
                  value={project.role}
                  onChange={e => handleProjectChange('international', index, 'role', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">项目描述</label>
                <input
                  type="text"
                  value={project.description}
                  onChange={e => handleProjectChange('international', index, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 