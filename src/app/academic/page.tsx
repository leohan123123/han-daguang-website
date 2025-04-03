'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/services/storage'
import type { AcademicAchievement, ResearchProjects } from '@/types'
import Image from 'next/image'

export default function AcademicPage() {
  const [academic, setAcademic] = useState<AcademicAchievement>({
    books: [
      {
        title: 'Developing a Construction Digital Twin for Bridges',
        subtitle: '数字孪生桥梁发展',
        publisher: 'CRC Press',
        year: '2024',
        cover: '/images/books/digital-twin-bridge.jpg',
        description: '本书深入探讨了数字孪生技术在桥梁工程中的应用，为工程师和研究人员提供了全面的技术指南。',
        price: '$79.99',
        link: 'https://www.amazon.com/dp/xxx'
      },
      {
        title: 'Humanity and the Cosmos',
        subtitle: '人与宇宙',
        publisher: 'Under Review',
        year: '2025',
        cover: '/images/books/humanity-cosmos.jpg',
        description: '探索人类与宇宙的深层联系，融合科学与哲学视角。',
        status: '审稿中'
      },
      {
        title: 'Philosophical Engineering',
        subtitle: '哲学工程学',
        publisher: 'Drafting',
        year: '2025',
        cover: '/images/books/philosophical-engineering.jpg',
        description: '将哲学思维与工程实践相结合，开创工程思维新范式。',
        status: '撰写中'
      },
      {
        title: 'Cosmic Civil Engineering',
        subtitle: '未来土木工程学',
        publisher: 'Drafting',
        year: '2025',
        cover: '/images/books/cosmic-civil.jpg',
        description: '探索未来土木工程的发展方向，融合宇宙视角。',
        status: '撰写中'
      },
      {
        title: 'Future Education and Human-Centered Development in the Age of AI',
        subtitle: 'AI时代的未来教育和人本培养',
        publisher: 'Drafting',
        year: '2025',
        cover: '/images/books/future-education.jpg',
        description: '探讨AI时代下的教育变革和人本发展。',
        status: '撰写中'
      }
    ],
    papers: {
      total: 58,
      sciCount: 14,
      highlights: [
        'D. Han, C, Ying, Z. Tian, etc.（2024）"Yolov8s-SNC: An Improved Safety Helmet-Wearing DetectionAlgorithm Based on YOLOv8" Buildings; (SCI)',
        'D. Han, C, Ying, Y. Qi, etc.（2024）"Research and Application of Informatization Technology in Mass Concrete Construction"，buildings-3093252,（SCI）',
        'D. Han ; C, Ying, Y. Qi, etc.(2024), Automatic Design and Monitoring of Mass Concrete Based on Information Technology, Buildings; (SCI)',
        'A. Khalil, Y. Liu a, S. Zhao D. Han (2024) Investigating the effectiveness of CFRP strengthening in improving the impact performance of RC members, Structures, Volume 60, 105841.(SCI)',
        'J. Liu; H. Wang; Y. Wei; D. Han; Y. Xiang (2023), Repairing Behaviors of Cracked Steel Plates Based on Bolted Fiber-Reinforced Polymer Plates, Materials, 16(20), 6773（SCI)'
      ]
    },
    patents: {
      total: 28,
      highlights: [
        'Structural damage assessment method based on distributed vibration data and convolutional self–encoding deep learning. 2021',
        'Feeding equipment for construction projects. 2020',
        'Bracket for housing construction. 2020',
        'Internal wall polishing equipment for construction projects. 2020',
        'Dust suppression device for construction engineering. 2020'
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
        '2024年 中国科技产业化促进会科技创新奖一等奖（省部级）',
        '2023年 中国公路学会科技进步特等奖（省部级一等奖）',
        '2022年 中国工程建设标准化协会标准数字化工作委员会副主任委员',
        '2016年 中国教育部科技进步一等奖（省部级一等奖）',
        '2014年 国家人保部办公厅优秀海归人才择优资助'
      ]
    },
    transformations: {
      highlights: [
        {
          title: '智能感知系统',
          items: [
            {
              name: 'MEMS环境感知传感器',
              description: '自主研发高精度环境监测传感器，应用于智慧城市和智能建筑领域，实现空气质量、温湿度等多参数实时监测',
              image: '/images/transformations/mems-sensor.jpg'
            },
            {
              name: 'MEMS应变和应力感知芯片',
              description: '针对基础设施安全监测需求，开发的高精度、高稳定性结构监测芯片，已在多个桥梁和高层建筑中应用',
              image: '/images/transformations/mems-chip.jpg'
            }
          ]
        },
        {
          title: '智能建造与运维技术',
          items: [
            {
              name: '基于数字孪生的结构健康监测系统',
              description: '突破传统监测技术局限，实现桥梁、隧道等关键基础设施的全生命周期监测和预警',
              image: '/images/transformations/digital-twin.jpg'
            },
            {
              name: '融合智能BIM技术平台',
              description: '开发基于人工智能的BIM数据处理和分析平台，提升工程建设全过程的数字化水平',
              image: '/images/transformations/bim.jpg'
            }
          ]
        }
      ]
    }
  })

  const [projects, setProjects] = useState<ResearchProjects>({
    national: [
      {
        title: '【国重】大跨度结构跨类灾害事故大尺度实验模型关键技术',
        period: '2024-2026',
        role: '课题召集人/申请人、课题执行骨干',
        description: '国家重点研发计划（应急管理部），开发电网结构"火-风-力"耦合作用下的损伤预测模型，实现电网结构灾害场景重建'
      },
      {
        title: '【国重】高寒高海拔特大桥梁损伤机理、健康监测与安全预警技术',
        period: '2024-2026',
        role: '课题申请参与人、课题执行骨干',
        description: '国家自然科学基金委重点支持项目，研发适应高寒环境的长寿命高性能传感器，开发自供电无线MEMS传感系统'
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
        title: '【企重】极端天气下输电线路风灾过程推演、智能风险评估与抗灾提升方法研究',
        period: '2025-2027',
        role: '项目负责人',
        description: '国家电网浙江省电力有限公司，开发基于AI的地理-气象多源数据融合技术，实现输电线路微环境建模'
      },
      {
        title: '【企重】面向AI的模型驱动下钢箱梁模块化设计与生产数据架构研究',
        period: '2024-2025',
        role: '项目负责人',
        description: '中交一航局，构建基于大语言模型的钢箱梁设计、生产、质检与装配全生命周期数据架构'
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

  return (
    <div className="ml-48 space-y-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">学术成果</h1>

      {/* 专著出版 */}
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">专著出版</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {academic.books.map((book, index) => (
            <div key={index} className="flex flex-col overflow-hidden rounded-lg border transition-shadow hover:shadow-lg">
              <div className="relative h-64">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-gray-900">{book.title}</h3>
                <p className="mt-1 text-lg text-gray-600">{book.subtitle}</p>
                <p className="mt-3 text-base text-gray-500">{book.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {book.publisher} · {book.year}
                  </div>
                  {book.price ? (
                    <div className="text-lg font-semibold text-gray-900">{book.price}</div>
                  ) : (
                    <div className="text-sm font-medium text-blue-600">{book.status}</div>
                  )}
                </div>
                {book.link && (
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    在 Amazon 上购买
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 主要荣誉 */}
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">主要荣誉</h2>
        <div className="mt-6">
          <div className="space-y-4">
            {academic.awards.highlights.map((award, index) => (
              <div key={index} className="flex items-start space-x-4 rounded-lg border p-6 transition-colors hover:bg-gray-50">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{award}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 转化成果 */}
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">转化成果</h2>
        <div className="mt-6 space-y-8">
          {academic.transformations.highlights.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col overflow-hidden rounded-lg border transition-shadow hover:shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                      <p className="mt-3 text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 重要科研项目（近2年） */}
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">重要科研项目（近2年）</h2>
        <div className="mt-6 space-y-6">
          {projects.national.concat(projects.provincial).map((project, index) => (
            <div key={index} className="rounded-lg border p-6 transition-colors hover:bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">时间周期</p>
                  <p className="text-base text-gray-900">{project.period}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">项目角色</p>
                  <p className="text-base text-gray-900">{project.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 论文发表 */}
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">论文发表</h2>
        <div className="mt-6">
          <div className="mb-6 flex items-center space-x-4">
            <div className="rounded-lg bg-blue-50 px-4 py-2">
              <span className="text-lg font-semibold text-blue-600">总计 {academic.papers.total} 篇</span>
            </div>
            <div className="rounded-lg bg-blue-50 px-4 py-2">
              <span className="text-lg font-semibold text-blue-600">SCI {academic.papers.sciCount} 篇</span>
            </div>
          </div>
          <div className="space-y-4">
            {academic.papers.highlights.map((paper, index) => (
              <div key={index} className="rounded-lg border p-6 transition-colors hover:bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">{paper}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 知识产权 */}
      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">知识产权</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">专利技术</h3>
            <div className="mt-4 space-y-4">
              {academic.patents.highlights.map((patent, index) => (
                <div key={index} className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
                  <p className="text-gray-900">{patent}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">软件著作权</h3>
            <div className="mt-4 space-y-4">
              {academic.software.highlights.map((software, index) => (
                <div key={index} className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
                  <p className="text-gray-900">{software}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 