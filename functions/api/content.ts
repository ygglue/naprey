// GET /api/content — proxies the live content.json from GitHub. Reading it
// isn't sensitive (it's the same data the public site already shows), so this
// endpoint needs no auth beyond the login gate already covering /admin/*
// (functions/admin/_middleware.ts).
import { base64ToUtf8, type FunctionContext } from './_shared';
// Local-dev-only sample data — bundled at build time, only ever read when
// LOCAL_DEV_SAMPLE_CONTENT is set (see the Env interface in _shared.ts).
import sampleContent from '../../src/data/content.json';

const FILE_PATH = 'src/data/content.json';

export const onRequestGet = async ({ env }: FunctionContext): Promise<Response> => {
  if (env.LOCAL_DEV_SAMPLE_CONTENT === 'true') {
    return new Response(JSON.stringify(sampleContent), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  // Uses the GitHub Contents API (same one save-content.ts writes through),
  // not raw.githubusercontent.com — that's fronted by a CDN that can lag a
  // few minutes behind a fresh commit, which showed outdated content in the
  // admin right after a publish. The Contents API reads GitHub's own data
  // directly, so it reflects the latest commit immediately.
  const apiUrl = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${FILE_PATH}?ref=main`;

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_PAT}`,
      'User-Agent': 'naprey-admin',
      Accept: 'application/vnd.github+json',
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    return new Response('Failed to load content from GitHub.', { status: 502 });
  }

  const data = (await res.json()) as { content: string };
  const text = base64ToUtf8(data.content);
  return new Response(text, {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
