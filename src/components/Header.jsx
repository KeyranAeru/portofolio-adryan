import { useLang } from '../LangContext'

const NAV = [
  ['beranda', 'n_home'],
  ['tentang', 'n_about'],
  ['proyek', 'n_proj'],
  ['bukti', 'n_proof'],
  ['kontak', 'n_contact'],
]

export default function Header({ page }) {
  const { lang, setLang, t } = useLang()
  const active = page === 'detail' ? 'proyek' : page
  return (
    <header>
      <a className="logo" href="#beranda">{t('logo')}</a>
      <nav id="nav">
        {NAV.map(([id, k]) => (
          <a key={id} href={'#' + id} className={active === id ? 'on' : ''}>{t(k)}</a>
        ))}
      </nav>
      <div className="tools">
        <div className="lang">
          {['id', 'en'].map((x) => (
            <button key={x} className={lang === x ? 'on' : ''} onClick={() => setLang(x)}>{x.toUpperCase()}</button>
          ))}
        </div>
        <a className="pill-sm" href="#kontak">{t('n_hire')}</a>
      </div>
    </header>
  )
}
