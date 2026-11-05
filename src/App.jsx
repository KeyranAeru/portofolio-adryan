import { useEffect, useRef, useState } from 'react'
import attendanceImage from './assets/absen.png'
import attendanceLoginImage from './assets/login.png'
import attendanceDashboardImage from './assets/dashboard.png'
import cakapImage from './assets/cakap.jpeg'
import cakapQuestionImage from './assets/soal.jpeg'
import cakapDescriptionImage from './assets/deskripsi materi.jpeg'
import cakapVocabularyImage from './assets/kosakata yang akan muncul.jpeg'
import cakapLessonMenuImage from './assets/menu materi.jpeg'
import lontaraClassPhotoOne from './assets/foto 1.jpeg'
import lontaraClassPhotoTwo from './assets/foto 2.jpeg'
import lontaraLearningImage from './assets/belajar.jpeg'
import lontaraQuizImage from './assets/kuis.jpeg'
import lontaraImage from './assets/lontara.jpeg'
import './App.css'

const content = {
  id: {
    skip: 'Lewati ke konten', menuOpen: 'Buka navigasi', menuClose: 'Tutup navigasi', navLabel: 'Navigasi utama', aboutNav: 'Tentang', projectsNav: 'Proyek', skillsNav: 'Keahlian', contactNav: 'Hubungi saya',
    availability: 'TERBUKA UNTUK PELUANG', eyebrow: 'PORTOFOLIO · REKAYASA PERANGKAT LUNAK', heroTitle: 'Membangun solusi digital yang', heroAccent: 'bermakna.', heroDescription: 'Halo, saya Adryan — Senang mengubah ide kompleks menjadi produk digital yang berguna, intuitif, dan menyenangkan dipakai.', viewProjects: 'Lihat proyek', knowMe: 'Kenali saya', based: 'BERBASIS DI', focus: 'FOKUS SAAT INI', location: 'Indonesia · Sulawesi Selatan · Kota Makassar',
    artLabel: 'Ilustrasi antarmuka dan kode', codeStatus: 'Sistem siap berkreasi', chipTop: <>Berpikir desain<br /><strong>membangun solusi</strong></>, chipBottom: <>Kode yang rapi,<br /><strong>tujuan yang jelas.</strong></>, artCaption: 'IDE → ANTARMUKA → DAMPAK', scroll: 'GULIR UNTUK MENJELAJAH',
    aboutLabel: 'SEDIKIT TENTANG SAYA', aboutTitle: 'Teknologi yang baik terasa sederhana.', aboutAccent: 'Proses di baliknya penuh rasa ingin tahu.', aboutP1: 'Saya S1 lulusan Rekayasa Perangkat Lunak di Universitas Dipa Makassar. Saya menikmati seluruh proses pembuatan produk — mulai dari memahami masalah, merancang pengalaman, sampai menulis kode yang siap berkembang.', aboutP2: 'Bagi saya, software terbaik lahir dari perpaduan empati, rasa ingin tahu, dan perhatian pada detail. Saat tidak sedang ngoding, saya biasanya membaca, mengeksplorasi tools baru, atau mencari kopi yang enak.', sayHello: 'Mari berkenalan',
    workLabel: 'KARYA TERPILIH', projectsTitle: 'Proyek yang', projectsAccent: 'pernah saya buat.', projectsSubtitle: 'Beberapa ide yang berhasil tumbuh menjadi sesuatu.', yearRange: '2023 — 2025', projectSummaries: ['Aplikasi web untuk mencatat kehadiran dan memantau riwayat absensi karyawan.', 'Game edukasi untuk belajar bahasa Mandarin.', 'Game edukasi untuk mengenal aksara Lontara Makassar.'], projectDescriptions: ['Proyek tugas akhir mata kuliah Penjaminan Perangkat Lunak ini berfokus pada pengujian fitur aplikasi menggunakan metode black-box dan white-box.', 'Saya mengembangkan game edukasi bahasa Mandarin ini saat menyusun skripsi. Karena konsepnya berkaitan erat dengan topik skripsi, saya tertarik untuk mengerjakan proyek ini.', 'Game edukasi aksara Lontara untuk siswa SDN Bulurokeng Makassar. Algoritma shuffle digunakan untuk mengacak soal dan mengurangi peluang siswa menghafal urutan jawaban. Pre-test dan post-test membantu mengukur perkembangan kemampuan bahasa Lontara Makassar, sementara black-box testing digunakan untuk menguji fungsi-fitur game.'], projectTypes: ['APLIKASI WEB', 'GAME EDUKASI', 'GAME EDUKASI'], askProject: 'Tanyakan tentang proyek', projectNote: 'Setiap proyek dibuat untuk menjawab kebutuhan belajar atau aktivitas sehari-hari.',
    skillsLabel: 'PERANGKAT YANG SAYA GUNAKAN', skillsTitle: 'Tools untuk', skillsAccent: 'mewujudkan ide.', skillsSubtitle: 'Teknologi yang saya gunakan untuk merancang, membangun, dan mengirimkan produk digital.',
    contactLabel: 'PUNYA IDE MENARIK?', contactTitle: 'Mari buat sesuatu', contactAccent: 'yang berarti.', contactDescription: 'Sedang mencari rekan untuk proyek, kolaborasi, atau sekadar ingin ngobrol soal teknologi? Saya terbuka untuk obrolan baru.', sendEmail: 'Kirim email', connect: 'TERHUBUNG DI', footer: 'Dirancang & dibuat dengan rasa ingin tahu.', backTop: 'KEMBALI KE ATAS',
  },
  en: {
    skip: 'Skip to content', menuOpen: 'Open navigation', menuClose: 'Close navigation', navLabel: 'Main navigation', aboutNav: 'About', projectsNav: 'Projects', skillsNav: 'Skills', contactNav: 'Contact me',
    availability: 'OPEN TO OPPORTUNITIES', eyebrow: 'PORTFOLIO · SOFTWARE ENGINEERING', heroTitle: 'Building digital solutions that', heroAccent: 'make a difference.', heroDescription: 'Hi, I’m Adryan. I enjoy turning complex ideas into digital products that are useful, intuitive, and enjoyable to use.', viewProjects: 'View projects', knowMe: 'Get to know me', based: 'BASED IN', focus: 'CURRENT FOCUS', location: 'Makassar, South Sulawesi, Indonesia',
    artLabel: 'Illustration of an interface and code', codeStatus: 'All systems curious', chipTop: <>Design-minded<br /><strong>solution builder</strong></>, chipBottom: <>Clean code,<br /><strong>clear purpose.</strong></>, artCaption: 'IDEAS → INTERFACE → IMPACT', scroll: 'SCROLL TO EXPLORE',
    aboutLabel: 'A LITTLE ABOUT ME', aboutTitle: 'Good technology feels simple.', aboutAccent: 'The process behind it takes curiosity.', aboutP1: 'I earned my bachelor’s degree in Software Engineering from Universitas Dipa Makassar. I enjoy every part of building a product — from understanding a problem and shaping the user experience to writing code that can grow.', aboutP2: 'To me, great software comes from a mix of empathy, curiosity, and attention to detail. When I’m not coding, I’m usually reading, exploring new tools, or looking for a good cup of coffee.', sayHello: 'Let’s connect',
    workLabel: 'SELECTED WORK', projectsTitle: 'Projects I’ve', projectsAccent: 'made along the way.', projectsSubtitle: 'A few ideas that grew into something real.', yearRange: '2023 — 2025', projectSummaries: ['A web app for recording employee attendance and reviewing attendance history.', 'An educational game for learning Chinese.', 'An educational game that introduces the Makassarese Lontara script.'], projectDescriptions: ['This final project for the Software Assurance course focused on testing application features with black-box and white-box methods.', 'I developed this educational Chinese-learning game while working on my thesis. Its concept was closely related to my thesis topic, which encouraged me to take on the project.', 'An educational game that introduces the Lontara script to students at SDN Bulurokeng in Makassar. A shuffle algorithm varies the questions and helps prevent students from memorizing the answer order. Pre- and post-tests track progress in Makassarese Lontara, while black-box testing verifies the game features.'], projectTypes: ['WEB APP', 'EDUCATIONAL GAME', 'EDUCATIONAL GAME'], askProject: 'Ask about the project', projectNote: 'Each project is designed to support learning or make everyday activities easier.',
    skillsLabel: 'TOOLS OF THE TRADE', skillsTitle: 'Tools to', skillsAccent: 'bring ideas to life.', skillsSubtitle: 'Technologies I use to design, build, and ship digital products.',
    contactLabel: 'HAVE AN INTERESTING IDEA?', contactTitle: 'Let’s make', contactAccent: 'something meaningful.', contactDescription: 'Looking for a project partner, a collaboration, or just want to talk about technology? I’m open to starting a conversation.', sendEmail: 'Send an email', connect: 'FIND ME ON', footer: 'Designed & built with curiosity.', backTop: 'BACK TO TOP',
  },
}

