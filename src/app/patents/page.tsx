import { BeakerIcon, LightBulbIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const patents = [
  {
    id: 1,
    title: '基于量子计算的深度学习优化方法',
    category: '量子计算',
    status: '已授权',
    publicationDate: '2023-06-15',
    number: 'CN123456789A',
    description: '本发明提供了一种基于量子计算的深度学习优化方法，通过量子态叠加和纠缠特性，显著提高了深度学习模型的训练效率和性能。',
    icon: BeakerIcon,
  },
  {
    id: 2,
    title: '脑波信号处理及人机交互系统',
    category: '脑机接口',
    status: '已授权',
    publicationDate: '2023-03-20',
    number: 'CN987654321A',
    description: '该专利涉及一种创新的脑波信号处理方法，能够实现更准确的脑电信号解析，提高了脑机接口的响应速度和准确性。',
    icon: LightBulbIcon,
  },
  {
    id: 3,
    title: 'AI系统安全性评估方法',
    category: 'AI安全',
    status: '审查中',
    publicationDate: '2023-09-01',
    number: 'CN456789123A',
    description: '提出了一套完整的人工智能系统安全性评估方法，包括对AI决策过程的可解释性分析和潜在风险评估。',
    icon: ChartBarIcon,
  },
]

export default function PatentsPage() {
  return (
    <div className="ml-48">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">专利技术</h1>
        <p className="mt-2 text-gray-600">
          展示最新的技术创新和突破，包括量子计算、脑机接口和AI安全等领域的专利成果。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {patents.map((patent) => (
          <div
            key={patent.id}
            className="overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <patent.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {patent.status}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{patent.category}</span>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{patent.title}</h3>
              <p className="mt-2 text-sm text-gray-500">专利号：{patent.number}</p>
              <p className="mt-1 text-sm text-gray-500">公开日期：{patent.publicationDate}</p>
              <p className="mt-4 text-gray-600">{patent.description}</p>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                查看详情 →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 专利统计 */}
      <div className="mt-12 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">专利统计</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600">已授权专利</div>
          </div>
          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-600">审查中专利</div>
          </div>
          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600">国际专利</div>
          </div>
          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">15</div>
            <div className="text-sm text-gray-600">技术转化</div>
          </div>
        </div>
      </div>
    </div>
  )
} 