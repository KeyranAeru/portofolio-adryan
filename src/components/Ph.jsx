import { useLang } from '../LangContext'

// Gambar dengan kotak placeholder bila img kosong
export default function Ph({ img, alt }) {
  const { lang } = useLang()
  return (
    <div className="ph">
      {img ? <img src={img} alt={alt} loading="lazy" /> : lang === 'id' ? 'Taruh gambar di sini' : 'Place image here'}
    </div>
  )
}
