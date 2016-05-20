var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var cellSize = 64;

function listsort(a, b) {
    if(a[0] < b[0]) return -1;
    if(a[0] > b[0]) return 1;
    return 0;
}
var bg2e = 'Second Edition Base Game', BoW = 'Bonds of the Wild', CoD = 'Crown of Destiny', CotF = 'Crusade of the Forgotten', GoD = 'Guardians of Deephall',
	LoR = 'Labyrinth of Ruin', LoW = 'Lair of the Wyrm', MoR = 'Manor of Ravens', OotO = 'Oath of the Outcast', 
	SoE = 'Shards of Everdark', SoN = 'Shadow of Narekhall', SotS = 'Stewards of the Secret', TF = 'The Trollfens', ToC = 'Treaty of Champions',
	VoD = 'Visions of Dawn', CK = 'Conversion Kit', MoB = 'Mists of Bilehall';
var Building = 'Building',
	Cave = 'Cave',
	Civilized = 'Civilized',
	Cold = 'Cold',
	Cursed = 'Cursed',
	Dark = 'Dark',
	Hot = 'Hot',
	Mountain = 'Mountain',
	Water = 'Water',
	Wilderness = 'Wilderness';
var MONSTER_TRAITS = [Building,Cave,Civilized,Cold,Cursed,Dark,Hot,Mountain,Water,Wilderness];
var monsterTraits = {};
for (var i=0; i < MONSTER_TRAITS.length; i++) {
	monsterTraits[urlize(MONSTER_TRAITS[i])] = urlize(MONSTER_TRAITS[i]); 
}

var MONSTERS_LIST = [
	['Arachyura',2,2,false,LoR,[Wilderness,Cursed]],
	['Bandit',1,1,true,MoR,[Wilderness,Building]],
	['Bane Spider',2,2,true,OotO,[Dark,Cave]],
	['Barghest',1,2,false,bg2e,[Wilderness,Dark]],
	['Beastman',1,1,false,OotO,[Mountain,Wilderness]],
	['Blood Ape',1,2,false,SotS,[Hot,Cave]],
	['Bone Horror',1,1,false,MoB,[Cave,Cursed],true],
	['Broodwalker',1,1,false,MoB,[Dark,Building],true],
	['Carrion Drake',1,1,false,LoR,[Water,Dark]],
	['Cave Spider',1,1,false,bg2e,[Wilderness,Cave]],
	['Changeling',1,1,false,SoN,[Civilized,Cursed]],
	['Chaos Beast',1,2,false,CoD,[Dark,Cursed]],
	['Crypt Dragon',2,3,true,GoD,[Dark,Cursed]],
//	['Crow Hag',1,2,true,ToC,[Dark,Civilized],true],
	['Dark Priest',1,1,true,GoD,[Civilized,Cursed]],
	['Deep Elf',1,1,false,BoW,[Dark,Cave],true],
	['Deep Elf CK',1,1,false,CK,[Dark,Cave]],
	['Demon Lord',2,2,false,ToC,[Hot,Cursed]],
	['Elemental',2,2,true,bg2e,[Cold,Hot]],
	['Ettin',2,2,false,bg2e,[Mountain,Cave]],
	['Ferrox',1,1,false,SotS,[Cave,Water]],
	['Fire Imps',1,1,true,LoW,[Hot,Cursed]],
	['Flesh Moulder',1,1,true,bg2e,[Cursed,Civilized]],
	['Giant',2,2,false,CoD,[Mountain,Wilderness]],
	['Goblin Archer',1,1,true,bg2e,[Building,Cave]],
	['Goblin Witcher',1,1,true,LoR,[Building,Cursed]],
	['Golem',1,1,false,CotF,[Mountain,Building]],
	['Harpy',1,1,false,TF,[Wilderness,Mountain]],
	['Hellhound',1,2,false,BoW,[Hot,Cursed],true],
	['Hellhound CK',1,2,false,CK,[Hot,Cursed]],
	['Hybrid Sentinel',1,1,false,LoW,[Mountain,Cave]],
	['Ice Wyrm',2,3,false,SoE,[Cold,Cave]],
	['Ironbound',1,1,false,SoN,[Civilized,Building]],
	['Kobold',1,1,false,BoW,[Building,Cave],true],
	['Kobold CK',1,1,false,CK,[Building,Cave]],
	['Lava Beetle',1,1,true,CoD,[Hot,Cave]],
	['Manticore',2,2,true,VoD,[Wilderness,Dark]],
	['Medusa',1,1,true,CotF,[Cursed,Building]],
	['Merriod',2,2,false,bg2e,[Wilderness,Water]],
	['Naga',2,2,true,SotS,[Water,Cave]],
	['Ogre',2,2,false,VoD,[Building,Cave]],
	['Plague Worm',1,2,false,TF,[Water,Cave]],
	['Rat Swarm',1,2,false,SoN,[Building,Dark]],
	['Razorwing',1,1,false,OotO,[Wilderness,Cave]],
	['Reanimate',1,1,false,MoB,[Civilized,Cursed],true],
	['Shade',1,1,false,SoE,[Dark,Cursed]],
	['Shadow Dragon',2,3,false,bg2e,[Dark,Cave]],
	['Skeleton Archer',1,1,true,ToC,[Cursed,Civilized]],
	['Sorcerer',1,1,true,CotF,[Civilized,Building]],
	['Troll',2,2,false,VoD,[Mountain,Cave]],
	['Volucrix Reaver',1,1,false,LoR,[Building,Mountain]],
	['Wendigo',2,2,false,GoD,[Cold,Cave]],
	['Wraith',1,1,true,MoR,[Civilized,Cursed]],
	['Ynfernael Hulk',2,2,false,SoN,[Hot,Cursed]],
	['Zombie',1,1,false,bg2e,[Cursed,Building]]
];

var EXPANSIONS = [bg2e, BoW, CoD, CotF, GoD, LoR, LoW, MoR, OotO, SoE, SoN, SotS, TF, ToC, VoD, CK, MoB];
var selectedExpansions = {};
for (var i=0; i < EXPANSIONS.length; i++) {
	selectedExpansions[folderize(EXPANSIONS[i])] = folderize(EXPANSIONS[i]);
}

var LIEUTENANTS_LIST = [
	['Ariad', true, 1, 1],
	['Baron Zachareth', true, 1, 1],
	['Belthir', true, 1, 1],
	['Bolgoreth', true, 2, 2],
	['Lady Eliza Farrow', true, 1, 1],
	['Lord Merick Farrow', true, 1, 1],
	['Mirklace', false, 2, 2],
	['Queen Ariad', true, 2, 2],
	['Raythen', true, 1, 1],
	['Rylan Olliven', false, 1, 1],
	['Serena', true, 1, 1],
	['Skarn', true, 2, 2],
	['Sir Alric Farrow', true, 1, 1],
	['Splig', true, 1, 1],
	['Tristayne Olliven', false, 1, 1],
	['Valyndra', true, 2, 3],
	['Verminous', true, 1, 2]
];

var LIEUTENANTS = {};

for (var i = 0; i < LIEUTENANTS_LIST.length; i++) {
	LIEUTENANTS[LIEUTENANTS_LIST[i][0]] = {'hasBack':LIEUTENANTS_LIST[i][1], 'width':LIEUTENANTS_LIST[i][2], 'height':LIEUTENANTS_LIST[i][3]};
} 

