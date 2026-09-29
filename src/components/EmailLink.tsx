export default function EmailLink() {
  return (
    <div className="hidden lg:flex fixed bottom-0 right-10 flex-col items-center gap-5 z-10">
      <a
        href="mailto:ipeyato@gmail.com"
        className="font-mono text-xs text-slate hover:text-green hover:-translate-y-1 transition-all duration-300 tracking-widest"
        style={{ writingMode: 'vertical-rl' }}
      >
        ipeyato@gmail.com
      </a>
      <div className="w-px h-24 bg-slate" />
    </div>
  )
}
