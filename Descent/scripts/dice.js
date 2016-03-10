function attackDieSide(hearts, surge, range, possibility) {
	return {'hearts':hearts, 'surge':surge, 'range':range, 'possibility':possibility};
}

function defenceDieSide(shields, possibility) {
	return {'shields': shields, 'possibility': possibility};
}

function surgeEffect(pierce,hearts,range,cost,condition) {
	return {'pierce':pierce, 'hearts':hearts, 'range':range, 'cost':cost, 'condition':condition};
}

function weapon(title, diceArray, surgeArray, rank, cost, range) {
	return {'title':title, 'dice':diceArray, 'surge':surgeArray, 'rank':rank, 'cost':cost, 'range':range};
}

function monster(title, masterDiceArray, masterSurges, masterNumber, minionDiceArray, minionSurges, minionNumber, act2MasterDiceArray, act2MasterSurges, act2MinionDiceArray, act2MinionSurges, check) {
	if (check != undefined) console.log(title);
	return {'title':title, 'master':{'dice':masterDiceArray, 'surge':masterSurges, 'number':masterNumber}, 'minion':{'dice':minionDiceArray, 'surge':minionSurges, 'number':minionNumber},
		'act2Master':{'dice':act2MasterDiceArray, 'surge':act2MasterSurges, 'number':masterNumber}, 'act2Minion':{'dice':act2MinionDiceArray, 'surge':act2MinionSurges, 'number':minionNumber}};
}

function sumAttackResults(oneResult, otherResult) {
	return {'hearts':oneResult.hearts + otherResult.hearts, 'surge':oneResult.surge + otherResult.surge, 'range':oneResult.range + otherResult.range, 'possibility': oneResult.possibility * otherResult.possibility};
}

function sumAttackDice(oneDie, otherDie) {
	var result = [];
	for (var i = 0; i < oneDie.length; i++) {
		for (var j = 0; j < otherDie.length; j++) {
			result.push(sumAttackResults(oneDie[i], otherDie[j]));
		}
	}
	return result;
}

function sumDefenceDice(oneDie, otherDie) {
	var result1 = [], result2 = [];
	var min = 100, max = 0, sum, newPossibility;
	for (var i = 0; i < oneDie.length; i++) {
		for (var j = 0; j < otherDie.length; j++) {
			sum = oneDie[i].shields + otherDie[j].shields;
			newPossibility = oneDie[i].possibility * otherDie[j].possibility;
			result1[sum] == undefined ? result1[sum] = newPossibility : result1[sum] += newPossibility;
			//result1.push({'shields':sum, 'possibility': oneDie[i].possibility * otherDie[j].possibility});
			if (sum < min) min = sum;
			if (sum > max) max = sum;
		}
	}
	for (var k = min; k <= max; k++) {
		result2.push({'shields':k,'possibility':result1[k]});
	}
	return result2;
}

function sum3AttackDice(one, two, three) {
	return sumAttackDice(sumAttackDice(one, two),three);
}

function sum4AttackDice(one, two, three, four) {
	return sumAttackDice(sumAttackDice(one, two),sumAttackDice(three, four));
}

function sumNAttackDice(diceArray) {
	if (diceArray.length == 1) return diceArray[0];
	if (diceArray.length == 2) return sumAttackDice(diceArray[0], diceArray[1]);
	if (diceArray.length == 3) return sum3AttackDice(diceArray[0], diceArray[1], diceArray[2]);
	if (diceArray.length == 4) return sum4AttackDice(diceArray[0], diceArray[1], diceArray[2], diceArray[3]);
}

function battleOutcome(attackDice, defenceDice, surgeEffects, range) {
	var outcome = 0;
	var attack = 0;
	var defence = 0;
	var surge = 0;
	for (var i = 0; i < attackDice.length; i++) {
		for (var j = 0; j < defenceDice.length; j++) {
			if (attackDice[i].range < range) continue;
			attack = attackDice[i].hearts;
			defence = defenceDice[j].shields;
			surge = attackDice[i].surge;
			for (var k = 0; k < surgeEffects.length; k++) {
				if (surgeEffects[k].cost <= surge) {
					attack += surgeEffects[k].hearts;
					defence = surgeEffects[k].pierce > defence ? 0 : defence - surgeEffects[k].pierce;
					surge -= surgeEffects[k].cost;
				}
			}
			outcome += (attack > defence ? attack - defence : 0) * attackDice[i].possibility * defenceDice[j].possibility;
		}
	}
	return outcome;
}

