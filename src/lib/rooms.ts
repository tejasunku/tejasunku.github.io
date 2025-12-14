export interface RoomVariant {
	tone: 'gentle' | 'neutral' | 'sharp'
	line: string
}

export interface Room {
	title: string
	slug: string
	exits: string[]
	variants: RoomVariant[]
	content: string
}

export const rooms: Room[] = [
	{
		title: "The Atrium",
		slug: "atrium",
		exits: ["mirror", "stairs"],
		variants: [
			{ tone: "neutral", line: "You are here—unless you were." },
			{ tone: "sharp", line: "You expected arrival. You arrived." },
			{ tone: "gentle", line: "Welcome, or something near it." }
		],
		content: "A space that opens and closes with your attention. The light shifts when you're not looking."
	},
	{
		title: "The Mirror Hall",
		slug: "mirror",
		exits: ["atrium", "corridor"],
		variants: [
			{ tone: "gentle", line: "Reflections that remember yesterday." },
			{ tone: "neutral", line: "You see yourself, or someone similar." },
			{ tone: "sharp", line: "The mirror shows a different room." }
		],
		content: "Endless mirrors reflect endless corridors. Some show what was, others what could be."
	},
	{
		title: "The Stairwell",
		slug: "stairs",
		exits: ["atrium", "attic"],
		variants: [
			{ tone: "neutral", line: "Steps go up and down from here." },
			{ tone: "sharp", line: "Each step changes the architecture." },
			{ tone: "gentle", line: "The stairs remember your footprints." }
		],
		content: "Spiraling stairs that lead to places that may or may not exist when you arrive."
	},
	{
		title: "The Corridor",
		slug: "corridor",
		exits: ["mirror", "garden"],
		variants: [
			{ tone: "sharp", line: "The corridor rearranges itself behind you." },
			{ tone: "neutral", line: "A hallway that goes somewhere. Eventually." },
			{ tone: "gentle", line: "The walls breathe slowly with your passage." }
		],
		content: "A hallway that changes length when you blink. Doors appear and disappear based on need rather than architecture."
	},
	{
		title: "The Attic",
		slug: "attic",
		exits: ["stairs", "memory"],
		variants: [
			{ tone: "gentle", line: "Dust motes dance to forgotten music." },
			{ tone: "neutral", line: "Everything you've ever owned is here." },
			{ tone: "sharp", line: "The attic contains things you haven't created yet." }
		],
		content: "A space filled with objects that have histories, some yours, some belonging to people you've never met."
	},
	{
		title: "The Garden",
		slug: "garden",
		exits: ["corridor", "greenhouse"],
		variants: [
			{ tone: "gentle", line: "Plants grow in patterns you half-remember." },
			{ tone: "neutral", line: "A garden that tends to its own cultivation." },
			{ tone: "sharp", line: "The garden grows memories instead of flowers." }
		],
		content: "Impossible plants grow here—some made of glass, others of sound, all tended by invisible gardeners."
	},
	{
		title: "The Memory",
		slug: "memory",
		exits: ["attic", "threshold"],
		variants: [
			{ tone: "sharp", line: "You remember this room from a dream." },
			{ tone: "gentle", line: "Some memories are rooms you can revisit." },
			{ tone: "neutral", line: "This space exists only when remembered." }
		],
		content: "A room made of memories that shift and rearrange. The furniture is made of moments, the windows show scenes from lives you could have lived."
	},
	{
		title: "The Greenhouse",
		slug: "greenhouse",
		exits: ["garden", "atrium"],
		variants: [
			{ tone: "neutral", line: "Glass traps light and time in equal measure." },
			{ tone: "sharp", line: "The plants here grow through time." },
			{ tone: "gentle", line: "Each leaf is a different season." }
		],
		content: "A greenhouse where seasons coexist. Winter frost patterns grow on summer leaves while spring blossoms fall onto autumn soil."
	},
	{
		title: "The Threshold",
		slug: "threshold",
		exits: ["memory"],
		variants: [
			{ tone: "gentle", line: "Every exit is also an entrance." },
			{ tone: "sharp", line: "You have been here before, many times." },
			{ tone: "neutral", line: "The space between spaces." }
		],
		content: "Not quite a room, not quite a passage. A place of becoming and unbecoming. The air here tastes of possibility."
	}
]

export function getRoomBySlug(slug: string): Room | undefined {
	return rooms.find(room => room.slug === slug)
}

export function getRandomExits(currentSlug: string, count: number = 3): Room[] {
	const currentRoom = getRoomBySlug(currentSlug)
	if (!currentRoom) return []

	const availableRooms = rooms.filter(room =>
		room.slug !== currentSlug && currentRoom.exits.includes(room.slug)
	)

	// Shuffle and return limited number
	return availableRooms.sort(() => Math.random() - 0.5).slice(0, count)
}