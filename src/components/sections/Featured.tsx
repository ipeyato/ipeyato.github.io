import Image from 'next/image'
import type { FeaturedProject } from '@/lib/content'

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <title>External Link</title>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export default function Featured({ projects }: { projects: FeaturedProject[] }) {
  if (!projects.length) return null

  return (
    <section id="projects">
      <h2 className="numbered-heading">Some Things I&apos;ve Built</h2>

      <div className="flex flex-col gap-24">
        {projects.map((project, i) => {
          const isEven = i % 2 === 0
          return (
            <div
              key={project.title}
              className={`relative grid md:grid-cols-12 gap-4 items-center`}
            >
              {/* Image */}
              <div
                className={`relative md:col-span-7 rounded overflow-hidden group ${
                  isEven ? 'md:col-start-1' : 'md:col-start-6'
                }`}
                style={{ gridRow: 1 }}
              >
                <a href={project.external} target="_blank" rel="noopener noreferrer">
                  <div className="absolute inset-0 bg-green/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <Image
                    src="/images/lautanberlian.jpg"
                    alt={project.title}
                    width={700}
                    height={430}
                    className="w-full h-[300px] md:h-[430px] object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              </div>

              {/* Content */}
              <div
                className={`relative z-10 md:col-span-7 ${
                  isEven
                    ? 'md:col-start-6 md:text-right'
                    : 'md:col-start-1 md:text-left'
                }`}
                style={{ gridRow: 1 }}
              >
                <p className="font-mono text-green text-sm mb-2">Featured Project</p>
                <h3 className="text-2xl font-bold text-lightest-slate mb-5">
                  <a href={project.external} target="_blank" rel="noopener noreferrer" className="hover:text-green transition-colors">
                    {project.title}
                  </a>
                </h3>

                <div
                  className="bg-light-navy p-6 rounded shadow-xl text-light-slate leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />

                <ul className={`flex flex-wrap gap-3 font-mono text-sm text-slate mb-4 list-none p-0 ${isEven ? 'md:justify-end' : ''}`}>
                  {project.tech.map(t => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                <div className={`flex gap-4 ${isEven ? 'md:justify-end' : ''}`}>
                  <a href={project.external} target="_blank" rel="noopener noreferrer" className="text-lightest-slate hover:text-green transition-colors" aria-label="External Link">
                    <ExternalIcon />
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
