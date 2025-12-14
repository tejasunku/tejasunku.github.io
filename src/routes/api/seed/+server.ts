import { json } from '@sveltejs/kit';
import seeded from '$lib/seeded.js';

export const GET = async ({ url }) => {
	const room = url.searchParams.get('room') || 'default';
	const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

	const seedInput = room + date;
	const seed = seeded(seedInput);

	// Return some "ephemeral" data that changes daily
	return json({
		seed,
		room,
		date,
		variantIndex: seed % 3,
		tone: ['gentle', 'neutral', 'sharp'][seed % 3],
		mood: ['contemplative', 'restless', 'peaceful'][seed % 3],
		lighting: ['bright', 'dim', 'golden'][seed % 3],
		timestamp: new Date().toISOString()
	});
};