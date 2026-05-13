"use client";

import { useState } from "react";
import Link from "next/link";
import vanueData from "@/data/vanue.json";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import SearchBar from "@/components/ui/searchbar";

interface Booking {
  booking_group: string;
  venue_id: string;
  olahraga_slug: string;
  tanggal: string;
  ri: number;
  ci: number;
  status: string;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; dot: string }> = {
    confirmed: {
      label: "Terkonfirmasi",
      cls: "text-emerald-700 bg-emerald-50",
      dot: "bg-emerald-400",
    },
    pending: {
      label: "Pembayaran",
      cls: "text-amber-700 bg-amber-50",
      dot: "bg-amber-400",
    },
    cancelled: {
      label: "Dibatalkan",
      cls: "text-red-600 bg-red-50",
      dot: "bg-red-400",
    },
    done: {
      label: "Selesai",
      cls: "text-sky-600 bg-sky-50",
      dot: "bg-sky-400",
    },
  };

  const cfg = map[status] ?? {
    label: status,
    cls: "text-muted bg-surface",
    dot: "bg-muted",
  };

  return (
    <span
      className={`shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${cfg.cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full inline-block ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function DesktopRow({
  groupId,
  items,
  venueName,
  olahragaName,
  olahragaSlug,
  status,
  isEven,
}: {
  groupId: string;
  items: Booking[];
  venueName: string;
  olahragaName: string;
  olahragaSlug: string;
  status: string;
  isEven: boolean;
}) {
  const totalSlot = items.length;
  const slotLabel = items.map((b) => `Lap ${b.ci + 1}`).join(", ");

  return (
    <tr
      className={`transition-colors duration-150 hover:bg-sky-50 ${
        isEven ? "bg-white" : "bg-slate-50/50"
      }`}
    >
      <td className="py-4 px-5">
        <p className="font-semibold text-title text-sm leading-snug">
          {venueName}
        </p>
        <p className="text-xs text-muted mt-0.5">
          {totalSlot} slot · {slotLabel}
        </p>
      </td>
      <td className="py-4 px-4">
        <Badge
          variant="category"
          icon={`icons/${olahragaSlug}.svg`}
          className="w-full"
        >
          {olahragaName}
        </Badge>
      </td>
      <td className="py-4 px-4">
        <span className="text-body text-sm">{items[0].tanggal}</span>
      </td>
      <td className="py-4 px-4">
        <StatusBadge status={status} />
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          {status === "confirmed" && (
            <>
              <Button variant="detail" href={`/booking/${groupId}/detail`}>
                Detail
              </Button>
              <Button
                variant="reschedule"
                href={`/booking/${groupId}/reschedule`}
              >
                Reschedule
              </Button>
            </>
          )}
          {status === "pending" && (
            <>
              <Button variant="buy" href={`/checkout/${groupId}`}>
                Bayar
              </Button>
              <Button variant="cancel" href={`/booking/${groupId}/batal`}>
                Batalkan
              </Button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

function MobileCard({
  groupId,
  items,
  venueName,
  olahragaName,
  olahragaSlug,
  status,
  isEven,
}: {
  groupId: string;
  items: Booking[];
  venueName: string;
  olahragaName: string;
  olahragaSlug: string;
  status: string;
  isEven: boolean;
}) {
  const totalSlot = items.length;

  return (
    <div
      className={`border-b border-border last:border-b-0 px-4 py-4 transition-colors duration-150 hover:bg-sky-50 ${
        isEven ? "bg-white" : "bg-slate-50/50"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <p className="font-semibold text-title text-sm leading-snug">
            {venueName}
          </p>
          <p className="text-xs text-muted mt-0.5">
            {totalSlot} slot · {items.map((b) => `Lap ${b.ci + 1}`).join(", ")}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-3 gap-x-2 gap-y-1 mb-3">
        <div>
          <p className="text-muted text-[11px] font-medium mb-0.5">Olahraga</p>
          <div className="flex items-center gap-1">
            <Badge
              variant="category"
              icon={`icons/${olahragaSlug}.svg`}
              className="w-full"
            >
              {olahragaName}
            </Badge>
          </div>
        </div>
        <div>
          <p className="text-muted text-[11px] font-medium mb-0.5">Tanggal</p>
          <p className="text-xs font-semibold text-body leading-snug">
            {items[0].tanggal}
          </p>
        </div>
        <div>
          <p className="text-muted text-[11px] font-medium mb-0.5">
            Total Slot
          </p>
          <p className="text-xs font-bold text-title">{totalSlot} slot</p>
        </div>
      </div>

      <div className="flex gap-2">
        {status === "confirmed" && (
          <>
            <Button variant="detail" href={`/booking/${groupId}/detail`}>
              Detail
            </Button>
            <Button variant="reschedule" href={`/booking/${groupId}/reschedule`}>
              Reschedule
            </Button>
          </>
        )}
        {status === "pending" && (
          <>
            <Button variant="buy" href={`/checkout/${groupId}`}>
              Bayar
            </Button>
            <Button variant="cancel" href={`/booking/${groupId}/batalkan`}>
              Batalkan
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default function BookingListClient({
  initialBookings,
}: {
  initialBookings: Booking[];
}) {
  const [search, setSearch] = useState("");

  const grouped = initialBookings.reduce((acc, curr) => {
    acc[curr.booking_group] = [...(acc[curr.booking_group] ?? []), curr];
    return acc;
  }, {} as Record<string, Booking[]>);

  const entries = Object.entries(grouped);

  const filteredEntries = entries.filter(([groupId, items]) => {
    const venue = vanueData.find((v) => v.id === items[0].venue_id);
    const olahraga = venue?.olahraga.find(
      (o) => o.slug === items[0].olahraga_slug
    );

    const venueName = venue?.nama.toLowerCase() ?? "";
    const olahragaName = olahraga?.nama.toLowerCase() ?? "";
    const searchTerm = search.toLowerCase();

    return (
      venueName.includes(searchTerm) || olahragaName.includes(searchTerm)
    );
  });

  return (
    <>
      <div className="mb-6 rounded-2xl px-5 py-4.5 bg-[linear-gradient(135deg,#0EA5E9_0%,#0284C7_100%)] animate-fade-up">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari lapangan atau jenis olahraga..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-sm text-title placeholder:text-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden animate-fade-up">
        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-180 text-sm">
            <thead>
              <tr className="bg-[linear-gradient(90deg,#0EA5E9_0%,#0284C7_100%)]">
                {["Lapangan", "Olahraga", "Tanggal & Jam", "Status", "Aksi"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left py-3.5 px-4 first:px-5 font-semibold text-white text-sm"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredEntries.length > 0 ? (
                filteredEntries.map(([groupId, items], idx) => {
                  const venue = vanueData.find((v) => v.id === items[0].venue_id);
                  const olahraga = venue?.olahraga.find(
                    (o) => o.slug === items[0].olahraga_slug
                  );
                  return (
                    <DesktopRow
                      key={groupId}
                      groupId={groupId}
                      items={items}
                      venueName={venue?.nama ?? "-"}
                      olahragaName={olahraga?.nama ?? items[0].olahraga_slug}
                      olahragaSlug={items[0].olahraga_slug}
                      status={items[0].status}
                      isEven={idx % 2 === 0}
                    />
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted">
                    Tidak ada hasil ditemukan untuk "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD */}
        <div className="md:hidden">
          <div className="px-4 py-3 bg-[linear-gradient(90deg,#0EA5E9_0%,#0284C7_100%)]">
            <p className="text-white font-semibold text-sm">Riwayat Pemesanan</p>
          </div>

          {filteredEntries.length > 0 ? (
            filteredEntries.map(([groupId, items], idx) => {
              const venue = vanueData.find((v) => v.id === items[0].venue_id);
              const olahraga = venue?.olahraga.find(
                (o) => o.slug === items[0].olahraga_slug
              );
              return (
                <MobileCard
                  key={groupId}
                  groupId={groupId}
                  items={items}
                  venueName={venue?.nama ?? "-"}
                  olahragaName={olahraga?.nama ?? items[0].olahraga_slug}
                  olahragaSlug={items[0].olahraga_slug}
                  status={items[0].status}
                  isEven={idx % 2 === 0}
                />
              );
            })
          ) : (
            <div className="py-12 text-center text-muted">
              Tidak ada hasil ditemukan untuk "{search}"
            </div>
          )}
        </div>
      </div>
    </>
  );
}
