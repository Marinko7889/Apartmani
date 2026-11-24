# Apartmani

Mala web aplikacija s bazom podataka: popis apartmana s pretragom, filterima i sortiranjem, dodavanje novih i brisanje.

Napravljeno s Reactom (Vite) i Supabaseom, tj. PostgreSQL bazom. Nema posebnog backenda, aplikacija šalje upite direktno u Supabase, a što je dopušteno određuju pravila u bazi (Row Level Security).

## Što može

- pretraga po nazivu ili gradu (upit se šalje tek kad prestaneš tipkati)
- filter po gradu i najvišoj cijeni
- sortiranje po cijeni, nazivu ili datumu dodavanja
- dodavanje apartmana kroz formu
- brisanje apartmana

## Baza


Pravila (RLS): svi mogu čitati, dodavati i brisati, a mijenjati ne može nitko.




React 19, Vite, Tailwind CSS, Supabase (PostgreSQL)
