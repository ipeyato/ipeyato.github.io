'use client'

import { useState } from 'react'
import type { Job } from '@/lib/content'

export default function Experience({ jobs }: { jobs: Job[] }) {
  const [activeTab, setActiveTab] = useState(0)
  const job = jobs[activeTab]

  return (
    <section id="jobs">
      <h2 className="numbered-heading">Where I&apos;ve Worked</h2>

      <div className="flex flex-col sm:flex-row gap-6 min-h-[340px]">
        {/* Tab list */}
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-visible border-b sm:border-b-0 sm:border-l-2 border-lightest-navy">
          {jobs.map((j, i) => (
            <button
              key={j.company}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-3 font-mono text-sm text-left whitespace-nowrap transition-all duration-200 border-b-2 sm:border-b-0 sm:border-l-2 -mb-[2px] sm:mb-0 sm:-ml-[2px] ${
                activeTab === i
                  ? 'text-green border-green bg-green-tint'
                  : 'text-slate border-transparent hover:text-green hover:bg-light-navy'
              }`}
            >
              {j.company}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 py-1">
          <h3 className="text-xl font-medium text-lightest-slate mb-1">
            {job.title}{' '}
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green hover:underline"
            >
              @ {job.company}
            </a>
          </h3>
          <p className="font-mono text-sm text-slate mb-6">{job.range}</p>
          <div
            className="text-light-slate leading-relaxed [&_ul]:list-none [&_ul]:p-0 [&_li]:flex [&_li]:gap-2 [&_li]:mb-3 [&_li]:before:content-['▹'] [&_li]:before:text-green [&_li]:before:flex-shrink-0 [&_li]:before:mt-1"
            dangerouslySetInnerHTML={{ __html: job.content }}
          />
        </div>
      </div>
    </section>
  )
}
