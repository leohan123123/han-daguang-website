import { CommunityPost } from '@/types'

export const communityData: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: '张明',
      avatar: '/images/avatars/user1.jpg'
    },
    content: '量子计算入门指南\n\n量子计算是计算机科学的一个分支，它利用量子力学原理来处理信息。本文将为您介绍量子计算的基础概念...',
    images: ['/images/community/quantum-computing.jpg'],
    likes: 156,
    comments: 23,
    shares: 45,
    createdAt: '2024-03-20T10:30:00Z',
    tags: ['量子计算', '教程', '科技前沿']
  },
  {
    id: '2',
    author: {
      name: '李华',
      avatar: '/images/avatars/user2.jpg'
    },
    content: 'AI安全性研究的最新进展\n\n随着人工智能技术的快速发展，确保AI系统的安全性和可控性变得越来越重要...',
    images: ['/images/community/ai-safety.jpg'],
    likes: 89,
    comments: 12,
    shares: 34,
    createdAt: '2024-03-19T15:45:00Z',
    tags: ['AI安全', '研究', '技术发展']
  },
  {
    id: '3',
    author: {
      name: '王研',
      avatar: '/images/avatars/user3.jpg'
    },
    content: '脑机接口技术的突破与应用\n\n近期，我们在脑机接口技术领域取得了重要突破，成功实现了更高精度的脑电信号解码...',
    images: ['/images/community/brain-computer.jpg'],
    likes: 234,
    comments: 45,
    shares: 67,
    createdAt: '2024-03-18T09:15:00Z',
    tags: ['脑机接口', '研究成果', '技术创新']
  }
] 