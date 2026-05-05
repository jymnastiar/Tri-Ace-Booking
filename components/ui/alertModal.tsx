"use client";

import { useEffect, useRef } from "react";

type AlertType = "warning" | "success" | "info";

interface AlertModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
  type?: AlertType;
}

const CONFIG: Record<
  AlertType,
  { icon: string; title: string; btnLabel: string; wrapClass: string }
> = {
  warning: {
    icon: "⚠",
    title: "Perhatian",
    btnLabel: "Mengerti",
    wrapClass: "alert-modal-icon-wrap--warning",
  },
  success: {
    icon: "✓",
    title: "Berhasil",
    btnLabel: "Oke, Tutup",
    wrapClass: "alert-modal-icon-wrap--success",
  },
  info: {
    icon: "ℹ",
    title: "Informasi",
    btnLabel: "Mengerti",
    wrapClass: "alert-modal-icon-wrap--info",
  },
};

export default function AlertModal({
  open,
  message,
  onClose,
  type = "warning",
}: AlertModalProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { icon, title, btnLabel, wrapClass } = CONFIG[type];

  /* Focus tombol saat modal terbuka (aksesibilitas) */
  useEffect(() => {
    if (open) setTimeout(() => btnRef.current?.focus(), 50);
  }, [open]);

  /* Tutup dengan Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="alert-modal-backdrop"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      <div
        className="alert-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ikon */}
        <div className={`alert-modal-icon-wrap ${wrapClass}`}>
          <span className="alert-modal-icon">{icon}</span>
        </div>

        {/* Konten */}
        <p className="alert-modal-title">{title}</p>
        <p className="alert-modal-message">{message}</p>

        {/* Tombol tutup */}
        <button
          ref={btnRef}
          className={`alert-modal-btn alert-modal-btn--${type}`}
          onClick={onClose}
        >
          {btnLabel}
        </button>
      </div>
    </div>
  );
}
