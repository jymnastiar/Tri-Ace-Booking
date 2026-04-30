export function facEmoji(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("badminton")) return "🏸";
  if (lower.includes("basket")) return "🏀";
  if (lower.includes("voli") || lower.includes("volley")) return "🏐";
  if (lower.includes("tenis") || lower.includes("tennis")) return "🎾";
  if (
    lower.includes("sepakbola") ||
    lower.includes("sepak bola") ||
    lower.includes("futsal") ||
    lower.includes("football") ||
    lower.includes("soccer")
  )
    return "⚽";
  if (lower.includes("bowling")) return "🎳";
  if (lower.includes("lapangan")) return "🏟️";
  if (lower.includes("lampu") || lower.includes("penerangan")) return "💡";
  if (
    lower.includes("duduk") ||
    lower.includes("bangku") ||
    lower.includes("tribun")
  )
    return "🪑";
  if (lower.includes("tunggu") || lower.includes("santai")) return "☕";
  if (lower.includes("lounge")) return "🛋️";
  if (lower.includes("toilet")) return "🚻";
  if (
    lower.includes("mandi") ||
    lower.includes("shower") ||
    lower.includes("kamar mandi")
  )
    return "🚿";
  if (lower.includes("parkir")) return "🅿️";
  if (lower.includes("raket")) return "🏓";
  if (lower.includes("shuttlecock")) return "🏸";
  if (lower.includes("net")) return "🥅";
  if (lower.includes("bola") || lower.includes("ball")) return "⚽";
  if (lower.includes("skor")) return "📊";
  if (lower.includes("ganti") || lower.includes("locker")) return "🔐";
  if (lower.includes("sepatu")) return "👟";
  if (lower.includes("kantin") || lower.includes("warung")) return "🏪";
  if (lower.includes("kafe")) return "☕";
  if (lower.includes("snack") || lower.includes("makanan")) return "🍿";
  if (lower.includes("minuman") || lower.includes("vending")) return "🥤";
  if (
    lower.includes("kipas") ||
    lower.includes("ac") ||
    lower.includes("ventilasi")
  )
    return "💨";
  if (lower.includes("wifi") || lower.includes("wi-fi")) return "📶";
  if (lower.includes("musik") || lower.includes("sound")) return "🎵";
  if (lower.includes("charger") || lower.includes("daya")) return "🔋";
  if (
    lower.includes("lantai") ||
    lower.includes("kayu") ||
    lower.includes("maple")
  )
    return "🪵";
  if (lower.includes("rumput")) return "🟩";
  if (lower.includes("clay")) return "🧱";
  if (lower.includes("shop") || lower.includes("toko")) return "🛍️";
  if (lower.includes("mesin") || lower.includes("bayar")) return "💳";

  return "✨";
}
