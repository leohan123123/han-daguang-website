'use client'
import { useState } from 'react'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'AI助手',
      description: '智能对话助手系统',
      features: ['自然语言处理', '知识图谱', '多轮对话'],
      status: '已发布',
      image: '/images/ai-assistant.png'
    }
  ])

  const handleAddProduct = () => {
    setProducts([...products, {
      id: String(Date.now()),
      name: '',
      description: '',
      features: [],
      status: '开发中',
      image: ''
    }])
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI产品管理</h1>
        <p className="mt-2 text-gray-600">
          管理您的AI产品展示信息。
        </p>
      </div>

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  产品名称
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => {
                    const updatedProducts = products.map(p =>
                      p.id === product.id ? { ...p, name: e.target.value } : p
                    )
                    setProducts(updatedProducts)
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  产品描述
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) => {
                    const updatedProducts = products.map(p =>
                      p.id === product.id ? { ...p, description: e.target.value } : p
                    )
                    setProducts(updatedProducts)
                  }}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  产品状态
                </label>
                <select
                  value={product.status}
                  onChange={(e) => {
                    const updatedProducts = products.map(p =>
                      p.id === product.id ? { ...p, status: e.target.value } : p
                    )
                    setProducts(updatedProducts)
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>开发中</option>
                  <option>测试中</option>
                  <option>已发布</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => handleDeleteProduct(product.id)}
                className="text-sm text-red-600 hover:text-red-500"
              >
                删除产品
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddProduct}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            添加新产品
          </button>
        </div>
      </div>
    </div>
  )
} 