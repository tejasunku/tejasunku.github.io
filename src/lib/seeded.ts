export default function seeded(s: string) {
	let h = 2166136261 >>> 0
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i)
		h = Math.imul(h, 16777619)
	}
	return h >>> 0
}

export function getDailyVariant(s: string, variants: any[]) {
	const seed = seeded(s + new Date().toISOString().split('T')[0])
	return variants[seed % variants.length]
}