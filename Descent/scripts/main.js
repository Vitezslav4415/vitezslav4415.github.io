function toggleMenu() {
	$('.menu').toggleClass('active');
}

function createSelect(title) {
	html = '<div class="btn-group select-x showOneCell showTwoCells"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' + title + ' <span class="caret"></span></button><ul class="dropdown-menu" role="menu"></ul></div>';
	
	return html;
}

function addOptionOld(title, value, optionClass) {
	return '<option class="' + optionClass + '" value="' + value + '">' + title + '</option>';
}

function addOption(title, optionClass, functionCallback) {
	return '<li class="' + optionClass + '"><a href="#" onclick="' + functionCallback + '">' + title + '</a></li>';
}

function updateMonster(element, value) {
	updateOption(element, value, true);
}

function updateCoordinate(element, value) {
	updateOption(element, value, false);
}

function updateOption(element, value, isMonster) {
	var container = $(element).parents('.select-row');
	if (isMonster || value == 'Clear') { //monster select or clearing cordinates
		monsterTitle = $(element).html();
		container.find('input[name="master"]').attr('value', monsterTitle.indexOf('master') > -1);
		var xYSelects = $(container).find('.select-x, .select-y');
		
		if (isMonster) {
			var monsterHp;
			if (monsterTitle.indexOf('master') > -1) {
				if (actOne) {
					monsterHp = MONSTERS[value].masterHpActOne;
				} else {
					monsterHp = MONSTERS[value].masterHpActTwo;
				}
			} else {
				if (actOne) {
					monsterHp = MONSTERS[value].minionHpActOne;
				} else {
					monsterHp = MONSTERS[value].minionHpActTwo;
				}
			}
			container.find('.monster-title').html(monsterTitle + ' ');
			container.find('input[name="monster-title"]').attr('value',value);
			container.find('.x-title').html('Select X coordinate' + ' ');
			container.find('.y-title').html('Select Y coordinate' + ' ');
			container.find('input[name="monster-x"]').attr('value','');
			container.find('input[name="monster-y"]').attr('value','');
			container.find('input[name="monster-hp"]').val(monsterHp);
		} else {
			var otherElementThanCleared;
			if ($(element).parents('.btn-group').hasClass('select-x')) {
				otherElementThanCleared = container.find('.select-y');
				container.find('.x-title').html('Select X coordinate' + ' ');
				container.find('input[name="monster-x"]').attr('value','');
			} else {
				otherElementThanCleared = container.find('.select-x');
				container.find('.y-title').html('Select Y coordinate' + ' ');
				container.find('input[name="monster-y"]').attr('value','');
			}
			xYSelects = otherElementThanCleared;
			value = container.find('.monster-title').html();
			value = value.substring(0, value.length - 1);
		}
		
		var firstClass = SHOWING_CLASSES[MONSTERS[value].width];
		var secondClass = SHOWING_CLASSES[MONSTERS[value].height];
		xYSelects.removeClass(SHOWING_CLASSES[1] + ' ' + SHOWING_CLASSES[2] + ' ' + SHOWING_CLASSES[3] + ' squared');
		xYSelects.addClass(firstClass);
		if (firstClass == secondClass) {
			xYSelects.addClass('squared');
		} else {
			xYSelects.addClass(secondClass);
		}
	} else { //coordinate select
		var selectedSize = value.charAt(0);
		var selectedCoordinate = value.substr(1);
		var parent = $(element).parents('.btn-group');
		
		if (parent.hasClass('select-x')) {
			container.find('input[name="monster-x"]').attr('value',selectedCoordinate);
			container.find('input[name="hero-x"]').attr('value',selectedCoordinate);
			container.find('input[name="tile-x"]').attr('value',selectedCoordinate);
			container.find('input[name="door-x"]').attr('value',selectedCoordinate);
			container.find('input[name="xs-x"]').attr('value',selectedCoordinate);
			container.find('input[name="ally-x"]').attr('value',selectedCoordinate);
			container.find('input[name="familiar-x"]').attr('value',selectedCoordinate);
			container.find('input[name="objective-x"]').attr('value',selectedCoordinate);
			container.find('input[name="monster-x-size"]').attr('value',selectedSize);
			container.find('.x-title').html($(element).html() + ' ');
			if (!parent.hasClass('squared')) {
				container.find('.select-y').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		} else {
			container.find('.y-title').html($(element).html() + ' ');
			container.find('input[name="monster-y"]').attr('value',selectedCoordinate);
			container.find('input[name="hero-y"]').attr('value',selectedCoordinate);
			container.find('input[name="tile-y"]').attr('value',selectedCoordinate);
			container.find('input[name="door-y"]').attr('value',selectedCoordinate);
			container.find('input[name="xs-y"]').attr('value',selectedCoordinate);
			container.find('input[name="ally-y"]').attr('value',selectedCoordinate);
			container.find('input[name="familiar-y"]').attr('value',selectedCoordinate);
			container.find('input[name="objective-y"]').attr('value',selectedCoordinate);
			container.find('input[name="monster-y-size"]').attr('value',selectedSize);
			if (!parent.hasClass('squared')) {
				container.find('.select-x').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		}
	}
}

function updateHero(element, value) {
	var container = $(element).parents('.select-row');

	container.find('.hero-title').html(value + ' ');
	container.find('input[name="hero-title"]').attr('value',value);
	container.find('input[name="hero-x"]').attr('value','');
	container.find('input[name="hero-y"]').attr('value','');
	container.find('input[name="hero-hp"]').val(HEROES[value].hp);
	container.find('input[name="hero-stamina"]').val(HEROES[value].stamina);
	container.children('img').attr('src', 'images/heroes_cards/' + value.replace(new RegExp(" ",'g'), '_') + '.jpg');
	var heroId = container.parent().attr('id');
	$('[href="#' + heroId + '"]').html(value);
	updateArchetype(element, HEROES[value].archetype.title);
}

function adjustHero(element, archetype) {
	var container = $(element).parents('.select-row');
	var heroTitle = container.find('input[name="hero-title"]').val();
	if (heroTitle != '' && HEROES[heroTitle].archetype.title != archetype) {
		clearHero(element);
	}
}

function clearHero(element) {
	var container = $(element).parents('.select-row');
	container.find('.hero-title').html('Select hero ');
	container.find('input[name="hero-title"]').attr('value','');
	container.find('img').attr('src', 'images/heroes_cards/default.jpg');
}

function updateArchetype(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.archetype-title').html(value + ' ');
	container.find('input[name="archetype-title"]').attr('value',value);
	adjustClass(element, value);
	adjustHero(element, value);
}

function adjustArchetype(element, archetype) {
	var container = $(element).parents('.select-row');
	container.find('.select-archetype ul').removeClass(ARCHETYPE_CLASSES).addClass(archetype.toLowerCase());
}

function clearArchetype(element) {
	var container = $(element).parents('.select-row');
	container.find('.select-archetype ul').addClass(ARCHETYPE_CLASSES.toLowerCase());
	container.find('.archetype-title').html('Select archetype ');
	container.find('input[name="archetype-title"]').attr('value','');
	adjustClass(element, ARCHETYPE_CLASSES);
}

function updateClass(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.class-title').html(value + ' ');
	container.find('input[name="class-title"]').attr('value',value);
	adjustArchetype(element, CLASSES[value].archetype.title);
	adjustSkills(element, value);
	adjustItems(element, value);
}

function adjustClass(element, archetype) {
	var container = $(element).parents('.select-row');
	container.find('.select-class ul').removeClass(ARCHETYPE_CLASSES).addClass(archetype.toLowerCase());
	var currentClass = container.find('input[name="class-title"]').val();
	if (currentClass != '' && CLASSES[currentClass].archetype.title != archetype) {
		clearClass(element);
	}
}

function clearClass(element) {
	var container = $(element).parents('.select-row');
	container.find('.class-title').html('Select class ');
	container.find('input[name="class-title"]').attr('value','');
}

function updateSkills(element, skillValues) {
	var container = $(element).parents('.select-row');
	for (var i = 0; i < skillValues.length; i++) {
		container.find('input[name="' + skillValues[i][0] + '"]').prop('checked', skillValues[i][1]);
	}
}

function adjustSkills(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.skills-container').attr("class", "showclass skills-container " + value.replace(new RegExp(" ",'g'), '').toLowerCase());
}

function adjustItems(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.items-selects').attr("class", "showclass items-selects " + value.replace(new RegExp(" ",'g'), '').toLowerCase());
}

function adjustSkillsImages(element) {
	var container = $(element).parents('.select-row');
	var checkedSkills = [];
	var className = container.find('input[name="class-title"]').attr('value');
	var skills = $(container).find('.checkbox.' + className.replace(new RegExp(" ",'g'), '').toLowerCase() + ' input');
	for (var i = 0; i < skills.length; i++) {
		var currentSkill = $(skills[i]);
		if (currentSkill.prop('checked')) {
			checkedSkills.push(currentSkill.attr('name'));
		}
	}
	container.find('.imagescontainer img').removeClass('showimage');
	for (var i = 0; i < checkedSkills.length; i++) {
		container.find('[skill="' + checkedSkills[i] + '"]').addClass('showimage');
	}
}

function updateHand(element, value) {
	var container = $(element).parents('.select-row');
	var second = $(element).parents('.select-weapon').hasClass('second-select');
	var twohand = $(element).parent().hasClass('twohand');
	var tierOne = $(element).parent().hasClass('tierone');
	var relic = $(element).parent().hasClass('relic');
	var oldTwoHand = container.find('.items-container').find('.hand2').hasClass('secondary'); 
	var selector = '.hand';
	if (second) selector += '2';
	container.find('.items-container').find('.hand,.hand2').removeClass('secondary');
	var src;
	if ($(element).parent().hasClass('classitem')) {
		var classValue = container.find('input[name="class-title"]').attr('value');
		src = 'images/classes_cards/' + classValue.replace(new RegExp(" ",'g'), '').toLowerCase() + '/' + value.replace(new RegExp(" ",'g'), '_').toLowerCase() + '.jpg';
	} else {
		var tierFolder = tierOne ? 'tier_one' : 'tier_two';
		if (relic) tierFolder = 'relic';
		src = 'images/items_cards/' + tierFolder + '/' + value.replace(new RegExp(" ",'g'), '_').toLowerCase() + '.jpg';
	}
	container.find('.items-container').find(twohand ? '.hand,.hand2' : selector).attr('src', src);
	if (!twohand && oldTwoHand) {
		clearHand(container.find('.items-selects').find('.select-weapon' + (second ? ':not(.second-select)' : '.second-select') + ' li')[0]);
	}
	if (twohand) {
		container.find('.weapon-title').html(value + ' ');
		container.find('.items-container').find('.hand2').addClass('secondary');
	} else {
		$(element).parents('.select-weapon').find('.weapon-title').html(value + ' ');
	}
	container.find('[name="hand' + (second && !twohand ? '2' : '') + '"]').val(value);
	if (twohand) {
		container.find('[name="hand2"]').val('');
	}
}

function updateArmor(element, value) {
	var container = $(element).parents('.select-row');
	var tierOne = $(element).parent().hasClass('tierone');
	var relic = $(element).parent().hasClass('relic');
	var src;
	if ($(element).parent().hasClass('classitem')) {
		var classValue = container.find('input[name="class-title"]').attr('value');
		src = 'images/classes_cards/' + classValue.replace(new RegExp(" ",'g'), '').toLowerCase() + '/' + value.replace(new RegExp(" ",'g'), '_').toLowerCase() + '.jpg';
	} else {
		var tierFolder = tierOne ? 'tier_one' : 'tier_two';
		if (relic) tierFolder = 'relic';
		src = 'images/items_cards/' + tierFolder + '/' + value.replace(new RegExp(" ",'g'), '_').toLowerCase() + '.jpg';
	}
	container.find('.items-container').find('.armor').attr('src', src);
	$(element).parents('.select-armor').find('.armor-title').html(value + ' ');
	container.find('[name="armor"]').val(value);
}

function updateItem(element, value) {
	var container = $(element).parents('.select-row');
	var second = $(element).parents('.select-item').hasClass('second-select');
	var selector = '.item';
	if (second) selector += '2';
	var tierOne = $(element).parent().hasClass('tierone');
	var relic = $(element).parent().hasClass('relic');
	var src;
	if ($(element).parent().hasClass('classitem')) {
		var classValue = container.find('input[name="class-title"]').attr('value');
		src = 'images/classes_cards/' + classValue.replace(new RegExp(" ",'g'), '').toLowerCase() + '/' + value.replace(new RegExp(" ",'g'), '_').toLowerCase() + '.jpg';
	} else {
		var tierFolder = tierOne ? 'tier_one' : 'tier_two';
		if (relic) tierFolder = 'relic';
		src = 'images/items_cards/' + tierFolder + '/' + value.replace(new RegExp(" ",'g'), '_').toLowerCase() + '.jpg';
	}
	container.find('.items-container').find(selector).attr('src', src);
	$(element).parents('.select-item').find('.item-title').html(value + ' ');
	container.find('[name="item' + (second ? '2' : '') + '"]').val(value);
}

function clearHand(element) {
	var container = $(element).parents('.select-row');
	var second = $(element).parents('.select-weapon').hasClass('second-select');
	var selector = '.hand';
	if (second) selector += '2';
	container.find('.items-container').find(selector).attr('src', 'images/misc/hand' + (second ? '2' : '') + '.png');
	$(element).parents('.select-weapon').find('.weapon-title').html('Select Weapon ');
}

function clearArmor(element) {
	var container = $(element).parents('.select-row');
	container.find('.items-container').find('.armor').attr('src', 'images/misc/armor.png');
	$(element).parents('.select-weapon').find('.weapon-title').html('Select Armor ');
}

function clearItem(element) {
	var container = $(element).parents('.select-row');
	var second = $(element).parents('.select-item').hasClass('second-select');
	var selector = '.item';
	if (second) selector += '2';
	container.find('.items-container').find(selector).attr('src', 'images/misc/item.png');
	$(element).parents('.select-item').find('.item-title').html('Select Item ');
}

function updateTile(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.tile-title').html(value + ' ');
	container.find('input[name="tile-title"]').attr('value',value);
}

function clearTile(element) {
	var container = $(element).parents('.select-row');
	container.find('.tile-title').html('Select tile ');
	container.find('input[name="tile-title"]').attr('value','');
}

function updateSide(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.side-title').html(value + ' ');
	container.find('input[name="tile-side"]').attr('value',value);
}

function clearSide(element) {
	var container = $(element).parents('.select-row');
	container.find('.side-title').html('Select tile ');
	container.find('input[name="tile-side"]').attr('value','');
}

function updateAngle(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.angle-title').html(value + ' ');
	container.find('input[name="tile-angle"]').attr('value',value);
}

function clearAngle(element) {
	var container = $(element).parents('.select-row');
	container.find('.angle-title').html('Select tile ');
	container.find('input[name="tile-angle"]').attr('value','');
}

function updateDoor(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.door-title').html(value + ' ');
	container.find('input[name="door-title"]').attr('value',value);
}

function clearDoor(element) {
	var container = $(element).parents('.select-row');
	container.find('.door-title').html('Select door ');
	container.find('input[name="door-title"]').attr('value','');
}

function updateDirection(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.direction-title').html(value + ' ');
	container.find('input[name="door-direction"]').attr('value',value);
}

function clearDirection(element) {
	var container = $(element).parents('.select-row');
	container.find('.direction-title').html('Select direction ');
	container.find('input[name="door-direction"]').attr('value','');
}

function updateXs(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.xs-title').html(value + ' ');
	container.find('input[name="xs-title"]').attr('value',value);
}

function clearXs(element) {
	var container = $(element).parents('.select-row');
	container.find('.xs-title').html('Select X ');
	container.find('input[name="xs-title"]').attr('value','');
}

function updateAlly(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.ally-title').html(value + ' ');
	container.find('input[name="ally-title"]').attr('value',value);
}

function clearAlly(element) {
	var container = $(element).parents('.select-row');
	container.find('.ally-title').html('Select Ally ');
	container.find('input[name="ally-title"]').attr('value','');
}

function updateFamiliar(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.familiar-title').html(value + ' ');
	container.find('input[name="familiar-title"]').attr('value',value);
}

function clearFamiliar(element) {
	var container = $(element).parents('.select-row');
	container.find('.familiar-title').html('Select Familiar ');
	container.find('input[name="familiar-title"]').attr('value','');
}

function updateObjective(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.objective-title').html(value + ' ');
	container.find('input[name="objective-title"]').attr('value',value);
}

function clearObjective(element) {
	var container = $(element).parents('.select-row');
	container.find('.objective-title').html('Select Objective ');
	container.find('input[name="objective-title"]').attr('value','');
}

function removeRow(element) {
	$(element).parents('.select-row').remove();
}

function removeMonsterRows() {
	$('#monsters-container .select-row').remove();
}

function getAlphabetChar(number) {
	result = '';
	if (number > 26) {
		result += ALPHABET.charAt(Math.floor(number/26) - 1);
	}
	return result += ALPHABET.charAt(number%26);
}

function createItemsAndSearchSelect() {
	var select = $(createInputSelect('Select Item or Search card', 'sack-title', 'select-sack'));
	var ul = select.find('ul');
	ul.append(addOption('Remove', '', 'removeFromSack(this);'));
	ul.append($('<li role="separator" class="divider"></li>'));
	ul.append(createSearchSelectContent());
	ul.append($('<li role="separator" class="divider"></li>'));
	ul.append(createHandSelectContent().replace(new RegExp("updateHand",'g'), 'updateSackItem'));
	ul.append(createArmorSelectContent().replace(new RegExp("updateArmor",'g'), 'updateSackItem'));
	ul.append(createItemSelectContent().replace(new RegExp("updateItem",'g'), 'updateSackItem'));
	select.find('.hand,.armor,.item').removeClass('hand armor item');
	return select;
}

function createYSelectContent(oneCellOnly) {
	var html = addOption('Clear', '', 'updateCoordinate(this, \'Clear\');');
	for (var i = 0; i <= mapWidth; i++) {
		html += addOption(i.toString(), 'oneCell', 'updateCoordinate(this, \'1' + i.toString() + '\');');
		if (i <= mapWidth-1 && !oneCellOnly)
			html += addOption(i.toString() + '-' + (i+1).toString(), 'twoCells', 'updateCoordinate(this, \'2' + i.toString() + '\');');
		if (i <= mapWidth-2 && !oneCellOnly)
			html += addOption(i.toString() + '-' + (i+2).toString(), 'threeCells', 'updateCoordinate(this, \'3' + i.toString() + '\');');
	}
	return html;
}

function createXSelectContent(oneCellOnly) {
	var html = addOption('Clear', '', 'updateCoordinate(this, \'Clear\');');
	for (var i = 1; i <= mapHeight; i++) {
		html += addOption(getAlphabetChar(i-1), 'oneCell', 'updateCoordinate(this, \'1' + i.toString() + '\');');
		if (i <= mapHeight-1 && !oneCellOnly)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i), 'twoCells', 'updateCoordinate(this, \'2' + i.toString() + '\');');
		if (i <= mapHeight-2 && !oneCellOnly)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i+1), 'threeCells', 'updateCoordinate(this, \'3' + i.toString() + '\');');
	}
	return html;
}