const detailCopy = {
  id: {
    back: 'Kembali ke semua proyek', detail: 'DETAIL PROYEK', overview: 'Tentang proyek', evidence: 'Bukti visual', technologies: 'Teknologi yang digunakan', launch: 'Coba proyek ini', launchNote: 'Tautan proyek akan ditampilkan di sini setelah tersedia.', openWebsite: 'Buka website', downloadApk: 'Unduh APK', websiteUnavailable: 'Tautan website belum ditambahkan', apkUnavailable: 'File APK belum ditambahkan',
  },
  en: {
    back: 'Back to all projects', detail: 'PROJECT DETAILS', overview: 'About the project', evidence: 'Project preview', technologies: 'Technologies used', launch: 'Try this project', launchNote: 'The project link will appear here once it is available.', openWebsite: 'Open website', downloadApk: 'Download APK', websiteUnavailable: 'Website link has not been added', apkUnavailable: 'APK file has not been added',
  },
}

const projects = [
  { number: '01', title: 'Web Absen', tags: ['JavaScript', 'MySQL'], image: attendanceImage, alt: 'Portal absensi karyawan dengan formulir kehadiran dan tabel riwayat absensi', gallery: [{ src: attendanceLoginImage, alt: 'Halaman login Web Absen Perusahaan' }, { src: attendanceDashboardImage, alt: 'Dashboard karyawan untuk mengisi dan melihat riwayat absensi' }], linkKind: 'website', url: 'https://absen-perusahaan.site.je/' },
  { number: '02', title: 'Cakap Hanyu', tags: ['Unity', 'C#', 'Game Logic'], image: cakapImage, alt: 'Ilustrasi identitas Game pembelajaran bahasa Cakap Hanyu', gallery: [{ src: cakapQuestionImage, alt: 'Layar soal kuis pilihan ganda berbahasa Mandarin', caption: 'Soal kuis bahasa Mandarin' }, { src: cakapDescriptionImage, alt: 'Layar deskripsi bacaan berbahasa Mandarin dengan tombol audio', caption: 'Deskripsi materi bacaan' }, { src: cakapVocabularyImage, alt: 'Daftar kosakata Mandarin dengan pinyin dan arti bahasa Indonesia', caption: 'Kosakata yang akan dipelajari' }, { src: cakapLessonMenuImage, alt: 'Menu pilihan materi pembelajaran Cakap Hanyu', caption: 'Menu materi pembelajaran' }], linkKind: 'apk', url: `${import.meta.env.BASE_URL}downloads/cakap-hanyu.apk` },
  { number: '03', title: 'Lontara', tags: ['Unity Engine', 'C#', 'Shuffle'], image: lontaraImage, alt: 'Tampilan Game belajar Bahasa Lontara untuk SDN Bulurokeng Makassar', gallery: [{ src: lontaraClassPhotoOne, alt: 'Siswa mencoba game Lontara bersama pendamping', caption: 'Siswa mencoba aplikasi di kelas' }, { src: lontaraClassPhotoTwo, alt: 'Pengenalan game Lontara di depan kelas', caption: 'Pengenalan aplikasi kepada siswa' }, { src: lontaraLearningImage, alt: 'Tampilan kuis pilihan ganda untuk mengenali aksara Lontara', caption: 'Kuis pengenalan aksara' }, { src: lontaraQuizImage, alt: 'Tampilan materi belajar suku kata Lontara GA, GI, GU, GE, dan GO', caption: 'Materi belajar aksara Lontara' }], linkKind: 'apk', url: `${import.meta.env.BASE_URL}downloads/lontara.apk` },
]