var MONSTERS_HP = [
	['Arachyura',5,7,7,9],
	['Bandit',4,5,6,7],
	['Bane Spider',4,7,6,9],
	['Barghest',4,6,6,8],
	['Beastman',4,5,5,6],
	['Blood Ape',5,7,7,9],
	['Bone Horror',5,7,6,9],
	['Broodwalker',7,10,8,12],
	['Carrion Drake',6,8,7,10],
	['Cave Spider',3,5,5,7],
	['Changeling',4,6,6,8],
	['Chaos Beast',5,6,7,10],
	['Crypt Dragon',5,7,7,10],
//	['Crow Hag',5,7,7,9],
	['Dark Priest',2,5,7,9],
	['Deep Elf',7,9,8,10],
	['Deep Elf CK',7,9,8,10],
	['Demon Lord',6,9,8,12],
	['Elemental',4,6,8,10],
	['Ettin',5,8,7,9],
	['Ferrox',4,5,5,8],
	['Fire Imps',2,4,4,6],
	['Flesh Moulder',4,5,5,7],
	['Giant',10,12,12,15],
	['Goblin Archer',2,4,4,6],
	['Goblin Witcher',3,5,6,8],
	['Golem',8,10,10,12],
	['Harpy',3,5,4,6],
	['Hellhound',4,6,6,8],
	['Hellhound CK',3,6,5,8],
	['Hybrid Sentinel',5,8,6,9],
	['Ice Wyrm',7,9,11,14],
	['Ironbound',8,10,10,12],
	['Kobold',2,5,4,7],
	['Kobold CK',2,4,4,6],
	['Lava Beetle',3,5,5,7],
	['Manticore',5,7,7,9],
	['Medusa',4,6,6,9],
	['Merriod',5,7,7,9],
	['Naga',4,5,6,7],
	['Ogre',6,8,9,12],
	['Plague Worm',5,7,6,9],
	['Rat Swarm',4,5,5,6],
	['Razorwing',4,6,7,9],
	['Reanimate',3,5,5,8],
	['Shade',2,4,4,6],
	['Shadow Dragon',6,9,8,10],
	['Skeleton Archer',2,5,4,8],
	['Sorcerer',3,5,5,8],
	['Troll',8,10,10,13],
	['Volucrix Reaver',3,5,4,6],
	['Wendigo',4,7,7,10],
	['Wraith',5,7,6,8],
	['Ynfernael Hulk',8,9,9,10],
	['Zombie',3,6,5,9]
];

MONSTERS = {};

function getMonsterTraits(i) {
	var traitsArray = MONSTERS_LIST[i][5];
	var result = [];
	for (var j = 0; j < traitsArray.length; j++) {
		result.push(urlize(traitsArray[j]));
	}
	return result;
}

for (var i = 0; i < MONSTERS_LIST.length; i++) {
	var monster = {};
	monster.title = MONSTERS_LIST[i][0];
	monster.width = MONSTERS_LIST[i][1];
	monster.height = MONSTERS_LIST[i][2];
	monster.ranged = MONSTERS_LIST[i][3];
	monster.expansion = folderize(MONSTERS_LIST[i][4]);
	monster.traits = getMonsterTraits(i);
	monster.hasBack = MONSTERS_LIST[i][6];
	monster.minionHpActOne = MONSTERS_HP[i][1];
	monster.masterHpActOne = MONSTERS_HP[i][2];
	monster.minionHpActTwo = MONSTERS_HP[i][3];
	monster.masterHpActTwo = MONSTERS_HP[i][4];
	MONSTERS[MONSTERS_LIST[i][0]] = monster;
}

SEARCH_ITEMS_LIST = [
	'Curse Doll',
	'Fire Flask',
	'Health Potion',
	'Nothing',
	'Power Potion',
	'Secret Passage',
	'Stamina Potion',
	'Treasure Chest',
	'Warding Talisman',
	'Flipped'
];

//Items
var hand = {className : 'hand'};
var twohand = {className : 'hand2'};
var armor = {className : 'armor'};
var item = {className : 'item'};

ITEMS_LIST = [
	['Archaic Scroll', item],
	['Barons Cloak', armor],
	['Battle Tome', hand],
	['Bearded Axe', twohand],
	['Belt Of Alchemy', item],
	['Belt Of Waterwalking', item],
	['Blessed Shield', hand],
	['Bloodscript Ring', item],
	['Bloody Dagger', hand],
	['Bone Blade', hand],
	['Boots Of Iron', item],
	['Bow Of Bone', twohand],
	['Chainmail', armor],
	['City Guards Bow', twohand],
	['Cloak Of Mists', armor],
	['Corpsebug Brooch', item],
	['Crossbow', hand],
	['Deflecting Shield', hand],
	['Dire Flail', twohand],
	['Elm Greatbow', twohand],
	['Elven Boots', item],
	['Flash Powder', item],
	['Guardian Axe', twohand],
	['Halberd', twohand],
	['Handbow', item],
	['Heavy Cloak', armor],
	['Immolation', twohand],
	['Incendiary Arrows', item],
	['Iron Battleaxe', twohand],
	['Iron Shield', hand],
	['Iron Spear', hand],
	['Ironbound Rune', twohand],
	['Jeweled Mace', hand],
	['Jinns Lamp', item],
	['Leather Armor', armor],
	['Lifedrain Scepter', hand],
	['Light Hammer', hand],
	['Lucky Charm', item],
	['Mace Of Aver', twohand],
	['Magic Staff', twohand],
	['Magma Blast', twohand],
	['Mana Weave', item],
	['Mapstone', item],
	['Marsh Cloak', armor],
	['Mist Bane', hand],
	['Phoenix Pendant', item],
	['Poisoned Blowgun', hand],
	['Ring Of Power', item],
	['Rune Plate', armor],
	['Scorpion Helm', item],
	['Shadow Bracers', item],
	['Serpent Dagger', hand],
	['Shield Of Light', hand],
	['Sling', hand],
	['Soulbound Sword', twohand],
	['Soulstone', twohand],
	['Staff Of Greyhaven', twohand],
	['Steel Broadsword', hand],
	['Sunburst', twohand],
	['Teleportation Rune', twohand],
	['Thiefs Vest', armor],
	['Trident', hand],
	['Undying Skull', item],
	['White Wolf Cloak', armor],
	['Witch Hazel Bow', twohand]
];

TIER2_ITEMS_LIST = [
	['Belt Of Strength', item],
	['Black Iron Helm', item],
	['Blasting Rune', twohand],
	['Boomerang', hand],
	['Bow Of The Eclipse', twohand],
	['Bow Of The Sky', twohand],
	['Cloak Of Deception', armor],
	['Demonhide Leather', armor],
	['Dragontooth Hammer', hand],
	['Dwarven Firebomb', hand],
	['Elven Cloak', armor],
	['Glaive', twohand],
	['Golden Mask', item],
	['Grinding Axe', twohand],
	['Hammer Of Doom', twohand],
	['Heart Seeker', twohand],
	['Heavy Steel Shield', hand],
	['Ice Storm', twohand],
	['Inscribed Robes', armor],
	['Iron-Bound Ring', item],
	['Iron Claws', hand],
	['Ironbound Glaive', twohand],
	['Ironbound Shield', hand],
	['Latari Longbow', twohand],
	['Lightning Strike', twohand],
	['Mace Of Kellos', hand],
	['Merciful Boots', item],
	['Nerekhall Plate', armor],
	['Obsidian Greataxe', twohand],
	['Obsidian Scalemail', armor],
	['Platemail', armor],
	['Rage Blade', hand],
	['Rat-Tooth Dagger', hand],
	['Repeating Crossbow', twohand],
	['Rune Of Blades', twohand],
	['Rune Of Fate', twohand],
	['Rune Of Misery', twohand],
	['Scalemail', armor],
	['Shadow Tome', item],
	['Shroud Of Dusk', item],
	['Staff Of Kellos', twohand],
	['Staff Of The Wild', twohand],
	['Star Of Kellos', item],
	['Steel Greatsword', twohand],
	['Stone Armor', armor],
	['Tival Crystal', item],
	['Vestments Of Kellos', armor],
	['Winged Blade', twohand]
];

