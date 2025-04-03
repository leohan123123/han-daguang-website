'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/services/storage'
import type { Hardware } from '@/types'
import Image from 'next/image'

export default function HardwarePage() {
  const [hardware, setHardware] = useState<Hardware[]>([
    {
      id: 'mems-sensor',
      name: 'MEMS环境感知传感器',
      description: '自主研发高精度环境监测传感器，应用于智慧城市和智能建筑领域，实现空气质量、温湿度等多参数实时监测',
      features: [
        '多参数实时监测',
        '高精度数据采集',
        '智慧城市应用',
        '智能建筑集成'
      ],
      specifications: {
        dimensions: '120mm x 80mm x 40mm',
        weight: '180g',
        powerSupply: 'DC 5V/2A',
        connectivity: ['WiFi', 'Bluetooth 5.0', '以太网']
      },
      images: {
        main: '/images/hardware/mems-sensor.jpg',
        gallery: ['/images/hardware/mems-sensor-1.jpg', '/images/hardware/mems-sensor-2.jpg']
      },
      status: '已发布',
      price: 9999
    },
    {
      id: 'mems-chip',
      name: 'MEMS应变和应力感知芯片',
      description: '针对基础设施安全监测需求，开发的高精度、高稳定性结构监测芯片，已在多个桥梁和高层建筑中应用',
      features: [
        '高精度应变监测',
        '实时应力分析',
        '长期稳定性好',
        '低功耗设计'
      ],
      specifications: {
        dimensions: '25mm x 25mm x 5mm',
        weight: '15g',
        powerSupply: 'DC 3.3V',
        connectivity: ['I2C', 'SPI']
      },
      images: {
        main: '/images/hardware/mems-chip.jpg',
        gallery: ['/images/hardware/mems-chip-1.jpg']
      },
      status: '已发布',
      price: 4999
    },
    {
      id: 'brain-wave-analyzer',
      name: '脑电波分析仪',
      description: '研发用于测量个人专注力和创造力的脑电波频率监测设备，为未来价值度量提供技术基础',
      features: [
        '实时脑电波监测',
        '专注力分析',
        '创造力评估',
        '数据可视化'
      ],
      specifications: {
        dimensions: '180mm x 150mm x 60mm',
        weight: '280g',
        powerSupply: '可充电锂电池',
        connectivity: ['蓝牙', 'USB Type-C']
      },
      images: {
        main: '/images/hardware/brain-wave.jpg',
        gallery: ['/images/hardware/brain-wave-1.jpg', '/images/hardware/brain-wave-2.jpg']
      },
      status: '预售',
      price: 12999
    },
    {
      id: '3d-print-robot',
      name: '3D结构打印机器人',
      description: '研发具备自主规划和精准施工能力的建筑3D打印机器人系统，全新纳米级拓扑仿生结构',
      features: [
        '自主规划路径',
        '精准施工控制',
        '纳米级精度',
        '智能避障系统'
      ],
      specifications: {
        dimensions: '2000mm x 1500mm x 1800mm',
        weight: '180kg',
        powerSupply: 'AC 220V',
        connectivity: ['工业以太网', 'RS485']
      },
      images: {
        main: '/images/hardware/3d-robot.jpg',
        gallery: ['/images/hardware/3d-robot-1.jpg']
      },
      status: '开发中',
      price: 299999
    },
    {
      id: 'maglev-system',
      name: '磁悬浮载具原型系统',
      description: '研发基于永磁体与导轨配置的磁悬浮电梯实验原型，验证磁悬浮技术在垂直提升领域的应用可行性',
      features: [
        '永磁体悬浮',
        '智能导轨系统',
        '低能耗运行',
        '高稳定性'
      ],
      specifications: {
        dimensions: '2500mm x 2000mm x 3000mm',
        weight: '450kg',
        powerSupply: 'AC 380V',
        connectivity: ['工业控制网络']
      },
      images: {
        main: '/images/hardware/maglev.jpg',
        gallery: ['/images/hardware/maglev-1.jpg']
      },
      status: '开发中',
      price: 499999
    }
  ])

  useEffect(() => {
    const savedHardware = storage.get('HARDWARE')
    if (savedHardware) {
      setHardware(savedHardware)
    }
  }, [])

  return (
    <div className="ml-48 space-y-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">智能硬件产品</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {hardware.map((product) => (
          <div key={product.id} className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg">
            <div className="relative h-48">
              <Image
                src={product.images.main}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{product.description}</p>
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <span key={index} className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  ¥{product.price.toLocaleString()}
                </div>
                <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                  {product.status}
                </div>
              </div>
              <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700">
                了解更多
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 