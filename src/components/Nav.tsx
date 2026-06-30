'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { name: 'About', url: '/#about' },
  { name: 'Experience', url: '/#jobs' },
  { name: 'Work', url: '/#projects' },
  { name: 'Contact', url: '/#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 flex items-center px-6 sm:px-12 transition-all duration-300 ${
          scrolled
            ? 'bg-navy/90 backdrop-blur-sm shadow-[0_10px_30px_-10px_rgba(2,12,27,0.7)] h-[70px]'
            : 'bg-transparent h-[100px]'
        }`}
      >
        <nav className="flex items-center justify-between w-full">
          <Link href="/" className="text-green font-mono text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 96" width="42" height="48" aria-label="Home">
              <polygon
                points="39,5 75,25 75,71 39,91 3,71 3,25"
                fill="none"
                stroke="#64ffda"
                strokeWidth="5"
              />
              <text
                x="42"
                y="63"
                textAnchor="middle"
                fill="#64ffda"
                fontFamily="SF Mono, Fira Code, monospace"
                fontSize="36"
                fontWeight="bold"
              >
                A
              </text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <ol className="flex items-center gap-1 list-none p-0 m-0">
              {navLinks.map(({ name, url }, i) => (
                <li key={name}>
                  <a
                    href={url}
                    className="px-3 py-2 text-sm font-mono text-lightest-slate hover:text-green transition-colors"
                  >
                    <span className="text-green mr-1">0{i + 1}.</span>
                    {name}
                  </a>
                </li>
              ))}
            </ol>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn ml-4 text-sm"
            >
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col gap-[5px] p-2 z-50 relative"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-green transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-green transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-green transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-dark-navy/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 z-40 h-full w-[min(75vw,400px)] bg-light-navy flex flex-col items-center justify-center transition-transform duration-300 md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ol className="flex flex-col items-center gap-6 list-none p-0 m-0">
          {navLinks.map(({ name, url }, i) => (
            <li key={name}>
              <a
                href={url}
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center text-lightest-slate hover:text-green transition-colors"
              >
                <span className="text-green font-mono text-sm mb-1">0{i + 1}.</span>
                <span className="text-lg">{name}</span>
              </a>
            </li>
          ))}
          <li className="mt-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Resume
            </a>
          </li>
        </ol>
      </aside>
    </>
  )
}
