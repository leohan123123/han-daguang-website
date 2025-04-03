export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">欢迎使用网站管理系统</h1>
      <p className="mt-2 text-gray-600">
        请从左侧菜单选择要管理的内容。您可以在这里管理网站的所有内容，包括个人信息、专利技术、AI产品、课程和视频等。
      </p>
      
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">个人信息管理</h2>
          <p className="mt-2 text-sm text-gray-600">
            更新个人简介、研究方向、教育背景等信息
          </p>
        </div>
        
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">专利技术管理</h2>
          <p className="mt-2 text-sm text-gray-600">
            管理专利列表、更新专利状态和详细信息
          </p>
        </div>
        
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">AI产品管理</h2>
          <p className="mt-2 text-sm text-gray-600">
            编辑AI产品信息、更新功能特性和状态
          </p>
        </div>
        
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">课程管理</h2>
          <p className="mt-2 text-sm text-gray-600">
            添加新课程、更新课程内容和学习资料
          </p>
        </div>
        
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">视频管理</h2>
          <p className="mt-2 text-sm text-gray-600">
            上传新视频、编辑视频信息和分类
          </p>
        </div>
        
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">系统设置</h2>
          <p className="mt-2 text-sm text-gray-600">
            配置网站基本设置、导航菜单等
          </p>
        </div>
      </div>
    </div>
  )
} 