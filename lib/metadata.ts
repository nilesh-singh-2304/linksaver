export const getMetadata = async (url: string) => {
  try {
    const res = await fetch(url);
    const html = await res.text();

    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : url;

    const faviconMatch = html.match(/<link[^>]+rel="[^"]*icon[^"]*"[^>]*>/i);
    const faviconHrefMatch = faviconMatch?.[0]?.match(/href=["']([^"']+)["']/);
    let favicon = faviconHrefMatch ? faviconHrefMatch[1] : "/favicon.ico";

    if (!favicon.startsWith("http")) {
      const base = new URL(url).origin;
      favicon = base + favicon;
    }

    return { title, favicon };
  } catch {
    return { title: url, favicon: "/favicon.ico" };
  }
};

export const getSummary = async (url: string) => {
  try {
    const target = encodeURIComponent(url);
    const res = await fetch(`https://r.jina.ai/http://${target}`);
    const text = await res.text();
    return text.length > 800 ? text.slice(0, 800) + "..." : text;
  } catch {
    return "Summary temporarily unavailable.";
  }
};
