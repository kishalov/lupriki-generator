// tintSvg.ts — правильное кодирование SVG для <img src="">
export function tintSvg(svg: string, color: string): string {
	// красим fill только у жидкости (fill="#fff")
	const tinted = svg.replace(/fill="#fff"/g, `fill="${color}"`)

	// убираем XML, он ломает data:image SVG
	const cleaned = tinted.replace(/<\?xml[^>]*>/g, "").trim()

	// кодируем в URL-совместимую строку
	const encoded = encodeURIComponent(cleaned)
		.replace(/'/g, "%27")
		.replace(/"/g, "%22")

	return `data:image/svg+xml;utf8,${encoded}`
}
