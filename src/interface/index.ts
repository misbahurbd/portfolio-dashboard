export interface IEducation {
  degree: string
  description: string
  endDate: string
  fieldOfStudy: string
  id: string
  location: string
  school: string
  startDate: string
  createdAt: string
  updatedAt: string
}

export interface IExperience {
  id: string
  title: string
  company: string
  location: string
  description: string
  startDate: string
  endDate: string | null
  createdAt: string
  updatedAt: string
}

export interface IProject {
  id: string
  title: string
  slug: string
  challenges: string
  solutions: string
  featurePhoto: string
  photos: string[]
  skills: string[]
  createdAt: string
  updatedAt: string
  sourceLinks: ISourceLinks[]
  metadata: IMetadata
}

export interface IBlog {
  id: string
  slug: string
  title: string
  content: string
  featurePhoto: string
  createdAt: string
  updatedAt: string
  category: ICategory
  metadata: IMetadata
}

export interface ICategory {
  id: string
  image: string | null
  label: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface ISourceLinks {
  label: string
  link: string
}

export interface IMetadata {
  id: string
  title: string
  description: string
  socialImg: string
  createdAt: string
  updatedAt: string
}

export interface ISkill {
  id: string
  label: string
  value: string
  experiencesLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}