function createMonsterSelectContent() {
	var html = '';
	for (var i = 0; i < MONSTERS_LIST.length; i++) {
		html += addOption(MONSTERS_LIST[i][0] + ' master', '', 'updateMonster(this, \'' + MONSTERS_LIST[i][0] + '\');');
		html += addOption(MONSTERS_LIST[i][0] + ' minion', '', 'updateMonster(this, \'' + MONSTERS_LIST[i][0] + '\');');
	}
	return html;
}

function createHeroSelectContent() {
	var html = addOption('Clear', '', 'clearHero(this);');
	for (var i = 0; i < HEROES_LIST.length; i++) {
		html += addOption(HEROES_LIST[i][0] + ' ', '', 'updateHero(this, \'' + HEROES_LIST[i][0] + '\');');
	}
	return html;
}

function createClassSelectContent() {
	var html = addOption('Clear', '', 'clearClass(this);');
	for (var i = 0; i < ARCHETYPES_LIST.length; i++) {
		for (var j = 0; j < ARCHETYPES_LIST[i].classes.length; j++) {
			var title = ARCHETYPES_LIST[i].classes[j].title;
			html += addOption(title + ' ', ARCHETYPES_LIST[i].title, 'updateClass(this, \'' + title + '\');');
		}
	}
	return html;
}

