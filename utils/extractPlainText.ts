// export function extractPlainText(html: string): string {
//   const lines: string[] = [];

//   // Extract <h2>
//   const h2Match = html.match(/<h2[^>]*>(.*?)<\/h2>/);
//   if (h2Match) {
//     lines.push(h2Match[1].trim());
//   }

//   // Extract <p>
//   const pMatch = html.match(/<p[^>]*>(.*?)<\/p>/);
//   if (pMatch) {
//     lines.push(pMatch[1].trim());
//   }

//   // Extract <li> inside .sources
//   const liMatches = [...html.matchAll(/<li[^>]*>(.*?)<\/li>/g)];
//   if (liMatches.length > 0) {
//     lines.push("Sources:");
//     liMatches.forEach((match) => {
//       lines.push(`- ${match[1].trim()}`);
//     });
//   }

//   return lines.join("\n");
// }

export function extractPlainText(html: string): string {
  const stripTags = (str: string) => str.replace(/<[^>]+>/g, "").trim();

  const lines: string[] = [];

  // Extract <h2>
  const h2Match = html.match(/<h2[^>]*>(.*?)<\/h2>/);
  if (h2Match) {
    lines.push(stripTags(h2Match[1]));
  }

  // Extract <p>
  const pMatch = html.match(/<p[^>]*>(.*?)<\/p>/);
  if (pMatch) {
    lines.push(stripTags(pMatch[1]));
  }

  // Extract <li> inside .sources
  const liMatches = [...html.matchAll(/<li[^>]*>(.*?)<\/li>/g)];
  if (liMatches.length > 0) {
    lines.push("Sources:");
    liMatches.forEach((match) => {
      lines.push(`- ${stripTags(match[1])}`);
    });
  }

  return lines.join("\n");
}
