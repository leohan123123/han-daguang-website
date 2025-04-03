import {
  UserIcon,
  DocumentTextIcon,
  CpuChipIcon,
  DeviceTabletIcon,
  VideoCameraIcon,
  AcademicCapIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const adminNavItems = [
  { name: '个人信息', href: '/admin/profile', icon: UserIcon },
  { name: '专利技术', href: '/admin/patents', icon: DocumentTextIcon },
  { name: 'AI产品', href: '/admin/products', icon: CpuChipIcon },
  { name: '硬件产品', href: '/admin/hardware', icon: DeviceTabletIcon },
  { name: '视频课程', href: '/admin/courses', icon: VideoCameraIcon },
  { name: '学术社区', href: '/admin/community', icon: AcademicCapIcon },
  { name: '系统设置', href: '/admin/settings', icon: Cog6ToothIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-xl font-bold text-gray-900">网站管理后台</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex py-6">
          {/* 侧边导航 */}
          <div className="w-64 shrink-0">
            <nav className="space-y-1">
              {adminNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* 主内容区 */}
          <main className="ml-8 flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
} 