// Builds public/resume.pdf from the Markdown in content/, so the resume
// always matches the website. Run with `npm run resume`.
//
// Uses the Chrome installed on this machine. Set CHROME_PATH to use a
// different Chromium build.
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { chromium } from 'playwright-core'

const root = process.cwd()
const contentDir = path.join(root, 'content')
const outFile = path.join(root, 'public', 'resume.pdf')

const SITE = 'https://ipeyato-github-io.pages.dev'
const EMAIL = 'mail.atosupriyanto@gmail.com'
const GITHUB = 'https://github.com/ipeyato/'
const LOCATION = 'Bandung, Indonesia'

async function md(body) {
  return (await remark().use(html).process(body)).toString()
}

async function readFile(file) {
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  return { ...data, html: await md(content) }
}

function dirEntries(dir) {
  const full = path.join(contentDir, dir)
  return fs
    .readdirSync(full)
    .map((name) => path.join(full, name, 'index.md'))
    .filter((f) => fs.existsSync(f))
}

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
// The About text ends with a lead-in to the skills list; drop it in print.
// From the About text, keep only the career paragraph for the printed profile.
const aboutCareer = (h) => (h.match(/<p>After graduating[\s\S]*?<\/p>/) || [''])[0]

const hero = await readFile(path.join(contentDir, 'hero', 'index.md'))
const about = await readFile(path.join(contentDir, 'about', 'index.md'))
const jobs = (await Promise.all(dirEntries('jobs').map(readFile))).sort(
  (a, b) => new Date(b.date) - new Date(a.date)
)
const featured = (await Promise.all(dirEntries('featured').map(readFile))).sort(
  (a, b) => (a.order ?? 99) - (b.order ?? 99)
)
const projectsDir = path.join(contentDir, 'projects')
const projects = (
  await Promise.all(
    fs
      .readdirSync(projectsDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => readFile(path.join(projectsDir, f)))
  )
)
  .filter((p) => p.showInProjects)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

const page = `<!doctype html>
<html><head><meta charset="utf-8"><title>${esc(hero.name)} – Resume</title>
<style>
  @page { size: A4; margin: 16mm 16mm 14mm; }
  * { box-sizing: border-box; }
  body { font: 10pt/1.45 -apple-system, "Helvetica Neue", Arial, sans-serif; color: #1f2933; margin: 0; }
  a { color: inherit; text-decoration: none; }
  p { margin: 0 0 5px; }
  header { border-bottom: 2px solid #0a7c6b; padding-bottom: 8px; margin-bottom: 12px; }
  h1 { font-size: 22pt; margin: 0; letter-spacing: -0.3px; color: #0b1a2e; }
  .role { font-size: 12pt; color: #0a7c6b; font-weight: 600; margin: 2px 0 6px; }
  .contact { font-size: 9pt; color: #52606d; }
  .contact span + span::before { content: "·"; margin: 0 6px; }
  h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 1px; color: #0a7c6b; margin: 14px 0 6px; }
  .skills { display: flex; flex-wrap: wrap; gap: 4px 6px; margin: 0; padding: 0; list-style: none; }
  .skills li { background: #e6f4f1; color: #0b4f45; border-radius: 3px; padding: 1px 7px; font-size: 9pt; }
  .item { margin-bottom: 9px; break-inside: avoid; }
  .item-head { display: flex; justify-content: space-between; gap: 12px; }
  .item-title { font-weight: 600; color: #0b1a2e; }
  .item-meta { color: #52606d; font-size: 9pt; white-space: nowrap; }
  .item-sub { color: #52606d; font-size: 9pt; margin-bottom: 2px; }
  ul { margin: 2px 0 0; padding-left: 15px; }
  li { margin-bottom: 1px; }
  .tech { color: #52606d; font-size: 8.5pt; margin-top: 1px; }
  .projects { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 16px; }
</style></head><body>
<header>
  <h1>${esc(hero.name)}</h1>
  <div class="role">${esc(hero.subtitle.replace(/\.$/, ''))}</div>
  <div class="contact">
    <span>${LOCATION}</span>
    <span><a href="mailto:${EMAIL}">${EMAIL}</a></span>
    <span><a href="${SITE}">${bare(SITE)}</a></span>
    <span><a href="${GITHUB}">${bare(GITHUB)}</a></span>
  </div>
</header>

<h2>Profile</h2>
${hero.html}
${aboutCareer(about.html)}

<h2>Skills</h2>
<ul class="skills">${about.skills.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>

<h2>Experience</h2>
${jobs
  .map(
    (j) => `<div class="item">
  <div class="item-head">
    <div class="item-title">${esc(j.title)} · ${j.url ? `<a href="${j.url}">${esc(j.company)}</a>` : esc(j.company)}</div>
    <div class="item-meta">${esc(j.range)}</div>
  </div>
  <div class="item-sub">${esc(j.location)}</div>
  ${j.html}
</div>`
  )
  .join('')}

<h2>Selected Projects</h2>
${featured
  .map(
    (p) => `<div class="item">
  <div class="item-head">
    <div class="item-title"><a href="${p.external}">${esc(p.title)}</a></div>
    <div class="item-meta">${bare(p.external)}</div>
  </div>
  ${p.html}
  <div class="tech">${p.tech.map(esc).join(' · ')}</div>
</div>`
  )
  .join('')}

<h2>Other Projects</h2>
<div class="projects">
${projects
  .map(
    (p) => `<div class="item">
  <div class="item-title"><a href="${p.external}">${esc(p.title)}</a></div>
  ${p.html}
  <div class="tech">${p.tech.map(esc).join(' · ')}</div>
</div>`
  )
  .join('')}
</div>
</body></html>`

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' }
)
const tab = await browser.newPage()
await tab.setContent(page, { waitUntil: 'load' })
await tab.pdf({ path: outFile, format: 'A4', preferCSSPageSize: true, printBackground: true })
await browser.close()
console.log(`Wrote ${path.relative(root, outFile)}`)
