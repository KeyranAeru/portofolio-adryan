import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { T } from './data'

const Ctx = createContext(null)
export const useLang = () => useContext(Ctx)

// Menyediakan bahasa aktif (id/en), fungsi t('kunci') untuk teks statis,
// dan l({id,en}) untuk teks dua bahasa dari data.js
export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem('lang') || 'id' } catch { return 'id' }
  })
  const setLang = (v) => {
    setLangState(v)
    try { localStorage.setItem('lang', v) } catch { /* abaikan */ }
  }
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  const value = useMemo(() => {
    const l = (v) => (typeof v === 'string' ? v : v[lang])
    return { lang, setLang, l, t: (k) => l(T[k]) }
  }, [lang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
