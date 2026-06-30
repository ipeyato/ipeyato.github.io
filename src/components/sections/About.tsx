import Image from 'next/image'
import type { AboutData } from '@/lib/content'

export default function About({ data }: { data: AboutData }) {
  return (
    <section id="about">
      <h2 className="numbered-heading">About Me</h2>
      <div className="grid md:grid-cols-[3fr_2fr] gap-12">
        <div>
          <div
            className="text-light-slate leading-relaxed space-y-4 [&_a]:text-green [&_a]:hover:underline"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />

          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6 list-none p-0">
            {data.skills.map(skill => (
              <li
                key={skill}
                className="font-mono text-sm text-slate before:content-['▹'] before:text-green before:mr-2"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative group max-w-xs mx-auto md:mx-0">
          <div className="relative z-10 rounded overflow-hidden">
            <div className="absolute inset-0 bg-green/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
            <Image
              src="/images/me.jpg"
              alt="Ato Supriyanto"
              width={300}
              height={300}
              className="w-full grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="absolute top-3 left-3 w-full h-full border-2 border-green rounded -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
        </div>
      </div>
    </section>
  )
}
