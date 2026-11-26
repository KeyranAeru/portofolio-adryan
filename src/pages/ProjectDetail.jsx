import { useLang } from '../LangContext'
import { PROJECTS } from '../data'
import Ph from '../components/Ph'

export default function ProjectDetail({ slug }) {
  const { l, lang } = useLang()
  const p = PROJECTS.find((x) => x.slug === slug)
  if (!p) return null
  const id = lang === 'id'
  return (
    <section className="page on">
      <div className="wrap">
        <a className="back" href="#proyek">← {id ? 'Kembali ke proyek' : 'Back to projects'}</a>
        <h1>{l(p.t)}</h1>
        <p className="lead">{l(p.d)}</p>
        <div className="card">
          <Ph img={p.img} alt={l(p.t)} />
          <h3 style={{ marginTop: 6 }}>{id ? 'Gambaran proyek' : 'Overview'}</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{l(p.long)}</p>
          <h3>Tech stack</h3>
          <div className="chips">{p.tag.map((x) => <span className="chip" key={x}>{x}</span>)}</div>
          <div className="btns">
            <a className="cta" href={p.demo} target="_blank" rel="noopener noreferrer"><span>{id ? 'Buka' : 'Open'}</span><b>↗</b></a>
          </div>
        </div>
      </div>
    </section>
  )
}
