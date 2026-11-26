import { useLang } from '../LangContext'
import { FOCUS, EXP, SKILLS } from '../data'

export default function About() {
  const { t, l } = useLang()
  return (
    <section className="page on">
      <div className="wrap">
        <h1>{t('a_title')}</h1>
        <p className="lead">{t('a_lead')}</p>
        <div className="card"><p>{t('a_story')}</p></div>

        <h3>{t('a_focus')}</h3>
        <div className="grid">
          {FOCUS.map((f, i) => (
            <div className="card" key={i}><h4>{l(f.t)}</h4><p>{l(f.d)}</p></div>
          ))}
        </div>

        <h3>{t('a_exp')}</h3>
        <div className="tl">
          {EXP.map((x, i) => (
            <div className="card" key={i}>
              <div className="meta">{l(x.when)}</div>
              <h4>{l(x.t)}</h4>
              <p>{l(x.d)}</p>
            </div>
          ))}
        </div>

        <h3>{t('a_skills')}</h3>
        <div className="grid">
          {SKILLS.map((s, i) => (
            <div className="card" key={i}>
              <h4 style={{ marginBottom: 10 }}>{l(s.t)}</h4>
              <div className="chips">
                {s.items.map((it, j) => <span className="chip" key={j}>{l(it)}</span>)}
              </div>
            </div>
          ))}
        </div>

        <h3>{t('a_goal')}</h3>
        <div className="card"><p>{t('a_goal_txt')}</p></div>
      </div>
    </section>
  )
}
