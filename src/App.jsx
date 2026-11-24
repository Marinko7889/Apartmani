import { useEffect, useState } from 'react'
import { dodajApartman, dohvatiApartmane, dohvatiGradove, MAX_CIJENA, obrisiApartman } from './api'
import ApartmanForma from './components/ApartmanForma'
import ApartmanKartica from './components/ApartmanKartica'
import Filteri from './components/Filteri'

export default function App() {
  const [filteri, setFilteri] = useState({ trazi: '', grad: '', maxCijena: MAX_CIJENA, sortiraj: 'created_at:desc' })
  const [apartmani, setApartmani] = useState([])
  const [gradovi, setGradovi] = useState([])
  const [ucitava, setUcitava] = useState(true)
  const [greska, setGreska] = useState('')
  const [osvjezi, setOsvjezi] = useState(0)

  // dohvat se pokreće 300 ms nakon zadnje promjene filtera, da ne šalje upit za svako slovo
  useEffect(() => {
    const timer = setTimeout(() => {
      setUcitava(true)
      dohvatiApartmane(filteri)
        .then((podaci) => {
          setApartmani(podaci)
          setGreska('')
        })
        .catch((err) => setGreska(err.message))
        .finally(() => setUcitava(false))
    }, 300)
    return () => clearTimeout(timer)
  }, [filteri, osvjezi])

  useEffect(() => {
    dohvatiGradove().then(setGradovi).catch(() => {})
  }, [osvjezi])

  async function dodaj(apartman) {
    await dodajApartman(apartman)
    setOsvjezi((n) => n + 1)
  }

  async function obrisi(apartman) {
    if (!window.confirm(`Obrisati "${apartman.naziv}"?`)) return
    try {
      await obrisiApartman(apartman.id)
      setOsvjezi((n) => n + 1)
    } catch (err) {
      setGreska(err.message)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="bg-cyan-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-2xl font-bold">Apartmani</h1>
          <p className="text-sm text-cyan-100">React + Supabase (PostgreSQL)</p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_300px]">
        <section className="space-y-4">
          <Filteri filteri={filteri} setFilteri={setFilteri} gradovi={gradovi} />

          <p className="text-sm text-slate-500">
            {ucitava ? 'Učitavam...' : `Pronađeno: ${apartmani.length}`}
          </p>

          {greska && (
            <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{greska}</p>
          )}

          {!ucitava && apartmani.length === 0 && !greska && (
            <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
              Nema apartmana za ove filtere.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {apartmani.map((a) => (
              <ApartmanKartica key={a.id} apartman={a} onObrisi={obrisi} />
            ))}
          </div>
        </section>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-semibold text-slate-900">Novi apartman</h2>
          <ApartmanForma onDodaj={dodaj} />
        </aside>
      </main>
    </div>
  )
}