RELICS_LIST = [
	['Aurium Mail', armor],
	['Dawnblade', hand],
	['Fear Eater', twohand],
	['Fortunas Dice', item],
	['Gauntlets Of Power', item],
	['Immunity Elixir', item],
	['Living Heart', item],
	['Mending Talisman', item],
	['Shadow Plotter', item],
	['Shield Of The Dark God', hand],
	['Spirited Scythe', twohand],
	['Staff Of Light', twohand],
	['Sun Stone', item],
	['The Shadow Rune', twohand],
	['The White Crown', item],
	['Trueshot', twohand],
	['Undertakers Coat', armor],
	['Valyndras Bane', twohand],
	['Workmans Ring', item],
	['Ynfernal Rune', twohand]
];

OVERLORD_RELICS_LIST = [
    'Blade Of Brivala',
	'Bones Of Woe',
	'Curative Vial',
	'Duskblade',
	'Fallen Heart',
	'Gauntlets Of Spite',
	'Her Majestys Malice',
	'Omen Of Blight',
	'Scorpions Kiss',
	'Shadow Plotter',
	'Shield Of Zoreks Favor',
	'Soulless Scythe',
	'Staff Of Shadows',
	'Suns Fury',
	'Taskmasters Ring',
	'The Shadow Rune',
	'Undertakers Coat',
	'Valyndras Gift',
	'Waiqars Favor',
	'Ynfernal Rune'
];

ITEMS = {hand : [], hand2 : [], armor : [], item : []};
ITEMS2 = {hand : [], hand2 : [], armor : [], item : []};
ITEMSR = {hand : [], hand2 : [], armor : [], item : []};

for (var i = 0; i < ITEMS_LIST.length; i++) {
	ITEMS[ITEMS_LIST[i][1].className].push(ITEMS_LIST[i]);
}

for (var i = 0; i < TIER2_ITEMS_LIST.length; i++) {
	ITEMS2[TIER2_ITEMS_LIST[i][1].className].push(TIER2_ITEMS_LIST[i]);
}

for (var i = 0; i < RELICS_LIST.length; i++) {
	ITEMSR[RELICS_LIST[i][1].className].push(RELICS_LIST[i]);
}

//Classes
var apothecary = {},
	bard = {},
	disciple = {},
	prophet = {},
	spiritspeaker = {},
	beastmaster = {},
	berserker = {},
	champion = {},
	knight = {},
	marshal = {},
	skirmisher = {},
	conjurer = {},
	geomancer = {},
	hexer = {},
	monk = {},
	necromancer = {},
	runemaster = {},
	bountyHunter = {},
	stalker = {},
	thief = {},
	treasureHunter = {},
	wildlander = {},
	shadowwalker = {};
	
	apothecary.title = 'Apothecary';
	bard.title = 'Bard';
	disciple.title = 'Disciple';
	prophet.title = 'Prophet';
	spiritspeaker.title = 'Spiritspeaker';
	beastmaster.title = 'Beastmaster';
	berserker.title = 'Berserker';
	champion.title = 'Champion';
	knight.title = 'Knight';
	marshal.title = 'Marshal';
	skirmisher.title = 'Skirmisher';
	conjurer.title = 'Conjurer';
	geomancer.title = 'Geomancer';
	hexer.title = 'Hexer';
	monk.title = 'Monk';
	monk.allowHybrid = true;
	necromancer.title = 'Necromancer';
	runemaster.title = 'Runemaster';
	bountyHunter.title = 'Bounty Hunter';
	shadowwalker.title = 'Shadow Walker';
	stalker.title = 'Stalker';
	thief.title = 'Thief';
	treasureHunter.title = 'Treasure Hunter';
	wildlander.title = 'Wildlander';

	//Skills
	apothecary.skills = [
		['Brew Elixir', 0],
		['Smoking Vials', 0, hand],
		['Concoction', 1],
		['Herbal Lore', 1],
		['Inky Substance', 1],
		['Bottled Courage', 2],
		['Protective Tonic', 2],
		['Secret Formula', 2],
		['Hidden Stash', 3],
		['Potent Remedies', 3]
	];
	
	bard.skills = [
		['Aria Of War', 2],
		['Cacophony', 3],
		['Concentration', 2],
		['Dissonance', 1],
		['Lute', 0, item],
		['Peaceful Rest', 1],
		['Rehersal', 2],
		['Song Of Mending', 0],
		['Traveler\'S Blade', 0, hand],
		['Understudy', 1],
		['Wayfarer', 3]
	];
	
	beastmaster.skills = [
		['Predator', 3],
		['Changing Skins', 3],
		['Shadow Hunter', 2],
		['Savagery', 2],
		['Feral Frenzy', 2],
		['Survivalist', 1],
		['Stalker', 1],
		['Bestial Rage', 1],
		['Bound By The Hunt', 0],
		['Wolf', 0],
		['Skinning Knife', 0, hand],
		['Hunting Spear', 0, hand]
	];
	
	berserker.skills = [
		['Execute', 3],
		['Death Rage', 3],
		['Whirlwind', 2],
		['Weapon Mastery', 2],
		['Charge', 2],
		['Cripple', 1],
		['Counter Attack', 1],
		['Brute', 1],
		['Rage', 0],
		['Chipped Greataxe', 0, twohand]              
	];
	
	bountyHunter.skills = [
   		['Chosen Target', 0],
   		['Dark Iron Chains', 2],
   		['Double Crossbow', 0, twohand],
   		['Evil Eye', 2],
   		['Lie In Wait', 1],
   		['Longshot', 1],
   		['Not So Fast', 1],
   		['Payday', 3],
   		['Rapid Fire', 3],
   		['Undercover', 2]
   	];
   	
   	champion.skills = [
		['A Living Legend', 1],
		['For The Cause', 3],
		['Glory Of Battle', 1],
		['Horn Of Courage', 0, item],
		['Inspiring Presence', 1],
		['Motivating Charge', 2],
		['No Mercy', 2],
		['Stoic Resolve', 2],
		['Valor Of Heroes', 0],
		['Valorous Strike', 3],
		['Worn Greatsword', 0, twohand]
	];
	
	conjurer.skills = [
		['Blinding Light', 2],
		['Channeling', 0],
		['Focus Fire', 2],
		['Illusory Path', 1],
		['Many Friends', 1],
		['Mirror Image', 0],
		['Prismatic Assault', 3],
		['Prismatic Staff', 0, twohand],
		['Refraction', 1],
		['Sleight Of Mind', 2],
		['Vortex', 3]
	];
	
	disciple.skills = [
		['Armor Of Faith', 1],
		['Blessed Strike', 1],
		['Cleansing Touch', 1],
		['Divine Fury', 2],
		['Holy Power', 3],
		['Iron Mace', 0, hand],
		['Prayer Of Healing', 0],
		['Prayer Of Peace', 2],
		['Radiant Light', 3],
		['Time Of Need', 2],
		['Wooden Shield', 0, hand]
	];
	
	geomancer.skills = [
		['Cataclysm', 3],
		['Earthen Anguish', 1],
		['Gravity Spike', 3],
		['Ley Line', 2],
		['Molten Fury', 2],
		['Quaking Word', 1],
		['Stasis Rune', 0, twohand],
		['Stone Tongue', 1],
		['Summoned Stone', 0],
		['Terracall', 0],
		['Ways Of Stone', 2]
	];
	
	hexer.skills = [
		['Accursed Arms', 3],
		['Affliction', 1],
		['Crippling Curse', 2],
		['Enfeebling Hex', 0],
		['Fel Command', 2],
		['Internal Rot', 2],
		['Plague Cloud', 3],
		['Plague Spasm', 1],
		['Staff Of The Grave', 0, twohand],
		['Viral Hex', 1]
	];
	
	knight.skills = [
		['Advance', 1],
		['Challenge', 1],
		['Defend', 1],
		['Defense Training', 2],
		['Guard', 2],
		['Inspiration', 3],
		['Iron Longsword', 0, hand],
		['Oath Of Honor', 0],
		['Shield Slam', 2],
		['Stalwart', 3],
		['Wooden Shield', 0, hand]
	];
	
	marshal.skills = [
		['By The Book', 2],
		['Crushing Blow', 3],
		['I Am The Law', 2],
		['Just Reward', 1],
		['Last Stand', 3],
		['Retribution', 0],
		['Shockwave', 1],
		['Signet Ring', 0, item],
		['Vigilant Watch', 2],
		['War Hammer', 0, twohand],
		['Zealous Fire', 1]
	];
	
	monk.skills = [
	    ['Greater calling', 0],
	    ['Inner Balance', 1],
	    ['Openhanded', 2],
	    ['Vow Of Freedom', 3]
	];
	
	necromancer.skills = [
		['Army Of Death', 3],
		['Corpse Blast', 1],
		['Dark Pact', 2],
		['Deathly Haste', 1],
		['Dying Command', 3],
		['Fury Of Undeath', 1],
		['Raise Dead', 0],
		['Reanimate', 0],
		['Reapers Scythe', 0, twohand],
		['Undead Might', 2],
		['Vampiric Blood', 2]
	];
	
	prophet.skills = [
		['All Seeing', 2],
		['Battle Vision', 1],
		['Focused Insights', 3],
		['Forewarning', 1],
		['Grim Fate', 1],
		['Iron Flail', 0, hand],
		['Lifeline', 2],
		['Omniscience', 3],
		['Sages Tome', 0, item],
		['Soothing Insight', 0],
		['Victory Foretold', 2]
	];
	
	runemaster.skills = [
		['Arcane Bolt', 0, twohand],
		['Break The Rune', 3],
		['Exploding Rune', 1],
		['Ghost Armor', 1],
		['Inscribe Rune', 1],
		['Iron Will', 2],
		['Quick Casting', 3],
		['Rune Mastery', 2],
		['Runic Knowledge', 0],
		['Runic Sorcery', 2]
	];
	
	shadowwalker.skills = [	
		['Dark Servant', 1],
		['Dark Shift', 2],
		['Endless Void', 2],
		['Faithful Friend', 1],
		['Feathered Hatchet', 0, hand],
		['Otherworldly', 2],
		['Shadow Puppet', 3],
		['Shadow Soul', 0],
		['Shadow Step', 3],
		['Soul Bound', 0],
		['Through The Veil', 1],
		['Tribal Cloak', 0, armor]
	];
	
	skirmisher.skills = [
		['Back In Action', 1],
		['Born In Battle', 2],
		['Carve A Path', 3],
		['Deep Wounds', 1],
		['Dual Strike', 0],
		['Ever In Motion', 2],
		['Jagged Handaxe', 0, hand],
		['Keen Edge', 1],
		['Rusted Handaxe', 0, hand],
		['Unrelenting', 2],
		['Unstoppable', 3],
	];
	
	spiritspeaker.skills = [
		['Ancestor Spirits', 3],
		['Cloud Of Mist', 2],
		['Drain Spirit', 1],
		['Healing Rain', 1],
		['Natures Bounty', 2],
		['Oak Staff', 0, twohand],
		['Shared Pain', 1],
		['Stoneskin', 0],
		['Tempest', 2],
		['Vigor', 3]
	];
	
	stalker.skills = [
		['Ambush', 3],
		['Black Widows Web', 0, hand],
		['Easy Prey', 2],
		['Exploit', 1],
		['Hunters Mark', 1],
		['Hunting Knife', 0, hand],
		['Lay Of The Land', 2],
		['Makeshift Trap', 1],
		['Poison Barbs', 2],
		['Set Trap', 0],
		['Upper Hand', 3]
	];
	
	thief.skills = [
		['Appraisal', 1],
		['Bushwack', 3],
		['Caltrops', 2],
		['Dirty Tricks', 1],
		['Greedy', 0],
		['Lucky Charm', 0, item],
		['Lurk', 3],
		['Sneaky', 1],
		['Throwing Knives', 0, hand],
		['Tumble', 2],
		['Unseen', 2]
	];
	
	treasureHunter.skills = [
		['Delver', 0],
		['Dungeoneer', 1],
		['Finders Keepers', 3],
		['Gold Rush', 1],
		['Guard The Spoils', 2],
		['Leather Whip', 0, hand],
		['Lure Of Fortune', 2],
		['Sleight Of Hand', 2],
		['Survey', 1],
		['The Dead Mans Compass', 0, item],
		['Trail Of Riches', 3]
	];
	
	wildlander.skills = [
		['Accurate', 1],
		['Black Arrow', 3],
		['Bow Mastery', 2],
		['Danger Sense', 1],
		['Eagle Eyes', 1],
		['First Strike', 2],
		['Fleet Of Foot', 2],
		['Nimble', 0],
		['Running Shot', 3],
		['Yew Shortbow', 0, twohand]
	];

