import { PlayIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

const courses = [
  {
    id: 1,
    title: '量子计算基础入门',
    type: '视频课程',
    duration: '12课时',
    level: '入门',
    description: '从零开始学习量子计算的基本概念和原理，了解量子比特、量子门和量子算法。',
    topics: ['量子力学基础', '量子计算模型', '量子算法入门', '实际应用案例'],
    icon: AcademicCapIcon,
  },
  {
    id: 2,
    title: '脑机接口技术实践',
    type: '在线课程',
    duration: '16课时',
    level: '进阶',
    description: '深入学习脑机接口技术的原理和应用，包括信号处理、模式识别和设备开发。',
    topics: ['脑电信号基础', '信号处理技术', '机器学习应用', '设备集成开发'],
    icon: BookOpenIcon,
  },
  {
    id: 3,
    title: 'AI系统设计与实现',
    type: '实践课程',
    duration: '20课时',
    level: '高级',
    description: '系统学习AI系统的设计方法和实现技术，从理论到实践全面掌握。',
    topics: ['系统架构设计', '算法优化技术', '分布式训练', '部署与运维'],
    icon: PlayIcon,
  }
]

const videos = [
  {
    id: 1,
    title: '量子计算研究进展',
    duration: '45分钟',
    views: '1.2万',
    date: '2023-12-15',
    thumbnail: '/placeholder.png',
  },
  {
    id: 2,
    title: '脑机接口最新突破',
    duration: '38分钟',
    views: '8.5千',
    date: '2023-11-20',
    thumbnail: '/placeholder.png',
  },
  {
    id: 3,
    title: 'AI安全与伦理探讨',
    duration: '52分钟',
    views: '1.5万',
    date: '2023-10-30',
    thumbnail: '/placeholder.png',
  }
]

export default function CoursesPage() {
  return (
    <div className="ml-48">
      {/* 课程部分 */}
      <section>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">视频与课程</h1>
          <p className="mt-2 text-gray-600">
            精心设计的课程体系，帮助您系统学习前沿科技知识。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <course.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center space-x-2">
                      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        {course.type}
                      </span>
                      <span className="text-sm text-gray-500">{course.level}</span>
                    </div>
                    <h3 className="mt-1 text-xl font-semibold text-gray-900">{course.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{course.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">课程内容</h4>
                  <ul className="mt-2 space-y-2">
                    {course.topics.map((topic, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  课程时长：{course.duration}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  开始学习
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 视频部分 */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">最新视频</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-48 bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  视频缩略图
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayIcon className="h-12 w-12 text-white opacity-75" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span>{video.duration}</span>
                  <span className="mx-2">•</span>
                  <span>{video.views}次观看</span>
                  <span className="mx-2">•</span>
                  <span>{video.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 