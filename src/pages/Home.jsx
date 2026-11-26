import { useLang } from '../LangContext'

export default function Home() {
  const { t } = useLang()
  return (
    <section className="page on">
      <div className="hero">
        <h1>{t('h_title')}</h1>
        <h2>{t('h_sub')}</h2>
        <div className="push" />
        <p>{t('h_desc')}</p>
        <a className="cta" href="#proyek"><span>{t('h_cta')}</span><b>→</b></a>
        <div className="privacy">{t('h_note')}</div>
      </div>
    </section>
  )
}
