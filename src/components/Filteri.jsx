import { MAX_CIJENA } from '../api'

const polje =
  'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-cyan-600 focus:outline-none'

export default function Filteri({ filteri, setFilteri, gradovi }) {
  const promijeni = (kljuc) => (e) => setFilteri({ ...filteri, [kljuc]: e.target.value })

  return (
    <div className="grid gap-3 sm:grid-cols-4">
      <input
        type="search"
        placeholder="Traži po nazivu ili gradu..."
        value={filteri.trazi}
        onChange={promijeni('trazi')}
        className={`${polje} sm:col-span-2`}
      />
      <select value={filteri.grad} onChange={promijeni('grad')} className={polje}>
        <option value="">Svi gradovi</option>
        {gradovi.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <select value={filteri.sortiraj} onChange={promijeni('sortiraj')} className={polje}>
        <option value="created_at:desc">Najnoviji</option>
        <option value="cijena:asc">Cijena: najniža</option>
        <option value="cijena:desc">Cijena: najviša</option>
        <option value="naziv:asc">Naziv: A–Ž</option>
      </select>
      <label className="flex items-center gap-3 text-sm text-slate-600 sm:col-span-4">
        Najviše
        <input
          type="range"
          min="50"
          max={MAX_CIJENA}
          step="10"
          value={filteri.maxCijena}
          onChange={promijeni('maxCijena')}
          className="w-48 accent-cyan-700"
        />
        <span className="font-medium text-slate-800">
          {Number(filteri.maxCijena) < MAX_CIJENA ? `${filteri.maxCijena} € / noć` : 'bez ograničenja'}
        </span>
      </label>
    </div>
  )
}
