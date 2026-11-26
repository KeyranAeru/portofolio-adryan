import { useEffect, useRef, useState } from 'react'
import { LangProvider } from './LangContext'
import useHashRoute from './hooks/useHashRoute'
import Background3D from './scene/Background3D'
import { sceneState, burst } from './scene/state'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Proof from './pages/Proof'
import Contact from './pages/Contact'

function Site() {
  const { page, slug } = useHashRoute()
  const prev = useRef(null)
  const [windKey, setWindKey] = useState(0)

  useEffect(() => {
    sceneState.page = page
    document.body.dataset.p = page          // dipakai CSS untuk meredupkan latar di halaman selain beranda
    window.scrollTo(0, 0)
    if (prev.current !== null && prev.current !== page) {
      burst(page === 'detail' ? 1 : 0.4)    // detail proyek = angin kencang
      if (page === 'detail') setWindKey((k) => k + 1)
    }
    prev.current = page
  }, [page])

  return (
    <>
      <Background3D />
      <div key={windKey} className={windKey ? 'wind go' : 'wind'} />
      <div className="frame"><span /><span /><span /><span /></div>
      <Header page={page} />
      <main>
        {page === 'beranda' && <Home />}
        {page === 'tentang' && <About />}
        {page === 'proyek' && <Projects />}
        {page === 'detail' && <ProjectDetail slug={slug} />}
        {page === 'bukti' && <Proof />}
        {page === 'kontak' && <Contact />}
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  )
}
