var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var cellSize = 64;

function listsort(a, b) {
    if(a[0] < b[0]) return -1;
    if(a[0] > b[0]) return 1;
    return 0;
}

var MONSTERS_LIST = [
	['Arachyura',2,2,false],
	['Bandit',1,1,true],
	['Bane Spider',2,2,true],
	['Barghest',1,2,false],
	['Beastman',1,1,false],
	['Blood Ape',1,2,false],
	['Carrion Drake',1,1,false],
	['Cave Spider',1,1,false],
	['Changeling',1,1,false],
	['Crypt Dragon',2,3,true],
	['Dark Priest',1,1,true],
	['Deep Elf',1,1,false],
	['Demon Lord',2,2,false],
	['Elemental',2,2,true],
	['Ettin',2,2,false],
	['Ferrox',1,1,false],
	['Fire Imps',1,1,true],
	['Flesh Moulder',1,1,true],
	['Giant',2,2,false],
	['Goblin Archer',1,1,true],
	['Goblin Witcher',1,1,true],
	['Harpy',1,1,false],
	['Hellhound',1,2,false],
	['Hybrid_Sentinel',1,1,false],
	['Ice Wyrm',2,3,false],
	['Ironbound',1,1,false],
	['Kobold',1,1,false],
	['Lava Beetle',1,1,true],
	['Manticore',2,2,true],
	['Medusa',1,1,true],
	['Merriod',2,2,false],
	['Naga',2,2,true],
	['Ogre',2,2,false],
	['Rat Swarm',1,2,false],
	['Razorwing',1,1,false],
	['Shade',1,1,false],
	['Shadow Dragon',2,3,false],
	['Skeleton Archer',1,1,true],
	['Sorcerer',1,1,true],
	['Troll',2,2,false],
	['Volucrix Reaver',1,1,false],
	['Wendigo',2,2,false],
	['Wraith',1,1,true],
	['Ynfernael Hulk',2,2,false],
	['Zombie',1,1,false]
];

var LIEUTENANTS_LIST = [
	['Ariad', true],
	['Baron Zachareth', true],
	['Belthir', true],
	['Bolgoreth', true],
	['Lady Eliza Farrow', true],
	['Lord Merick Farrow', true],
	['Mirklace', false],
	['Queen Ariad', true],
	['Raythen', true],
	['Rylan Olliven', false],
	['Serena', true],
	['Skarn', true],
	['Sir Alric Farrow', true],
	['Splig', true],
	['Tristayne Olliven', false],
	['Valyndra', true],
	['Verminous', true]
];