//Archetypes
var wiz = {},
	war = {},
	rog = {},
	sup = {};

	wiz.title = 'Mage';
	wiz.classes = [conjurer, geomancer, hexer, necromancer, runemaster];
	war.title = 'Warrior';
	war.classes = [beastmaster, berserker, champion, knight, marshal, skirmisher];
	rog.title = 'Scout';
	rog.classes = [bountyHunter, monk, shadowwalker, stalker, thief, treasureHunter, wildlander];
	sup.title = 'Healer';
	sup.classes = [apothecary, bard, disciple, prophet, spiritspeaker];			

var ARCHETYPE_CLASSES = 'mage warrior scout healer';
var ARCHETYPES_LIST = [wiz, war, rog, sup];

var CLASSES = {};
var ARCHETYPES = {};
var CLASSES_ITEMS = [];

for (var i = 0; i < ARCHETYPES_LIST.length; i++) {
	for (var j = 0; j < ARCHETYPES_LIST[i].classes.length; j++) {
		var classObject = ARCHETYPES_LIST[i].classes[j];
		classObject.archetype = ARCHETYPES_LIST[i];
		CLASSES[classObject.title] = classObject;
		for (var k = 0; k < classObject.skills.length; k++) {
			if (classObject.skills[k][2] != undefined) {
				var classItem = []; 
				classItem[0] = classObject.skills[k][0];
				classItem[1] = classObject.title.replace(new RegExp(" ",'g'), '').toLowerCase();
				classItem[2] = classObject.skills[k][2];
				CLASSES_ITEMS.push(classItem);
			}
		}
	}
	ARCHETYPES[ARCHETYPES_LIST[i].title] = ARCHETYPES_LIST[i];
}

var HEROES_LIST = [
	['Ashrian',10,4,sup],
	['Grisban the thirsty',14,4,war],
	['Jain Fairwood',8,5,rog],
	['Leoric of the book',8,5,wiz],
	['Avric Albright',12,4,sup],
	['Syndrael',12,4,war],
	['Tomble Burrowell',8,5,rog],
	['Widow Tarha',10,4,wiz],
	['Elder Mok',10,4,sup],
	['Laurel of Bloodwood',8,5,rog],
	['Shiver',10,4,wiz],
	['Trenloe the strong',12,3,war],
	['Brother Gherinn',12,4,sup],
	['Corbin',12,5,war],
	['Jaes the exile',12,3,wiz],
	['Lindel',10,5,rog],
	['Andria Runehand',12,4,sup],
	['Astarra',10,5,wiz],
	['Tahlia',14,4,war],
	['Tetherys',10,4,rog],
	['Sahla',10,4,sup],
	['Mordrog',14,4,war],
	['Silhouette',10,4,rog],
	['Lord Howthorne',12,4,war],
	['Ispher',10,4,sup],
	['Master Thorn',8,4,wiz],
	['Nanok of the Blade',12,4,war],
	['Nara the Fang',10,4,war],
	['Sir Valadir',12,4,war],
	['Challara',10,4,wiz],
	['High mage Quellen',10,4,wiz],
	['Reynhart the worthy',12,4,war],
	['Alys Raine',12,4,war],
	['Thaiden Mistpeak',10,5,rog],
	['Ulma Grimstone',8,5,sup],
	['Pathfinder Durik',10,4,war],
	['Logan Leshley',10,4,rog],
	['Dezra the Vile',8,4,wiz],
	['Serena',8,6,sup],
	['Rendiel',10,4,sup],
	['Orkell the swift',10,5,war],
	['Tinashi the wanderer',12,4,rog],
	['Ravaella lightfoot',8,5,wiz],
	['Roganna the Shade',10,4,rog],
	['Augur Grisom',12,5,sup],
	['Raythen',14,4,rog]
];

