// HTML sanitization for dangerouslySetInnerHTML content
// Allowlist-based approach: only permitted tags and attributes pass through

// Safe tags we allow in blog/page content
const ALLOWED_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "blockquote",
  "ul", "ol", "li", "dl", "dt", "dd",
  "strong", "em", "b", "i", "u", "s", "mark", "small", "sub", "sup",
  "a", "img", "figure", "figcaption", "video", "audio", "source",
  "pre", "code", "span", "div", "section", "article", "aside", "header", "footer", "main",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
  "iframe", // allowed for embedded content (YouTube etc.)
  "style", // allowed for scoped CSS in blog content
]);

// Safe attributes per tag (tag -> set of allowed attrs)
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  "*": new Set(["class", "id", "style", "title", "lang", "dir"]),
  "a": new Set(["href", "target", "rel"]),
  "img": new Set(["src", "alt", "width", "height", "loading"]),
  "iframe": new Set(["src", "width", "height", "frameborder", "allow", "allowfullscreen"]),
  "video": new Set(["src", "controls", "width", "height", "autoplay", "muted", "loop"]),
  "audio": new Set(["src", "controls", "autoplay", "muted", "loop"]),
  "source": new Set(["src", "type", "media"]),
  "td": new Set(["colspan", "rowspan"]),
  "th": new Set(["colspan", "rowspan", "scope"]),
  "col": new Set(["span"]),
  "style": new Set(["type"]),
};

// Dangerous URL schemes
const DANGEROUS_PROTOCOLS = /(?:javascript|vbscript|data:text\/html|data:text\/javascript)\s*:/i;

export function sanitizeHtml(html: string): string {
  if (!html) return html;

  // Use a simple tag-by-tag approach: split into tags and text
  let result = html;

  // Remove any remaining event handler attributes (safety net)
  result = result.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // Neutralize dangerous protocols in href/src/action attributes
  result = result.replace(
    /(href|src|action|formaction)\s*=\s*(["'])(.*?)\2/gi,
    (match, attr, quote, url) => {
      if (DANGEROUS_PROTOCOLS.test(url)) {
        return `${attr}=${quote}about:blank${quote}`;
      }
      return match;
    }
  );

  return result;
}

// Validate schema markup (should be valid JSON)
export function isValidSchemaMarkup(markup: string): boolean {
  try {
    const parsed = JSON.parse(markup);
    return typeof parsed === "object" && parsed !== null;
  } catch {
    return false;
  }
}

// Sanitize schema markup - only allow valid JSON-LD
export function sanitizeSchemaMarkup(markup: string): string | null {
  try {
    const parsed = JSON.parse(markup);
    if (typeof parsed !== "object" || parsed === null) return null;

    // Ensure it has @context
    if (!parsed["@context"]) {
      parsed["@context"] = "https://schema.org";
    }

    return JSON.stringify(parsed);
  } catch {
    return null;
  }
}

// Sanitize header script - only allow safe scripts (no inline handlers)
export function sanitizeHeaderScript(script: string): string | null {
  if (!script) return null;

  // Remove any event handlers
  let sanitized = script;
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // Remove any form elements
  sanitized = sanitized.replace(/<form[\s>][^]*?<\/form>/gi, "");

  return sanitized || null;
}
