'use client'

import QRCode from 'react-qr-code'

interface QRCodeDownloaderProps {
  url: string
  fileName?: string
}

export default function QRCodeDownloader({ url, fileName = 'qrcode.png' }: QRCodeDownloaderProps) {
  const handleDownload = () => {
    // Criar container oculto temporário para gerar o QR Code
    const hiddenContainer = document.createElement('div')
    hiddenContainer.style.position = 'absolute'
    hiddenContainer.style.left = '-9999px'
    document.body.appendChild(hiddenContainer)

    // Renderizar o componente QRCode no container
    hiddenContainer.innerHTML = `<div id="temp-qrcode"></div>`
    const qrContainer = hiddenContainer.querySelector('#temp-qrcode')

    if (!qrContainer) return

    // Renderiza manualmente o SVG via React API
    import('react-dom/client').then(ReactDOM => {
      const root = ReactDOM.createRoot(qrContainer)
      root.render(<QRCode value={url} size={256} />)

      // Espera o SVG ser renderizado no DOM
      setTimeout(() => {
        const svg = qrContainer.querySelector('svg')
        if (!svg) {
          hiddenContainer.remove()
          return
        }

        const svgData = new XMLSerializer().serializeToString(svg)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        const blobUrl = URL.createObjectURL(svgBlob)

        img.onload = () => {
        if (!ctx) return

          // Define borda (quiet zone)
          const borderSize = 20
          canvas.width = img.width + borderSize * 2
          canvas.height = img.height + borderSize * 2

          // Preenche fundo branco
          ctx.fillStyle = "#fff"
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Desenha QR centralizado
          ctx.drawImage(img, borderSize, borderSize)

          URL.revokeObjectURL(blobUrl)

          const pngUrl = canvas.toDataURL('image/png')
          const link = document.createElement('a')
          link.href = pngUrl
          link.download = fileName
          link.click()

          hiddenContainer.remove()
        }


        img.src = blobUrl
      }, 200)
    })
  }

  return (
    <button
      onClick={handleDownload}
      className="w-full p-5 bg-green_button rounded-md-0.5 cursor-pointer hover:bg-hover_admin text-base mt-5"
    >
      Baixar QR Code
    </button>
  )
}