var HEROES = {};

for (var i = 0; i < HEROES_LIST.length; i++) {
	var hero = {};
	hero.title = HEROES_LIST[i][0];
	hero.hp = HEROES_LIST[i][1];
	hero.stamina = HEROES_LIST[i][2];
	hero.archetype = HEROES_LIST[i][3];
	HEROES[HEROES_LIST[i][0]] = hero;
}

MONSTERS_LIST.sort(listsort);
HEROES_LIST.sort(listsort);

FAMILIARS_LIST = [
	'Brightblaze',
	'Image',
	'Kata',
	'Mata',
	'Pico',
	'Raven',
	'Reanimate',
	'Shadow',
	'Skye',
	'Summoned Stone',
	'Trap',
	'Wolf',
	'Villager Female',
	'Villager Male'
];

ALLIES_LIST = [
	'Serena',
	'Raythen'
];

ALLIES_SKILLS = {};
ALLIES_SKILLS['Serena'] = ['Aura Of Might', 'Healing Aura', 'Holy Hammer'];
ALLIES_SKILLS['Raythen'] = ['Back Strike', 'Night Prowler', 'Sharp Eyes'];

MAP_TILES_LIST_COMPLETE = [
	['1',6,4],
	['2',6,6],
	['3',6,4],
	['4',6,6],
	['5',6,4],
	['6',6,4],
	['7',6,4],
	['8',4,4],
	['9',4,4],
	['10',4,4],
	['11',4,4],
	['12',5,5],
	['13',6,6],
	['14',4,4],
	['15',5,4],
	['16',4,4],
	['17',4,4],
	['18',4,4],
	['19',6,3],
	['20',8,3],
	['21',6,3],
	['22',6,2],
	['23',6,2],
	['24',6,2],
	['25',6,2],
	['26',4,3],
	['27',4,2],
	['28',4,2],
	['29',4,2],
	['30',4,2],
	['31',6,6],
	['32',4,4],
	['33',4,2],
	['34',6,3],
	['35',5,5],
	['36',8,8],
	['37',9,6],
	['38',7,6],
	['39',7,8],
	['40',6,5],
	['41',6,2],
	['42',6,2],
	['43',2,2],
	['44',6,6],
	['45',8,3],
	['46',4,3],
	['47',2,2],
	['48',7,7],
	['49',7,7],
	['50',6,6],
	['51',6,4],
	['52',5,4],
	['53',4,4],
	['54',4,4],
	['55',6,4],
	['56',6,4],
	['57',6,4],
	['58',6,3],
	['59',5,5],
	['60',5,5],
	['61',4,4],
	['62',3,3],
	['63',5,3],
	['64',5,3],
	['65',4,2],
	['66',4,2],
	['67',2,2],
	['68',2,2],
	['69',2,2],
	['70',6,6],
	['71',6,6],
	['72',6,4],
	['73',6,3],
	['74',5,4],
	['75',4,4],
	['76',4,2],
	['77',2,2],
	['S1',4,4],
	['S2',4,3],
	['End',2,1],
	['Nerekhall end',2,1],
	['Manor end',2,1],
	['Nerekhall extension 1x2',2,1],
	['Nerekhall connection 1x2',2,1],
	['Entrance',2,2],
	['Exit',2,2],
	['Nerekhall exit',2,2],
	['Extension1x2',2,1],
	['Extension2x2',2,2],
	['Portal Extension 2x2',2,2],
	['Cobble-stone Extension 2x2',2,2]
];

MAP_TILES_LIST = [];
MAP_TILES_SIZES = {};

for (var i = 0; i < MAP_TILES_LIST_COMPLETE.length; i++) {
	MAP_TILES_LIST.push(MAP_TILES_LIST_COMPLETE[i][0]);
	MAP_TILES_SIZES[MAP_TILES_LIST_COMPLETE[i][0]] = {'width':MAP_TILES_LIST_COMPLETE[i][1], 'height':MAP_TILES_LIST_COMPLETE[i][2]};
}

DOORS_LIST = [
	'Blue Rune Blocked',
	'Door',
	'Red Rune Blocked',
	'Shrubbery',
	'Yellow Rune Blocked',
	'Portcullis'
];

BLOCKS_LIST = [
	'1x1',
	'2x2'
];

OBJECTIVES_LIST = [
	'Green',
	'Purple',
	'Red',
	'White',
	'Unknown'
];

MISCELLANEOUS_LIST = [
	'Challenge',
	'Search',
	'Secret Entrance Indoors',
	'Secret Entrance Outdoors',
	'Sun Stone'
];

CONDITIONS_INITIAL = [
	['Bleeding',true],
	['Burning',true],
	['Cursed',true],
	['Diseased',true],
	['Doomed',true],
	['Immobilized',true],
	['Poisoned',true],
	['Stunned',true],
	['Terrified',true],
	['Weakened',true],
	['Elixir',false],
	['Hexed',false],
	['Infected',false],
	['Insight',false],
	['Marked',false],
	['Valor',false]
];

var CONDITIONS = {};
var CONDITIONS_LIST = [];

for (var i = 0; i < CONDITIONS_INITIAL.length; i++) {
	CONDITIONS_LIST.push(CONDITIONS_INITIAL[i][0]);
	CONDITIONS[CONDITIONS_INITIAL[i][0]] = {'hasConditionCard' : CONDITIONS_INITIAL[i][1]};
}

OVERLORD_CARDS_LIST = [
	['Critical Blow', 'basic', 1],
	['Dark Charm', 'basic', 1],
	['Dark Fortune', 'basic', 2],
	['Dark Might', 'basic', 2],
	['Dash', 'basic', 2],
	['Frenzy', 'basic', 2],
	['Pit Trap', 'basic', 1],
	['Poison Dart', 'basic', 1],
	['Tripwire', 'basic', 2],
	['Word Of Misery', 'basic', 1],
	['Befuddle', 'basic2', 2],
	['Blinding Speed', 'basic2', 2],
	['Dirty Fighting', 'basic2', 2],
	['Flurry', 'basic2', 1],
	['Grease Trap', 'basic2', 1],
	['Mental Error', 'basic2', 1],
	['Mimic', 'basic2', 1],
	['Overwhelm', 'basic2', 1],
	['Reflective Ward', 'basic2', 1],
	['Sign Of Weakness', 'basic2', 1],
	['Uncontrolled Power', 'basic2', 2],
	['Adaptive Contagion', 'infector', 1],
	['Airborne', 'infector', 1],
	['Contaminated', 'infector', 1],
	['Dark Host', 'infector', 1],
	['Outbreak', 'infector', 1],
	['Tainted Blow', 'infector', 1],
	['Virulent Infection', 'infector', 1],
	['Diabolic Power', 'magus', 1],
	['Rise Again', 'magus', 1],
	['Unholy Ritual', 'magus', 1],
	['Word Of Despair', 'magus', 1],
	['Word Of Pain', 'magus', 1],
	['Offertory Affliction', 'overlord_reward', 1],
	['Secrets Of Flesh', 'overlord_reward', 1],
	['Toxic Reprisal', 'overlord_reward', 1],
	['Blood Bargaining', 'punisher', 1],
	['Exploit Weakness', 'punisher', 1],
	['No Rest For The Wicked', 'punisher', 1],
	['Price Of Prevention', 'punisher', 1],
	['Trading Pains', 'punisher', 1],
	['Spligs Revenge', 'quest_reward', 1],
	['Twin Souls', 'quest_reward', 1],
	['The Wyrm Queens Favor', 'rumor_reward', 1],
	['Curse Of The Monkey God', 'saboteur', 1],
	['Explosive Runes', 'saboteur', 1],
	['Uthuk Demon Trap', 'saboteur', 1],
	['Web Trap', 'saboteur', 1],
	['Wicked Laughter', 'saboteur', 1],
	['Dark Remedy', 'universal', 1],
	['Dark Resilience', 'universal', 1],
	['Placebo', 'universal', 1],
	['Plan Ahead', 'universal', 1],
	['Refresh', 'universal', 1],
	['Schemes', 'universal', 1],
	['Solidarity', 'universal', 1],
	['Upgrade', 'universal', 1],
	['Diverse Means', 'universal', 2],
	['Blood Lust', 'warlord', 1],
	['Blood Rage', 'warlord', 1],
	['Dark Fortitude', 'warlord', 1],
	['Expert Blow', 'warlord', 1],
	['Reinforce', 'warlord', 1],
	['Down And Out', 'rumor_reward', 1],
	['Beneath The Shadow', 'unkindness', 1],
	['Beware', 'unkindness', 1],
	['Call Of The Ravens', 'unkindness', 1],
	['Feast', 'unkindness', 1],
	['Ill Omen', 'unkindness', 1],
	['Imitation', 'unkindness', 2],
	['Sudden Flurry', 'unkindness', 2],
	['Envelop', 'unkindness', 3],
	['Imploding Rift', 'shadowmancer', 1],
	['Mistrust', 'shadowmancer', 1],
	['Shadow Of Doubt', 'shadowmancer', 1],
	['Out Of Darkness', 'shadowmancer', 1],
	['Black Out', 'shadowmancer', 2],
	['Shadow Walk', 'shadowmancer', 2],
	['Treacherous Shadows', 'shadowmancer', 3],
	['Dragonbone Pendant', 'enchanter', 1],
	['Rings Of ZholAlam', 'enchanter', 1],
	['Elixir Of Stone', 'enchanter', 1],
	['Wristlet Of Wind', 'enchanter', 1],
	['Ward Of Peace', 'enchanter', 2],
	['Rune Of The Phoenix', 'enchanter', 2],
	['Sign Of The Last Zenith', 'enchanter', 3]
];

