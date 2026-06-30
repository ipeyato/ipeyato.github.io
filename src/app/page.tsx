import {
  getHeroContent,
  getAboutContent,
  getJobs,
  getFeaturedProjects,
  getProjects,
  getContactContent,
} from '@/lib/content'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Featured from '@/components/sections/Featured'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default async function Home() {
  const [hero, about, jobs, featured, projects, contact] = await Promise.all([
    getHeroContent(),
    getAboutContent(),
    getJobs(),
    getFeaturedProjects(),
    getProjects(),
    getContactContent(),
  ])

  return (
    <main>
      <Hero data={hero} />
      <About data={about} />
      <Experience jobs={jobs} />
      <Featured projects={featured} />
      <Projects projects={projects} />
      <Contact data={contact} />
      <Footer />
    </main>
  )
}
