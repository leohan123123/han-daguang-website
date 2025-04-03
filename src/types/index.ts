// 个人信息类型
export interface Profile {
  name: string
  title: string
  description: string
  stats: {
    researchYears: number
    papers: number
    patents: number
    projects: number
  }
  researchAreas: {
    title: string
    description: string
  }[]
  education: {
    degree: string
    school: string
    period: string
  }[]
}

// 专利类型
export interface Patent {
  id: number
  title: string
  category: string
  status: '已授权' | '审查中' | '公开' | '失效'
  publicationDate: string
  number: string
  description: string
}

// AI产品类型
export interface Product {
  id: number
  name: string
  description: string
  features: string[]
  status: '已上线' | '内测中' | '开发中'
  image?: string
}

// 课程类型
export interface Course {
  id: number
  title: string
  type: '视频课程' | '在线课程' | '实践课程'
  duration: string
  level: '入门' | '进阶' | '高级'
  description: string
  topics: string[]
}

// 视频类型
export interface Video {
  id: number
  title: string
  duration: string
  views: string
  date: string
  thumbnail?: string
}

// 讨论类型
export interface Discussion {
  id: number
  title: string
  author: string
  date: string
  replies: number
  views: number
  category: string
}

// 学术活动类型
export interface Event {
  id: number
  title: string
  date: string
  location: string
  type: string
}

// 论文类型
export interface Paper {
  id: number
  title: string
  authors: string[]
  journal: string
  date: string
  citations: number
}

export interface Hardware {
  id: string
  name: string
  description: string
  features: string[]
  specifications: {
    dimensions: string
    weight: string
    powerSupply: string
    connectivity: string[]
    other?: Record<string, string>
  }
  images: {
    main: string
    gallery: string[]
  }
  status: '开发中' | '预售' | '已发布' | '停产'
  price?: number
  releaseDate?: string
}

// 社区帖子类型
export interface CommunityPost {
  id: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  images?: string[]
  likes: number
  comments: number
  shares: number
  createdAt: string
  tags?: string[]
}

// 用户状态类型
export interface UserStatus {
  exercise: {
    steps: number
    duration: string
    calories: number
  }
  brain: {
    meditation: string
    focus: number
    quality: string
  }
  study: {
    readingTime: string
    topic: string
    absorption: number
  }
}

// 学术成果类型
export interface Book {
  title: string
  subtitle: string
  publisher: string
  year: string
  cover: string
  description: string
  price?: string
  link?: string
  status?: string
}

interface TransformationItem {
  name: string
  description: string
  image: string
}

interface TransformationCategory {
  title: string
  items: TransformationItem[]
}

export interface AcademicAchievement {
  books: Book[]
  papers: {
    total: number
    sciCount: number
    highlights: string[]
  }
  patents: {
    total: number
    highlights: string[]
  }
  software: {
    total: number
    highlights: string[]
  }
  awards: {
    highlights: string[]
  }
  transformations: {
    highlights: TransformationCategory[]
  }
}

// 研究项目类型
export interface ResearchProjects {
  national: {
    title: string
    period: string
    role: string
    description: string
  }[]
  provincial: {
    title: string
    period: string
    role: string
    description: string
  }[]
  enterprise: {
    title: string
    period: string
    role: string
    description: string
  }[]
  international: {
    title: string
    period: string
    role: string
    description: string
  }[]
}

// 动态类型
export interface StatusUpdate {
  id: string
  content: string
  createdAt: string
  image?: string
  likes?: number
  comments?: number
  shares?: number
}

// 当前状态类型
export interface CurrentStatus {
  updates: StatusUpdate[]
} 