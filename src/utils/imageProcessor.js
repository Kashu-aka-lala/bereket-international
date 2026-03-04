export const getTransparentLogo = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d', { willReadFrequently: true })
            ctx.drawImage(img, 0, 0)

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data

            // Assuming white background: R > 230, G > 230, B > 230
            for (let i = 0; i < data.length; i += 4) {
                if (data[i] > 230 && data[i + 1] > 230 && data[i + 2] > 230) {
                    data[i + 3] = 0 // transparent
                }
            }

            ctx.putImageData(imageData, 0, 0)
            resolve(canvas.toDataURL('image/png'))
        }
        img.onerror = reject
        img.src = src
    })
}
