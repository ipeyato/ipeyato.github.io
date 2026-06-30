import type { HeroData } from '@/lib/content'

export default function Hero({ data }: { data: HeroData }) {
  return (
    <section
      id="hero"
      className="flex flex-col justify-center min-h-screen max-w-none py-0"
      style={{ padding: '0 0 100px' }}
    >
      <p className="font-mono text-green mb-5 text-base">Hi, my name is</p>

      <h1
        className="font-bold text-lightest-slate leading-none mb-3"
        style={{ fontSize: 'clamp(40px, 8vw, 80px)' }}
      >
        {data.name}.
      </h1>

      <h2
        className="font-bold text-slate leading-none mb-8"
        style={{ fontSize: 'clamp(30px, 6vw, 70px)' }}
      >
        {data.subtitle}
      </h2>

      <div
        className="max-w-xl text-slate mb-10 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />

      <div>
        <a href="/#contact" className="btn text-base">
          {data.buttonText}
        </a>
      </div>
    </section>
  )
}