const skills = [
  { group: 'FRONTEND', items: 'React · JavaScript · HTML & CSS' },
  { group: 'BACKEND', items: 'Node.js · PHP' },
  { group: 'TOOLS', items: 'Unity · Adobe Illustrator · VS Code' },
]

const contactEmail = 'adryanpurnama04@gmail.com'
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`

function Arrow({ diagonal = false }) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d={diagonal ? 'M5 15 15 5M6 5h9v9' : 'M3.5 10h12m-5-5 5 5-5 5'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function SocialIcon({ type }) {
  if (type === 'linkedin') return <svg className="social-icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.4a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM4.9 9.8h3.2v9.3H4.9V9.8Zm5.2 0h3v1.3h.1a3.3 3.3 0 0 1 3-1.6c3.2 0 3.8 2.1 3.8 4.8v4.8h-3.2v-4.3c0-1 0-2.4-1.5-2.4s-1.8 1.1-1.8 2.3v4.4h-3.2V9.8Z" /></svg>
  if (type === 'github') return <svg className="social-icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.6-.2.6-.4v-1.6c-2.5.5-3-.6-3.2-1.1-.1-.3-.6-1.1-1-1.3-.3-.2-.8-.6 0-.6.7 0 1.2.6 1.4.9.8 1.3 2 1 2.5.8.1-.6.4-1 .7-1.2-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.7.8.7 1.6v2.5c0 .2.1.5.6.4A9.2 9.2 0 0 0 12 2.8Z" /></svg>
  return <svg className="social-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function ProjectDetail({ project, active, language, onBack }) {
  const backButtonRef = useRef(null)
  const t = content[language]
  const labels = detailCopy[language]
  const projectIndex = projects.findIndex((item) => item.number === project?.number)
  const launchLabel = project?.linkKind === 'apk' ? labels.downloadApk : labels.openWebsite

  useEffect(() => {
    if (active) backButtonRef.current?.focus()
  }, [active])

  return (
    <section className={`project-detail-page ${active ? 'is-active' : ''}`} aria-hidden={!active}>
      {project && <>
        <div className="detail-topbar"><button ref={backButtonRef} className="detail-back" type="button" onClick={onBack}><span aria-hidden="true">←</span>{labels.back}</button><span className="brand-name">Adryan Purnama Januar</span></div>
        <main className="detail-main section-wrap">
          <div className="detail-heading"><p className="eyebrow">{labels.detail} <span>· {project.number} / 03</span></p><h1>{project.title}</h1><p>{t.projectSummaries[projectIndex]}</p></div>
          <section className="detail-section"><div className="detail-section-label">01 <span>{labels.overview}</span></div><p>{t.projectDescriptions[projectIndex]}</p></section>
          <section className="detail-section"><div className="detail-section-label">02 <span>{labels.evidence}</span></div><div className="detail-gallery">{(project.gallery ?? [{ src: project.image, alt: project.alt }]).map((image, index) => <figure className="detail-image-frame" key={image.src}><img src={image.src} alt={image.alt} /><figcaption>{image.caption ?? `${project.title}${project.gallery ? ` · ${index + 1} / ${project.gallery.length}` : ''}`}</figcaption></figure>)}</div></section>
          <section className="detail-section"><div className="detail-section-label">03 <span>{labels.technologies}</span></div><div className="tag-list detail-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section>
          <section className="detail-launch"><p className="eyebrow">04 · {labels.launch}</p><h2>{project.title}</h2>{project.url ? <a className="button button-dark" href={project.url} target={project.linkKind === 'website' ? '_blank' : undefined} rel={project.linkKind === 'website' ? 'noreferrer' : undefined} download={project.linkKind === 'apk' ? true : undefined}>{launchLabel}<Arrow diagonal /></a> : <button className="button button-dark detail-link-disabled" type="button" disabled>{project.linkKind === 'apk' ? labels.apkUnavailable : labels.websiteUnavailable}</button>}<p>{project.url ? launchLabel : labels.launchNote}</p></section>
        </main>
      </>}
    </section>
  )
}

function App() {
  const [language, setLanguage] = useState('id')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const t = content[language]
  const closeMenu = () => setMenuOpen(false)

  const openProject = (project) => {
    setSelectedProject(project)
  }

  const closeProject = () => {
    const projectNumber = selectedProject?.number
    setSelectedProject(null)
    requestAnimationFrame(() => document.querySelector(`[data-project-number="${projectNumber}"]`)?.focus())
  }

  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'id' ? 'Adryan Purnama Januar — Rekayasa Perangkat Lunak' : 'Adryan Purnama Januar — Software Engineering'
  }, [language])

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className={`site-header ${selectedProject ? 'is-hidden' : ''}`} aria-hidden={Boolean(selectedProject)} inert={Boolean(selectedProject)}>
        <div className="nav-wrap">
          <a className="brand" href="#home" aria-label={language === 'id' ? 'Adryan Purnama Januar, beranda' : 'Adryan Purnama Januar, home'}><span className="brand-mark">A<span>.</span></span><span className="brand-name">Adryan Purnama Januar</span></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? t.menuClose : t.menuOpen} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
          <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label={t.navLabel}>
            <a href="#tentang" onClick={closeMenu}>{t.aboutNav}</a><a href="#proyek" onClick={closeMenu}>{t.projectsNav}</a><a href="#keahlian" onClick={closeMenu}>{t.skillsNav}</a>
            <a className="nav-cta" href="#kontak" onClick={closeMenu}>{t.contactNav} <Arrow diagonal /></a>
            <div className="language-switch" role="group" aria-label={language === 'id' ? 'Pilih bahasa' : 'Choose language'}><button type="button" className={language === 'id' ? 'active' : ''} aria-pressed={language === 'id'} onClick={() => setLanguage('id')}>ID</button><span aria-hidden="true">/</span><button type="button" className={language === 'en' ? 'active' : ''} aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button></div>
          </nav>
        </div>
      </header>

      <div className={`portfolio-shell ${selectedProject ? 'is-shifted' : ''}`} aria-hidden={Boolean(selectedProject)} inert={Boolean(selectedProject)}>
      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="availability-dot" /> {t.availability}</div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.heroTitle} <span>{t.heroAccent}</span></h1>
            <p className="hero-description">{t.heroDescription}</p>
            <div className="hero-actions"><a className="button button-dark" href="#proyek">{t.viewProjects} <Arrow /></a><a className="text-link" href="#tentang">{t.knowMe} <Arrow diagonal /></a></div>
            <div className="hero-meta"><span>{t.based}</span><strong>{t.location}</strong><span className="meta-divider" /><span>{t.focus}</span><strong>Full-stack development</strong></div>
          </div>
          <div className="hero-art" aria-label={t.artLabel} role="img">
            <div className="art-grid" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-window"><div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>project.jsx</span><span className="window-menu">···</span></div><div className="code-lines"><p><b>01</b><span className="code-purple">const</span> <span className="code-blue">developer</span> = {'{'}</p><p><b>02</b>&nbsp;&nbsp;name: <span className="code-green">'Adryan'</span>,</p><p><b>03</b>&nbsp;&nbsp;focus: <span className="code-green">'building things'</span>,</p><p><b>04</b>&nbsp;&nbsp;alwaysLearning: <span className="code-orange">true</span>,</p><p><b>05</b>{'}'}</p><p className="code-gap"><b>06</b></p><p><b>07</b><span className="code-purple">function</span> <span className="code-blue">makeItMatter</span>() {'{'}</p><p><b>08</b>&nbsp;&nbsp;<span className="code-purple">return</span> <span className="code-green">'one line at a time'</span></p><p><b>09</b>{'}'}</p></div><div className="window-status"><span><i /> {t.codeStatus}</span><span>UTF-8&nbsp; · &nbsp;JavaScript</span></div></div>
            <div className="floating-chip chip-top"><span className="chip-icon" aria-hidden="true">✳</span><span>{t.chipTop}</span></div>
            <div className="floating-chip chip-bottom"><span className="chip-check" aria-hidden="true">✓</span><span>{t.chipBottom}</span></div>
            <div className="art-caption">{t.artCaption} <span aria-hidden="true">✳</span></div>
          </div>
          <a className="scroll-note" href="#tentang"><span className="scroll-line" /> {t.scroll}</a>
        </section>

        <section className="intro section-wrap" id="tentang">
          <div className="section-label"><span>01</span> {t.aboutLabel}</div>
          <div className="intro-content"><h2>{t.aboutTitle} <span>{t.aboutAccent}</span></h2><div className="intro-detail"><p>{t.aboutP1}</p><p>{t.aboutP2}</p><a href="#kontak" className="underlined-link">{t.sayHello} <Arrow diagonal /></a></div></div>
        </section>

        <section className="projects-section" id="proyek">
          <div className="section-wrap projects-inner"><div className="section-label"><span>02</span> {t.workLabel}</div><div className="projects-heading"><div><h2>{t.projectsTitle} <span>{t.projectsAccent}</span></h2><p>{t.projectsSubtitle}</p></div><span className="project-count">{t.yearRange}&nbsp;&nbsp; / &nbsp;&nbsp;03</span></div>
            <div className="project-list">{projects.map((project, index) => <button className="project-card" type="button" key={project.number} data-project-number={project.number} onClick={() => openProject(project)} aria-label={`${detailCopy[language].detail}: ${project.title}`}><div className="project-visual has-image"><img className="project-image" src={project.image} alt="" loading="lazy"/><span className="project-number">{project.number} / 03</span><span className="project-type">{t.projectTypes[index]}</span></div><div className="project-info"><div className="project-title-row"><h3>{project.title}</h3><span className="icon-link" aria-hidden="true"><Arrow diagonal /></span></div><p>{t.projectSummaries[index]}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></button>)}</div>
            <p className="project-note">{t.projectNote}</p>
          </div>
        </section>

        <section className="skills section-wrap" id="keahlian"><div className="section-label"><span>03</span> {t.skillsLabel}</div><div className="skills-layout"><div className="skills-heading"><h2>{t.skillsTitle} <span>{t.skillsAccent}</span></h2><p>{t.skillsSubtitle}</p></div><div className="skill-list">{skills.map((skill) => <div className="skill-row" key={skill.group}><span>{skill.group}</span><p>{skill.items}</p><span className="skill-plus">+</span></div>)}</div></div></section>

        <section className="contact-section" id="kontak"><div className="contact-inner section-wrap"><div className="section-label"><span>04</span> {t.contactLabel}</div><div className="contact-content"><div><h2>{t.contactTitle}<br /><span>{t.contactAccent}</span></h2><p>{t.contactDescription}</p><a className="button button-light" href={gmailComposeUrl} target="_blank" rel="noreferrer">{t.sendEmail} <Arrow diagonal /></a></div><div className="contact-side"><span>{t.connect}</span><a href="https://www.linkedin.com/in/adryan-purnama-januar-21b280435/" target="_blank" rel="noreferrer"><SocialIcon type="linkedin" />LinkedIn <Arrow diagonal /></a><a href="https://github.com/KeyranAeru" target="_blank" rel="noreferrer"><SocialIcon type="github" />GitHub <Arrow diagonal /></a><a href={gmailComposeUrl} target="_blank" rel="noreferrer"><SocialIcon type="email" />Email <Arrow diagonal /></a></div></div></div></section>
      </main>
      <footer className="footer section-wrap"><a className="brand" href="#home" aria-label={language === 'id' ? 'Kembali ke beranda' : 'Back to home'}><span className="brand-mark">A<span>.</span></span></a><span>{t.footer}</span><span>© 2026 Adryan Purnama Januar</span><a href="#home" className="back-top">{t.backTop} ↑</a></footer>
      </div>
      <ProjectDetail project={selectedProject} active={Boolean(selectedProject)} language={language} onBack={closeProject} />
    </>
  )
}

export default App
