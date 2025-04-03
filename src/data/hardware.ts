import { Hardware } from '@/types'

export const hardwareData: Hardware[] = [
  {
    id: '1',
    name: '脑机接口开发套件',
    description: '专业级脑机接口开发套件，支持高精度脑电信号采集和处理',
    features: [
      '高精度脑电信号采集',
      '实时数据处理',
      '无线传输',
      '开发者API支持'
    ],
    specifications: {
      dimensions: '200 x 150 x 50 mm',
      weight: '300g',
      powerSupply: '可充电锂电池，续航8小时',
      connectivity: ['蓝牙5.0', 'USB Type-C', 'Wi-Fi'],
      other: {
        '采样率': '1000Hz',
        '通道数': '16通道',
        '分辨率': '24位'
      }
    },
    images: {
      main: '/images/hardware/bci-kit-main.jpg',
      gallery: [
        '/images/hardware/bci-kit-1.jpg',
        '/images/hardware/bci-kit-2.jpg',
        '/images/hardware/bci-kit-3.jpg'
      ]
    },
    status: '已发布',
    price: 9999,
    releaseDate: '2024-01'
  }
] 