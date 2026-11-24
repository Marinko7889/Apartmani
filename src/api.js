import { supabase } from './supabase'

export const MAX_CIJENA = 300

export async function dohvatiApartmane({ trazi, grad, maxCijena, sortiraj }) {
  let upit = supabase.from('apartmani').select('*')

  const pojam = trazi.trim().replace(/[,()%]/g, '')
  if (pojam) upit = upit.or(`naziv.ilike.%${pojam}%,grad.ilike.%${pojam}%`)
  if (grad) upit = upit.eq('grad', grad)
  if (Number(maxCijena) < MAX_CIJENA) upit = upit.lte('cijena', maxCijena)

  const [stupac, smjer] = sortiraj.split(':')
  upit = upit.order(stupac, { ascending: smjer === 'asc' })

  const { data, error } = await upit
  if (error) throw error
  return data
}

export async function dohvatiGradove() {
  const { data, error } = await supabase.from('apartmani').select('grad')
  if (error) throw error
  return [...new Set(data.map((r) => r.grad))].sort()
}

export async function dodajApartman(apartman) {
  const { error } = await supabase.from('apartmani').insert(apartman)
  if (error) throw error
}

export async function obrisiApartman(id) {
  const { error } = await supabase.from('apartmani').delete().eq('id', id)
  if (error) throw error
}