var OVERLORD_CARDS = {};

for (var i = 0; i < OVERLORD_CARDS_LIST.length; i++) {
	var card = {};
	card.title = OVERLORD_CARDS_LIST[i][0];
	card.number = OVERLORD_CARDS_LIST[i][2];
	if (OVERLORD_CARDS[OVERLORD_CARDS_LIST[i][1]] == undefined) {
		OVERLORD_CARDS[OVERLORD_CARDS_LIST[i][1]] = [];
	}
	OVERLORD_CARDS[OVERLORD_CARDS_LIST[i][1]].push(card);
}

var SHOWING_CLASSES = [];
SHOWING_CLASSES[1] = 'showOneCell';
SHOWING_CLASSES[2] = 'showTwoCells';
SHOWING_CLASSES[3] = 'showThreeCells';

var monsterNumber = 1;
var sackNumber = 1;
var conditionNumber = 1;

var config = {};

var defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJFdHRpbiIsIm1hc3RlciI6dHJ1ZSwieCI6IjEwIiwieSI6IjAiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMTYiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IkV0dGluIiwibWFzdGVyIjpmYWxzZSwieCI6IjEwIiwieSI6IjIiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6dHJ1ZSwieCI6IjEzIiwieSI6IjQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNCIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTQiLCJ5IjoiNSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6W119LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjE0IiwieSI6IjYiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNCIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjpbXX1dLCJoZXJvMSI6eyJ0aXRsZSI6IkFzaHJpYW4iLCJ4IjoiMTIiLCJ5IjoiOCIsImhwIjoiMTAiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IkRpc2NpcGxlIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFybW9yIE9mIEZhaXRoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCbGVzc2VkIFN0cmlrZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2xlYW5zaW5nIFRvdWNoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEaXZpbmUgRnVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSG9seSBQb3dlciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIEhlYWxpbmciLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIFBlYWNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSYWRpYW50IExpZ2h0IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJUaW1lIE9mIE5lZWQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIE1hY2UiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6W119LCJoZXJvMiI6eyJ0aXRsZSI6IlN5bmRyYWVsIiwieCI6IjEyIiwieSI6IjkiLCJocCI6IjEyIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJLbmlnaHQiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWR2YW5jZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2hhbGxlbmdlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEZWZlbmQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRlZmVuc2UgVHJhaW5pbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkd1YXJkIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNwaXJhdGlvbiIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiT2F0aCBPZiBIb25vciIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTaGllbGQgU2xhbSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU3RhbHdhcnQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIExvbmdzd29yZCIsImhhbmQyIjoiV29vZGVuIFNoaWVsZCIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjpbXX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiI4Iiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJSdW5lbWFzdGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkJyZWFrIFRoZSBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFeHBsb2RpbmcgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR2hvc3QgQXJtb3IiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkluc2NyaWJlIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIklyb24gV2lsbCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUXVpY2sgQ2FzdGluZyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuZSBNYXN0ZXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5pYyBLbm93bGVkZ2UiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuaWMgU29yY2VyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IkFyY2FuZSBCb2x0IiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6W119LCJoZXJvNCI6eyJ0aXRsZSI6IkphaW4gRmFpcndvb2QiLCJ4IjoiMTIiLCJ5IjoiMTEiLCJocCI6IjgiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6IldpbGRsYW5kZXIiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWNjdXJhdGUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJsYWNrIEFycm93IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCb3cgTWFzdGVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGFuZ2VyIFNlbnNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFYWdsZSBFeWVzIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGaXJzdCBTdHJpa2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkZsZWV0IE9mIEZvb3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIk5pbWJsZSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5uaW5nIFNob3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJZZXcgU2hvcnRib3ciLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjpbXX0sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjEyIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIzIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjYiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOltdLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNSIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMyIsInkiOiI1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjEifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbXX0sImxpZXV0ZW5hbnRzIjpbXSwiYWN0T25lIjp0cnVlLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTB9';
var actOne = true;

