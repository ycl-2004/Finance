export function articleRoute(slug: string | string[]): string {
  const parts = Array.isArray(slug) ? slug : slug.split("/");
  return `/articles/${parts.map(encodeURIComponent).join("/")}`;
}

export function topicRoute(slug: string): string {
  return `/topics/${encodeURIComponent(slug)}`;
}

export function scenarioRoute(slug: string): string {
  return `/scenarios/${encodeURIComponent(slug)}`;
}

export function caseRoute(slug: string): string {
  return `/cases/${encodeURIComponent(slug)}`;
}
