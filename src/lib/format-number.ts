export function compactFormat(value: number) {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const formatted = formatter.format(Number(value.toFixed(2)));
  // If formatted is just a number (no K/M/B), ensure 2 decimals
  if (/^\d+(\.\d+)?$/.test(formatted)) {
    return Number(formatted).toFixed(2);
  }
  return formatted;
}

export function standardFormat(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
