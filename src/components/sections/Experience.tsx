import type { Job } from '@/lib/content'

export default function Experience({ jobs }: { jobs: Job[] }) {
  return (
    <section id="jobs">
      <h2 className="numbered-heading">Where I&apos;ve Worked</h2>

      {/* On desktop, hovering one card dims the others (group/list). */}
      <ol className="group/list list-none p-0 max-w-[760px]">
        {jobs.map(job => (
          <li key={job.company} className="mb-12 last:mb-0">
            <div className="group relative grid gap-2 pb-1 transition-all duration-300 sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition-all duration-300 lg:-inset-x-6 lg:block lg:group-hover:bg-light-navy/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(204,214,246,0.1)] lg:group-hover:drop-shadow-lg" />

              <header className="z-10 mt-1 font-mono text-xs font-semibold uppercase tracking-wide text-slate sm:col-span-2">
                {job.range.replace(' - ', ' — ')}
              </header>

              <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-lightest-slate">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-baseline text-lightest-slate hover:text-green focus-visible:text-green lg:group-hover:text-green"
                  >
                    {/* Makes the whole card clickable on desktop */}
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                    <span>
                      {job.title} · {job.company}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </a>
                </h3>

                <div
                  className="mt-3 text-[15px] text-slate leading-relaxed [&_ul]:list-none [&_ul]:p-0 [&_li]:flex [&_li]:gap-2 [&_li]:mb-2 [&_li]:before:content-['▹'] [&_li]:before:text-green [&_li]:before:flex-shrink-0"
                  dangerouslySetInnerHTML={{ __html: job.content }}
                />

                {job.tech?.length > 0 && (
                  <ul className="mt-3 flex flex-wrap list-none p-0" aria-label="Technologies used">
                    {job.tech.map(t => (
                      <li key={t} className="mr-1.5 mt-2">
                        <span className="flex items-center rounded-full bg-green/10 px-3 py-1 text-xs font-medium leading-5 text-green">
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
