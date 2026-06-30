import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDir = path.join(process.cwd(), 'content')

async function markdownToHtml(content: string): Promise<string> {
  const result = await remark().use(html).process(content)
  return result.toString()
}

export interface HeroData {
  title: string
  name: string
  subtitle: string
  buttonText: string
  content: string
}

export interface AboutData {
  title: string
  skills: string[]
  content: string
}

export interface Job {
  company: string
  title: string
  location: string
  range: string
  url: string
  date: string
  content: string
}

export interface FeaturedProject {
  title: string
  cover: string
  external: string
  tech: string[]
  content: string
}

export interface Project {
  title: string
  github: string
  external: string
  tech: string[]
  company: string
  showInProjects: boolean
  content: string
  date: string
}

export interface ContactData {
  title: string
  buttonText: string
}

export async function getHeroContent(): Promise<HeroData> {
  const raw = fs.readFileSync(path.join(contentDir, 'hero', 'index.md'), 'utf8')
  const { data, content } = matter(raw)
  const htmlContent = await markdownToHtml(content)
  return { ...data, content: htmlContent } as HeroData
}

export async function getAboutContent(): Promise<AboutData> {
  const raw = fs.readFileSync(path.join(contentDir, 'about', 'index.md'), 'utf8')
  const { data, content } = matter(raw)
  const htmlContent = await markdownToHtml(content)
  return { ...data, content: htmlContent } as AboutData
}

export async function getJobs(): Promise<Job[]> {
  const jobsDir = path.join(contentDir, 'jobs')
  const companies = fs.readdirSync(jobsDir).filter(f =>
    fs.statSync(path.join(jobsDir, f)).isDirectory()
  )
  const jobs = await Promise.all(
    companies.map(async company => {
      const raw = fs.readFileSync(path.join(jobsDir, company, 'index.md'), 'utf8')
      const { data, content } = matter(raw)
      const htmlContent = await markdownToHtml(content)
      return { ...data, content: htmlContent } as Job
    })
  )
  return jobs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const featuredDir = path.join(contentDir, 'featured')
  const dirs = fs.readdirSync(featuredDir).filter(f =>
    fs.statSync(path.join(featuredDir, f)).isDirectory()
  )
  return Promise.all(
    dirs.map(async dir => {
      const raw = fs.readFileSync(path.join(featuredDir, dir, 'index.md'), 'utf8')
      const { data, content } = matter(raw)
      const htmlContent = await markdownToHtml(content)
      return { ...data, content: htmlContent } as FeaturedProject
    })
  )
}

export async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(contentDir, 'projects')
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'))
  const projects = await Promise.all(
    files.map(async file => {
      const raw = fs.readFileSync(path.join(projectsDir, file), 'utf8')
      const { data, content } = matter(raw)
      const htmlContent = await markdownToHtml(content)
      return { ...data, content: htmlContent } as Project
    })
  )
  return projects
    .filter(p => p.showInProjects)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getContactContent(): Promise<ContactData> {
  const raw = fs.readFileSync(path.join(contentDir, 'contact', 'index.md'), 'utf8')
  const { data } = matter(raw)
  return data as ContactData
}
