export const templateMap = {
	character: [
		"{adj} {role}",
		"{role}, живущий в {place_prep}",
		"{adj} {role} с {object_ins}",

		// дополнительные, только с поддерживаемыми плейсхолдерами
		"{role} из {place_gen}",
		"{adj} {role}, знающий {object_gen}",
		"{role}, пришедший из {place_gen}",
	],

	creature: [
		"{adj} {creature_base}",
		"{creature_base} из {place_gen}",
		"{adj} {creature_base} с {object_ins}",

		"{creature_base}, ищущий {object_gen}",
		"{adj} {creature_base} у {place_gen}",
		"{creature_base}, живущий в {place_prep}",
	],

	location: [
		"{location_base}",
		"{adj} {location_base}",
		"{location_base} {object_gen}",

		"{adj} {location_base} у {place_gen}",
		"{location_base} с {object_ins}",
		"{adj} {location_base} в {place_prep}",
	],

	item: [
		"{item}",
		"{adj} {item}",
		"{item} из {place_gen}",

		"{adj} {item} с {object_ins}",
		"{item} у {place_gen}",
		"{item} из {place_gen} с {object_ins}",
	],

	anomaly: [
		"{anomaly}",
		"{adj} {anomaly}",
		"{anomaly} у {place_gen}",

		"{adj} {anomaly} над {place_prep}",
		"{anomaly} над {place_prep}",
		"{anomaly} среди {object_gen}",
	],

	fruit: [
		"{fruit}",
		"{adj} {fruit}",

		"{fruit} из {place_gen}",
		"{adj} {fruit} с ароматом {object_gen}",
		"{fruit} из {place_gen} с {object_ins}",
	],

	vegetable: [
		"{vegetable}",
		"{adj} {vegetable}",

		"{vegetable} из {place_gen}",
		"{adj} {vegetable} с {object_ins}",
		"{vegetable} у {place_gen}",
	],

	sweet: [
		"{sweet}",
		"{adj} {sweet}",

		"{sweet} из {place_gen}",
		"{adj} {sweet} с привкусом {object_gen}",
		"{sweet} из {place_gen} с {object_ins}",
	],

	dimension: [
		"{dimension}",
		"{adj} {dimension}",
		"{dimension} у {place_gen}",

		"{adj} {dimension} над {place_prep}",
		"{dimension} среди {object_gen}",
		"{dimension}, связанное с {place_gen}",
	],
}
