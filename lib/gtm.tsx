'use client'

import Script from 'next/script'

// GTM Head Script (head에 들어갈 부분)
// Next.js App Router에서는 Script 컴포넌트가 자동으로 head에 배치됩니다
export function GoogleTagManagerHead({ gtmId }: { gtmId: string }) {
  if (!gtmId) {
    return null
  }

  return (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `,
      }}
    />
  )
}

// GTM Body Noscript (body 바로 뒤에 들어갈 부분)
export function GoogleTagManagerBody({ gtmId }: { gtmId: string }) {
  if (!gtmId) {
    return null
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}

