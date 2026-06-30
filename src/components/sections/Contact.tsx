import type { ContactData } from '@/lib/content'

export default function Contact({ data }: { data: ContactData }) {
  return (
    <section id="contact" className="max-w-[600px] mx-auto text-center pb-32">
      <p className="font-mono text-green text-sm mb-5">What&apos;s Next?</p>
      <h2 className="text-lightest-slate font-bold mb-6" style={{ fontSize: 'clamp(40px, 5vw, 60px)' }}>
        {data.title}
      </h2>
      <p className="text-slate leading-relaxed mb-12 text-lg">
        Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
      </p>
      <a href="mailto:mail.atosupriyanto@gmail.com" className="btn text-base">
        {data.buttonText}
      </a>
    </section>
  )
}
