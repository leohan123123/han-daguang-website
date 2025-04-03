import React from 'react'
import { SparklesIcon, BoltIcon, CpuChipIcon } from '@heroicons/react/24/outline'

const products = [
  {
    id: 1,
    name: '韩达光AI助手',
    description: '基于大规模语言模型的智能助手，为您提供研究和日常工作支持。',
    features: [
      '自然语言理解与生成',
      '多领域专业知识支持',
      '个性化学习与适应',
      '多模态交互能力'
    ],
    image: '/placeholder.png',
    status: '已上线',
    icon: SparklesIcon,
  },
  {
    id: 2,
    name: '脑波分析助手',
    description: '专业的脑波数据分析工具，帮助研究者更好地理解脑电信号。',
    features: [
      '实时脑电信号分析',
      '多维度数据可视化',
      'AI辅助信号处理',
      '研究报告自动生成'
    ],
    image: '/placeholder.png',
    status: '内测中',
    icon: BoltIcon,
  },
  {
    id: 3,
    name: '量子计算模拟器',
    description: '用于量子算法开发和测试的模拟环境，支持多种量子计算模型。',
    features: [
      '量子线路设计',
      '量子算法模拟',
      '结果可视化',
      '性能评估工具'
    ],
    image: '/placeholder.png',
    status: '开发中',
    icon: CpuChipIcon,
  }
]

export default function AIProductsPage() {
  return (
    <div className="ml-48">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI智能体与软件</h1>
        <p className="mt-2 text-gray-600">
          探索未来科技，体验智能生活。这里展示了我们最新的AI产品和软件工具。
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative h-48 bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                产品界面展示
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <product.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {product.status}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{product.description}</p>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">主要功能</h4>
                <ul className="mt-2 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                了解更多
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 技术优势 */}
      <div className="mt-12 rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">技术优势</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900">先进算法</h3>
            <p className="mt-2 text-gray-600">
              采用最新的深度学习和量子计算技术，确保产品性能处于行业领先水平。
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900">安全可靠</h3>
            <p className="mt-2 text-gray-600">
              严格的安全审核和隐私保护机制，保障用户数据和使用安全。
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900">持续创新</h3>
            <p className="mt-2 text-gray-600">
              定期更新和优化，不断融入最新研究成果，持续提升产品性能。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 