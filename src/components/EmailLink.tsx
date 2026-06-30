export default function EmailLink() {
  return (
    <div className="hidden lg:flex fixed bottom-0 right-10 flex-col items-center gap-5 z-10">
      <a
        href="mailto:mail.atosupriyanto@gmail.com"
        className="font-mono text-xs text-slate hover:text-green hover:-translate-y-1 transition-all duration-300 tracking-widest"
        style={{ writingMode: 'vertical-rl' }}
      >
        mail.atosupriyanto@gmail.com
      </a>
      <div className="w-px h-24 bg-slate" />
    </div>
  )
}
