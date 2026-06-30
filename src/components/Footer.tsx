const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/ipeyato/' },
  { name: 'Medium', url: 'https://medium.com/@ipeyato/' },
  { name: 'Facebook', url: 'https://facebook.com/ato.ipey/' },
  { name: 'Twitter', url: 'https://twitter.com/ipeyato/' },
]

export default function Footer() {
  return (
    <footer className="flex flex-col items-center pb-10 text-slate text-sm font-mono">
      <div className="flex gap-5 mb-5 lg:hidden">
        {socialLinks.map(({ name, url }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green transition-colors"
          >
            {name}
          </a>
        ))}
      </div>
      <a
        href="https://github.com/ipeyato/ipeyato.github.io"
        target="_blank"
        rel="noopener noreferrer"
        className="group text-center text-light-slate hover:text-green transition-colors"
      >
        <div>Designed &amp; Built by Ato Supriyanto</div>
        <div className="text-xs mt-1 opacity-60">Based on Brittany Chiang&apos;s design</div>
      </a>
    </footer>
  )
}
