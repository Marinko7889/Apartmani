function osobe(n) {
  if (n % 10 === 1 && n % 100 !== 11) return `${n} osoba`
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return `${n} osobe`
  return `${n} osoba`
}

export default function ApartmanKartica({ apartman, onObrisi }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium tracking-wide text-cyan-700 uppercase">{apartman.grad}</p>
      <h3 className="mt-1 font-semibold text-slate-900">{apartman.naziv}</h3>
      <p className="mt-1 text-sm text-slate-500">{osobe(apartman.broj_osoba)}</p>
      <div className="mt-4 flex items-end justify-between">
        <p className="text-lg font-bold text-slate-900">
          {apartman.cijena} € <span className="text-sm font-normal text-slate-500">/ noć</span>
        </p>
        <button
          onClick={() => onObrisi(apartman)}
          className="rounded-lg px-2 py-1 text-sm text-rose-600 hover:bg-rose-50"
        >
          Obriši
        </button>
      </div>
    </div>
  )
}
