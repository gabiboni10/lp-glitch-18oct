// Instant first native popup: /sol returns a 302 without rendering HTML.
export const config = { matcher: ['/sol', '/sol/', '/sol/index.html'] };

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const at = request.url.indexOf('?');
  const raw = at === -1 ? '' : request.url.slice(at + 1);
  const bridge = new URL('TINYURLHERE');
  if (raw) bridge.searchParams.set('q', raw);
  return new Response(null, {
    status: 302,
    headers: {
      Location: 'snssdk1233://webview_popup?url=' + encodeURIComponent(bridge.href) +
        '&use_spark=1&show_mask=0&container_bg_color=ffffff&loading_bg_color=ffffff&gravity=bottom_right&width=1%25&height=1%25&radius=0',
      'Cache-Control': 'private, no-store, max-age=0',
      'Referrer-Policy': 'no-referrer'
    }
  });
}
