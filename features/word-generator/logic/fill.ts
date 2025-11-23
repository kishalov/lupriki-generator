import {
	roles,
	adjectives,
	objects,
	places,
	participles,
} from "../data/lexicon"

import {
	characterRoles,
	creatureBases,
	locationBases,
	items,
	anomalies,
	fruits,
	vegetables,
	sweets,
	dimensions
} from "../data/extended-lexicon"

import { rand } from "./rand"

export function fillTemplate(tpl: string): string {
	return tpl
		.replace("{role}", rand(characterRoles))
		.replace("{creature_base}", rand(creatureBases))
		.replace("{location_base}", rand(locationBases))
		.replace("{item}", rand(items))
		.replace("{anomaly}", rand(anomalies))
		.replace("{fruit}", rand(fruits))
		.replace("{vegetable}", rand(vegetables))
		.replace("{sweet}", rand(sweets))
		.replace("{dimension}", rand(dimensions))
		.replace("{adj}", rand(adjectives).m)
		.replace("{participle}", rand(participles))
		.replace("{object_gen}", rand(objects).gen)
		.replace("{object_ins}", rand(objects).ins)
		.replace("{place_gen}", rand(places).gen)
		.replace("{place_prep}", rand(places).prep)
}
