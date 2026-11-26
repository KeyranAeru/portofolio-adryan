import { useEffect, useState } from 'react'
import { PROJECTS } from '../data'

const PAGES = ['beranda', 'tentang', 'proyek', 'bukti', 'kontak']

// Routing sederhana berbasis hash: #beranda, #tentang, #proyek, #proyek-<slug>, #bukti, #kontak
const parse = () => {
  const h = location.hash.slice(1)
  if (h.startsWith('proyek-')) {
    const slug = h.slice(7)
    if (PROJECTS.some((p) => p.slug === slug)) return { page: 'detail', slug }
  }
  return { page: PAGES.includes(h) ? h : 'beranda', slug: null }
}

export default function useHashRoute() {
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const f = () => setRoute(parse())
    addEventListener('hashchange', f)
    return () => removeEventListener('hashchange', f)
  }, [])
  return route
}
