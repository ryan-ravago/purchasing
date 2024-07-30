export default function CapitalizeFirstLetterLocale(str, locale = "en-US") {
  if (!str) return "";

  // Handle both hyphen and space-separated words
  return str
    .split(/[-\s]/) // Split by both hyphens and spaces
    .map(
      (segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
    )
    .join(" ");
}
