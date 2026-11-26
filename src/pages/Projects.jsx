import { useLang } from '../LangContext'
import { PROJECTS } from '../data'
import Ph from '../components/Ph'

export default function Projects() {
  const { t, l, lang } = useLang()
  return (
    <section className="page on">
      <div className="wrap">
        <h1>{t('p_title')}</h1>
        <p className="lead">{t('p_lead')}</p>
        <div className="grid">
          {PROJECTS.map((p) => (
            <div className="card" key={p.slug}>
              <Ph img={p.img} alt={l(p.t)} />
              <h4>{l(p.t)}</h4>
              <p>{l(p.d)}</p>
              <div className="chips" style={{ marginTop: 10 }}>
                {p.tag.map((x) => <span className="chip" key={x}>{x}</span>)}
              </div>
              <a className="more" href={'#proyek-' + p.slug}>{lang === 'id' ? 'Lihat detail →' : 'View details →'}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
