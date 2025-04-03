import Link from 'next/link'
import { HomeIcon, UserIcon, BeakerIcon, ComputerDesktopIcon, ChatBubbleLeftRightIcon, UserGroupIcon, DeviceTabletIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: '首页', href: '/', icon: HomeIcon },
  { name: '个人履历', href: '/profile', icon: UserIcon },
  { name: '学术成果', href: '/academic', icon: BeakerIcon },
  { name: 'AI智能体与软件', href: '/ai-products', icon: ComputerDesktopIcon },
  { name: '硬件产品', href: '/hardware', icon: DeviceTabletIcon },
  { name: '视频与课程', href: '/courses', icon: ChatBubbleLeftRightIcon },
  { name: '学术社区', href: '/community', icon: UserGroupIcon },
]

export default function Navbar() {
  return (
    <div className="flex">
      {/* 左侧导航栏 */}
      <div className="fixed left-0 top-0 h-full w-48 bg-[#1a237e] text-white">
        <div className="p-4">
          <span className="block text-xl font-bold">韩达光（进阶1级）</span>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 hover:bg-blue-800"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 顶部导航栏 */}
      <div className="ml-48 w-full">
        <div className="flex h-16 items-center justify-between bg-white px-8 shadow">
          <div className="flex-1 text-center">
            <span className="text-3xl font-extrabold text-blue-900">超体网</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              登录
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              加入社区
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 