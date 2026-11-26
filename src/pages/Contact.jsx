import { useLang } from '../LangContext'
import { LINKS } from '../data'

const ITEMS = [['Email', 'email'], ['WhatsApp', 'whatsapp'], ['GitHub', 'github'], ['LinkedIn', 'linkedin'], ['Instagram', 'instagram']]

export default function Contact() {
  const { t } = useLang()
  return (
    <section className="page on">
      <div className="wrap">
        <h1>{t('c_title')}</h1>
        <p className="lead">{t('c_lead')}</p>
        <div className="card clist" style={{ maxWidth: 520 }}>
          {ITEMS.map(([name, key]) => (
            <a key={key} href={LINKS[key]} target="_blank" rel="noopener noreferrer">{name} ↗</a>
          ))}
        </div>
      </div>
    </section>
  )
}
