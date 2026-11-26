import { useLang } from '../LangContext'
import { PROOFS } from '../data'
import Ph from '../components/Ph'

export default function Proof() {
  const { t, l } = useLang()
  return (
    <section className="page on">
      <div className="wrap">
        <h1>{t('e_title')}</h1>
        <p className="lead">{t('e_lead')}</p>
        <div className="grid">
          {PROOFS.map((p, i) => (
            <div className="card" key={i}>
              <Ph img={p.img} alt={l(p.t)} />
              <div className="meta">{l(p.when)}</div>
              <h4>{l(p.t)}</h4>
              <p>{l(p.d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