var MAP_HASES_LIST = [
	['2e - First Blood', "eyJ0aWxlcyI6W3sidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiNCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjkiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMyIsInkiOiI1IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbXSwieHMiOltdfQ=="],
	['2e - Fat Goblin - encounter 1', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiNiIsInkiOiI4In0seyJ0aXRsZSI6IjF4MSIsIngiOiI3IiwieSI6IjgifV0sInRpbGVzIjpbeyJ0aXRsZSI6IjIwIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiNCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE4Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjExIiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiNSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiUmVkIiwieCI6IjUiLCJ5IjoiNyJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiNSIsInkiOiI0In0seyJ0aXRsZSI6IlJlZCIsIngiOiI4IiwieSI6IjQifSx7InRpdGxlIjoiUmVkIiwieCI6IjgiLCJ5IjoiNyJ9XX0="],
	['2e - Fat Goblin - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTUiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiNiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQiIsIngiOiI2IiwieSI6IjkiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMSIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI2Iiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI3IiwieSI6IjgifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEyIiwieSI6IjcifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTEiLCJ5IjoiOCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiNiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiNyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEwIiwieSI6IjYifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiI3In1dfQ=="],
	['2e - Castle Daerion - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIyIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNyIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjE2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIyIiwieSI6IjUifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNyIsInkiOiI5In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjExIiwieSI6IjExIn1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlJlZCIsIngiOiI3IiwieSI6IjIifSx7InRpdGxlIjoiUmVkIiwieCI6IjIiLCJ5IjoiMTIifSx7InRpdGxlIjoiUmVkIiwieCI6IjExIiwieSI6IjkifSx7InRpdGxlIjoiUmVkIiwieCI6IjE1IiwieSI6IjE2In1dfQ=="],
	['2e - Castle Daerion - encounter 2', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjEiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxOCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjE0Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTIiLCJ5IjoiMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiNiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiMTEiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJXaGl0ZSIsIngiOiIzIiwieSI6IjciLCJocCI6IjI1In1dfQ=="],
	['2e - Cardinals Plight - encounter 1', 'eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI0Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiOSIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxNCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTIiLCJ5IjoiNCJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJSZWQiLCJ4IjoiMTQiLCJ5IjoiNCJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTQiLCJ5IjoiNyJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTYiLCJ5IjoiNCJ9LHsidGl0bGUiOiJSZWQiLCJ4IjoiMTYiLCJ5IjoiNyJ9XX0='],
	['2e - Cardinals Plight - encounter 2', 'eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNiIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiOSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjEwIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxMCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJCIiwieCI6IjEyIiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE4IiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxNyIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTkiLCJ5IjoiMTMiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTEiLCJ5IjoiOCJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiI1IiwieSI6IjEwIn0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjEyIiwieSI6IjEzIn1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IldoaXRlIiwieCI6IjkiLCJ5IjoiOSJ9XX0='],
	['2e - The Masquerade Ball - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjYiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiIxMyIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyMCIsInkiOiIxIiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI5IiwieSI6IjEifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjkiLCJ5IjoiNSJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJVbmtub3duIiwieCI6IjUiLCJ5IjoiMyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjYiLCJ5IjoiNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjExIiwieSI6IjMifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMCIsInkiOiI0In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTAiLCJ5IjoiNyJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjExIiwieSI6IjgifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNSIsInkiOiIzIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTYiLCJ5IjoiNCJ9XX0="],
	['2e - The Masquerade Ball - encounter 2', 'eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE1Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIzIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiNSIsInNpZGUiOiJCIiwieCI6IjciLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMjQiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjciLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjYiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQiIsIngiOiIxOCIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxOSIsInkiOiIxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjAiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4aXQiLCJzaWRlIjoiQiIsIngiOiIxNyIsInkiOiIyIiwiYW5nbGUiOiIwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI2IiwieSI6IjIifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjciLCJ5IjoiNiJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMyIsInkiOiI2In0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjE3IiwieSI6IjYifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjE5IiwieSI6IjQifSx7InRpdGxlIjoiUmVkIFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiMTgiLCJ5IjoiMSJ9XSwib2JqZWN0aXZlcyI6W119'],
	['2e - Death on the Wing - encounter 1', "eyJ0aWxlcyI6W3sidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI0Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIwIiwic2lkZSI6IkEiLCJ4IjoiNCIsInkiOiI5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjAiLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W10sInhzIjpbXX0="],
	['2e - Death on the Wing - encounter 2', 'eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjciLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjEiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTkiLCJ5IjoiNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE5Iiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiI4IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W119'],
	['2e - The Shadow Vault - interlude', 'eyJ4cyI6W3sidGl0bGUiOiIyeDIiLCJ4IjoiMyIsInkiOiIxIn1dLCJ0aWxlcyI6W3sidGl0bGUiOiI0Iiwic2lkZSI6IkIiLCJ4IjoiMSIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMjAiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjYiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkIiLCJ4IjoiNSIsInkiOiIxMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjMwIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI3IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNyIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkIiLCJ4IjoiMTEiLCJ5IjoiMTIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI5Iiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiMTEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyOSIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjE1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNSIsInNpZGUiOiJBIiwieCI6IjE5IiwieSI6IjE2IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxOCIsInkiOiIyMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjE5IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTciLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxOCIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiMjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiNiIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE4IiwieSI6IjI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQSIsIngiOiIxOSIsInkiOiIyNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiIyNCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMjMiLCJ5IjoiMjYiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJBIiwieCI6IjIwIiwieSI6IjI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiIzNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyNyIsInNpZGUiOiJBIiwieCI6IjE4IiwieSI6IjMxIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMSIsInNpZGUiOiJBIiwieCI6IjEyIiwieSI6IjMwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMzMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjQiLCJ5IjoiMzMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiMzgiLCJhbmdsZSI6IjAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI2IiwieSI6IjEwIn0seyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxMyIsInkiOiIxNiJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJSZWQiLCJ4IjoiNyIsInkiOiIzIn0seyJ0aXRsZSI6IlJlZCIsIngiOiI3IiwieSI6IjYifV19'],
	['2e - The Overlord Revealed - interlude', "eyJ0aWxlcyI6W3sidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiMjQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIxMCIsInNpZGUiOiJCIiwieCI6IjMiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjI1Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMTEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMTAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjMwIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTkiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjIxIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQiIsIngiOiIxMiIsInkiOiIxMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJCIiwieCI6IjEzIiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI4Iiwic2lkZSI6IkIiLCJ4IjoiMTMiLCJ5IjoiMTUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkIiLCJ4IjoiMTUiLCJ5IjoiMTciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjEiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiIxOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE3Iiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24yeDIiLCJzaWRlIjoiQiIsIngiOiIxOCIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxOCIsInkiOiIwIiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbeyJ0aXRsZSI6IlJlZCBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjYiLCJ5IjoiNCJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiNyIsInkiOiIxMCJ9XSwieHMiOltdfQ=="],
	['LoR - Honor Among Thieves - encounter 2', "eyJ0aWxlcyI6W3sidGl0bGUiOiI4Iiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkIiLCJ4IjoiOSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNSIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjgiLCJ5IjoiMyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzAiLCJzaWRlIjoiQiIsIngiOiI0IiwieSI6IjciLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMyIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjEyIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiIxMCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJCIiwieCI6IjEwIiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjM4Iiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiI3IiwiYW5nbGUiOiI5MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiU2hydWJiZXJ5IiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOSIsInkiOiI2In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjciLCJ5IjoiNiJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMyIsInkiOiI2In0seyJ0aXRsZSI6IlNocnViYmVyeSIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjkiLCJ5IjoiMTQifV0sInhzIjpbeyJ0aXRsZSI6IjJ4MiIsIngiOiIxNSIsInkiOiI3In0seyJ0aXRsZSI6IjJ4MiIsIngiOiIzIiwieSI6IjEyIn1dfQ=="],
	['LoR - Barrow of Barris - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjQzIiwic2lkZSI6IkEiLCJ4IjoiMyIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNSIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiI2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI0MyIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiMCIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTMiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjIiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiNSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjE1IiwieSI6IjQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiIzOSIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI5IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiIxNCIsImFuZ2xlIjoiMTgwIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiNCJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOSIsInkiOiIyIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMCIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIyIiwieSI6IjExIn1dfQ=="],
	['LoR - Fortune and Glory - encounter 1', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIwIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxOSIsInNpZGUiOiJCIiwieCI6IjYiLCJ5IjoiMiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjExIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiI4IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiOSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMTIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkIiLCJ4IjoiMyIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyNCIsInNpZGUiOiJCIiwieCI6IjExIiwieSI6IjEzIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjE1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjE1Iiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMTYiLCJ5IjoiNSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjE4Iiwic2lkZSI6IkIiLCJ4IjoiMjAiLCJ5IjoiNyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjYiLCJzaWRlIjoiQiIsIngiOiIyMSIsInkiOiIxMSIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjIyIiwieSI6IjE3IiwiYW5nbGUiOiIwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI1IiwieSI6IjYifSx7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjgiLCJ5IjoiNyJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOCIsInkiOiIxMSJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMjEiLCJ5IjoiMTAifV0sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiV2hpdGUiLCJ4IjoiMiIsInkiOiI4In0seyJ0aXRsZSI6IkdyZWVuIiwieCI6IjE1IiwieSI6IjE1In0seyJ0aXRsZSI6IlJlZCIsIngiOiIxNiIsInkiOiI1In0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiIyMyIsInkiOiIxNyJ9XX0="],
	['LoR - Fortune and Glory - encounter 2', "eyJ4cyI6W3sidGl0bGUiOiIxeDEiLCJ4IjoiMiIsInkiOiIzIn0seyJ0aXRsZSI6IjF4MSIsIngiOiI4IiwieSI6IjE0In0seyJ0aXRsZSI6IjF4MSIsIngiOiIxNiIsInkiOiIxMyJ9LHsidGl0bGUiOiIxeDEiLCJ4IjoiMjEiLCJ5IjoiMyJ9XSwidGlsZXMiOlt7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJCIiwieCI6IjkiLCJ5IjoiMCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMzkiLCJzaWRlIjoiQiIsIngiOiI3IiwieSI6IjIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiNiIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyMyIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjUiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJCIiwieCI6IjIwIiwieSI6IjQiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiMjEiLCJ5IjoiMyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjI0IiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyIiwic2lkZSI6IkIiLCJ4IjoiMTQiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxNiIsInkiOiIxMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyOCIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjMiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjgiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiIyNCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiMTQiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjE0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQiIsIngiOiIxIiwieSI6IjQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIyIiwieSI6IjMiLCJhbmdsZSI6IjE4MCJ9XSwiZG9vcnMiOlt7InRpdGxlIjoiWWVsbG93IFJ1bmUgQmxvY2tlZCIsInZlcnRpY2FsIjpmYWxzZSwieCI6IjEiLCJ5IjoiMyJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI3IiwieSI6IjEzIn0seyJ0aXRsZSI6IlllbGxvdyBSdW5lIEJsb2NrZWQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiIxNSIsInkiOiIxMiJ9LHsidGl0bGUiOiJZZWxsb3cgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOmZhbHNlLCJ4IjoiMjAiLCJ5IjoiMyJ9XSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiNCIsInkiOiI0In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjE1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxOCIsInkiOiIxMiJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiMjMiLCJ5IjoiNCJ9XX0="],
	['SoN - A demonstration', "eyJ4cyI6W3sidGl0bGUiOiIyeDIiLCJ4IjoiNSIsInkiOiI0In1dLCJ0aWxlcyI6W3sidGl0bGUiOiI1MCIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiMSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNSIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6IjY4Iiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI2MSIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiNiIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNjYiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjciLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiI1OCIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGVuZCIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJOZXJla2hhbGwgZXh0ZW5zaW9uIDF4MiIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjciLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI2OCIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiMTEiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI2MCIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiOCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjU5Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiNyIsImFuZ2xlIjoiIn0seyJ0aXRsZSI6Ik5lcmVraGFsbCBlbmQiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiTmVyZWtoYWxsIGV4aXQiLCJzaWRlIjoiQiIsIngiOiIxNyIsInkiOiI5IiwiYW5nbGUiOiIxODAifV0sImRvb3JzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJQdXJwbGUiLCJ4IjoiNCIsInkiOiIzIn0seyJ0aXRsZSI6IlB1cnBsZSIsIngiOiI3IiwieSI6IjMifSx7InRpdGxlIjoiUHVycGxlIiwieCI6IjQiLCJ5IjoiNiJ9LHsidGl0bGUiOiJQdXJwbGUiLCJ4IjoiNyIsInkiOiI2In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxIiwieSI6IjUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjExIiwieSI6IjMifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiMTIifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjE0IiwieSI6IjYifV19"],
	['MoR - Spread Your Wings', "eyJkb29ycyI6W3sidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiIxMCJ9LHsidGl0bGUiOiJEb29yIiwidmVydGljYWwiOnRydWUsIngiOiIxMiIsInkiOiIxNSJ9LHsidGl0bGUiOiJSZWQgUnVuZSBCbG9ja2VkIiwidmVydGljYWwiOnRydWUsIngiOiI2IiwieSI6IjE1In1dLCJ0aWxlcyI6W3sidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjI0IiwieSI6IjIiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI3MyIsInNpZGUiOiJBIiwieCI6IjIxIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjIzIiwic2lkZSI6IkEiLCJ4IjoiMTUiLCJ5IjoiMiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyMiIsInNpZGUiOiJBIiwieCI6IjkiLCJ5IjoiMiIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIyIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIyMSIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMTgiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjcyIiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxNSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI3NiIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjE2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE0IiwieSI6IjE1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNzciLCJzaWRlIjoiQSIsIngiOiIxNyIsInkiOiIxNiIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjE1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMTYiLCJzaWRlIjoiQSIsIngiOiIxNiIsInkiOiI0IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIyMCIsInkiOiI1IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMzAiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI1IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiNzciLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI1IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNCIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiNyIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjUiLCJ5IjoiNyIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiNzAiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjExIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiI3NSIsInNpZGUiOiJCIiwieCI6IjUiLCJ5IjoiMTAiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIxNCIsInkiOiI4IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiMyIsInNpZGUiOiJBIiwieCI6IjE2IiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjE3IiwieSI6IjgiLCJhbmdsZSI6IjE4MCJ9XSwieHMiOltdfQ=="],
	['MoR - Finders and Keepers', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjQiLCJzaWRlIjoiQSIsIngiOiIxIiwieSI6IjAiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6Ijc1Iiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjEiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiMTEiLCJ5IjoiMSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjJ4MiIsInNpZGUiOiJBIiwieCI6IjMiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI3NCIsInNpZGUiOiJCIiwieCI6IjIiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI3MSIsInNpZGUiOiJBIiwieCI6IjciLCJ5IjoiOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjkiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjUiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiOSIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFeHRlbnNpb24xeDIiLCJzaWRlIjoiQSIsIngiOiIxMiIsInkiOiI1IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjI3Iiwic2lkZSI6IkEiLCJ4IjoiMTIiLCJ5IjoiNiIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiI1Iiwic2lkZSI6IkEiLCJ4IjoiMTMiLCJ5IjoiOCIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiMTIiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiMTMiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiMjMiLCJzaWRlIjoiQSIsIngiOiI4IiwieSI6IjE0IiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW50cmFuY2UiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjE0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6Ijc3Iiwic2lkZSI6IkEiLCJ4IjoiMTQiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOltdLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMyIsInkiOiI4In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNCIsInkiOiIxMSJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjciLCJ5IjoiNCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEwIiwieSI6IjEifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNCIsInkiOiIyIn0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiMTUiLCJ5IjoiNiJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjEwIiwieSI6IjgifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxMiIsInkiOiI4In0seyJ0aXRsZSI6IlVua25vd24iLCJ4IjoiNyIsInkiOiIxMCJ9LHsidGl0bGUiOiJVbmtub3duIiwieCI6IjgiLCJ5IjoiMTMifSx7InRpdGxlIjoiVW5rbm93biIsIngiOiIxNiIsInkiOiIxMyJ9XX0="],
	['HoB - Acolyte of Saradyn', "eyJ4cyI6W10sInRpbGVzIjpbeyJ0aXRsZSI6IjUiLCJzaWRlIjoiQSIsIngiOiIyIiwieSI6IjEiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiI0Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIxIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMXgyIiwic2lkZSI6IkEiLCJ4IjoiOCIsInkiOiI3IiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMTEiLCJzaWRlIjoiQSIsIngiOiI3IiwieSI6IjgiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkV4dGVuc2lvbjF4MiIsInNpZGUiOiJBIiwieCI6IjgiLCJ5IjoiMTIiLCJhbmdsZSI6IiJ9LHsidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiNyIsInkiOiIxMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjEzIiwiYW5nbGUiOiIifSx7InRpdGxlIjoiMjEiLCJzaWRlIjoiQSIsIngiOiIzIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIxNCIsImFuZ2xlIjoiIn1dLCJkb29ycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiOCIsInkiOiIxIn0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI3IiwieSI6IjEwIn1dfQ=="]
];

var MAP_HASHES = {};

for (var i = 0; i < MAP_HASES_LIST.length; i++) {
	MAP_HASHES[MAP_HASES_LIST[i][0]] = MAP_HASES_LIST[i][1]; 
}

var mapWidth = 40;
var mapHeight = 50;

var monsterList = [];
var mapObjects = [];
var conditionsToShow = {};

var overlordRelicNumber = 0;