var MONSTERS_HP = [
	['Arachyura',5,7,7,9],
	['Bandit',4,5,6,7],
	['Bane Spider',4,7,6,9],
	['Barghest',4,6,6,8],
	['Beastman',4,5,5,6],
	['Blood Ape',5,7,7,9],
	['Carrion Drake',6,8,7,10],
	['Cave Spider',3,5,5,7],
	['Changeling',4,6,6,8],
	['Crypt Dragon',5,7,7,10],
	['Dark Priest',2,5,7,9],
	['Deep Elf',7,9,8,10],
	['Demon Lord',6,9,8,12],
	['Elemental',4,6,8,10],
	['Ettin',5,8,7,9],
	['Ferrox',4,5,5,8],
	['Fire Imps',2,4,4,6],
	['Flesh Moulder',4,5,5,7],
	['Giant',10,12,12,15],
	['Goblin Archer',2,4,4,6],
	['Goblin Witcher',3,5,6,8],
	['Harpy',3,5,4,6],
	['Hellhound',3,6,5,8],
	['Hybrid Sentinel',5,8,6,9],
	['Ice Wyrm',7,9,11,14],
	['Ironbound',8,10,10,12],
	['Kobold',2,4,4,6],
	['Lava Beetle',3,5,5,7],
	['Manticore',5,7,7,9],
	['Medusa',4,6,6,9],
	['Merriod',5,7,7,9],
	['Naga',4,5,6,7],
	['Ogre',6,8,9,12],
	['Rat Swarm',4,5,5,6],
	['Razorwing',4,6,7,9],
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

for (var i = 0; i < MONSTERS_LIST.length; i++) {
	var monster = {};
	monster.title = MONSTERS_LIST[i][0];
	monster.width = MONSTERS_LIST[i][1];
	monster.height = MONSTERS_LIST[i][2];
	monster.ranged = MONSTERS_LIST[i][3];
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
	['Bearded Axe', twohand],
	['Belt Of Alchemy', item],
	['Belt Of Waterwalking', item],
	['Bow Of Bone', twohand],
	['Chainmail', armor],
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
	['Iron Battleaxe', twohand],
	['Iron Shield', hand],
	['Iron Spear', hand],
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
	['Poisoned Blowgun', hand],
	['Ring Of Power', item],
	['Rune Plate', armor],
	['Scorpion Helm', item],
	['Serpent Dagger', hand],
	['Shield Of Light', hand],
	['Sling', hand],
	['Steel Broadsword', hand],
	['Sunburst', twohand],
	['Teleportation Rune', twohand],
	['Thiefs Vest', armor],
	['Trident', hand]
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
	['Grinding Axe', twohand],
	['Heavy Steel Shield', hand],
	['Ice Storm', twohand],
	['Inscribed Robes', armor],
	['Iron Bound Ring', item],
	['Iron Claws', hand],
	['Latari Longbow', twohand],
	['Lightning Strike', twohand],
	['Mace Of Kellos', hand],
	['Merciful Boots', item],
	['Obsidian Greataxe', twohand],
	['Obsidian Scalemail', armor],
	['Platemail', armor],
	['Rage Blade', hand],
	['Rune Of Misery', twohand],
	['Scalemail', armor],
	['Shroud Of Dusk', item],
	['Staff Of Kellos', twohand],
	['Staff Of The Wild', twohand],
	['Steel Greatsword', twohand],
	['Stone Armor', armor],
	['Tival Crystal', item]
];

RELICS_LIST = [
	['Aurium Mail', armor],
	['Dawnblade', hand],
	['Fortunas Dice', item],
	['Gauntlets Of Power', item],
	['Immunity Elixir', item],
	['Living Heart', item],
	['Mending Talisman', item],
	['Shield Of The Dark God', hand],
	['Staff Of Light', twohand],
	['Sun Stone', item],
	['The Shadow Rune', twohand],
	['Trueshot', twohand],
	['Valyndras Bane', twohand],
	['Workmans Ring', item]
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
	bard = {};
	disciple = {},
	prophet = {},
	spiritspeaker = {},
	beastmaster = {},
	berserker = {},
	champion = {},
	knight = {},
	skirmisher = {},
	conjurer = {},
	geomancer = {},
	hexer = {},
	necromancer = {},
	runemaster = {},
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
	skirmisher.title = 'Skirmisher';
	conjurer.title = 'Conjurer';
	geomancer.title = 'Geomancer';
	hexer.title = 'Hexer';
	necromancer.title = 'Necromancer';
	runemaster.title = 'Runemaster';
	stalker.title = 'Stalker';
	thief.title = 'Thief';
	treasureHunter.title = 'Treasure Hunter';
	wildlander.title = 'Wildlander';
	shadowwalker.title = 'Shadow Walker';

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
	war.classes = [beastmaster, berserker, champion, knight, skirmisher];
	rog.title = 'Scout';
	rog.classes = [shadowwalker, stalker, thief, treasureHunter, wildlander];
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
	['Augur Grisom',12,5,sup]
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
	'Reanimate',
	'Shadow',
	'Skye',
	'Wolf',
	'Stone',
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

MAP_TILES_LIST = [
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19',
	'20',
	'21',
	'22',
	'23',
	'24',
	'25',
	'26',
	'27',
	'28',
	'29',
	'30',
	'31',
	'32',
	'33',
	'34',
	'35',
	'36',
	'37',
	'38',
	'39',
	'40',
	'41',
	'42',
	'43',
	'44',
	'45',
	'46',
	'47',
	'48',
	'49',
	'50',
	'51',
	'52',
	'53',
	'54',
	'55',
	'56',
	'57',
	'58',
	'59',
	'60',
	'61',
	'62',
	'63',
	'64',
	'65',
	'66',
	'67',
	'68',
	'69',
	'70',
	'71',
	'72',
	'73',
	'74',
	'75',
	'76',
	'77',
	'S1',
	'S2',
	'End',
	'Entrance',
	'Exit',
	'Extension1x2',
	'Extension2x2'
];

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
	'Search',
	'Secret Entrance Indoors',
	'Secret Entrance Outdoors',
	'Sun Stone'
];

CONDITIONS_LIST = [
	'Bleeding',
	'Burning',
	'Cursed',
	'Diseased',
	'Doomed',
	'Hexed',
	'Immobilized',
	'Poisoned',
	'Stunned',
	'Weakened',
	'Elixir',
	'Infected',
	'Insight',
	'Marked'
];

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
	['Plan Ahead', 'universal', 1],
	['Schemes', 'universal', 1],
	['Blood Lust', 'warlord', 1],
	['Blood Rage', 'warlord', 1],
	['Dark Fortitude', 'warlord', 1],
	['Expert Blow', 'warlord', 1],
	['Reinforce', 'warlord', 1],
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

var defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJsZWFkZXIiOiJ0cnVlIiwieCI6IjgiLCJ5IjoiMTEiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJsZWFkZXIiOiJmYWxzZSIsIngiOiI3IiwieSI6IjEzIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibGVhZGVyIjoiZmFsc2UiLCJ4IjoiOSIsInkiOiIxMiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0In0seyJ0aXRsZSI6IlZvbHVjcml4IFJlYXZlciIsImxlYWRlciI6ImZhbHNlIiwieCI6IjgiLCJ5IjoiMTUiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9XSwiaGVybzEiOnsidGl0bGUiOiJBdWd1ciBHcmlzb20iLCJ4IjoiMTEiLCJ5IjoiMTMiLCJocCI6IjEyIiwic3RhbWluYSI6IjUifSwiaGVybzIiOnsidGl0bGUiOiJTaXIgVmFsYWRpciIsIngiOiIxMSIsInkiOiIxMSIsImhwIjoiMyIsInN0YW1pbmEiOiIwIn0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEwIiwieSI6IjEzIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEifSwiaGVybzQiOnsidGl0bGUiOiJMaW5kZWwiLCJ4IjoiMTAiLCJ5IjoiMTIiLCJocCI6IjEwIiwic3RhbWluYSI6IjMifX0=';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjExIiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJmYWxzZSIsIngiOiIxMyIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjoiZmFsc2UiLCJ4IjoiMTIiLCJ5IjoiOSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0In0seyJ0aXRsZSI6IlZvbHVjcml4IFJlYXZlciIsIm1hc3RlciI6ImZhbHNlIiwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9XSwiaGVybzEiOnsidGl0bGUiOiJBdWd1ciBHcmlzb20iLCJ4IjoiMTMiLCJ5IjoiMTEiLCJocCI6IjEyIiwic3RhbWluYSI6IjUifSwiaGVybzIiOnsidGl0bGUiOiJTaXIgVmFsYWRpciIsIngiOiIxMSIsInkiOiIxMSIsImhwIjoiMyIsInN0YW1pbmEiOiIwIn0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEzIiwieSI6IjEwIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEifSwiaGVybzQiOnsidGl0bGUiOiJMaW5kZWwiLCJ4IjoiMTIiLCJ5IjoiMTAiLCJocCI6IjEwIiwic3RhbWluYSI6IjMifX0=';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjExIiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEzIiwieSI6IjciLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEyIiwieSI6IjkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJWb2x1Y3JpeCBSZWF2ZXIiLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9XSwiaGVybzEiOnsidGl0bGUiOiJBdWd1ciBHcmlzb20iLCJ4IjoiMTMiLCJ5IjoiMTEiLCJocCI6IjEyIiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJBcG90aGVjYXJ5In0sImhlcm8yIjp7InRpdGxlIjoiU2lyIFZhbGFkaXIiLCJ4IjoiMTEiLCJ5IjoiMTEiLCJocCI6IjMiLCJzdGFtaW5hIjoiMCIsImNsYXNzTmFtZSI6IktuaWdodCJ9LCJoZXJvMyI6eyJ0aXRsZSI6Ikxlb3JpYyBvZiB0aGUgYm9vayIsIngiOiIxMyIsInkiOiIxMCIsImhwIjoiNyIsInN0YW1pbmEiOiIxIiwiY2xhc3NOYW1lIjoiTmVjcm9tYW5jZXIifSwiaGVybzQiOnsidGl0bGUiOiJMaW5kZWwiLCJ4IjoiMTIiLCJ5IjoiMTAiLCJocCI6IjEwIiwic3RhbWluYSI6IjMiLCJjbGFzc05hbWUiOiJUcmVhc3VyZSBIdW50ZXIifX0=';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjExIiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEzIiwieSI6IjciLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEyIiwieSI6IjkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJWb2x1Y3JpeCBSZWF2ZXIiLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9XSwiaGVybzEiOnsidGl0bGUiOiJBdWd1ciBHcmlzb20iLCJ4IjoiMTMiLCJ5IjoiMTEiLCJocCI6IjEyIiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJBcG90aGVjYXJ5Iiwic2tpbGxzIjpbWyJCcmV3IEVsaXhpciIsdHJ1ZV0sWyJDb25jb3Rpb24iLGZhbHNlXSxbIkhlcmJhbCBMb3JlIixmYWxzZV0sWyJJbmt5IFN1YnN0YW5jZSIsZmFsc2VdLFsiQm90dGxlZCBDb3VyYWdlIixmYWxzZV0sWyJQcm90ZWN0aXZlIFRvbmljIixmYWxzZV0sWyJTZWNyZXQsIEZvcm11bGEiLGZhbHNlXSxbIkhpZGRlbiBTdGFzaCIsZmFsc2VdLFsiUG90ZW50IFJlbWVkaWVzIixmYWxzZV1dfSwiaGVybzIiOnsidGl0bGUiOiJTaXIgVmFsYWRpciIsIngiOiIxMSIsInkiOiIxMSIsImhwIjoiMyIsInN0YW1pbmEiOiIwIiwiY2xhc3NOYW1lIjoiS25pZ2h0Iiwic2tpbGxzIjpbWyJBZHZhbmNlIixmYWxzZV0sWyJDaGFsbGVuZ2UiLGZhbHNlXSxbIkRlZmVuZCIsZmFsc2VdLFsiRGVmZW5zZSBUcmFpbmluZyIsZmFsc2VdLFsiR3VhcmQiLGZhbHNlXSxbIkluc3BpcmF0aW9uIixmYWxzZV0sWyJPYXRoIE9mIEhvbm9yIix0cnVlXSxbIlNoaWVsZCBTbGFtIixmYWxzZV0sWyJTdGFsd2FydCIsZmFsc2VdXX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEzIiwieSI6IjEwIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEiLCJjbGFzc05hbWUiOiJOZWNyb21hbmNlciIsInNraWxscyI6W1siQXJteSBPZiBEZWF0aCIsZmFsc2VdLFsiQ29ycHNlIEJsYXN0IixmYWxzZV0sWyJEYXJrIFBhY3QiLGZhbHNlXSxbIkRlYXRobHkgSGFzdGUiLGZhbHNlXSxbIkR5aW5nIENvbW1hbmQiLGZhbHNlXSxbIkZ1cnkgT2YgVW5kZWF0aCIsZmFsc2VdLFsiUmFpc2UgRGVhZCIsdHJ1ZV0sWyJSZWFuaW1hdGUiLHRydWVdLFsiVW5kZWFkIE1pZ2h0IixmYWxzZV0sWyJWYW1waXJpYyBCbG9vZCIsZmFsc2VdXX0sImhlcm80Ijp7InRpdGxlIjoiTGluZGVsIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiIxMCIsInN0YW1pbmEiOiIzIiwiY2xhc3NOYW1lIjoiVHJlYXN1cmUgSHVudGVyIiwic2tpbGxzIjpbWyJEZWx2ZXIiLHRydWVdLFsiRHVuZ2VvbmVlciIsZmFsc2VdLFsiRmluZGVycyBLZWVwZXJzIixmYWxzZV0sWyJHb2xkIFJ1c2giLGZhbHNlXSxbIkd1YXJkIFRoZSBTcG9pbHMiLGZhbHNlXSxbIkx1cmUgT2YgRm9ydHVuZSIsZmFsc2VdLFsiU2xlaWdodCBPZiBIYW5kIixmYWxzZV0sWyJTdXJ2ZXkiLHRydWVdLFsiVHJhaWwgT2YgUmljaGVzIixmYWxzZV1dfX0=';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjExIiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEzIiwieSI6IjciLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEyIiwieSI6IjkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJWb2x1Y3JpeCBSZWF2ZXIiLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9XSwiaGVybzEiOnsidGl0bGUiOiJBdWd1ciBHcmlzb20iLCJ4IjoiMTMiLCJ5IjoiMTEiLCJocCI6IjEyIiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJBcG90aGVjYXJ5Iiwic2tpbGxzIjpbWyJCcmV3IEVsaXhpciIsdHJ1ZV0sWyJDb25jb3Rpb24iLGZhbHNlXSxbIkhlcmJhbCBMb3JlIix0cnVlXSxbIklua3kgU3Vic3RhbmNlIixmYWxzZV0sWyJCb3R0bGVkIENvdXJhZ2UiLGZhbHNlXSxbIlByb3RlY3RpdmUgVG9uaWMiLGZhbHNlXSxbIlNlY3JldCwgRm9ybXVsYSIsZmFsc2VdLFsiSGlkZGVuIFN0YXNoIixmYWxzZV0sWyJQb3RlbnQgUmVtZWRpZXMiLGZhbHNlXV19LCJoZXJvMiI6eyJ0aXRsZSI6IlNpciBWYWxhZGlyIiwieCI6IjExIiwieSI6IjExIiwiaHAiOiIzIiwic3RhbWluYSI6IjAiLCJjbGFzc05hbWUiOiJLbmlnaHQiLCJza2lsbHMiOltbIkFkdmFuY2UiLHRydWVdLFsiQ2hhbGxlbmdlIixmYWxzZV0sWyJEZWZlbmQiLGZhbHNlXSxbIkRlZmVuc2UgVHJhaW5pbmciLGZhbHNlXSxbIkd1YXJkIixmYWxzZV0sWyJJbnNwaXJhdGlvbiIsZmFsc2VdLFsiT2F0aCBPZiBIb25vciIsdHJ1ZV0sWyJTaGllbGQgU2xhbSIsZmFsc2VdLFsiU3RhbHdhcnQiLGZhbHNlXV19LCJoZXJvMyI6eyJ0aXRsZSI6Ikxlb3JpYyBvZiB0aGUgYm9vayIsIngiOiIxMyIsInkiOiIxMCIsImhwIjoiNyIsInN0YW1pbmEiOiIxIiwiY2xhc3NOYW1lIjoiTmVjcm9tYW5jZXIiLCJza2lsbHMiOltbIkFybXkgT2YgRGVhdGgiLGZhbHNlXSxbIkNvcnBzZSBCbGFzdCIsZmFsc2VdLFsiRGFyayBQYWN0IixmYWxzZV0sWyJEZWF0aGx5IEhhc3RlIixmYWxzZV0sWyJEeWluZyBDb21tYW5kIixmYWxzZV0sWyJGdXJ5IE9mIFVuZGVhdGgiLGZhbHNlXSxbIlJhaXNlIERlYWQiLHRydWVdLFsiUmVhbmltYXRlIix0cnVlXSxbIlVuZGVhZCBNaWdodCIsZmFsc2VdLFsiVmFtcGlyaWMgQmxvb2QiLGZhbHNlXV19LCJoZXJvNCI6eyJ0aXRsZSI6IkxpbmRlbCIsIngiOiIxMiIsInkiOiIxMCIsImhwIjoiMTAiLCJzdGFtaW5hIjoiMyIsImNsYXNzTmFtZSI6IlRyZWFzdXJlIEh1bnRlciIsInNraWxscyI6W1siRGVsdmVyIix0cnVlXSxbIkR1bmdlb25lZXIiLGZhbHNlXSxbIkZpbmRlcnMgS2VlcGVycyIsZmFsc2VdLFsiR29sZCBSdXNoIixmYWxzZV0sWyJHdWFyZCBUaGUgU3BvaWxzIixmYWxzZV0sWyJMdXJlIE9mIEZvcnR1bmUiLGZhbHNlXSxbIlNsZWlnaHQgT2YgSGFuZCIsZmFsc2VdLFsiU3VydmV5Iix0cnVlXSxbIlRyYWlsIE9mIFJpY2hlcyIsZmFsc2VdXX19';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjExIiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEzIiwieSI6IjciLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEyIiwieSI6IjkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJWb2x1Y3JpeCBSZWF2ZXIiLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9XSwiaGVybzEiOnsidGl0bGUiOiJBdWd1ciBHcmlzb20iLCJ4IjoiMTMiLCJ5IjoiMTEiLCJocCI6IjEyIiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJBcG90aGVjYXJ5Iiwic2tpbGxzIjpbWyJCcmV3IEVsaXhpciIsdHJ1ZV0sWyJDb25jb2N0aW9uIixmYWxzZV0sWyJIZXJiYWwgTG9yZSIsdHJ1ZV0sWyJJbmt5IFN1YnN0YW5jZSIsZmFsc2VdLFsiQm90dGxlZCBDb3VyYWdlIixmYWxzZV0sWyJQcm90ZWN0aXZlIFRvbmljIixmYWxzZV0sWyJTZWNyZXQgRm9ybXVsYSIsZmFsc2VdLFsiSGlkZGVuIFN0YXNoIixmYWxzZV0sWyJQb3RlbnQgUmVtZWRpZXMiLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJNYWdtYSBCbGFzdCIsImhhbmQyIjoiIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifX0sImhlcm8yIjp7InRpdGxlIjoiU2lyIFZhbGFkaXIiLCJ4IjoiMTEiLCJ5IjoiMTEiLCJocCI6IjMiLCJzdGFtaW5hIjoiMCIsImNsYXNzTmFtZSI6IktuaWdodCIsInNraWxscyI6W1siQWR2YW5jZSIsdHJ1ZV0sWyJDaGFsbGVuZ2UiLGZhbHNlXSxbIkRlZmVuZCIsZmFsc2VdLFsiRGVmZW5zZSBUcmFpbmluZyIsZmFsc2VdLFsiR3VhcmQiLGZhbHNlXSxbIkluc3BpcmF0aW9uIixmYWxzZV0sWyJPYXRoIE9mIEhvbm9yIix0cnVlXSxbIlNoaWVsZCBTbGFtIixmYWxzZV0sWyJTdGFsd2FydCIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6Iklyb24gTG9uZ3N3b3JkIiwiaGFuZDIiOiJXb29kZW4gU2hpZWxkIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEzIiwieSI6IjEwIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEiLCJjbGFzc05hbWUiOiJOZWNyb21hbmNlciIsInNraWxscyI6W1siQXJteSBPZiBEZWF0aCIsZmFsc2VdLFsiQ29ycHNlIEJsYXN0IixmYWxzZV0sWyJEYXJrIFBhY3QiLGZhbHNlXSxbIkRlYXRobHkgSGFzdGUiLGZhbHNlXSxbIkR5aW5nIENvbW1hbmQiLGZhbHNlXSxbIkZ1cnkgT2YgVW5kZWF0aCIsZmFsc2VdLFsiUmFpc2UgRGVhZCIsdHJ1ZV0sWyJSZWFuaW1hdGUiLHRydWVdLFsiVW5kZWFkIE1pZ2h0IixmYWxzZV0sWyJWYW1waXJpYyBCbG9vZCIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IlJlYXBlcnMgU2N5dGhlIiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9fSwiaGVybzQiOnsidGl0bGUiOiJMaW5kZWwiLCJ4IjoiMTIiLCJ5IjoiMTAiLCJocCI6IjEwIiwic3RhbWluYSI6IjMiLCJjbGFzc05hbWUiOiJUcmVhc3VyZSBIdW50ZXIiLCJza2lsbHMiOltbIkRlbHZlciIsdHJ1ZV0sWyJEdW5nZW9uZWVyIixmYWxzZV0sWyJGaW5kZXJzIEtlZXBlcnMiLGZhbHNlXSxbIkdvbGQgUnVzaCIsZmFsc2VdLFsiR3VhcmQgVGhlIFNwb2lscyIsZmFsc2VdLFsiTHVyZSBPZiBGb3J0dW5lIixmYWxzZV0sWyJTbGVpZ2h0IE9mIEhhbmQiLGZhbHNlXSxbIlN1cnZleSIsdHJ1ZV0sWyJUcmFpbCBPZiBSaWNoZXMiLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJMZWF0aGVyIFdoaXAiLCJoYW5kMiI6IiIsImFybW9yIjoiVGhpZWZzIFZlc3QiLCJpdGVtIjoiVGhlIERlYWQgTWFucyBDb21wYXNzIiwiaXRlbTIiOiIifX19';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjExIiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEzIiwieSI6IjciLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEyIiwieSI6IjkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJWb2x1Y3JpeCBSZWF2ZXIiLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9XSwiaGVybzEiOnsidGl0bGUiOiJBdWd1ciBHcmlzb20iLCJ4IjoiMTMiLCJ5IjoiMTEiLCJocCI6IjEyIiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJBcG90aGVjYXJ5Iiwic2tpbGxzIjpbWyJCcmV3IEVsaXhpciIsdHJ1ZV0sWyJDb25jb2N0aW9uIixmYWxzZV0sWyJIZXJiYWwgTG9yZSIsdHJ1ZV0sWyJJbmt5IFN1YnN0YW5jZSIsZmFsc2VdLFsiQm90dGxlZCBDb3VyYWdlIixmYWxzZV0sWyJQcm90ZWN0aXZlIFRvbmljIixmYWxzZV0sWyJTZWNyZXQgRm9ybXVsYSIsZmFsc2VdLFsiSGlkZGVuIFN0YXNoIixmYWxzZV0sWyJQb3RlbnQgUmVtZWRpZXMiLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJNYWdtYSBCbGFzdCIsImhhbmQyIjoiIiwiYXJtb3IiOiIiLCJpdGVtIjoiU3VuIFN0b25lIiwiaXRlbTIiOiIifX0sImhlcm8yIjp7InRpdGxlIjoiU2lyIFZhbGFkaXIiLCJ4IjoiMTEiLCJ5IjoiMTEiLCJocCI6IjMiLCJzdGFtaW5hIjoiMCIsImNsYXNzTmFtZSI6IktuaWdodCIsInNraWxscyI6W1siQWR2YW5jZSIsdHJ1ZV0sWyJDaGFsbGVuZ2UiLGZhbHNlXSxbIkRlZmVuZCIsZmFsc2VdLFsiRGVmZW5zZSBUcmFpbmluZyIsZmFsc2VdLFsiR3VhcmQiLGZhbHNlXSxbIkluc3BpcmF0aW9uIixmYWxzZV0sWyJPYXRoIE9mIEhvbm9yIix0cnVlXSxbIlNoaWVsZCBTbGFtIixmYWxzZV0sWyJTdGFsd2FydCIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6Iklyb24gTG9uZ3N3b3JkIiwiaGFuZDIiOiJXb29kZW4gU2hpZWxkIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEzIiwieSI6IjEwIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEiLCJjbGFzc05hbWUiOiJOZWNyb21hbmNlciIsInNraWxscyI6W1siQXJteSBPZiBEZWF0aCIsZmFsc2VdLFsiQ29ycHNlIEJsYXN0IixmYWxzZV0sWyJEYXJrIFBhY3QiLGZhbHNlXSxbIkRlYXRobHkgSGFzdGUiLGZhbHNlXSxbIkR5aW5nIENvbW1hbmQiLGZhbHNlXSxbIkZ1cnkgT2YgVW5kZWF0aCIsZmFsc2VdLFsiUmFpc2UgRGVhZCIsdHJ1ZV0sWyJSZWFuaW1hdGUiLHRydWVdLFsiVW5kZWFkIE1pZ2h0IixmYWxzZV0sWyJWYW1waXJpYyBCbG9vZCIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IlJlYXBlcnMgU2N5dGhlIiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9fSwiaGVybzQiOnsidGl0bGUiOiJMaW5kZWwiLCJ4IjoiMTIiLCJ5IjoiMTAiLCJocCI6IjEwIiwic3RhbWluYSI6IjMiLCJjbGFzc05hbWUiOiJUcmVhc3VyZSBIdW50ZXIiLCJza2lsbHMiOltbIkRlbHZlciIsdHJ1ZV0sWyJEdW5nZW9uZWVyIixmYWxzZV0sWyJGaW5kZXJzIEtlZXBlcnMiLGZhbHNlXSxbIkdvbGQgUnVzaCIsZmFsc2VdLFsiR3VhcmQgVGhlIFNwb2lscyIsZmFsc2VdLFsiTHVyZSBPZiBGb3J0dW5lIixmYWxzZV0sWyJTbGVpZ2h0IE9mIEhhbmQiLGZhbHNlXSxbIlN1cnZleSIsdHJ1ZV0sWyJUcmFpbCBPZiBSaWNoZXMiLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJMZWF0aGVyIFdoaXAiLCJoYW5kMiI6IiIsImFybW9yIjoiVGhpZWZzIFZlc3QiLCJpdGVtIjoiVGhlIERlYWQgTWFucyBDb21wYXNzIiwiaXRlbTIiOiIifX19';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjExIiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEzIiwieSI6IjciLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjEyIiwieSI6IjkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCJ9LHsidGl0bGUiOiJWb2x1Y3JpeCBSZWF2ZXIiLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9XSwiaGVybzEiOnsidGl0bGUiOiJBdWd1ciBHcmlzb20iLCJ4IjoiMTMiLCJ5IjoiMTEiLCJocCI6IjEyIiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJBcG90aGVjYXJ5Iiwic2tpbGxzIjpbWyJCcmV3IEVsaXhpciIsdHJ1ZV0sWyJDb25jb2N0aW9uIixmYWxzZV0sWyJIZXJiYWwgTG9yZSIsdHJ1ZV0sWyJJbmt5IFN1YnN0YW5jZSIsZmFsc2VdLFsiQm90dGxlZCBDb3VyYWdlIixmYWxzZV0sWyJQcm90ZWN0aXZlIFRvbmljIixmYWxzZV0sWyJTZWNyZXQgRm9ybXVsYSIsZmFsc2VdLFsiSGlkZGVuIFN0YXNoIixmYWxzZV0sWyJQb3RlbnQgUmVtZWRpZXMiLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJNYWdtYSBCbGFzdCIsImhhbmQyIjoiIiwiYXJtb3IiOiIiLCJpdGVtIjoiU3VuIFN0b25lIiwiaXRlbTIiOiIifSwic2FjayI6WyJTbW9raW5nIFZpYWxzIl19LCJoZXJvMiI6eyJ0aXRsZSI6IlNpciBWYWxhZGlyIiwieCI6IjExIiwieSI6IjExIiwiaHAiOiIzIiwic3RhbWluYSI6IjAiLCJjbGFzc05hbWUiOiJLbmlnaHQiLCJza2lsbHMiOltbIkFkdmFuY2UiLHRydWVdLFsiQ2hhbGxlbmdlIixmYWxzZV0sWyJEZWZlbmQiLGZhbHNlXSxbIkRlZmVuc2UgVHJhaW5pbmciLGZhbHNlXSxbIkd1YXJkIixmYWxzZV0sWyJJbnNwaXJhdGlvbiIsZmFsc2VdLFsiT2F0aCBPZiBIb25vciIsdHJ1ZV0sWyJTaGllbGQgU2xhbSIsZmFsc2VdLFsiU3RhbHdhcnQiLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIExvbmdzd29yZCIsImhhbmQyIjoiV29vZGVuIFNoaWVsZCIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdfSwiaGVybzMiOnsidGl0bGUiOiJMZW9yaWMgb2YgdGhlIGJvb2siLCJ4IjoiMTMiLCJ5IjoiMTAiLCJocCI6IjciLCJzdGFtaW5hIjoiMSIsImNsYXNzTmFtZSI6Ik5lY3JvbWFuY2VyIiwic2tpbGxzIjpbWyJBcm15IE9mIERlYXRoIixmYWxzZV0sWyJDb3Jwc2UgQmxhc3QiLGZhbHNlXSxbIkRhcmsgUGFjdCIsZmFsc2VdLFsiRGVhdGhseSBIYXN0ZSIsZmFsc2VdLFsiRHlpbmcgQ29tbWFuZCIsZmFsc2VdLFsiRnVyeSBPZiBVbmRlYXRoIixmYWxzZV0sWyJSYWlzZSBEZWFkIix0cnVlXSxbIlJlYW5pbWF0ZSIsdHJ1ZV0sWyJVbmRlYWQgTWlnaHQiLGZhbHNlXSxbIlZhbXBpcmljIEJsb29kIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiUmVhcGVycyBTY3l0aGUiLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdfSwiaGVybzQiOnsidGl0bGUiOiJMaW5kZWwiLCJ4IjoiMTIiLCJ5IjoiMTAiLCJocCI6IjEwIiwic3RhbWluYSI6IjMiLCJjbGFzc05hbWUiOiJUcmVhc3VyZSBIdW50ZXIiLCJza2lsbHMiOltbIkRlbHZlciIsdHJ1ZV0sWyJEdW5nZW9uZWVyIixmYWxzZV0sWyJGaW5kZXJzIEtlZXBlcnMiLGZhbHNlXSxbIkdvbGQgUnVzaCIsZmFsc2VdLFsiR3VhcmQgVGhlIFNwb2lscyIsZmFsc2VdLFsiTHVyZSBPZiBGb3J0dW5lIixmYWxzZV0sWyJTbGVpZ2h0IE9mIEhhbmQiLGZhbHNlXSxbIlN1cnZleSIsdHJ1ZV0sWyJUcmFpbCBPZiBSaWNoZXMiLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJMZWF0aGVyIFdoaXAiLCJoYW5kMiI6IiIsImFybW9yIjoiVGhpZWZzIFZlc3QiLCJpdGVtIjoiVGhlIERlYWQgTWFucyBDb21wYXNzIiwiaXRlbTIiOiIifSwic2FjayI6WyJGbGlwcGVkIiwiV2FyZGluZyBUYWxpc21hbiJdfX0=';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOnRydWUsIngiOiIxMSIsInkiOiI4IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjEwIiwieSI6IjEyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjExIiwieSI6IjEyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiVm9sdWNyaXggUmVhdmVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9LHsidGl0bGUiOiJWb2x1Y3JpeCBSZWF2ZXIiLCJtYXN0ZXIiOnRydWUsIngiOiIxNSIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUifV0sImhlcm8xIjp7InRpdGxlIjoiQXVndXIgR3Jpc29tIiwieCI6IjEzIiwieSI6IjExIiwiaHAiOiIxMiIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiQXBvdGhlY2FyeSIsInNraWxscyI6W1siQnJldyBFbGl4aXIiLHRydWVdLFsiQ29uY29jdGlvbiIsZmFsc2VdLFsiSGVyYmFsIExvcmUiLHRydWVdLFsiSW5reSBTdWJzdGFuY2UiLGZhbHNlXSxbIkJvdHRsZWQgQ291cmFnZSIsZmFsc2VdLFsiUHJvdGVjdGl2ZSBUb25pYyIsZmFsc2VdLFsiU2VjcmV0IEZvcm11bGEiLGZhbHNlXSxbIkhpZGRlbiBTdGFzaCIsZmFsc2VdLFsiUG90ZW50IFJlbWVkaWVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTWFnbWEgQmxhc3QiLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IlN1biBTdG9uZSIsIml0ZW0yIjoiIn0sInNhY2siOlsiU21va2luZyBWaWFscyJdfSwiaGVybzIiOnsidGl0bGUiOiJTaXIgVmFsYWRpciIsIngiOiIxMSIsInkiOiIxMSIsImhwIjoiMiIsInN0YW1pbmEiOiIwIiwiY2xhc3NOYW1lIjoiS25pZ2h0Iiwic2tpbGxzIjpbWyJBZHZhbmNlIix0cnVlXSxbIkNoYWxsZW5nZSIsZmFsc2VdLFsiRGVmZW5kIixmYWxzZV0sWyJEZWZlbnNlIFRyYWluaW5nIixmYWxzZV0sWyJHdWFyZCIsZmFsc2VdLFsiSW5zcGlyYXRpb24iLGZhbHNlXSxbIk9hdGggT2YgSG9ub3IiLHRydWVdLFsiU2hpZWxkIFNsYW0iLGZhbHNlXSxbIlN0YWx3YXJ0IixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBMb25nc3dvcmQiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEzIiwieSI6IjEwIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEiLCJjbGFzc05hbWUiOiJOZWNyb21hbmNlciIsInNraWxscyI6W1siQXJteSBPZiBEZWF0aCIsZmFsc2VdLFsiQ29ycHNlIEJsYXN0IixmYWxzZV0sWyJEYXJrIFBhY3QiLGZhbHNlXSxbIkRlYXRobHkgSGFzdGUiLGZhbHNlXSxbIkR5aW5nIENvbW1hbmQiLGZhbHNlXSxbIkZ1cnkgT2YgVW5kZWF0aCIsZmFsc2VdLFsiUmFpc2UgRGVhZCIsdHJ1ZV0sWyJSZWFuaW1hdGUiLHRydWVdLFsiVW5kZWFkIE1pZ2h0IixmYWxzZV0sWyJWYW1waXJpYyBCbG9vZCIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IlJlYXBlcnMgU2N5dGhlIiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm80Ijp7InRpdGxlIjoiTGluZGVsIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiIxMCIsInN0YW1pbmEiOiIzIiwiY2xhc3NOYW1lIjoiVHJlYXN1cmUgSHVudGVyIiwic2tpbGxzIjpbWyJEZWx2ZXIiLHRydWVdLFsiRHVuZ2VvbmVlciIsZmFsc2VdLFsiRmluZGVycyBLZWVwZXJzIixmYWxzZV0sWyJHb2xkIFJ1c2giLGZhbHNlXSxbIkd1YXJkIFRoZSBTcG9pbHMiLGZhbHNlXSxbIkx1cmUgT2YgRm9ydHVuZSIsZmFsc2VdLFsiU2xlaWdodCBPZiBIYW5kIixmYWxzZV0sWyJTdXJ2ZXkiLHRydWVdLFsiVHJhaWwgT2YgUmljaGVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTGVhdGhlciBXaGlwIiwiaGFuZDIiOiIiLCJhcm1vciI6IlRoaWVmcyBWZXN0IiwiaXRlbSI6IlRoZSBEZWFkIE1hbnMgQ29tcGFzcyIsIml0ZW0yIjoiIn0sInNhY2siOlsiRmxpcHBlZCIsIldhcmRpbmcgVGFsaXNtYW4iXX0sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzMCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxMCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjE2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMzgiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjciLCJhbmdsZSI6IjkwIn1dfQ==';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOnRydWUsIngiOiIxMSIsInkiOiI4IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjEwIiwieSI6IjEyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjExIiwieSI6IjEyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiVm9sdWNyaXggUmVhdmVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9LHsidGl0bGUiOiJWb2x1Y3JpeCBSZWF2ZXIiLCJtYXN0ZXIiOnRydWUsIngiOiIxNSIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUifV0sImhlcm8xIjp7InRpdGxlIjoiQXVndXIgR3Jpc29tIiwieCI6IjEzIiwieSI6IjExIiwiaHAiOiIxMiIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiQXBvdGhlY2FyeSIsInNraWxscyI6W1siQnJldyBFbGl4aXIiLHRydWVdLFsiQ29uY29jdGlvbiIsZmFsc2VdLFsiSGVyYmFsIExvcmUiLHRydWVdLFsiSW5reSBTdWJzdGFuY2UiLGZhbHNlXSxbIkJvdHRsZWQgQ291cmFnZSIsZmFsc2VdLFsiUHJvdGVjdGl2ZSBUb25pYyIsZmFsc2VdLFsiU2VjcmV0IEZvcm11bGEiLGZhbHNlXSxbIkhpZGRlbiBTdGFzaCIsZmFsc2VdLFsiUG90ZW50IFJlbWVkaWVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTWFnbWEgQmxhc3QiLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IlN1biBTdG9uZSIsIml0ZW0yIjoiIn0sInNhY2siOlsiU21va2luZyBWaWFscyJdfSwiaGVybzIiOnsidGl0bGUiOiJTaXIgVmFsYWRpciIsIngiOiIxMSIsInkiOiIxMSIsImhwIjoiMiIsInN0YW1pbmEiOiIwIiwiY2xhc3NOYW1lIjoiS25pZ2h0Iiwic2tpbGxzIjpbWyJBZHZhbmNlIix0cnVlXSxbIkNoYWxsZW5nZSIsZmFsc2VdLFsiRGVmZW5kIixmYWxzZV0sWyJEZWZlbnNlIFRyYWluaW5nIixmYWxzZV0sWyJHdWFyZCIsZmFsc2VdLFsiSW5zcGlyYXRpb24iLGZhbHNlXSxbIk9hdGggT2YgSG9ub3IiLHRydWVdLFsiU2hpZWxkIFNsYW0iLGZhbHNlXSxbIlN0YWx3YXJ0IixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBMb25nc3dvcmQiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEzIiwieSI6IjEwIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEiLCJjbGFzc05hbWUiOiJOZWNyb21hbmNlciIsInNraWxscyI6W1siQXJteSBPZiBEZWF0aCIsZmFsc2VdLFsiQ29ycHNlIEJsYXN0IixmYWxzZV0sWyJEYXJrIFBhY3QiLGZhbHNlXSxbIkRlYXRobHkgSGFzdGUiLGZhbHNlXSxbIkR5aW5nIENvbW1hbmQiLGZhbHNlXSxbIkZ1cnkgT2YgVW5kZWF0aCIsZmFsc2VdLFsiUmFpc2UgRGVhZCIsdHJ1ZV0sWyJSZWFuaW1hdGUiLHRydWVdLFsiVW5kZWFkIE1pZ2h0IixmYWxzZV0sWyJWYW1waXJpYyBCbG9vZCIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IlJlYXBlcnMgU2N5dGhlIiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm80Ijp7InRpdGxlIjoiTGluZGVsIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiIxMCIsInN0YW1pbmEiOiIzIiwiY2xhc3NOYW1lIjoiVHJlYXN1cmUgSHVudGVyIiwic2tpbGxzIjpbWyJEZWx2ZXIiLHRydWVdLFsiRHVuZ2VvbmVlciIsZmFsc2VdLFsiRmluZGVycyBLZWVwZXJzIixmYWxzZV0sWyJHb2xkIFJ1c2giLGZhbHNlXSxbIkd1YXJkIFRoZSBTcG9pbHMiLGZhbHNlXSxbIkx1cmUgT2YgRm9ydHVuZSIsZmFsc2VdLFsiU2xlaWdodCBPZiBIYW5kIixmYWxzZV0sWyJTdXJ2ZXkiLHRydWVdLFsiVHJhaWwgT2YgUmljaGVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTGVhdGhlciBXaGlwIiwiaGFuZDIiOiIiLCJhcm1vciI6IlRoaWVmcyBWZXN0IiwiaXRlbSI6IlRoZSBEZWFkIE1hbnMgQ29tcGFzcyIsIml0ZW0yIjoiIn0sInNhY2siOlsiRmxpcHBlZCIsIldhcmRpbmcgVGFsaXNtYW4iXX0sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzMCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxMCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjE2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMzgiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjciLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJTaHJ1YmJlcnkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI5IiwieSI6IjYifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNyIsInkiOiI2In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjEzIiwieSI6IjYifSx7InRpdGxlIjoiU2hydWJiZXJ5IiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOSIsInkiOiIxNCJ9XX0=';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOnRydWUsIngiOiIxMSIsInkiOiI4IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjEwIiwieSI6IjEyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjExIiwieSI6IjEyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiVm9sdWNyaXggUmVhdmVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9LHsidGl0bGUiOiJWb2x1Y3JpeCBSZWF2ZXIiLCJtYXN0ZXIiOnRydWUsIngiOiIxNSIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUifV0sImhlcm8xIjp7InRpdGxlIjoiQXVndXIgR3Jpc29tIiwieCI6IjEzIiwieSI6IjExIiwiaHAiOiIxMiIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiQXBvdGhlY2FyeSIsInNraWxscyI6W1siQnJldyBFbGl4aXIiLHRydWVdLFsiQ29uY29jdGlvbiIsZmFsc2VdLFsiSGVyYmFsIExvcmUiLHRydWVdLFsiSW5reSBTdWJzdGFuY2UiLGZhbHNlXSxbIkJvdHRsZWQgQ291cmFnZSIsZmFsc2VdLFsiUHJvdGVjdGl2ZSBUb25pYyIsZmFsc2VdLFsiU2VjcmV0IEZvcm11bGEiLGZhbHNlXSxbIkhpZGRlbiBTdGFzaCIsZmFsc2VdLFsiUG90ZW50IFJlbWVkaWVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTWFnbWEgQmxhc3QiLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IlN1biBTdG9uZSIsIml0ZW0yIjoiIn0sInNhY2siOlsiU21va2luZyBWaWFscyJdfSwiaGVybzIiOnsidGl0bGUiOiJTaXIgVmFsYWRpciIsIngiOiIxMSIsInkiOiIxMSIsImhwIjoiMiIsInN0YW1pbmEiOiIwIiwiY2xhc3NOYW1lIjoiS25pZ2h0Iiwic2tpbGxzIjpbWyJBZHZhbmNlIix0cnVlXSxbIkNoYWxsZW5nZSIsZmFsc2VdLFsiRGVmZW5kIixmYWxzZV0sWyJEZWZlbnNlIFRyYWluaW5nIixmYWxzZV0sWyJHdWFyZCIsZmFsc2VdLFsiSW5zcGlyYXRpb24iLGZhbHNlXSxbIk9hdGggT2YgSG9ub3IiLHRydWVdLFsiU2hpZWxkIFNsYW0iLGZhbHNlXSxbIlN0YWx3YXJ0IixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBMb25nc3dvcmQiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEzIiwieSI6IjEwIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEiLCJjbGFzc05hbWUiOiJOZWNyb21hbmNlciIsInNraWxscyI6W1siQXJteSBPZiBEZWF0aCIsZmFsc2VdLFsiQ29ycHNlIEJsYXN0IixmYWxzZV0sWyJEYXJrIFBhY3QiLGZhbHNlXSxbIkRlYXRobHkgSGFzdGUiLGZhbHNlXSxbIkR5aW5nIENvbW1hbmQiLGZhbHNlXSxbIkZ1cnkgT2YgVW5kZWF0aCIsZmFsc2VdLFsiUmFpc2UgRGVhZCIsdHJ1ZV0sWyJSZWFuaW1hdGUiLHRydWVdLFsiVW5kZWFkIE1pZ2h0IixmYWxzZV0sWyJWYW1waXJpYyBCbG9vZCIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IlJlYXBlcnMgU2N5dGhlIiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm80Ijp7InRpdGxlIjoiTGluZGVsIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiIxMCIsInN0YW1pbmEiOiIzIiwiY2xhc3NOYW1lIjoiVHJlYXN1cmUgSHVudGVyIiwic2tpbGxzIjpbWyJEZWx2ZXIiLHRydWVdLFsiRHVuZ2VvbmVlciIsZmFsc2VdLFsiRmluZGVycyBLZWVwZXJzIixmYWxzZV0sWyJHb2xkIFJ1c2giLGZhbHNlXSxbIkd1YXJkIFRoZSBTcG9pbHMiLGZhbHNlXSxbIkx1cmUgT2YgRm9ydHVuZSIsZmFsc2VdLFsiU2xlaWdodCBPZiBIYW5kIixmYWxzZV0sWyJTdXJ2ZXkiLHRydWVdLFsiVHJhaWwgT2YgUmljaGVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTGVhdGhlciBXaGlwIiwiaGFuZDIiOiIiLCJhcm1vciI6IlRoaWVmcyBWZXN0IiwiaXRlbSI6IlRoZSBEZWFkIE1hbnMgQ29tcGFzcyIsIml0ZW0yIjoiIn0sInNhY2siOlsiRmxpcHBlZCIsIldhcmRpbmcgVGFsaXNtYW4iXX0sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzMCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxMCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjE2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMzgiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjciLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJTaHJ1YmJlcnkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI5IiwieSI6IjYifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNyIsInkiOiI2In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjEzIiwieSI6IjYifSx7InRpdGxlIjoiU2hydWJiZXJ5IiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOSIsInkiOiIxNCJ9XSwieHMiOlt7InRpdGxlIjoiMngyIiwieCI6IjE1IiwieSI6IjcifSx7InRpdGxlIjoiMngyIiwieCI6IjMiLCJ5IjoiMTIifV19';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOnRydWUsIngiOiIxMSIsInkiOiI4IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjEwIiwieSI6IjEyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjExIiwieSI6IjEyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiVm9sdWNyaXggUmVhdmVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9LHsidGl0bGUiOiJWb2x1Y3JpeCBSZWF2ZXIiLCJtYXN0ZXIiOnRydWUsIngiOiIxNSIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUifV0sImhlcm8xIjp7InRpdGxlIjoiQXVndXIgR3Jpc29tIiwieCI6IjEzIiwieSI6IjExIiwiaHAiOiIxMiIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiQXBvdGhlY2FyeSIsInNraWxscyI6W1siQnJldyBFbGl4aXIiLHRydWVdLFsiQ29uY29jdGlvbiIsZmFsc2VdLFsiSGVyYmFsIExvcmUiLHRydWVdLFsiSW5reSBTdWJzdGFuY2UiLGZhbHNlXSxbIkJvdHRsZWQgQ291cmFnZSIsZmFsc2VdLFsiUHJvdGVjdGl2ZSBUb25pYyIsZmFsc2VdLFsiU2VjcmV0IEZvcm11bGEiLGZhbHNlXSxbIkhpZGRlbiBTdGFzaCIsZmFsc2VdLFsiUG90ZW50IFJlbWVkaWVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTWFnbWEgQmxhc3QiLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IlN1biBTdG9uZSIsIml0ZW0yIjoiIn0sInNhY2siOlsiU21va2luZyBWaWFscyJdfSwiaGVybzIiOnsidGl0bGUiOiJTaXIgVmFsYWRpciIsIngiOiIxMSIsInkiOiIxMSIsImhwIjoiMiIsInN0YW1pbmEiOiIwIiwiY2xhc3NOYW1lIjoiS25pZ2h0Iiwic2tpbGxzIjpbWyJBZHZhbmNlIix0cnVlXSxbIkNoYWxsZW5nZSIsZmFsc2VdLFsiRGVmZW5kIixmYWxzZV0sWyJEZWZlbnNlIFRyYWluaW5nIixmYWxzZV0sWyJHdWFyZCIsZmFsc2VdLFsiSW5zcGlyYXRpb24iLGZhbHNlXSxbIk9hdGggT2YgSG9ub3IiLHRydWVdLFsiU2hpZWxkIFNsYW0iLGZhbHNlXSxbIlN0YWx3YXJ0IixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBMb25nc3dvcmQiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEzIiwieSI6IjEwIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEiLCJjbGFzc05hbWUiOiJOZWNyb21hbmNlciIsInNraWxscyI6W1siQXJteSBPZiBEZWF0aCIsZmFsc2VdLFsiQ29ycHNlIEJsYXN0IixmYWxzZV0sWyJEYXJrIFBhY3QiLGZhbHNlXSxbIkRlYXRobHkgSGFzdGUiLGZhbHNlXSxbIkR5aW5nIENvbW1hbmQiLGZhbHNlXSxbIkZ1cnkgT2YgVW5kZWF0aCIsZmFsc2VdLFsiUmFpc2UgRGVhZCIsdHJ1ZV0sWyJSZWFuaW1hdGUiLHRydWVdLFsiVW5kZWFkIE1pZ2h0IixmYWxzZV0sWyJWYW1waXJpYyBCbG9vZCIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IlJlYXBlcnMgU2N5dGhlIiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm80Ijp7InRpdGxlIjoiTGluZGVsIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiIxMCIsInN0YW1pbmEiOiIzIiwiY2xhc3NOYW1lIjoiVHJlYXN1cmUgSHVudGVyIiwic2tpbGxzIjpbWyJEZWx2ZXIiLHRydWVdLFsiRHVuZ2VvbmVlciIsZmFsc2VdLFsiRmluZGVycyBLZWVwZXJzIixmYWxzZV0sWyJHb2xkIFJ1c2giLGZhbHNlXSxbIkd1YXJkIFRoZSBTcG9pbHMiLGZhbHNlXSxbIkx1cmUgT2YgRm9ydHVuZSIsZmFsc2VdLFsiU2xlaWdodCBPZiBIYW5kIixmYWxzZV0sWyJTdXJ2ZXkiLHRydWVdLFsiVHJhaWwgT2YgUmljaGVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTGVhdGhlciBXaGlwIiwiaGFuZDIiOiIiLCJhcm1vciI6IlRoaWVmcyBWZXN0IiwiaXRlbSI6IlRoZSBEZWFkIE1hbnMgQ29tcGFzcyIsIml0ZW0yIjoiIn0sInNhY2siOlsiRmxpcHBlZCIsIldhcmRpbmcgVGFsaXNtYW4iXX0sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzMCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxMCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjE2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMzgiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjciLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJTaHJ1YmJlcnkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI5IiwieSI6IjYifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNyIsInkiOiI2In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjEzIiwieSI6IjYifSx7InRpdGxlIjoiU2hydWJiZXJ5IiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOSIsInkiOiIxNCJ9XSwieHMiOlt7InRpdGxlIjoiMngyIiwieCI6IjE1IiwieSI6IjcifSx7InRpdGxlIjoiMngyIiwieCI6IjMiLCJ5IjoiMTIifV0sImFsbGllcyI6W3sidGl0bGUiOiJSYXl0aGVuIiwieCI6IjE0IiwieSI6IjEwIiwiaHAiOiI4In1dLCJmYW1pbGlhcnMiOlt7InRpdGxlIjoiUmVhbmltYXRlIiwieCI6IjEwIiwieSI6IjEwIiwiaHAiOiI0In1dfQ==';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOnRydWUsIngiOiIxMSIsInkiOiI4IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjEwIiwieSI6IjEyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjExIiwieSI6IjEyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiVm9sdWNyaXggUmVhdmVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjE1IiwieSI6IjgiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9LHsidGl0bGUiOiJWb2x1Y3JpeCBSZWF2ZXIiLCJtYXN0ZXIiOnRydWUsIngiOiIxNSIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUifV0sImhlcm8xIjp7InRpdGxlIjoiQXVndXIgR3Jpc29tIiwieCI6IjEzIiwieSI6IjExIiwiaHAiOiIxMiIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiQXBvdGhlY2FyeSIsInNraWxscyI6W1siQnJldyBFbGl4aXIiLHRydWVdLFsiQ29uY29jdGlvbiIsZmFsc2VdLFsiSGVyYmFsIExvcmUiLHRydWVdLFsiSW5reSBTdWJzdGFuY2UiLGZhbHNlXSxbIkJvdHRsZWQgQ291cmFnZSIsZmFsc2VdLFsiUHJvdGVjdGl2ZSBUb25pYyIsZmFsc2VdLFsiU2VjcmV0IEZvcm11bGEiLGZhbHNlXSxbIkhpZGRlbiBTdGFzaCIsZmFsc2VdLFsiUG90ZW50IFJlbWVkaWVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTWFnbWEgQmxhc3QiLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IlN1biBTdG9uZSIsIml0ZW0yIjoiIn0sInNhY2siOlsiU21va2luZyBWaWFscyJdfSwiaGVybzIiOnsidGl0bGUiOiJTaXIgVmFsYWRpciIsIngiOiIxMSIsInkiOiIxMSIsImhwIjoiMiIsInN0YW1pbmEiOiIwIiwiY2xhc3NOYW1lIjoiS25pZ2h0Iiwic2tpbGxzIjpbWyJBZHZhbmNlIix0cnVlXSxbIkNoYWxsZW5nZSIsZmFsc2VdLFsiRGVmZW5kIixmYWxzZV0sWyJEZWZlbnNlIFRyYWluaW5nIixmYWxzZV0sWyJHdWFyZCIsZmFsc2VdLFsiSW5zcGlyYXRpb24iLGZhbHNlXSxbIk9hdGggT2YgSG9ub3IiLHRydWVdLFsiU2hpZWxkIFNsYW0iLGZhbHNlXSxbIlN0YWx3YXJ0IixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBMb25nc3dvcmQiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEzIiwieSI6IjEwIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEiLCJjbGFzc05hbWUiOiJOZWNyb21hbmNlciIsInNraWxscyI6W1siQXJteSBPZiBEZWF0aCIsZmFsc2VdLFsiQ29ycHNlIEJsYXN0IixmYWxzZV0sWyJEYXJrIFBhY3QiLGZhbHNlXSxbIkRlYXRobHkgSGFzdGUiLGZhbHNlXSxbIkR5aW5nIENvbW1hbmQiLGZhbHNlXSxbIkZ1cnkgT2YgVW5kZWF0aCIsZmFsc2VdLFsiUmFpc2UgRGVhZCIsdHJ1ZV0sWyJSZWFuaW1hdGUiLHRydWVdLFsiVW5kZWFkIE1pZ2h0IixmYWxzZV0sWyJWYW1waXJpYyBCbG9vZCIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IlJlYXBlcnMgU2N5dGhlIiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm80Ijp7InRpdGxlIjoiTGluZGVsIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiIxMCIsInN0YW1pbmEiOiIzIiwiY2xhc3NOYW1lIjoiVHJlYXN1cmUgSHVudGVyIiwic2tpbGxzIjpbWyJEZWx2ZXIiLHRydWVdLFsiRHVuZ2VvbmVlciIsZmFsc2VdLFsiRmluZGVycyBLZWVwZXJzIixmYWxzZV0sWyJHb2xkIFJ1c2giLGZhbHNlXSxbIkd1YXJkIFRoZSBTcG9pbHMiLGZhbHNlXSxbIkx1cmUgT2YgRm9ydHVuZSIsZmFsc2VdLFsiU2xlaWdodCBPZiBIYW5kIixmYWxzZV0sWyJTdXJ2ZXkiLHRydWVdLFsiVHJhaWwgT2YgUmljaGVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTGVhdGhlciBXaGlwIiwiaGFuZDIiOiIiLCJhcm1vciI6IlRoaWVmcyBWZXN0IiwiaXRlbSI6IlRoZSBEZWFkIE1hbnMgQ29tcGFzcyIsIml0ZW0yIjoiIn0sInNhY2siOlsiRmxpcHBlZCIsIldhcmRpbmcgVGFsaXNtYW4iXX0sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzMCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxMCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjE2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMzgiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjciLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJTaHJ1YmJlcnkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI5IiwieSI6IjYifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNyIsInkiOiI2In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjEzIiwieSI6IjYifSx7InRpdGxlIjoiU2hydWJiZXJ5IiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOSIsInkiOiIxNCJ9XSwieHMiOlt7InRpdGxlIjoiMngyIiwieCI6IjE1IiwieSI6IjcifSx7InRpdGxlIjoiMngyIiwieCI6IjMiLCJ5IjoiMTIifV0sImFsbGllcyI6W3sidGl0bGUiOiJSYXl0aGVuIiwieCI6IjE0IiwieSI6IjEwIiwiaHAiOiI4In1dLCJmYW1pbGlhcnMiOlt7InRpdGxlIjoiUmVhbmltYXRlIiwieCI6IjEwIiwieSI6IjEwIiwiaHAiOiI0In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6InVua25vd24iLCJ4IjoiOSIsInkiOiIxIn0seyJ0aXRsZSI6InVua25vd24iLCJ4IjoiMTEiLCJ5IjoiMCJ9LHsidGl0bGUiOiJ1bmtub3duIiwieCI6IjgiLCJ5IjoiNCJ9LHsidGl0bGUiOiJ1bmtub3duIiwieCI6IjYiLCJ5IjoiNyJ9LHsidGl0bGUiOiJ1bmtub3duIiwieCI6IjMiLCJ5IjoiOCJ9LHsidGl0bGUiOiJ1bmtub3duIiwieCI6IjE2IiwieSI6IjUifSx7InRpdGxlIjoidW5rbm93biIsIngiOiIxNyIsInkiOiI5In0seyJ0aXRsZSI6InVua25vd24iLCJ4IjoiMyIsInkiOiIxMCJ9LHsidGl0bGUiOiJ1bmtub3duIiwieCI6IjEiLCJ5IjoiMTMifSx7InRpdGxlIjoidW5rbm93biIsIngiOiIzIiwieSI6IjE1In1dfQ==';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOnRydWUsIngiOiIxMSIsInkiOiI4IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjUiLCJjb25kaXRpb25zIjpbIlBvaXNvbmVkIl19LHsidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTAiLCJ5IjoiMTIiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibWFzdGVyIjpmYWxzZSwieCI6IjExIiwieSI6IjEyIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IlZvbHVjcml4IFJlYXZlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNSIsInkiOiI4IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjMiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IlZvbHVjcml4IFJlYXZlciIsIm1hc3RlciI6dHJ1ZSwieCI6IjE1IiwieSI6IjciLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSIsImNvbmRpdGlvbnMiOltdfV0sImhlcm8xIjp7InRpdGxlIjoiQXVndXIgR3Jpc29tIiwieCI6IjEzIiwieSI6IjExIiwiaHAiOiIxMiIsInN0YW1pbmEiOiI1IiwiY2xhc3NOYW1lIjoiQXBvdGhlY2FyeSIsInNraWxscyI6W1siQnJldyBFbGl4aXIiLHRydWVdLFsiQ29uY29jdGlvbiIsZmFsc2VdLFsiSGVyYmFsIExvcmUiLHRydWVdLFsiSW5reSBTdWJzdGFuY2UiLGZhbHNlXSxbIkJvdHRsZWQgQ291cmFnZSIsZmFsc2VdLFsiUHJvdGVjdGl2ZSBUb25pYyIsZmFsc2VdLFsiU2VjcmV0IEZvcm11bGEiLGZhbHNlXSxbIkhpZGRlbiBTdGFzaCIsZmFsc2VdLFsiUG90ZW50IFJlbWVkaWVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTWFnbWEgQmxhc3QiLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IlN1biBTdG9uZSIsIml0ZW0yIjoiIn0sInNhY2siOlsiU21va2luZyBWaWFscyJdfSwiaGVybzIiOnsidGl0bGUiOiJTaXIgVmFsYWRpciIsIngiOiIxMSIsInkiOiIxMSIsImhwIjoiMiIsInN0YW1pbmEiOiIwIiwiY2xhc3NOYW1lIjoiS25pZ2h0Iiwic2tpbGxzIjpbWyJBZHZhbmNlIix0cnVlXSxbIkNoYWxsZW5nZSIsZmFsc2VdLFsiRGVmZW5kIixmYWxzZV0sWyJEZWZlbnNlIFRyYWluaW5nIixmYWxzZV0sWyJHdWFyZCIsZmFsc2VdLFsiSW5zcGlyYXRpb24iLGZhbHNlXSxbIk9hdGggT2YgSG9ub3IiLHRydWVdLFsiU2hpZWxkIFNsYW0iLGZhbHNlXSxbIlN0YWx3YXJ0IixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBMb25nc3dvcmQiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEzIiwieSI6IjEwIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEiLCJjbGFzc05hbWUiOiJOZWNyb21hbmNlciIsInNraWxscyI6W1siQXJteSBPZiBEZWF0aCIsZmFsc2VdLFsiQ29ycHNlIEJsYXN0IixmYWxzZV0sWyJEYXJrIFBhY3QiLGZhbHNlXSxbIkRlYXRobHkgSGFzdGUiLGZhbHNlXSxbIkR5aW5nIENvbW1hbmQiLGZhbHNlXSxbIkZ1cnkgT2YgVW5kZWF0aCIsZmFsc2VdLFsiUmFpc2UgRGVhZCIsdHJ1ZV0sWyJSZWFuaW1hdGUiLHRydWVdLFsiVW5kZWFkIE1pZ2h0IixmYWxzZV0sWyJWYW1waXJpYyBCbG9vZCIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IlJlYXBlcnMgU2N5dGhlIiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXX0sImhlcm80Ijp7InRpdGxlIjoiTGluZGVsIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiIxMCIsInN0YW1pbmEiOiIzIiwiY2xhc3NOYW1lIjoiVHJlYXN1cmUgSHVudGVyIiwic2tpbGxzIjpbWyJEZWx2ZXIiLHRydWVdLFsiRHVuZ2VvbmVlciIsZmFsc2VdLFsiRmluZGVycyBLZWVwZXJzIixmYWxzZV0sWyJHb2xkIFJ1c2giLGZhbHNlXSxbIkd1YXJkIFRoZSBTcG9pbHMiLGZhbHNlXSxbIkx1cmUgT2YgRm9ydHVuZSIsZmFsc2VdLFsiU2xlaWdodCBPZiBIYW5kIixmYWxzZV0sWyJTdXJ2ZXkiLHRydWVdLFsiVHJhaWwgT2YgUmljaGVzIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiTGVhdGhlciBXaGlwIiwiaGFuZDIiOiIiLCJhcm1vciI6IlRoaWVmcyBWZXN0IiwiaXRlbSI6IlRoZSBEZWFkIE1hbnMgQ29tcGFzcyIsIml0ZW0yIjoiIn0sInNhY2siOlsiRmxpcHBlZCIsIldhcmRpbmcgVGFsaXNtYW4iXX0sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQiIsIngiOiIxNCIsInkiOiI2IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjUiLCJzaWRlIjoiQiIsIngiOiI5IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE1IiwieSI6IjUiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIxMCIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkIiLCJ4IjoiOCIsInkiOiIzIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIzMCIsInNpZGUiOiJCIiwieCI6IjQiLCJ5IjoiNyIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQiIsIngiOiIzIiwieSI6IjciLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjEzIiwic2lkZSI6IkIiLCJ4IjoiMiIsInkiOiIxMCIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjEiLCJ5IjoiMTIiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJCIiwieCI6IjE0IiwieSI6IjEwIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXh0ZW5zaW9uMngyIiwic2lkZSI6IkIiLCJ4IjoiMTAiLCJ5IjoiMTQiLCJhbmdsZSI6IjI3MCJ9LHsidGl0bGUiOiJFbnRyYW5jZSIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjE2IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiMzgiLCJzaWRlIjoiQiIsIngiOiI4IiwieSI6IjciLCJhbmdsZSI6IjkwIn1dLCJkb29ycyI6W3sidGl0bGUiOiJTaHJ1YmJlcnkiLCJ2ZXJ0aWNhbCI6ZmFsc2UsIngiOiI5IiwieSI6IjYifSx7InRpdGxlIjoiRG9vciIsInZlcnRpY2FsIjp0cnVlLCJ4IjoiNyIsInkiOiI2In0seyJ0aXRsZSI6IkRvb3IiLCJ2ZXJ0aWNhbCI6dHJ1ZSwieCI6IjEzIiwieSI6IjYifSx7InRpdGxlIjoiU2hydWJiZXJ5IiwidmVydGljYWwiOmZhbHNlLCJ4IjoiOSIsInkiOiIxNCJ9XSwieHMiOlt7InRpdGxlIjoiMngyIiwieCI6IjE1IiwieSI6IjcifSx7InRpdGxlIjoiMngyIiwieCI6IjMiLCJ5IjoiMTIifV0sImFsbGllcyI6W3sidGl0bGUiOiJSYXl0aGVuIiwieCI6IjE0IiwieSI6IjEwIiwiaHAiOiI4In1dLCJmYW1pbGlhcnMiOlt7InRpdGxlIjoiUmVhbmltYXRlIiwieCI6IjEwIiwieSI6IjEwIiwiaHAiOiI0In1dLCJvYmplY3RpdmVzIjpbeyJ0aXRsZSI6InVua25vd24iLCJ4IjoiOSIsInkiOiIxIn0seyJ0aXRsZSI6InVua25vd24iLCJ4IjoiMTEiLCJ5IjoiMCJ9LHsidGl0bGUiOiJ1bmtub3duIiwieCI6IjgiLCJ5IjoiNCJ9LHsidGl0bGUiOiJ1bmtub3duIiwieCI6IjYiLCJ5IjoiNyJ9LHsidGl0bGUiOiJ1bmtub3duIiwieCI6IjMiLCJ5IjoiOCJ9LHsidGl0bGUiOiJ1bmtub3duIiwieCI6IjE2IiwieSI6IjUifSx7InRpdGxlIjoidW5rbm93biIsIngiOiIxNyIsInkiOiI5In0seyJ0aXRsZSI6InVua25vd24iLCJ4IjoiMyIsInkiOiIxMCJ9LHsidGl0bGUiOiJ1bmtub3duIiwieCI6IjEiLCJ5IjoiMTMifSx7InRpdGxlIjoidW5rbm93biIsIngiOiIzIiwieSI6IjE1In1dfQ==';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJFdHRpbiIsIm1hc3RlciI6dHJ1ZSwieCI6IjEwIiwieSI6IjAiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMTYiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IkV0dGluIiwibWFzdGVyIjpmYWxzZSwieCI6IjEwIiwieSI6IjIiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6dHJ1ZSwieCI6IjEyIiwieSI6IjQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxMyIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTMiLCJ5IjoiNSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6W119LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjEzIiwieSI6IjYiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxMyIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjpbXX1dLCJoZXJvMSI6eyJ0aXRsZSI6IkFzaHJpYW4iLCJ4IjoiMTIiLCJ5IjoiOCIsImhwIjoiMTAiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IkRpc2NpcGxlIiwic2tpbGxzIjpbWyJBcm1vciBPZiBGYWl0aCIsZmFsc2VdLFsiQmxlc3NlZCBTdHJpa2UiLGZhbHNlXSxbIkNsZWFuc2luZyBUb3VjaCIsZmFsc2VdLFsiRGl2aW5lIEZ1cnkiLGZhbHNlXSxbIkhvbHkgUG93ZXIiLGZhbHNlXSxbIlByYXllciBPZiBIZWFsaW5nIix0cnVlXSxbIlByYXllciBPZiBQZWFjZSIsZmFsc2VdLFsiUmFkaWFudCBMaWdodCIsZmFsc2VdLFsiVGltZSBPZiBOZWVkIixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiSXJvbiBNYWNlIiwiaGFuZDIiOiJXb29kZW4gU2hpZWxkIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOltdfSwiaGVybzIiOnsidGl0bGUiOiJTeW5kcmFlbCIsIngiOiIxMiIsInkiOiI5IiwiaHAiOiIxMiIsInN0YW1pbmEiOiI0IiwiY2xhc3NOYW1lIjoiS25pZ2h0Iiwic2tpbGxzIjpbWyJBZHZhbmNlIixmYWxzZV0sWyJDaGFsbGVuZ2UiLGZhbHNlXSxbIkRlZmVuZCIsZmFsc2VdLFsiRGVmZW5zZSBUcmFpbmluZyIsZmFsc2VdLFsiR3VhcmQiLGZhbHNlXSxbIkluc3BpcmF0aW9uIixmYWxzZV0sWyJPYXRoIE9mIEhvbm9yIix0cnVlXSxbIlNoaWVsZCBTbGFtIixmYWxzZV0sWyJTdGFsd2FydCIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6Iklyb24gTG9uZ3N3b3JkIiwiaGFuZDIiOiJXb29kZW4gU2hpZWxkIiwiYXJtb3IiOiIiLCJpdGVtIjoiIiwiaXRlbTIiOiIifSwic2FjayI6W10sImNvbmRpdGlvbnMiOltdfSwiaGVybzMiOnsidGl0bGUiOiJMZW9yaWMgb2YgdGhlIGJvb2siLCJ4IjoiMTIiLCJ5IjoiMTAiLCJocCI6IjgiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6IlJ1bmVtYXN0ZXIiLCJza2lsbHMiOltbIkJyZWFrIFRoZSBSdW5lIixmYWxzZV0sWyJFeHBsb2RpbmcgUnVuZSIsZmFsc2VdLFsiR2hvc3QgQXJtb3IiLGZhbHNlXSxbIkluc2NyaWJlIFJ1bmUiLGZhbHNlXSxbIklyb24gV2lsbCIsZmFsc2VdLFsiUXVpY2sgQ2FzdGluZyIsZmFsc2VdLFsiUnVuZSBNYXN0ZXJ5IixmYWxzZV0sWyJSdW5pYyBLbm93bGVkZ2UiLHRydWVdLFsiUnVuaWMgU29yY2VyeSIsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IkFyY2FuZSBCb2x0IiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6W119LCJoZXJvNCI6eyJ0aXRsZSI6IkphaW4gRmFpcndvb2QiLCJ4IjoiMTIiLCJ5IjoiMTEiLCJocCI6IjgiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6IldpbGRsYW5kZXIiLCJza2lsbHMiOltbIkFjY3VyYXRlIixmYWxzZV0sWyJCbGFjayBBcnJvdyIsZmFsc2VdLFsiQm93IE1hc3RlcnkiLGZhbHNlXSxbIkRhbmdlciBTZW5zZSIsZmFsc2VdLFsiRWFnbGUgRXllcyIsZmFsc2VdLFsiRmlyc3QgU3RyaWtlIixmYWxzZV0sWyJGbGVldCBPZiBGb290IixmYWxzZV0sWyJOaW1ibGUiLHRydWVdLFsiUnVubmluZyBTaG90IixmYWxzZV1dLCJpdGVtcyI6eyJoYW5kIjoiWWV3IFNob3J0Ym93IiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6W119LCJ0aWxlcyI6W3sidGl0bGUiOiI4Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiIwIiwiYW5nbGUiOiIxODAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIxNiIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiNCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiIxMiIsInNpZGUiOiJBIiwieCI6IjEiLCJ5IjoiMyIsImFuZ2xlIjoiMjcwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMiIsInkiOiIxIiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiIyNiIsInNpZGUiOiJBIiwieCI6IjEwIiwieSI6IjQiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjkiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjgiLCJhbmdsZSI6IjAifSx7InRpdGxlIjoiRW5kIiwic2lkZSI6IkEiLCJ4IjoiNSIsInkiOiI5IiwiYW5nbGUiOiI5MCJ9LHsidGl0bGUiOiJFeGl0Iiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn1dLCJkb29ycyI6W10sInhzIjpbXSwiYWxsaWVzIjpbXSwiZmFtaWxpYXJzIjpbXSwib2JqZWN0aXZlcyI6W3sidGl0bGUiOiJTZWFyY2giLCJ4IjoiMSIsInkiOiI3In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjkifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEyIiwieSI6IjUifSx7InRpdGxlIjoiU2VhcmNoIiwieCI6IjUiLCJ5IjoiMSJ9XX0=';
var actOne = true;

var mapWidth = 26;
var mapHeight = 26;

var monsterList = new Set();