function summarize(dice) {
	var hearts = 0, surge = 0, range = 0;
	for (var i = 0; i < dice.length; i++) {
		hearts += dice[i].hearts * dice[i].possibility;
		surge += dice[i].surge * dice[i].possibility;
		range += dice[i].range * dice[i].possibility;
	}
	return {'hearts':hearts, 'surge':surge, 'range':range};
}

function output(title, die) {
	return title + ' results:<br/>hearts - ' + die.hearts + '<br/>surge - ' + die.surge + '<br/>range - ' + die.range + '<br/>';
}

function textResult(weapon, defenceDie, defenceTitle) {
	return '<br/>' + weapon.title + ' vs ' + defenceTitle + ': ' + battleOutcome(sumNAttackDice(weapon.dice),defenceDie,weapon.surge,0);
}

$(function() {
	var red = [], blue = [], yellow = [], green = [], brown = [], gray = [], black = [];
	red.push(attackDieSide(1,0,0,1/6));
	red.push(attackDieSide(2,0,0,1/6));
	red.push(attackDieSide(2,0,0,1/6));
	red.push(attackDieSide(2,0,0,1/6));
	red.push(attackDieSide(3,0,0,1/6));
	red.push(attackDieSide(3,1,0,1/6));
	blue.push(attackDieSide(2,1,2,1/6));
	blue.push(attackDieSide(2,0,3,1/6));
	blue.push(attackDieSide(2,0,4,1/6));
	blue.push(attackDieSide(1,0,5,1/6));
	blue.push(attackDieSide(1,1,6,1/6));
	yellow.push(attackDieSide(2,1,0,1/6));
	yellow.push(attackDieSide(2,0,0,1/6));
	yellow.push(attackDieSide(1,0,1,1/6));
	yellow.push(attackDieSide(0,1,1,1/6));
	yellow.push(attackDieSide(1,1,0,1/6));
	yellow.push(attackDieSide(1,0,2,1/6));
	green.push(attackDieSide(1,1,1,1/6));
	green.push(attackDieSide(0,1,0,1/6));
	green.push(attackDieSide(1,0,1,1/6));
	green.push(attackDieSide(0,1,1,1/6));
	green.push(attackDieSide(1,1,0,1/6));
	green.push(attackDieSide(1,0,0,1/6));
	brown.push(defenceDieSide(0,3/6));
	brown.push(defenceDieSide(1,2/6));
	brown.push(defenceDieSide(2,1/6));
	gray.push(defenceDieSide(0,1/6));
	gray.push(defenceDieSide(1,3/6));
	gray.push(defenceDieSide(2,1/6));
	gray.push(defenceDieSide(3,1/6));
	black.push(defenceDieSide(0,1/6));
	black.push(defenceDieSide(2,3/6));
	black.push(defenceDieSide(3,1/6));
	black.push(defenceDieSide(4,1/6));
	
	/*$('#result').append(output('blue + red', summarize(sumAttackDice(blue, red))));
	$('#result').append('<br/>' + output('blue + yellow', summarize(sumAttackDice(blue, yellow))));
	$('#result').append('<br/>' + output('blue + red + red', summarize(sum3AttackDice(blue, red, red))));
	
	pierceSurge = [], damageSurge = [], severeDamageSurge = [], dragontooth = [], steelGreatsword = [];
	pierceSurge.push({'pierce':2, 'hearts':0, 'cost':1});
	damageSurge.push({'pierce':0, 'hearts':1, 'cost':1});
	damageSurge.push({'pierce':0, 'hearts':1, 'cost':1});
	severeDamageSurge.push({'pierce':0, 'hearts':5, 'cost':2});
	severeDamageSurge.push({'pierce':0, 'hearts':1, 'cost':1});
	dragontooth.push({'pierce':1, 'hearts':0, 'cost':0});
	dragontooth.push({'pierce':0, 'hearts':1, 'cost':0});
	dragontooth.push({'pierce':2, 'hearts':0, 'cost':1});
	steelGreatsword.push({'pierce':2, 'hearts':0, 'cost':1});
	steelGreatsword.push({'pierce':0, 'hearts':1, 'cost':1});
	
	$('#result').append('<br/>Blue + Red + 1 damage + 1 damage - gray: ' + battleOutcome(sumAttackDice(blue, red),gray,damageSurge,0));
	$('#result').append('<br/>Blue + Yellow + 2 pierce - gray: ' + battleOutcome(sumAttackDice(blue,yellow),gray,pierceSurge,0));
	$('#result').append('<br/>Blue + Red + 1 damage + 1 damage - black: ' + battleOutcome(sumAttackDice(blue,red),black,damageSurge,0));
	$('#result').append('<br/>Blue + Yellow + 2 pierce - black: ' + battleOutcome(sumAttackDice(blue,yellow),black,pierceSurge,0));
	$('#result').append('<br/>Blue + Red + Red + 1 damage + 1 damage - gray: ' + battleOutcome(sum3AttackDice(blue,red,red),gray,damageSurge,0));
	$('#result').append('<br/>Blue + Red + Red + 1 damage + 5 damage / 2 surge - gray: ' + battleOutcome(sum3AttackDice(blue,red,red),gray,severeDamageSurge,0));
	$('#result').append('<br/>Blue + Red + Red + 1 damage + 1 damage - black: ' + battleOutcome(sum3AttackDice(blue,red,red),black,damageSurge,0));
	$('#result').append('<br/>Blue + Red + Red + 1 damage + 5 damage / 2 surge - black: ' + battleOutcome(sum3AttackDice(blue,red,red),black,severeDamageSurge,0));
	$('#result').append('<br/>Dragontooth vs black: ' + battleOutcome(sum3AttackDice(blue,red,red),black,dragontooth,0));
	$('#result').append('<br/>Steel Greatsword vs black: ' + battleOutcome(sum3AttackDice(blue,yellow,red),black,steelGreatsword,0));
	$('#result').append('<br/>Dragontooth vs gray: ' + battleOutcome(sum3AttackDice(blue,red,red),gray,dragontooth,0));
	$('#result').append('<br/>Steel Greatsword vs gray: ' + battleOutcome(sum3AttackDice(blue,yellow,red),gray,steelGreatsword,0));*/
	
	var dragontooth = weapon('Dragontooth hammer', [blue, red, red], [surgeEffect(1,0,0,0,false), surgeEffect(0,1,0,0,false), surgeEffect(2,0,0,1,false)], 2, 250, false);
	
	var weapons = [], defenceDice = [], monsters = [];
	
	weapons.push(dragontooth);
	weapons.push(weapon('Dragontooth hammer (1h)', [blue, red, red], [surgeEffect(1,0,0,0,false), surgeEffect(2,0,0,1,false)], 2, 250, false));
	weapons.push(weapon('Lightning Rune', [blue, yellow, yellow], [surgeEffect(0,2,0,1,false), surgeEffect(0,2,0,1,false)], 2, 200, true));
	weapons.push(weapon('Sunburst', [blue, yellow], [surgeEffect(0,2,0,1,false), surgeEffect(0,0,0,1,true)], 1, 125, true));
	weapons.push(weapon('Steel broadsword', [blue, red], [surgeEffect(0,1,0,1,false), surgeEffect(0,0,0,1,true)], 1, 100, false));
	weapons.push(weapon('Sling', [blue, yellow], [surgeEffect(0,1,1,1,false), surgeEffect(0,0,0,1,true)], 1, 75, true));
	weapons.push(weapon('Light hammer', [blue, yellow], [surgeEffect(0,2,0,1,false), surgeEffect(0,0,0,1,true)], 1, 75, false));
	weapons.push(weapon('Iron Spear', [blue, yellow], [surgeEffect(0,0,1,0,false), surgeEffect(0,1,0,1,false), surgeEffect(1,0,0,1,false)], 1, 75, false));
	weapons.push(weapon('Iron battleaxe', [blue, red], [surgeEffect(1,0,0,0,false), surgeEffect(0,2,0,1,false), surgeEffect(1,0,0,1,false)], 1, 100, false));
	weapons.push(weapon('Immolation', [blue, red], [surgeEffect(1,0,0,0,false), surgeEffect(0,1,0,1,false), surgeEffect(0,0,1,1,false)], 1, 150, true));
	weapons.push(weapon('Elm Greatbow', [blue, yellow], [surgeEffect(0,2,0,1,false), surgeEffect(0,0,2,1,false)], 1, 100, true));
	weapons.push(weapon('Crossbow', [blue, yellow], [surgeEffect(1,0,0,0,false), surgeEffect(0,2,0,1,false), surgeEffect(1,0,0,1,false)], 1, 175, true));
	weapons.push(weapon('Throwing knives', [blue, yellow], [surgeEffect(0,0,1,1,false)], 0, 50, true));
	weapons.push(weapon('Throwing knives (adj.)', [blue, yellow], [surgeEffect(0,1,0,0,false), surgeEffect(0,0,1,1,false)], 0, 50, false));
	weapons.push(weapon('Oak staff', [blue, yellow], [surgeEffect(0,0,1,0,false), surgeEffect(0,1,0,1,false)], 0, 50, false));
	weapons.push(weapon('Arcane bolt', [blue, yellow], [surgeEffect(2,0,1,1,false), surgeEffect(0,0,1,1,false)], 0, 50, true));
	weapons.push(weapon("Reaper's Scythe", [blue, yellow], [surgeEffect(0,0,1,1,false)], 0, 50, true));
	weapons.push(weapon("Iron longsword", [blue, red], [], 0, 50, false));
	weapons.push(weapon("Chipped Greataxe", [blue, red], [surgeEffect(0,1,0,1,false), surgeEffect(0,1,0,1,false)], 0, 50, false));
	weapons.push(weapon("Yew shortbow", [blue, yellow], [surgeEffect(0,1,0,1,false), surgeEffect(0,0,2,1,false)], 0, 50, false));
	weapons.push(weapon('Steel greatsword', [blue, red, yellow], [surgeEffect(2,0,0,1,false), surgeEffect(0,1,0,1,false)], 2, 200, false));
	weapons.push(weapon('Mace of Kellos (with no effects)', [blue, red, yellow], [], 2, 175, false));
	weapons.push(weapon('Latari longbow', [blue, yellow, yellow], [surgeEffect(1,0,0,0,false), surgeEffect(0,2,0,1,false), surgeEffect(0,0,2,1,false)], 2, 200, true));
	weapons.push(weapon('Ice Storm', [blue, yellow, yellow], [surgeEffect(0,2,0,1,false), surgeEffect(0,0,0,1,true)], 2, 150, true));
	weapons.push(weapon('Grinding axe', [blue, red, red], [surgeEffect(0,5,0,2,false), surgeEffect(0,1,0,1,false)], 2, 175, false));
	weapons.push(weapon('Dwarven firebomb', [blue, red, yellow], [surgeEffect(0,1,1,1,false), surgeEffect(0,0,0,1,true), surgeEffect(0,0,0,1,true)], 2, 175, true));
	
	
	monsters.push(monster('Arachyura', [blue, red, green], [surgeEffect(2,0,0,2,false)], 1, [blue, red, green], [surgeEffect(1,0,0,2,false)], 1,
			[blue, red, green], [surgeEffect(3,0,0,2,false)], [blue, red, green], [surgeEffect(2,0,0,2,false)]));
	monsters.push(monster('Bandit', [blue, yellow], [surgeEffect(0,2,0,1,false)], 1, [blue, red], [surgeEffect(0,1,0,1,false)], 4,
			[blue, yellow, yellow], [surgeEffect(0,2,0,1,false)], [blue, red], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Bane Spider', [blue, red], [surgeEffect(2,0,0,1,false)], 1, [blue, red], [surgeEffect(1,0,0,1,false)], 2,
			[blue, red, yellow], [surgeEffect(3,0,0,1,false)], [blue, red], [surgeEffect(2,0,0,1,false)]));
	monsters.push(monster('Barghest', [blue, red], [surgeEffect(0,2,0,1,false)], 1, [blue, red], [surgeEffect(0,1,0,1,false)], 3,
			[blue, red, yellow], [surgeEffect(0,2,0,1,false)], [blue, red], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Beastman', [blue, red], [surgeEffect(0,2,0,1,false)], 1, [blue, yellow], [surgeEffect(0,1,0,1,false)], 3,
			[blue, red, yellow], [surgeEffect(0,2,0,1,false)], [blue, red], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Blood Ape', [blue, red], [surgeEffect(0,2,0,1,false)], 1, [blue, red], [surgeEffect(0,1,0,1,false)], 2,
			[blue, red, red], [surgeEffect(0,2,0,1,false)], [blue, red, yellow], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Carrion Drake', [blue, yellow], [surgeEffect(0,2,0,1,false)], 1, [blue, yellow], [surgeEffect(0,1,0,1,false)], 2,
			[blue, yellow, green], [surgeEffect(0,2,0,1,false)], [blue, yellow, green], [surgeEffect(0,1,0,1,false), surgeEffect(0,1,0,1,false)]));
	monsters.push(monster('Cave Spider', [blue, yellow], [surgeEffect(0,2,0,1,false)], 1, [blue, yellow], [surgeEffect(0,1,0,1,false)], 4,
			[blue, yellow, yellow], [surgeEffect(0,2,0,1,false), surgeEffect(0,1,0,1,false)], [blue, yellow, yellow], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Changeling', [blue, red], [surgeEffect(0,1,0,1,false)], 1, [blue, red], [surgeEffect(0,1,0,1,false)], 3,
			[blue, red, yellow], [surgeEffect(0,1,0,1,false)], [blue, red], [surgeEffect(0,1,0,1,false)]));
	monsters.push(monster('Crypt Dragon', [blue, yellow], [surgeEffect(0,2,0,1,false)], 1, [blue, yellow], [surgeEffect(0,2,0,1,false)], 1,
			[blue, red, yellow], [surgeEffect(0,2,0,1,false)], [blue, red, yellow], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Dark Priest', [blue, yellow], [surgeEffect(0,1,0,1,false)], 1, [blue, yellow], [surgeEffect(0,1,0,1,false)], 3,
			[blue, yellow, yellow], [surgeEffect(0,2,0,1,false)], [blue, yellow], [surgeEffect(0,1,0,1,false)]));
	monsters.push(monster('Deep Elf', [blue, yellow], [surgeEffect(3,0,0,1,false), surgeEffect(0,1,0,1,false)], 1, [blue, yellow], [surgeEffect(2,0,0,1,false), surgeEffect(0,1,0,1,false)], 1,
			[blue, yellow], [surgeEffect(4,0,0,1,false), surgeEffect(0,2,0,1,false)], [blue, yellow], [surgeEffect(0,2,0,1,false), surgeEffect(2,0,0,1,false)]));
	monsters.push(monster('Demon Lord', [blue, yellow], [surgeEffect(0,0,0,1,false)], 1, [blue, yellow], [surgeEffect(0,0,0,1,false)], 1,
			[blue, red, yellow], [surgeEffect(0,0,0,1,false)], [blue, yellow, yellow], [surgeEffect(0,0,0,1,false)]));
	monsters.push(monster('Elemental', [blue, red], [surgeEffect(0,0,0,1,false)], 1, [blue, red], [surgeEffect(0,0,0,1,false)], 1,
			[blue, red, yellow], [surgeEffect(0,0,0,1,false)], [blue, red, yellow], [surgeEffect(0,0,0,1,false)]));
	monsters.push(monster('Ettin', [blue, red], [surgeEffect(0,3,0,1,false)], 1, [blue, red], [surgeEffect(0,2,0,1,false)], 1,
			[blue, red, red], [surgeEffect(0,2,0,1,false)], [blue, red, red], [surgeEffect(0,1,0,1,false)]));
	monsters.push(monster('Ferrox', [blue, red], [surgeEffect(2,0,0,1,false)], 1, [blue, red], [surgeEffect(2,0,0,1,false)], 3,
			[blue, red, yellow], [surgeEffect(3,0,0,1,false)], [blue, red, yellow], [surgeEffect(3,0,0,1,false)]));
	monsters.push(monster('Fire Imps', [blue, yellow], [surgeEffect(0,1,0,1,false)], 2, [blue, yellow], [], 3,
			[blue, yellow, yellow], [surgeEffect(0,1,0,1,false)], [blue, yellow], []));
	monsters.push(monster('Flesh Moulder', [blue, yellow], [surgeEffect(0,2,0,1,false)], 1, [blue, yellow], [surgeEffect(0,1,0,1,false)], 3,
			[blue, yellow, yellow], [surgeEffect(0,3,0,1,false)], [blue, yellow], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Giant', [blue, red], [surgeEffect(0,0,0,1,true)], 1, [blue, red], [surgeEffect(0,0,0,1,true)], 1,
			[blue, red, red], [surgeEffect(0,0,0,1,true)], [blue, red, yellow], [surgeEffect(0,0,0,1,true)]));
	monsters.push(monster('Goblin Archer', [blue, yellow], [surgeEffect(0,2,0,1,false)], 1, [blue, yellow], [surgeEffect(0,1,0,1,false)], 4,
			[blue, yellow, yellow], [surgeEffect(0,2,0,1,false)], [blue, yellow], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Goblin Witcher', [blue, yellow], [surgeEffect(0,0,0,1,true)], 1, [blue, yellow], [surgeEffect(0,0,0,1,true)], 3,
			[blue, yellow], [surgeEffect(0,2,0,1,true)], [blue, yellow], [surgeEffect(0,1,0,1,true)]));
	monsters.push(monster('Harpy', [blue, red], [surgeEffect(0,0,0,1,false)], 1, [blue, green], [surgeEffect(0,0,0,1,false)], 3,
			[blue, red, yellow], [surgeEffect(0,0,0,1,false)], [blue, yellow, green], [surgeEffect(0,0,0,1,false)]));
	monsters.push(monster('Hellhound', [blue, red], [surgeEffect(2,0,0,1,false)], 1, [blue, red], [surgeEffect(2,0,0,1,false)], 3,
			[blue, red, yellow], [surgeEffect(3,0,0,1,false)], [blue, red], [surgeEffect(3,0,0,1,false)]));
	monsters.push(monster('Hybrid Sentinel', [blue, red], [surgeEffect(0,1,0,1,false)], 1, [blue, red], [surgeEffect(0,1,0,1,false)], 2,
			[blue, red, yellow], [surgeEffect(0,2,0,1,false)], [blue, red], [surgeEffect(0,1,0,1,false), surgeEffect(0,1,0,1,false)]));
	monsters.push(monster('Hybrid Sentinel vs weak', [blue, red], [surgeEffect(0,1,0,0,false),surgeEffect(0,1,0,1,false)], 1, [blue, red], [surgeEffect(0,1,0,0,false),surgeEffect(0,1,0,1,false)], 2,
			[blue, red], [surgeEffect(0,1,0,0,false),surgeEffect(0,2,0,1,false)], [blue, red], [surgeEffect(0,1,0,0,false),surgeEffect(0,1,0,1,false),surgeEffect(0,1,0,1,false)]));
	monsters.push(monster('Ice Wyrm', [blue, red], [], 1, [blue, red], [], 1,
			[blue, red, red], [], [blue, red, red], []));
	monsters.push(monster('Ironbound', [blue, red], [surgeEffect(0,2,0,1,false)], 1, [blue, red], [], 1,
			[blue, red, green], [surgeEffect(0,3,0,2,false)], [blue, red, green], [surgeEffect(0,2,0,2,false)]));
	monsters.push(monster('Kobold', [blue, yellow], [], 3, [blue], [], 9,
			[blue, yellow], [], [blue], []));
	monsters.push(monster('Lava Beetle', [blue, red], [surgeEffect(0,1,0,1,false)], 1, [blue, red], [surgeEffect(0,1,0,1,false)], 3,
			[blue, red, yellow], [surgeEffect(0,2,0,1,false)], [blue, red], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Manticore', [blue, yellow], [surgeEffect(3,0,0,1,false)], 1, [blue, yellow], [surgeEffect(2,0,0,1,false)], 1,
			[blue, yellow, yellow], [surgeEffect(4,0,0,1,false)], [blue, yellow, yellow], [surgeEffect(3,0,0,1,false)]));
	monsters.push(monster('Medusa', [blue, yellow], [surgeEffect(0,0,0,1,true)], 1, [blue, yellow], [surgeEffect(0,0,0,1,true)], 2,
			[blue, yellow, yellow], [surgeEffect(0,0,0,1,true)], [blue, yellow, yellow], [surgeEffect(0,0,0,1,true)]));
	monsters.push(monster('Merriod', [blue, red], [surgeEffect(0,2,0,1,false)], 1, [blue, red], [surgeEffect(0,1,0,1,false)], 1,
			[blue, red, yellow], [surgeEffect(0,2,0,1,false)], [blue, red, yellow], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Naga', [blue, red], [surgeEffect(0,0,0,1,true)], 1, [blue, red], [surgeEffect(0,0,0,1,true)], 2,
			[blue, red, yellow], [surgeEffect(0,0,0,1,true)], [blue, red], [surgeEffect(0,0,0,1,true)]));
	monsters.push(monster('Ogre', [blue, red], [surgeEffect(0,3,0,1,false)], 1, [blue, yellow], [surgeEffect(0,3,0,1,false)], 1,
			[blue, red, yellow], [surgeEffect(0,3,0,1,false)],  [blue, red], [surgeEffect(0,3,0,1,false)]));
	monsters.push(monster('Rat Swarm', [green], [surgeEffect(0,0,0,1,true)], 1, [green], [surgeEffect(0,0,0,1,true)], 3,
			[green], [surgeEffect(0,0,0,1,true)], [green], [surgeEffect(0,0,0,1,true)]));
	monsters.push(monster('Razorwing', [blue, yellow], [surgeEffect(0,1,0,1,false)], 1, [blue, yellow], [surgeEffect(0,1,0,1,false)], 3,
			[blue, yellow, yellow], [surgeEffect(0,2,0,1,false)], [blue, yellow], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Shade', [blue, yellow], [surgeEffect(2,0,0,1,false)], 1, [blue, yellow], [surgeEffect(2,0,0,1,false)], 4,
			[blue, red, yellow], [surgeEffect(2,0,0,1,false)], [blue, red], [surgeEffect(2,0,0,1,false)]));
	monsters.push(monster('Shadow Dragon', [blue, red], [surgeEffect(0,2,0,1,false)], 1, [blue, red], [surgeEffect(0,1,0,1,false)], 1,
			[blue, red, red], [surgeEffect(0,3,0,1,false)], [blue, red, red], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Skeleton Archer', [blue, yellow], [surgeEffect(1,0,0,0,false),surgeEffect(0,1,0,1,false)], 1, [blue, yellow], [surgeEffect(1,0,0,0,false)], 4,
			[blue, yellow], [surgeEffect(2,0,0,0,false),surgeEffect(0,2,0,1,false)], [blue, yellow], [surgeEffect(1,0,0,1,false), surgeEffect(0,1,0,1,false)]));
	monsters.push(monster('Sorcerer', [blue, yellow], [], 1, [blue, yellow], [], 3,
			[blue, red], [], [blue, red], []));
	monsters.push(monster('Troll', [blue, red], [], 1, [blue, red], [], 1,
			[blue, red, red], [], [blue, red, red], []));
	monsters.push(monster('Volucrix Reaver', [blue, yellow], [surgeEffect(2,0,0,1,false),surgeEffect(0,1,0,1,false)], 1, [blue, yellow], [surgeEffect(2,0,0,1,false)], 3,
			[blue, red], [surgeEffect(3,0,0,1,false),surgeEffect(0,2,0,1,false)], [blue, red], [surgeEffect(2,0,0,1,false)]));
	monsters.push(monster('Wendigo', [blue, red], [surgeEffect(0,1,0,1,false)], 1, [blue, red], [surgeEffect(0,1,0,1,false)], 2,
			[blue, red, yellow], [surgeEffect(0,2,0,1,false)], [blue, red], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Wraith', [blue, yellow], [surgeEffect(0,2,0,1,false)], 1, [blue, yellow], [surgeEffect(0,1,0,1,false)], 2,
			[blue, red, yellow], [surgeEffect(0,3,0,1,false)], [blue, yellow], [surgeEffect(0,2,0,1,false)]));
	monsters.push(monster('Ynfernael Hulk', [blue, red], [surgeEffect(0,0,0,1,false)], 1, [blue, red], [surgeEffect(0,0,0,1,false)], 1,
			[blue, red, yellow], [surgeEffect(0,0,0,1,false)], [blue, red, yellow], [surgeEffect(0,0,0,1,false)]));
	monsters.push(monster('Ynfernael Hulk + charge', [blue, red], [surgeEffect(0,3,0,1,false)], 1, [blue, red], [surgeEffect(0,3,0,1,false)], 1,
			[blue, red, yellow], [surgeEffect(0,3,0,1,false)], [blue, red, yellow], [surgeEffect(0,3,0,1,false)]));
	monsters.push(monster('Zombie', [blue, yellow], [surgeEffect(0,1,0,1,false)], 1, [blue, yellow], [surgeEffect(0,1,0,1,false)], 4,
			[blue, red, yellow], [surgeEffect(0,2,0,1,false)], [blue, yellow], [surgeEffect(0,2,0,1,false)]));

	defenceDice.push({'title':'brown', 'die':brown});
	defenceDice.push({'title':'gray', 'die':gray});
	defenceDice.push({'title':'black', 'die':black});
	defenceDice.push({'title':'gray + brown', 'die':sumDefenceDice(gray, brown)});
	defenceDice.push({'title':'gray + gray', 'die':sumDefenceDice(gray, gray)});
	defenceDice.push({'title':'gray + black', 'die':sumDefenceDice(gray, black)});
	
	var table = "", strings = [];
	
	table += '<br/><table><tr><th>Monster title</th><th>type</th><th>Amount</th>';
	for (var i = 0; i < defenceDice.length; i++) {
		table += '<th>' + defenceDice[i].title + '</th>';
	}
	table += '</tr>';
	/*for (var i = 0; i < weapons.length; i++) {
		var string = '<tr><td>' + weapons[i].title + '</td><td>' + weapons[i].rank + '</td><td>' + weapons[i].cost + '</td>';
		var outcome = 0;
		for (var j = 0; j < defenceDice.length; j++) {
			string += '<td>' + (j == 1 ? '<b>' : '') + battleOutcome(sumNAttackDice(weapons[i].dice),defenceDice[j].die,weapons[i].surge,0) + (j == 1 ? '</b>' : '') + '</td>';
			if (j == 1) outcome = battleOutcome(sumNAttackDice(weapons[i].dice),defenceDice[j].die,weapons[i].surge,0);
		}
		string += '</tr>';
		strings.push({'string':string, 'outcome':outcome});
	}*/
	//return {'title':title, 'master':{'dice':masterDiceArray, 'surge':masterSurges, 'number':masterNumber}, 'minion':{'dice':minionDiceArray, 'surge':minionSurges, 'number':minionNumber}};
	for (var i = 0; i < monsters.length; i++) {
		var masterString = '<tr><td>' + monsters[i].title + '</td><td>Master Act I</td><td>' + monsters[i].master.number + '</td>';
		var minionString = '<tr><td>' + monsters[i].title + '</td><td>Minion Act I</td><td>' + monsters[i].minion.number + '</td>';
		var groupString = '<tr><td>' + monsters[i].title + '</td><td>Group Act I</td><td>' + monsters[i].master.number + ' + ' + monsters[i].minion.number + '</td>';
		var act2MasterString = '<tr><td>' + monsters[i].title + '</td><td>Master Act II</td><td>' + monsters[i].master.number + '</td>';
		var act2MinionString = '<tr><td>' + monsters[i].title + '</td><td>Minion Act II</td><td>' + monsters[i].minion.number + '</td>';
		var act2GroupString = '<tr><td>' + monsters[i].title + '</td><td>Group Act II</td><td>' + monsters[i].master.number + ' + ' + monsters[i].minion.number + '</td>';
		var minionOutcome = 0;
		var masterOutcome = 0;
		var groupOutcome = 0;
		var act2MinionOutcome = 0;
		var act2MasterOutcome = 0;
		var act2GroupOutcome = 0;
		var highlightColumn = 4;
		for (var j = 0; j < defenceDice.length; j++) {
			var currentMasterOutcome = battleOutcome(sumNAttackDice(monsters[i].master.dice),defenceDice[j].die,monsters[i].master.surge,0);
			var currentMinionOutcome = battleOutcome(sumNAttackDice(monsters[i].minion.dice),defenceDice[j].die,monsters[i].minion.surge,0);
			var currentGroupOutcome = currentMinionOutcome * monsters[i].minion.number + currentMasterOutcome * monsters[i].master.number;
			var currentAct2MasterOutcome = battleOutcome(sumNAttackDice(monsters[i].act2Master.dice),defenceDice[j].die,monsters[i].act2Master.surge,0);
			var currentAct2MinionOutcome = battleOutcome(sumNAttackDice(monsters[i].act2Minion.dice),defenceDice[j].die,monsters[i].act2Minion.surge,0);
			var currentAct2GroupOutcome = currentAct2MinionOutcome * monsters[i].minion.number + currentAct2MasterOutcome * monsters[i].master.number;
			masterString += '<td>' + (j == highlightColumn ? '<b>' : '') + currentMasterOutcome.toString() + (j == highlightColumn ? '</b>' : '') + '</td>';
			minionString += '<td>' + (j == highlightColumn ? '<b>' : '') + currentMinionOutcome.toString() + (j == highlightColumn ? '</b>' : '') + '</td>';
			groupString += '<td>' + (j == highlightColumn ? '<b>' : '') + currentGroupOutcome.toString() + (j == highlightColumn ? '</b>' : '') + '</td>';
			act2MasterString += '<td>' + (j == highlightColumn ? '<b>' : '') + currentAct2MasterOutcome.toString() + (j == highlightColumn ? '</b>' : '') + '</td>';
			act2MinionString += '<td>' + (j == highlightColumn ? '<b>' : '') + currentAct2MinionOutcome.toString() + (j == highlightColumn ? '</b>' : '') + '</td>';
			act2GroupString += '<td>' + (j == highlightColumn ? '<b>' : '') + currentAct2GroupOutcome.toString() + (j == highlightColumn ? '</b>' : '') + '</td>';
			if (j == highlightColumn) {
				masterOutcome = currentMasterOutcome;
				minionOutcome = currentMinionOutcome;
				groupOutcome = currentGroupOutcome;
				act2MasterOutcome = currentAct2MasterOutcome;
				act2MinionOutcome = currentAct2MinionOutcome;
				act2GroupOutcome = currentAct2GroupOutcome;
			}
		}
		masterString += '</tr>';
		minionString += '</tr>';
		groupString += '</tr>';
		act2MasterString += '</tr>';
		act2MinionString += '</tr>';
		act2GroupString += '</tr>';
		strings.push({'string':masterString, 'outcome':masterOutcome});
		strings.push({'string':minionString, 'outcome':minionOutcome});
		strings.push({'string':groupString, 'outcome':groupOutcome});
		strings.push({'string':act2MasterString, 'outcome':act2MasterOutcome});
		strings.push({'string':act2MinionString, 'outcome':act2MinionOutcome});
		strings.push({'string':act2GroupString, 'outcome':act2GroupOutcome});
	}
	strings.sort(function(a,b){
		return b.outcome - a.outcome;
	});
	
	for (var s = 0; s < strings.length; s++) {
		table += strings[s].string;
	}
	
	table += '</table>';
	$('#result').append(table);
	
});