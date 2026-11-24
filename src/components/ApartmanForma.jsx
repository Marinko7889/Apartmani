import { useState } from 'react'

const prazno = { naziv: '', grad: '', cijena: '', broj_osoba: '' }
const polje =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-cyan-600 focus:outline-none'

export default function ApartmanForma({ onDodaj }) {
  const [forma, setForma] = useState(prazno)
  const [sprema, setSprema] = useState(false)
  const [greska, setGreska] = useState('')

  const promijeni = (kljuc) => (e) => setForma({ ...forma, [kljuc]: e.target.value })

  async function posalji(e) {
    e.preventDefault()
    setGreska('')
    if (Number(forma.cijena) <= 0 || Number(forma.broj_osoba) <= 0) {
      setGreska('Cijena i broj osoba moraju biti veći od 0.')
      return
    }
    setSprema(true)
    try {
      await onDodaj({
        naziv: forma.naziv.trim(),
        grad: forma.grad.trim(),
        cijena: Number(forma.cijena),
        broj_osoba: Number(forma.broj_osoba),
      })
      setForma(prazno)
    } catch (err) {
      setGreska(err.message)
    } finally {
      setSprema(false)
    }
  }

  return (
    <form onSubmit={posalji} className="space-y-3">
      <input required placeholder="Naziv" value={forma.naziv} onChange={promijeni('naziv')} className={polje} />
      <input required placeholder="Grad" value={forma.grad} onChange={promijeni('grad')} className={polje} />
      <div className="grid grid-cols-2 gap-3">
        <input required type="number" min="1" placeholder="Cijena (€)" value={forma.cijena} onChange={promijeni('cijena')} className={polje} />
        <input required type="number" min="1" placeholder="Broj osoba" value={forma.broj_osoba} onChange={promijeni('broj_osoba')} className={polje} />
      </div>
      {greska && <p className="text-sm text-rose-600">{greska}</p>}
      <button
        disabled={sprema}
        className="w-full rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-50"
      >
        {sprema ? 'Spremam...' : 'Dodaj apartman'}
      </button>
    </form>
  )
}
