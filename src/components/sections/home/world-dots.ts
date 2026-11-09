/**
 * Coarse land mask for the delivery map: an equirectangular dot grid derived from
 * Natural Earth 110m land (public domain), 2° cells, lat 82° to -56°.
 * Each row is a run-length list (base 36), alternating sea/land, starting with sea.
 * Generated once; regenerate with a point-in-polygon pass over ne_110m_land if needed.
 */
export const GRID = { step: 2, top: 82, bottom: -56, cols: 180, rows: 69 } as const;

const ROWS: readonly string[] = [
  "17.1.1.b.2.p.1i.1.16",
  "11.2.4.3.1.5.4.o.g.5.11.4.12",
  "u.2.a.1.2.5.4.r.h.1.16.2.11",
  "y.3.3.1.1.1.1.6.b.j.12.2.d.d.d.3.1.2.f",
  "s.3.1.1.3.1.3.1.1.2.1.4.1.2.a.h.11.2.c.l.1.2.q",
  "0.1.a.2.f.1.2.7.4.2.2.8.a.d.1.1.n.2.d.1.5.3.1.s.1.a.2.1.a.1",
  "8.d.1.9.2.3.2.1.2.1.1.3.1.2.3.4.8.d.m.9.c.3.1.2.1.1b.1.5",
  "0.3.5.15.4.5.5.a.o.e.1.1.1.c.1.1h",
  "2.2.3.13.1.1.3.6.7.6.9.4.d.5.2.4.1.1.1.1y",
  "8.11.9.2.1.1.7.4.p.5.2.27",
  "7.7.1.s.8.4.b.3.o.6.2.1v.2.1.1.4.4",
  "9.4.8.m.8.4.2.1.z.6.3.1n.5.1.3.1.9",
  "b.1.b.m.7.7.s.2.5.1.1.2.3.1m.9.4.8",
  "8.1.g.o.2.a.p.3.5.1.5.1m.a.3.9",
  "p.o.2.b.n.2.1.2.2.1y.6.1.b",
  "q.10.q.2.1.1x.1.1.i",
  "r.1.1.r.1.1.3.2.q.1z.1.1.i",
  "s.u.5.1.p.1y.2.1.i",
  "s.s.1.2.u.7.1.8.2.1.1.5.2.16.m",
  "s.r.u.7.3.2.2.5.6.4.2.15.3.2.i",
  "s.q.w.4.4.1.2.2.1.4.1.a.2.12.5.1.j",
  "s.o.x.5.8.1.1.2.1.c.2.w.4.1.6.1.j",
  "t.n.z.2.4.3.1.1.6.b.2.y.2.2.3.2.k",
  "u.m.z.8.7.1.3.1.1.16.3.1.2.4.k",
  "v.j.10.a.c.16.5.2.n",
  "w.h.10.e.1.4.1.1a.t",
  "y.8.7.1.z.t.1.10.t",
  "x.1.1.6.8.1.x.o.1.7.2.x.u",
  "y.1.1.5.16.o.2.7.1.1.5.r.u",
  "11.4.7.2.w.q.1.b.5.n.2.1.t",
  "11.4.4.2.4.1.t.s.1.9.6.9.2.8.10",
  "12.4.2.2.8.1.r.r.2.8.7.6.5.6.1.1.z",
  "14.6.10.r.2.6.a.4.6.7.6.1.t",
  "18.4.x.t.1.4.c.3.9.5.6.1.t",
  "1a.2.y.t.1.1.e.3.9.6.5.1.t",
  "1b.1.4.4.q.u.2.2.c.2.9.1.2.2.8.1.r",
  "1c.1.1.1.1.8.n.w.d.1.1.1.8.1.2.1.11",
  "1f.a.n.v.f.1.l.1.r",
  "1f.d.l.2.1.1.4.l.o.1.1.2.5.2.v",
  "1f.e.u.i.q.1.1.1.4.3.v",
  "1e.f.u.h.r.2.4.4.1.1.t",
  "1e.h.r.h.t.2.3.4.6.2.n",
  "1e.k.p.f.v.2.2.3.1.2.3.1.1.1.1.3.j",
  "1d.n.o.e.w.1.8.1.7.4.h",
  "1e.n.n.e.x.3.d.5.4.1.b",
  "1f.l.o.e.12.1.3.1.7.2.1.1.6.1.9",
  "1f.k.q.d.1y",
  "1g.j.p.e.4.1.14.3.3.1.i",
  "1g.j.p.e.4.1.11.6.3.2.a.1.6",
  "1i.g.q.d.3.3.10.8.2.2.h",
  "1j.f.q.c.4.3.10.c.h",
  "1j.f.r.b.4.2.y.h.7.1.7",
  "1j.d.t.b.4.2.x.i.f",
  "1j.b.v.a.5.1.y.j.e",
  "1j.b.w.8.15.k.d",
  "1i.b.x.8.15.k.d",
  "1i.b.y.6.17.j.d",
  "1i.a.z.5.18.4.5.9.e",
  "1i.7.2f.1.a.6.b.1.3",
  "1h.9.2q.5.c.1.2",
  "1h.6.3a.2.1",
  "1h.4.1.1.2v.2.c.2.2",
  "1i.4.2x.1.b.2.3",
  "1h.4.39.2.4",
  "1h.4.3f",
  "1g.4.1w.1.1j",
  "1g.3.3h",
  "1h.3.3g",
  "1i.2.3g",
];

/** Land cells as [col, row] pairs. */
export function landCells(): [number, number][] {
  const out: [number, number][] = [];
  ROWS.forEach((row, r) => {
    let c = 0;
    let land = false;
    for (const run of row.split(".")) {
      const n = parseInt(run, 36);
      if (land) for (let i = 0; i < n; i++) out.push([c + i, r]);
      c += n;
      land = !land;
    }
  });
  return out;
}

/** Project lon/lat into the map viewBox (1 unit = 1°). */
export function project(lon: number, lat: number): [number, number] {
  return [lon + 180, GRID.top - lat];
}
