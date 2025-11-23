import { ingredientIcons } from "./ingredientIcons";

export type Ingredient = {
	id: string;
	name: string;
	icon: string;
	rarity: 1 | 2 | 3;
	type: "plant" | "mineral" | "anomaly";
	flavor: string;
	color: string;
};

export const INGREDIENTS: Ingredient[] = [
	{
		id: "rosinka_svetlaya",
		name: "Росинка Светлая",
		icon: ingredientIcons["rosinka_svetlaya"],
		rarity: 1,
		type: "plant",
		flavor: "Мягко светится в руках. Любит утренний туман.",
		color: "#87d6ff",
	},
	{
		id: "list_teni",
		name: "Лист Тени",
		icon: ingredientIcons["list_teni"],
		rarity: 1,
		type: "plant",
		flavor: "Появляется только там, где свет забывает дойти.",
		color: "#3f6e3d",
	},
	{
		id: "zerno_sherkh",
		name: "Зерно Шёпота",
		icon: ingredientIcons["zerno_sherkh"],
		rarity: 1,
		type: "plant",
		flavor: "Если прислушаться, можно услышать отголосок чьей-то истории.",
		color: "#eabf63",
	},
	{
		id: "ehokamen",
		name: "Камень Эха",
		icon: ingredientIcons["ehokamen"],
		rarity: 2,
		type: "mineral",
		flavor: "Повторяет лишь то, что никогда не было сказано.",
		color: "#8ca3ff",
	},
	{
		id: "kristall_kholoda",
		name: "Кристалл Холода",
		icon: ingredientIcons["kristall_kholoda"],
		rarity: 2,
		type: "mineral",
		flavor: "Слегка понижает температуру окружающих мыслей.",
		color: "#b3e5ff",
	},
	{
		id: "pyltca_svetlyak",
		name: "Пыльца Светляка",
		icon: ingredientIcons["pyltca_svetlyak"],
		rarity: 2,
		type: "plant",
		flavor: "Искрится и щекочет пальцы, если долго держать.",
		color: "#ffe66b",
	},
	{
		id: "fragment_anomalii",
		name: "Фрагмент Аномалии",
		icon: ingredientIcons["fragment_anomalii"],
		rarity: 3,
		type: "anomaly",
		flavor: "Никто не знает, как удержать его форму.",
		color: "#ff47c6",
	},
	{
		id: "sliza_lesnogo_duha",
		name: "Слиза Лесного Духа",
		icon: ingredientIcons["sliza_lesnogo_duha"],
		rarity: 3,
		type: "anomaly",
		flavor: "Теплеет на ладони, будто пытается что-то сказать.",
		color: "#8dfc98",
	},
	{
		id: "kornevoj_ogon",
		name: "Корневой Огонь",
		icon: ingredientIcons["kornevoj_ogon"],
		rarity: 2,
		type: "plant",
		flavor: "Природа тоже умеет гневаться.",
		color: "#ff712f",
	},
	{
		id: "zolnaya_sfera",
		name: "Зольная Сфера",
		icon: ingredientIcons["zolnaya_sfera"],
		rarity: 3,
		type: "mineral",
		flavor: "Рассыпается при вдохе, собирается при вздохе.",
		color: "#aaaaaa",
	},
];
