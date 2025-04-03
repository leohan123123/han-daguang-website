export interface Paper {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number
  doi?: string
  abstract?: string
  keywords?: string[]
  citations?: number
  status: 'published' | 'accepted' | 'submitted'
}

export interface Patent {
  id: string
  title: string
  inventors: string[]
  patentNumber: string
  filingDate: string
  grantDate?: string
  status: 'granted' | 'pending' | 'filed'
  description: string
  type: 'invention' | 'utility' | 'design'
}

export interface Award {
  id: string
  name: string
  organization: string
  date: string
  level: 'international' | 'national' | 'provincial' | 'municipal'
  description: string
}

export interface Book {
  id: string
  title: string
  authors: string[]
  publisher: string
  year: number
  isbn?: string
  description: string
  coverImage?: string
}

export interface TransformationProject {
  id: string
  name: string
  partner: string
  startDate: string
  endDate?: string
  value: number
  description: string
  status: 'ongoing' | 'completed' | 'planned'
  images: string[]
}

export interface ResearchProject {
  id: string
  title: string
  type: 'national' | 'provincial' | 'enterprise' | 'international'
  role: string
  startDate: string
  endDate?: string
  funding: number
  description: string
  status: 'ongoing' | 'completed' | 'planned'
}

export interface AcademicAchievements {
  papers: Paper[]
  patents: Patent[]
  awards: Award[]
  books: Book[]
  transformationProjects: TransformationProject[]
  researchProjects: ResearchProject[]
} 