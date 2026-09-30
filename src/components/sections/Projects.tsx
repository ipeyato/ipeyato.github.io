import type { Project } from '@/lib/content'

function FolderIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
      <title>Folder</title>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

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

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section>
      <h2 className="text-center text-lightest-slate text-2xl font-semibold mb-12">
        Other Noteworthy Projects
      </h2>

      {/* On desktop, hovering one card dims the others (group/list), same as Experience. */}
      <div className="group/list grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <div
            key={project.title}
            className="group flex flex-col bg-light-navy rounded-md p-7 transition-all duration-300 lg:group-hover/list:opacity-50 lg:hover:!opacity-100 lg:hover:bg-lightest-navy/60 lg:hover:shadow-[inset_0_1px_0_0_rgba(204,214,246,0.1)] lg:hover:drop-shadow-lg"
          >
            <div className="flex items-start justify-between mb-8">
              <FolderIcon />
              <div className="flex gap-3">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-lightest-slate hover:text-green transition-colors" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                )}
                {project.external && (
                  <a href={project.external} target="_blank" rel="noopener noreferrer" className="text-lightest-slate hover:text-green transition-colors" aria-label="External Link">
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-lightest-slate font-semibold text-lg mb-3 transition-colors lg:group-hover:text-green">
              {project.external ? (
                <a href={project.external} target="_blank" rel="noopener noreferrer" className="text-inherit hover:text-green transition-colors">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>

            <div
              className="text-slate text-sm leading-relaxed flex-1"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />

            <ul className="mt-3 flex flex-wrap list-none p-0" aria-label="Technologies used">
              {project.tech.map(t => (
                <li key={t} className="mr-1.5 mt-2">
                  <span className="flex items-center rounded-full bg-green/10 px-3 py-1 text-xs font-medium leading-5 text-green">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