function createArchetypeSelectContent() {
	var html = addOption('Clear', '', 'clearArchetype(this);');
	for (var i = 0; i < ARCHETYPES_LIST.length; i++) {
		var title = ARCHETYPES_LIST[i].title;
		html += addOption(title + ' ', title, 'updateArchetype(this, \'' + title + '\');');
	}
	return html;
}

function createSearchSelectContent() {
	var html = '';
	for (var i = 0; i < SEARCH_ITEMS_LIST.length; i++) {
		html += addOption(SEARCH_ITEMS_LIST[i] + ' ', 'search', 'updateSackItem(this, \'' + SEARCH_ITEMS_LIST[i] + '\')');
	}
	return html;
}

function createHandSelectContent() {
	var html = addOption('Clear', '', 'clearHand(this);');
	for (var i = 0; i < ITEMS['hand'].length; i++) {
		var item = ITEMS['hand'][i];
		html += addOption(item[0] + ' ', 'hand tierone', 'updateHand(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMS['hand2'].length; i++) {
		var item = ITEMS['hand2'][i];
		html += addOption(item[0] + ' ', 'hand twohand tierone', 'updateHand(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMS2['hand'].length; i++) {
		var item = ITEMS2['hand'][i];
		html += addOption(item[0] + ' ', 'hand tiertwo', 'updateHand(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMS2['hand2'].length; i++) {
		var item = ITEMS2['hand2'][i];
		html += addOption(item[0] + ' ', 'hand twohand tiertwo', 'updateHand(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMSR['hand'].length; i++) {
		var item = ITEMSR['hand'][i];
		html += addOption(item[0] + ' ', 'hand relic', 'updateHand(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMSR['hand2'].length; i++) {
		var item = ITEMSR['hand2'][i];
		html += addOption(item[0] + ' ', 'hand twohand relic', 'updateHand(this, \'' + item[0] + '\')');
	}
	var classItems = getSkillsItems(hand);
	for (var i = 0; i < classItems.length; i++) {
		html += addOption(classItems[i][0] + ' ', 'hand classitem ' + classItems[i][1], 'updateHand(this, \'' + classItems[i][0] + '\')');
	}
	classItems = getSkillsItems(twohand);
	for (var i = 0; i < classItems.length; i++) {
		html += addOption(classItems[i][0] + ' ', 'hand twohand classitem ' + classItems[i][1], 'updateHand(this, \'' + classItems[i][0] + '\')');
	}
	return html;
}

function createArmorSelectContent() {
	var html = addOption('Clear', '', 'clearArmor(this);');
	for (var i = 0; i < ITEMS['armor'].length; i++) {
		var item = ITEMS['armor'][i];
		html += addOption(item[0] + ' ', 'armor tierone', 'updateArmor(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMS2['armor'].length; i++) {
		var item = ITEMS2['armor'][i];
		html += addOption(item[0] + ' ', 'armor tiertwo', 'updateArmor(this, \'' + item[0] + '\')');
	}
	for (var i = 0; i < ITEMSR['armor'].length; i++) {
		var item = ITEMSR['armor'][i];
		html += addOption(item[0] + ' ', 'armor relic', 'updateArmor(this, \'' + item[0] + '\')');
	}
	var classItems = getSkillsItems(armor);
	for (var i = 0; i < classItems.length; i++) {
		html += addOption(classItems[i][0] + ' ', 'armor classitem ' + classItems[i][1], 'updateArmor(this, \'' + classItems[i][0] + '\')');
	}
	return html;
}

function createItemSelectContent() {
	var html = addOption('Clear', '', 'clearItem(this);');
	for (var i = 0; i < ITEMS['item'].length; i++) {
		var itemObject = ITEMS['item'][i];
		html += addOption(itemObject[0] + ' ', 'item tierone', 'updateItem(this, \'' + itemObject[0] + '\')');
	}
	for (var i = 0; i < ITEMS2['item'].length; i++) {
		var itemObject = ITEMS2['item'][i];
		html += addOption(itemObject[0] + ' ', 'item tiertwo', 'updateItem(this, \'' + itemObject[0] + '\')');
	}
	for (var i = 0; i < ITEMSR['item'].length; i++) {
		var itemObject = ITEMSR['item'][i];
		html += addOption(itemObject[0] + ' ', 'item relic', 'updateItem(this, \'' + itemObject[0] + '\')');
	}
	var classItems = getSkillsItems(item);
	for (var i = 0; i < classItems.length; i++) {
		html += addOption(classItems[i][0] + ' ', 'item classitem tierone ' + classItems[i][1], 'updateItem(this, \'' + classItems[i][0] + '\')');
	}
	return html;
}

function createTileSelectContent() {
	var html = addOption('Clear', '', 'clearTile(this);');
	for (var i = 0; i < MAP_TILES_LIST.length; i++) {
		html += addOption(MAP_TILES_LIST[i] + ' ', '', 'updateTile(this, \'' + MAP_TILES_LIST[i] + '\')');
	}
	return html;
}

function createSideSelectContent() {
	var html = addOption('Clear', '', 'clearSide(this);');
	html += addOption('A ', '', 'updateSide(this, \'A\')');
	html += addOption('B ', '', 'updateSide(this, \'B\')');
	return html;
}

function createAngleSelectContent() {
	var html = addOption('Clear', '', 'clearAngle(this);');
	html += addOption('0 ', '', 'updateAngle(this, \'0\')');
	html += addOption('90 ', '', 'updateAngle(this, \'90\')');
	html += addOption('180 ', '', 'updateAngle(this, \'180\')');
	html += addOption('270 ', '', 'updateAngle(this, \'270\')');
	return html;
}

function createDoorSelectContent() {
	var html = addOption('Clear', '', 'clearDoor(this);');
	for (var i = 0; i < DOORS_LIST.length; i++) {
		html += addOption(DOORS_LIST[i] + ' ', '', 'updateDoor(this, \'' + DOORS_LIST[i] + '\')');
	}
	return html;
}

function createDirectionSelectContent() {
	var html = addOption('Clear', '', 'clearDirection(this);');
	html += addOption('horizontal ', '', 'updateDirection(this, \'horizontal\')');
	html += addOption('vertical ', '', 'updateDirection(this, \'vertical\')');
	return html;
}

function createXsSelectContent() {
	var html = addOption('Clear', '', 'clearXs(this);');
	for (var i = 0; i < BLOCKS_LIST.length; i++) {
		html += addOption(BLOCKS_LIST[i] + ' ', '', 'updateXs(this, \'' + BLOCKS_LIST[i] + '\')');
	}
	return html;
}

function createAlliesSelectContent() {
	var html = addOption('Clear', '', 'clearAlly(this);');
	for (var i = 0; i < ALLIES_LIST.length; i++) {
		html += addOption(ALLIES_LIST[i] + ' ', '', 'updateAlly(this, \'' + ALLIES_LIST[i] + '\')');
	}
	return html;
}

function createFamiliarsSelectContent() {
	var html = addOption('Clear', '', 'clearFamiliar(this);');
	for (var i = 0; i < FAMILIARS_LIST.length; i++) {
		html += addOption(FAMILIARS_LIST[i] + ' ', '', 'updateFamiliar(this, \'' + FAMILIARS_LIST[i] + '\')');
	}
	return html;
}

function createObjectiveSelectContent() {
	var html = addOption('Clear', '', 'clearObjective(this);');
	for (var i = 0; i < OBJECTIVES_LIST.length; i++) {
		html += addOption(OBJECTIVES_LIST[i] + ' ', '', 'updateObjective(this, \'' + OBJECTIVES_LIST[i] + '\')');
	}
	return html;
}

function addUnitLine(line, title) {
	line.addClass('select-row');
	line.append(createInputSelect('Select ' + title, title.toLowerCase() + '-title', 'select-' + title.toLowerCase()));
	line.append(createInputSelect('Select X coordinate', 'x-title', 'select-x'));
	line.append(createInputSelect('Select Y coordinate', 'y-title', 'select-y'));
	line.append($('<input type="text" name="' + title.toLowerCase() + '-hp" class="form-control" placeholder="Set HP" value=""/>'));
	line.append($('<input type="hidden" name="' + title.toLowerCase() + '-title" value=""/>'));
	line.append($('<input type="hidden" name="' + title.toLowerCase() + '-x" value=""/>'));
	line.append($('<input type="hidden" name="' + title.toLowerCase() + '-y" value=""/>'));
}

function addMonsterLine() {
	var monsterLine = $('<div>').attr('id','monster' + monsterNumber.toString());
	monsterNumber += 1;
	addUnitLine(monsterLine, 'monster');
	monsterLine.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	monsterLine.append($('<input type="hidden" name="master" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-y-size" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-x-size" value=""/>'));
	
	monsterLine.find('.select-monster ul').append(createMonsterSelectContent());
	monsterLine.find('.select-x ul').append(createXSelectContent(false));
	monsterLine.find('.select-y ul').append(createYSelectContent(false));
	$('#monsters-container').append(monsterLine);
	return monsterLine;
}

function addHeroLine(number) {
	var heroLine = $('<div>').attr('id','hero' + number.toString() + 'wrapper');
	addUnitLine(heroLine, 'hero');
	heroLine.append($('<input type="text" name="hero-stamina" class="form-control" placeholder="Set stamina" value=""/>'));
	
	heroLine.find('.select-hero ul').append(createHeroSelectContent());
	heroLine.find('.select-x ul').append(createXSelectContent(true));
	heroLine.find('.select-x ul').addClass('showOneCell');
	heroLine.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	heroLine.append(createInputSelect('Select Archetype ', 'archetype-title', 'select-archetype'));
	heroLine.find('.select-archetype ul').addClass(ARCHETYPE_CLASSES + ' showarch').append(createArchetypeSelectContent());
	heroLine.append($('<input type="hidden" name="archetype-title" value=""/>'));
	heroLine.append(createInputSelect('Select Class ', 'class-title', 'select-class'));
	heroLine.find('.select-class ul').addClass(ARCHETYPE_CLASSES + ' showarch').append(createClassSelectContent());
	heroLine.append($('<input type="hidden" name="class-title" value=""/>'));
	heroLine.append(createSkillsBlock());
	heroLine.append(createItemsBlock());
	heroLine.append(createSackAndSearchBlock());
	heroLine.append($('<img>').attr('src', ''));
	$('#hero' + number.toString()).append(heroLine);
}

function addMapTileLine() {
	var mapTileLine = $('<div>');
	addUnitLine(mapTileLine, 'tile');
	mapTileLine.find('input[type="text"]').remove();
	mapTileLine.find('.select-tile').after(createInputSelect('Select side', 'side-title', 'select-side'));
	mapTileLine.append(createInputSelect('Select angle', 'angle-title', 'select-angle'));
	mapTileLine.append($('<input type="hidden" name="tile-side" value=""/>'));
	mapTileLine.append($('<input type="hidden" name="tile-angle" value=""/>'));
	
	mapTileLine.find('.select-tile ul').append(createTileSelectContent());
	mapTileLine.find('.select-side ul').append(createSideSelectContent());
	mapTileLine.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	mapTileLine.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	mapTileLine.find('.select-angle ul').append(createAngleSelectContent());
	mapTileLine.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	$('#tiles-container').append(mapTileLine);
	return mapTileLine;
}

function addDoorLine() {
	var doorLine = $('<div>');
	addUnitLine(doorLine, 'door');
	doorLine.find('input[type="text"]').remove();
	doorLine.find('.select-door').after(createInputSelect('Select direction', 'direction-title', 'select-direction'));
	doorLine.append($('<input type="hidden" name="door-direction" value=""/>'));
	
	doorLine.find('.select-door ul').append(createDoorSelectContent());
	doorLine.find('.select-direction ul').append(createDirectionSelectContent());
	doorLine.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	doorLine.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	doorLine.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	$('#doors-container').append(doorLine);
	return doorLine;
}

function addXsLine() {
	var xLine = $('<div>');
	addUnitLine(xLine, 'Xs');
	xLine.find('input[type="text"]').remove();
	
	xLine.find('.select-xs ul').append(createXsSelectContent());
	xLine.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	xLine.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	xLine.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	$('#xs-container').append(xLine);
	return xLine;
}

function addAllyLine() {
	var ally = $('<div>');
	addUnitLine(ally, 'Ally');
	
	ally.find('.select-ally ul').append(createAlliesSelectContent());
	ally.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	ally.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	ally.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	$('#allies-container').append(ally);
	return ally;
}

function addFamiliarLine() {
	var familiar = $('<div>');
	addUnitLine(familiar, 'Familiar');
	
	familiar.find('.select-familiar ul').append(createFamiliarsSelectContent());
	familiar.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	familiar.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	familiar.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	$('#familiars-container').append(familiar);
	return familiar;
}

function addObjectiveLine() {
	var objective = $('<div>');
	addUnitLine(objective, 'Objective');
	objective.find('input[type="text"]').remove();
	
	objective.find('.select-objective ul').append(createObjectiveSelectContent());
	objective.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	objective.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	objective.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	$('#objective-container').append(objective);
	return objective;
}

function createSkillsBlock() {
	var html = $('<div>').addClass('showClass').addClass('skills-container');
	html.append($('<h1>Skills</h1>'));
	var skillsImages = $('<div>').addClass('imagescontainer');
	for (c in CLASSES) {
		if (CLASSES[c] == undefined) continue;
		var currentClass = CLASSES[c];
		for (var i = 0; i < currentClass.skills.length; i++) {
			var skill = currentClass.skills[i];
			if (skill[2] != undefined) continue;
			var classUpdatedTitle = currentClass.title.replace(new RegExp(" ",'g'), '').toLowerCase();
			var skillObject = $('<div>').addClass('checkbox').addClass(classUpdatedTitle);
			skillObject.append($('<label><input type="checkbox" name="' + skill[0] + '" onClick="adjustSkillsImages(this);"/> ' + skill[0] + '</label>'));
			if (skill[1] == 0) {
				skillObject.addClass('disabled');
				skillObject.find('input').prop('checked', true);
				skillObject.find('input').attr('disabled', '');
			}
			html.append(skillObject);
			skillsImages.append($('<img>').attr('src', 'images/classes_cards/' + classUpdatedTitle + '/' + skill[0].replace(new RegExp(" ",'g'), '_').toLowerCase() + '.jpg').attr('skill', skill[0]));
		}
	}
	html.append(skillsImages);
	return html;
}

function createItemsBlock() {
	var html = $('<div>').addClass('items-block');
	var itemsContainer = $('<div>').addClass('items-container');
	itemsContainer.append($('<h1>Items</h1>'));
	itemsContainer.append($('<img src="images/misc/hand.png">').addClass('hand'));
	itemsContainer.append($('<img src="images/misc/hand2.png">').addClass('hand2'));
	itemsContainer.append($('<img src="images/misc/armor.png">').addClass('armor'));
	itemsContainer.append($('<img src="images/misc/item.png">').addClass('item'));
	itemsContainer.append($('<img src="images/misc/item.png">').addClass('item2'));
	html.append(itemsContainer);
	
	var itemsSelects = $('<div>').addClass('items-selects showclass');
	var weaponSelect = $(createInputSelect('Select Weapon', 'weapon-title', 'select-weapon'));
	weaponSelect.find('ul').append(createHandSelectContent());
	itemsSelects.append(weaponSelect);
	
	var weaponSelectSecond = $(createInputSelect('Select Weapon', 'weapon-title', 'select-weapon')).addClass('second-select');
	weaponSelectSecond.find('ul').append(createHandSelectContent());
	itemsSelects.append(weaponSelectSecond);
	
	var armorSelect = $(createInputSelect('Select Armor', 'armor-title', 'select-armor'));
	armorSelect.find('ul').append(createArmorSelectContent());
	itemsSelects.append(armorSelect);
	
	var itemsSelect = $(createInputSelect('Select Item', 'item-title', 'select-item'));
	itemsSelect.find('ul').append(createItemSelectContent());
	itemsSelects.append(itemsSelect);
	
	var itemsSelectSecond = $(createInputSelect('Select Item', 'item-title', 'select-item')).addClass('second-select');
	itemsSelectSecond.find('ul').append(createItemSelectContent());
	itemsSelects.append(itemsSelectSecond);
	
	html.append(itemsSelects);
	html.append($('<input type="hidden" name="hand">'));
	html.append($('<input type="hidden" name="hand2">'));
	html.append($('<input type="hidden" name="armor">'));
	html.append($('<input type="hidden" name="item">'));
	html.append($('<input type="hidden" name="item2">'));
	return html;
}

function createSackAndSearchBlock() {
	var html = $('<div>').addClass('sack-block');
	var sackContainer = $('<div>').addClass('sack-container');
	sackContainer.append($('<h1>Sack and Search items</h1>'));
	var additionButton = $('<button>').attr('type','button').addClass('btn btn-success').attr('aria-expanded','false').attr('onclick', 'addToSack(this);');
	additionButton.html('Add Item or Search card');
	sackContainer.append(additionButton);
	html.append(sackContainer);
	
	var sackSelects = $('<div>').addClass('sack-selects');
	html.append(sackSelects);
	return html;
}

function createInputSelect(title, titleClass, additionalClass) {
	var select = $('<div>').addClass('btn-group').addClass(additionalClass);
	var button = $('<button>').attr('type','button').addClass('btn btn-default dropdown-toggle').attr('data-toggle','dropdown').attr('aria-expanded','false');
	button.append($('<span>' + title + ' </span>').addClass(titleClass)).append($('<span>').addClass('caret'));
	select.append(button).append($('<ul>').addClass('dropdown-menu').attr('role','menu'));
	return select;
}

function addToSack(element) {
	var container = $(element).parents('.select-row');
	var sackAttribute = 'sack' + sackNumber.toString();
	container.find('.sack-container button').before('<img src="images/search_cards/flipped.jpg" item="Flipped" sack="' + sackAttribute + '"/>');
	container.find('.sack-selects').append(createItemsAndSearchSelect().attr('sack', sackAttribute));
	sackNumber += 1;
	return sackAttribute;
}

function removeFromSack(element) {
	var elementAttr = $(element).parents('.select-sack').attr('sack');
	$(element).parents('.select-row').find('[sack="' + elementAttr + '"]').remove();
}

function updateSackItem(element, value) {
	var container = $(element).parents('.select-row');
	var parent = $(element).parent();
	var search = parent.hasClass('search');
	var tierOne = parent.hasClass('tierone');
	var relic = parent.hasClass('relic');
	var classItem = parent.hasClass('classitem');
	var elementAttr = $(element).parents('.select-sack').attr('sack');
	var folder = search ? 'search_cards' : 'items_cards/' + (tierOne ? 'tier_one' : relic ? 'relic' : 'tier_two');
	if (classItem) {
		folder = 'classes_cards/' + parent.attr('class').replace(new RegExp("classitem",'g'), '').replace(new RegExp("twohand",'g'), '').replace(new RegExp(" ",'g'), '');
	}
	container.find('img[sack="' + elementAttr + '"]').attr('src', 'images/' + folder + '/' + value.replace(new RegExp(" ",'g'), '_').toLowerCase() + '.jpg').attr('item', value);
	container.find('div[sack="' + elementAttr + '"]').find('.sack-title').html(value + ' ');
}

function getSkillsItems(type) {
	var result = [];
	for (var i = 0; i < CLASSES_ITEMS.length; i++) {
		if (CLASSES_ITEMS[i][2] == type) result.push(CLASSES_ITEMS[i]);
	}
	return result;
}

function monster(element) {
	var container = $(element);
	var monster = {};
	monster.title = container.find('[name="monster-title"]').val();
	monster.master = container.find('[name="master"]').val() == 'true';
	monster.x = container.find('[name="monster-x"]').val();
	monster.y = container.find('[name="monster-y"]').val();
	monster.vertical = container.find('[name="monster-x-size"]').val() < container.find('[name="monster-y-size"]').val();
	monster.hp = container.find('[name="monster-hp"]').val();
	return monster;
}

function hero(element) {
	var container = $(element);
	var hero = {};
	hero.title = container.find('[name="hero-title"]').val();
	hero.x = container.find('[name="hero-x"]').val();
	hero.y = container.find('[name="hero-y"]').val();
	hero.hp = container.find('[name="hero-hp"]').val();
	hero.stamina = container.find('[name="hero-stamina"]').val();
	hero.className = container.find('[name="class-title"]').val();
	hero.skills = getSkills(container, hero.className);
	hero.items = getItems(container);
	hero.sack = getSackAndSearch(container);
	return hero;
}

function getSkills(container, className) {
	var result = [];
	var skills = $(container).find('.checkbox.' + className.replace(new RegExp(" ",'g'), '').toLowerCase() + ' input');
	for (var i = 0; i < skills.length; i++) {
		var currentSkill = $(skills[i]); 
		result.push([currentSkill.attr('name'), currentSkill.prop('checked')]);
	}
	return result;
}

function getItems(container) {
	var items = {};
	items.hand = container.find('[name="hand"]').val();
	items.hand2 = container.find('[name="hand2"]').val();
	items.armor = container.find('[name="armor"]').val();
	items.item = container.find('[name="item"]').val();
	items.item2 = container.find('[name="item2"]').val();
	return items;
}

function getSackAndSearch(container) {
	var result = [];
	var sack = $(container).find('[item]');
	for (var i = 0; i < sack.length; i++) {
		result.push($(sack[i]).attr('item'));
	}
	return result;
}

function getMapTiles() {
	var result = [];
	var tiles = $('#tiles-container .select-row');
	for (var i = 0; i < tiles.length; i++) {
		var container = $(tiles[i]);
		var tile = {};
		tile.title = container.find('[name="tile-title"]').val();
		tile.side = container.find('[name="tile-side"]').val();
		tile.x = container.find('[name="tile-x"]').val();
		tile.y = container.find('[name="tile-y"]').val();
		tile.angle = container.find('[name="tile-angle"]').val();
		result.push(tile);
	}
	return result;
}

function getDoors() {
	var result = [];
	var doors = $('#doors-container .select-row');
	for (var i = 0; i < doors.length; i++) {
		var container = $(doors[i]);
		var door = {};
		door.title = container.find('[name="door-title"]').val();
		door.vertical = container.find('[name="door-direction"]').val() == 'vertical';
		door.x = container.find('[name="door-x"]').val();
		door.y = container.find('[name="door-y"]').val();
		result.push(door);
	}
	return result;
}

function getXs() {
	var result = [];
	var xs = $('#xs-container .select-row');
	for (var i = 0; i < xs.length; i++) {
		var container = $(xs[i]);
		var x = {};
		x.title = container.find('[name="xs-title"]').val();
		x.x = container.find('[name="xs-x"]').val();
		x.y = container.find('[name="xs-y"]').val();
		result.push(x);
	}
	return result;
}

function getAllies() {
	var result = [];
	var allies = $('#allies-container .select-row');
	for (var i = 0; i < allies.length; i++) {
		var container = $(allies[i]);
		var ally = {};
		ally.title = container.find('[name="ally-title"]').val();
		ally.x = container.find('[name="ally-x"]').val();
		ally.y = container.find('[name="ally-y"]').val();
		ally.hp = container.find('[name="ally-hp"]').val();
		result.push(ally);
	}
	return result;
}

function getFamiliars() {
	var result = [];
	var familiars = $('#familiars-container .select-row');
	for (var i = 0; i < familiars.length; i++) {
		var container = $(familiars[i]);
		var familiar = {};
		familiar.title = container.find('[name="familiar-title"]').val();
		familiar.x = container.find('[name="familiar-x"]').val();
		familiar.y = container.find('[name="familiar-y"]').val();
		familiar.hp = container.find('[name="familiar-hp"]').val();
		result.push(familiar);
	}
	return result;
}

function getObjectives() {
	var result = [];
	var objectives = $('#objective-container .select-row');
	for (var i = 0; i < objectives.length; i++) {
		var container = $(objectives[i]);
		var objective = {};
		objective.title = container.find('[name="objective-title"]').val();
		objective.x = container.find('[name="objective-x"]').val();
		objective.y = container.find('[name="objective-y"]').val();
		result.push(objective);
	}
	return result;
}

function populate() {
	collectData();
	updateConfig();
	constructMapFromConfig();
}

function constructMapFromConfig() {
	/*under construction*/;
	$('#map .map').html('');
	$('#map .figures').html('');
	
	for (var i = 0; config.tiles != undefined && i < config.tiles.length; i++) {
		var tile = config.tiles[i];
		var tileObject = $('<div>');
		var tileImage = $('<img>');
		var folder = 'images/map_tiles/';
		var angle = tile.angle;
		if (angle == 90 || angle == 270){
			folder += 'vertical/';
			angle -= 90;
		}
		tileObject.css({
			'position' : 'absolute',
			'left' : (tile.x * cellSize).toString() + 'px',
			'top' : (tile.y * cellSize).toString() + 'px'
		});
		tileImage.css({
			'-ms-transform' : 'rotate(' + angle + 'deg)',
		    '-webkit-transform' : 'rotate(' + angle + 'deg)',
		    'transform' : 'rotate(' + angle + 'deg)'
		});
		tileImage.attr('src', folder + tile.title + tile.side + '.png');
		tileObject.append(tileImage);
		$('#map .map').append(tileObject);
	}
	
	for (var i = 0; config.doors != undefined && i < config.doors.length; i++) {
		var door = config.doors[i];
		var doorObject = $('<div>');
		var doorImage = $('<img>');
		var folder = 'images/doors/';
		doorObject.css({
			'position' : 'absolute',
			'left' : (door.x * cellSize).toString() + 'px',
			'top' : (door.y * cellSize).toString() + 'px'
		});
		if (door.vertical) {
			doorImage.css({
				'-ms-transform' : 'rotate(90deg)',
				'-webkit-transform' : 'rotate(90deg)',
				'transform' : 'rotate(90deg)',
				'transform-origin' : cellSize.toString() + 'px'
			});
		}
		doorImage.attr('src', folder + door.title + '.png');
		doorObject.append(doorImage);
		$('#map .map').append(doorObject);
	}
	
	for (var i = 0; config.xs != undefined && i < config.xs.length; i++) {
		var xs = config.xs[i];
		var xsObject = $('<div>');
		var xsImage = $('<img>');
		var folder = 'images/blocks/';
		xsObject.css({
			'position' : 'absolute',
			'left' : (xs.x * cellSize).toString() + 'px',
			'top' : (xs.y * cellSize).toString() + 'px'
		});
		xsImage.attr('src', folder + xs.title + '.png');
		xsObject.append(xsImage);
		$('#map .map').append(xsObject);
	}
	
	for (var i = 0; config.objectives != undefined && i < config.objectives.length; i++) {
		var objective = config.objectives[i];
		var objectiveObject = $('<div>');
		var objectiveImage = $('<img>');
		var folder = 'images/misc/objective_';
		objectiveObject.css({
			'position' : 'absolute',
			'left' : (objective.x * cellSize).toString() + 'px',
			'top' : (objective.y * cellSize).toString() + 'px'
		});
		objectiveImage.attr('src', folder + objective.title + '.png');
		objectiveObject.append(objectiveImage);
		$('#map .map').append(objectiveObject);
	}
	
	for (var i = 0; config.monsters != undefined && i < config.monsters.length; i++) {
		var monster = config.monsters[i];
		var monsterObject = $('<div>');
		var monsterImage = $('<img>');
		var monsterHp = $('<div>').addClass('hit-points');
		monsterHp.html(monster.hp.toString());
		var folder = 'images/monsters_tokens/';
		if (monster.vertical) folder += 'vertical/';
		monsterObject.css({
			'position' : 'absolute',
			'left' : (monster.x * cellSize).toString() + 'px',
			'top' : (monster.y * cellSize).toString() + 'px'
		});
		monsterImage.attr('src', folder + monster.title.replace(new RegExp(" ",'g'), '_').toLowerCase() + (monster.master ? '_master.png' : '.png'));
		monsterObject.append(monsterImage);
		monsterObject.append(monsterHp);
		$('#map .figures').append(monsterObject);
	}
	
	for (var i = 0; config.allies != undefined && i < config.allies.length; i++) {
		var ally = config.allies[i];
		var allyObject = $('<div>');
		var allyImage = $('<img>');
		var allyHp = $('<div>').addClass('hit-points');
		allyHp.html(ally.hp.toString());
		var folder = 'images/allies_tokens/';
		allyObject.css({
			'position' : 'absolute',
			'left' : (ally.x * cellSize).toString() + 'px',
			'top' : (ally.y * cellSize).toString() + 'px'
		});
		allyImage.attr('src', folder + ally.title.replace(new RegExp(" ",'g'), '_').toLowerCase() + '.png');
		allyObject.append(allyImage);
		allyObject.append(allyHp);
		$('#map .figures').append(allyObject);
	}
	
	for (var i = 0; config.familiars != undefined && i < config.familiars.length; i++) {
		var familiar = config.familiars[i];
		var familiarObject = $('<div>');
		var familiarImage = $('<img>');
		var familiarHp = $('<div>').addClass('hit-points');
		familiarHp.html(familiar.hp.toString());
		var folder = 'images/familiars_tokens/';
		familiarObject.css({
			'position' : 'absolute',
			'left' : (familiar.x * cellSize).toString() + 'px',
			'top' : (familiar.y * cellSize).toString() + 'px'
		});
		familiarImage.attr('src', folder + familiar.title.replace(new RegExp(" ",'g'), '_').toLowerCase() + '.png');
		familiarObject.append(familiarImage);
		familiarObject.append(familiarHp);
		$('#map .figures').append(familiarObject);
	}
	
	addHeroToMap(config.hero1);
	addHeroToMap(config.hero2);
	addHeroToMap(config.hero3);
	addHeroToMap(config.hero4);
}

function addHeroToMap(hero) {
	var heroObject = $('<div>');
	var heroImage = $('<img>');
	var heroHp = $('<div>').addClass('hit-points');
	heroHp.html(hero.hp.toString());
	var heroStamina = $('<div>').addClass('stamina');
	heroStamina.html(hero.stamina.toString());
	var folder = 'images/heroes_tokens/';
	heroObject.css({
		'position' : 'absolute',
		'left' : (hero.x * cellSize).toString() + 'px',
		'top' : (hero.y * cellSize).toString() + 'px'
	});
	heroImage.attr('src', folder + hero.title.replace(new RegExp(" ",'g'), '_').toLowerCase() + '.png');
	if (hero.title == 'Leoric of the book') {
		var aura = $('<div>');
		aura.css({
			'position' : 'absolute',
			'left' : '-' + (3 * cellSize).toString() + 'px',
			'top' : '-' + (3 * cellSize).toString() + 'px',
			'width' : (7 * cellSize).toString() + 'px',
			'height' : (7 * cellSize).toString() + 'px',
			'border' : '2px dashed gold',
			'border-radius' : (cellSize / 2).toString() + 'px'
		});
		heroObject.append(aura);
	}
	heroObject.append(heroImage);
	heroObject.append(heroHp);
	heroObject.append(heroStamina);
	$('#map .figures').append(heroObject);
}

function constructSettingsFromConfig() {
	for (var i=1; i <= 4; i++) {
		var j = i.toString();
		var heroConfig = config['hero' + j.toString()];
		if (heroConfig.title != "" && heroConfig.title != undefined) {
			var heroSelector = '#hero' + j.toString();
			updateHero($(heroSelector + ' .select-hero li')[0],heroConfig.title);
			$(heroSelector + ' [name="hero-hp"]').val(heroConfig.hp);
			$(heroSelector + ' [name="hero-stamina"]').val(heroConfig.stamina);
			$(heroSelector + ' [name="hero-x"]').val(heroConfig.x);
			$(heroSelector + ' .x-title').html(getAlphabetChar(heroConfig.x - 1) + ' ');
			$(heroSelector + ' [name="hero-y"]').val(heroConfig.y);
			$(heroSelector + ' .y-title').html(heroConfig.y.toString() + ' ');
			if (heroConfig.className != undefined) {
				updateClass($(heroSelector + ' .select-class li')[0], heroConfig.className.toString());
			}
			if (heroConfig.skills != undefined) {
				updateSkills($(heroSelector + ' .skills-container'), heroConfig.skills);
				adjustSkillsImages($(heroSelector + ' .skills-container'));
			}
			if (heroConfig.items != undefined && heroConfig.items.hand != undefined) {
				updateHand($(heroSelector + ' .select-weapon:not(.second-select) [onclick="updateHand(this, \'' + heroConfig.items.hand + '\')"]'), heroConfig.items.hand);
			}
			if (heroConfig.items != undefined && heroConfig.items.hand2 != undefined) {
				updateHand($(heroSelector + ' .select-weapon.second-select [onclick="updateHand(this, \'' + heroConfig.items.hand2 + '\')"]'), heroConfig.items.hand2);
			}
			if (heroConfig.items != undefined && heroConfig.items.armor != undefined) {
				updateArmor($(heroSelector + ' .select-armor [onclick="updateArmor(this, \'' + heroConfig.items.armor + '\')"]'), heroConfig.items.armor);
			}
			if (heroConfig.items != undefined && heroConfig.items.item != undefined) {
				updateItem($(heroSelector + ' .select-item:not(.second-select) [onclick="updateItem(this, \'' + heroConfig.items.item + '\')"]'), heroConfig.items.item);
			}
			if (heroConfig.items != undefined && heroConfig.items.item2 != undefined) {
				updateItem($(heroSelector + ' .select-item.second-select [onclick="updateItem(this, \'' + heroConfig.items.item2 + '\')"]'), heroConfig.items.item2);
			}
			if (heroConfig.sack != undefined) {
				for (var k = 0; k < heroConfig.sack.length; k++) {
					var sackAttribute = addToSack($(heroSelector + ' .sack-container button'));
					updateSackItem($(heroSelector + ' [sack="' + sackAttribute + '"] [onclick="updateSackItem(this, \'' + heroConfig.sack[k] + '\')"]'), heroConfig.sack[k]);
				}
			}
		}
	}
	removeMonsterRows();
	if (config.monsters != undefined) {
		for (var i = 0; i < config.monsters.length; i++) {
			var monster = config.monsters[i];
			if (monster.title != '') {
				var monsterLine = addMonsterLine();
				var width = monster.vertical ? MONSTERS[monster.title].width : MONSTERS[monster.title].height;
				var height = monster.vertical ? MONSTERS[monster.title].height : MONSTERS[monster.title].width;
				
				var monsterSelectUnit = monsterLine.find('[onclick="updateMonster(this, \'' + monster.title + '\');"]');
				var correctMonsterSelectUnit;
				
				if (monster.master && $(monsterSelectUnit[0]).html().indexOf('master') > -1 || !monster.master && !($(monsterSelectUnit[0]).html().indexOf('master') > -1)) {
					correctMonsterSelectUnit = monsterSelectUnit[0];
				} else {
					correctMonsterSelectUnit = monsterSelectUnit[1];
				}
				updateMonster(correctMonsterSelectUnit, monster.title);
				
				var xValue = width.toString() + monster.x.toString();
				updateCoordinate(monsterLine.find('.select-x [onclick="updateCoordinate(this, \'' + xValue + '\');"]'), xValue);
				var yValue = height.toString() + monster.y.toString();
				updateCoordinate(monsterLine.find('.select-y [onclick="updateCoordinate(this, \'' + yValue + '\');"]'), yValue);
				monsterLine.find('input[name="monster-hp"]').val(monster.hp);
			}
		}
	}
	if (config.tiles != undefined) {
		for (var i = 0 ; i < config.tiles.length; i++) {
			var container = addMapTileLine();
			var tile = config.tiles[i];
			updateTile(container.find('.select-tile li')[0], tile.title);
			updateSide(container.find('.select-side li')[0], tile.side);
			container.find('[name="tile-x"]').val(tile.x);
			container.find('.x-title').html(getAlphabetChar(tile.x - 1) + ' ');
			container.find('[name="tile-y"]').val(tile.y);
			container.find('.y-title').html(tile.y.toString() + ' ');
			updateAngle(container.find('.select-angle li')[0], tile.angle);
		}
	}
	if (config.doors != undefined) {
		for (var i = 0 ; i < config.doors.length; i++) {
			var container = addDoorLine();
			var door = config.doors[i];
			updateDoor(container.find('.select-door li')[0], door.title);
			updateDirection(container.find('.select-direction li')[0], door.vertical ? 'vertical' : 'horizontal');
			container.find('[name="door-x"]').val(door.x);
			container.find('.x-title').html(getAlphabetChar(door.x - 1) + ' ');
			container.find('[name="door-y"]').val(door.y);
			container.find('.y-title').html(door.y.toString() + ' ');
		}
	}
	if (config.xs != undefined) {
		for (var i = 0 ; i < config.xs.length; i++) {
			var container = addXsLine();
			var xs = config.xs[i];
			updateXs(container.find('.select-xs li')[0], xs.title);
			container.find('[name="xs-x"]').val(xs.x);
			container.find('.x-title').html(getAlphabetChar(xs.x - 1) + ' ');
			container.find('[name="xs-y"]').val(xs.y);
			container.find('.y-title').html(xs.y.toString() + ' ');
		}
	}
	if (config.allies != undefined) {
		for (var i = 0 ; i < config.allies.length; i++) {
			var container = addAllyLine();
			var ally = config.allies[i];
			updateAlly(container.find('.select-ally li')[0], ally.title);
			container.find('[name="ally-x"]').val(ally.x);
			container.find('.x-title').html(getAlphabetChar(ally.x - 1) + ' ');
			container.find('[name="ally-y"]').val(ally.y);
			container.find('.y-title').html(ally.y.toString() + ' ');
			container.find('[name="ally-hp"]').val(ally.hp);
		}
	}
	if (config.familiars != undefined) {
		for (var i = 0 ; i < config.familiars.length; i++) {
			var container = addFamiliarLine();
			var familiar = config.familiars[i];
			updateFamiliar(container.find('.select-familiar li')[0], familiar.title);
			container.find('[name="familiar-x"]').val(familiar.x);
			container.find('.x-title').html(getAlphabetChar(familiar.x - 1) + ' ');
			container.find('[name="familiar-y"]').val(familiar.y);
			container.find('.y-title').html(familiar.y.toString() + ' ');
			container.find('[name="familiar-hp"]').val(familiar.hp);
		}
	}
	if (config.objectives != undefined) {
		for (var i = 0 ; i < config.objectives.length; i++) {
			var container = addObjectiveLine();
			var objective = config.objectives[i];
			updateObjective(container.find('.select-objective li')[0], objective.title);
			container.find('[name="familiar-x"]').val(objective.x);
			container.find('.x-title').html(getAlphabetChar(objective.x - 1) + ' ');
			container.find('[name="familiar-y"]').val(objective.y);
			container.find('.y-title').html(objective.y.toString() + ' ');
		}
	}
}

function updateConfig() {
	window.location.hash = Base64.encode(JSON.stringify(config));
}

function decodeConfig() {
	config = JSON.parse(Base64.decode(window.location.hash));
}

function collectData() {
	var monsterRows = $('#monsters .select-row');
	config.monsters = [];
	for (var i = 0; i < monsterRows.length; i++) {
		config.monsters.push(monster(monsterRows[i]));
	}
	config.hero1 = hero($('#hero1 .select-row'));
	config.hero2 = hero($('#hero2 .select-row'));
	config.hero3 = hero($('#hero3 .select-row'));
	config.hero4 = hero($('#hero4 .select-row'));
	config.tiles = getMapTiles();
	config.doors = getDoors();
	config.xs = getXs();
	config.allies = getAllies();
	config.familiars = getFamiliars();
	config.objectives = getObjectives();
}

function drawGrid() {
	for (var i = 0; i < mapWidth; i++) {
		var element = $('<div>');
		element.html(ALPHABET.charAt(i));
		element.css({
				'position' : 'absolute',
				'left' : ((1 + i) * cellSize).toString() + 'px',
				'top' : '0'
		});
		$('.grid').append(element);
	}
	for (var i = 0; i <= mapHeight; i++) {
		var element = $('<div>');
		element.html(i.toString());
		element.css({
				'position' : 'absolute',
				'left' : '0',
				'top' : ((1 + i) * cellSize).toString() + 'px'
		});
		$('.grid').append(element);
	}
}

function adjustAct() {
	actOne = $('[name="act"]:checked').val() == 'one';
}

$(function() {
	addMonsterLine();
	for (var i = 1; i <= 4; i++) {
		addHeroLine(i);
	}
	drawGrid();
	if (window.location.hash != "") {
		decodeConfig();
		constructMapFromConfig();
		constructSettingsFromConfig();
	} else {
		//TEST
		config = JSON.parse(Base64.decode(defaultConfig));
		constructMapFromConfig();
		constructSettingsFromConfig();
	}

	$('.nav-tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
});