import { Profile } from '@/types'

export const profileData: Profile = {
  name: '韩达光',
  title: 'AI智能体研发者 | 脑波技术探索者 | 未来科技布道者',
  description: '在过去的十年中，我一直致力于人工智能与脑机接口技术的研究。作为一名跨学科研究者，我的研究横跨计算机科学、神经科学和量子物理等多个领域。目前，我正专注于开发下一代人工智能系统，这些系统能够更好地理解和模拟人类认知过程。',
  stats: {
    researchYears: 10,
    papers: 60,
    patents: 31,
    projects: 5
  },
  researchAreas: [
    {
      title: '量子计算与AI融合',
      description: '探索量子算法在机器学习中的应用，开发新一代量子机器学习算法。'
    },
    {
      title: '脑机接口技术',
      description: '研发新型脑波控制系统，实现人脑与计算机的直接通信，应用于辅助交互、健康监测和创意表达。'
    },
    {
      title: 'AI伦理与安全',
      description: '研究人工智能发展中的伦理问题，构建负责任的AI系统，确保技术发展符合人类福祉。'
    }
  ],
  education: [
    {
      degree: '计算机科学博士',
      school: '德国慕尼黑联邦国防军大学',
      period: '2008 - 2011'
    },
    {
      degree: '结构工程硕士',
      school: '沈阳建筑大学',
      period: '2005 - 2008'
    },
    {
      degree: '土木工程学士',
      school: '沈阳建筑大学',
      period: '2001 - 2005'
    }
  ]
} 