import { useLang } from '../LangContext'
import { LINKS } from '../data'

const SOCIALS = [['GitHub', 'github'], ['LinkedIn', 'linkedin'], ['Instagram', 'instagram'], ['Email', 'email']]

export default function Footer() {
  const { t } = useLang()
  return (
    <footer>
      <div className="foot">
        <div>© {new Date().getFullYear()} Adryan Purnama Januar. {t('f_rights')}</div>
        <div className="soc">
          {SOCIALS.map(([name, key]) => (
            <a key={key} href={LINKS[key]} target="_blank" rel="noopener noreferrer">{name}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
