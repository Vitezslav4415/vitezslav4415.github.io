function toggleMenu() {
	$('.menu').toggleClass('active');
}

function urlize(value) {
	return somethingize(value, '_'); 
}

function folderize(value) {
	return somethingize(value, '');
}

function somethingize(value, replacement) {
	if (value == undefined) {
		condole.log('somethingize value is undefined');
		return '';
	}
	return value.replace(new RegExp(" ",'g'), replacement).toLowerCase();
}

function createSelect(title) {
	html = '<div class="btn-group select-x showOneCell showTwoCells"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' + title + ' <span class="caret"></span></button><ul class="dropdown-menu" role="menu"></ul></div>';
	
	return html;
}

function addOptionOld(title, value, optionClass) {
	return '<option class="' + optionClass + '" value="' + value + '">' + title + '</option>';
}

function addOption(title, optionClass, functionCallback) {
	//return '<li class="' + optionClass + '"><a href="#" onclick="' + functionCallback + '">' + title + '</a></li>';
	return '<li class="' + optionClass + '"><a onclick="' + functionCallback + '">' + title + '</a></li>';
}

function adjustMonsterList() {
	monsterList = new Set();
	var monsters = $('[name="monster-title"]');
	for (var i = 0; i < monsters.length; i++) {
		monsterList.add($(monsters[i]).val());
	}
}

function updateMonster(element, value) {
	updateOption(element, value, true);
	adjustMonsterList();
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
			container.find('input[name="lieutenant-x"]').attr('value',selectedCoordinate);
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
			container.find('input[name="lieutenant-y"]').attr('value',selectedCoordinate);
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
	container.children('img').attr('src', 'images/heroes_cards/' + urlize(value) + '.jpg');
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
	container.children('img').attr('src', 'images/heroes_cards/default.jpg');
	var heroId = container.parent().attr('id');
	heroId = heroId.substring(0, 5);
	$('[href="#' + heroId + '"]').html('Hero ' + heroId.substring(4, 5));
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

function updateClass(element, value, skipItems) {
	var container = $(element).parents('.select-row');
	container.find('.class-title').html(value + ' ');
	container.find('input[name="class-title"]').attr('value',value);
	var currentClass = CLASSES[value];
	adjustArchetype(element, currentClass.archetype.title);
	adjustSkills(element, value);
	adjustSkillsImages(element);
	adjustItems(element, value);
	if (skipItems == undefined || !skipItems) {
		var handUsed = false;
		var itemUsed = false;
		for (var i = 0; i < currentClass.skills.length; i++) {
			var skill = currentClass.skills[i];
			var itemType = skill[2];
			if (itemType != undefined) {
				switch (itemType) {
				case hand:
					updateHand(container.find('.select-weapon' + (handUsed ? '.second-select' : ':not(.second-select)') + ' li:not(.twohand).' + folderize(value) + ' a')[0], skill[0]);
					handUsed = true;
					break;
				case twohand:
					updateHand(container.find('.select-weapon' + (handUsed ? '.second-select' : ':not(.second-select)') + ' li.twohand.' + folderize(value) + ' a')[0], skill[0]);
					handUsed = true;
					break;
				case armor:
					updateArmor(container.find('.select-armor li.' + folderize(value) + ' a')[0], skill[0]);
					break;
				case item:
					updateItem(container.find('.select-item' + (itemUsed ? '.second-select' : ':not(.second-select)') + ' li.' + folderize(value) + ' a')[0], skill[0]);
					itemUsed = true;
				}
			}
		}
	}
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
	container.find('.skills-container').attr("class", "showclass skills-container " + folderize(value));
}

function adjustItems(element, value) {
	var container = $(element).parents('.select-row');
	container.find('.items-selects').attr("class", "showclass items-selects " + folderize(value));
}

function adjustSkillsImages(element) {
	var container = $(element).parents('.select-row');
	var checkedSkills = [];
	var className = container.find('input[name="class-title"]').attr('value');
	var skills = $(container).find('.checkbox.' + folderize(className) + ' input');
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

function adjustAlliesSkillsImages(element) {
	var container = $(element).parents('.select-row');
	container.find('.ally-skills-images-container img').css('display','none');
	var ally = container.find('[name="ally-title"]').val();
	var checkboxes = container.find('[ally="' + ally + '"] input[type="checkbox"]');
	for (var i = 0; i < checkboxes.length; i++) {
		var checkbox = $(checkboxes[i]);
		if (checkbox.prop('checked')) {
			var skill = checkbox.attr('name');
			container.find('img[skill="' + skill + '"][ally="' + ally + '"]').css('display','inline-block');
		}
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
		src = 'images/classes_cards/' + folderize(classValue) + '/' + urlize(value) + '.jpg';
	} else {
		var tierFolder = tierOne ? 'tier_one' : 'tier_two';
		if (relic) tierFolder = 'relic';
		src = 'images/items_cards/' + tierFolder + '/' + urlize(value) + '.jpg';
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
		src = 'images/classes_cards/' + folderize(classValue) + '/' + urlize(value) + '.jpg';
	} else {
		var tierFolder = tierOne ? 'tier_one' : 'tier_two';
		if (relic) tierFolder = 'relic';
		src = 'images/items_cards/' + tierFolder + '/' + urlize(value) + '.jpg';
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
		src = 'images/classes_cards/' + folderize(classValue) + '/' + urlize(value) + '.jpg';
	} else {
		var tierFolder = tierOne ? 'tier_one' : 'tier_two';
		if (relic) tierFolder = 'relic';
		src = 'images/items_cards/' + tierFolder + '/' + urlize(value) + '.jpg';
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
	var twoHand = container.find('.hand2').hasClass('secondary');
	if (twoHand) {
		container.find('.hand2').removeClass('secondary');
		container.find('.items-container').find('.hand').attr('src', 'images/misc/hand.png');
		container.find('.items-container').find('.hand2').attr('src', 'images/misc/hand2.png');
		container.find('.weapon-title').html('Select Weapon ');
		container.find('[name="hand"],[name="hand2"]').val('');
	} else {
		container.find('.items-container').find(selector).attr('src', 'images/misc/hand' + (second ? '2' : '') + '.png');
		$(element).parents('.select-weapon').find('.weapon-title').html('Select Weapon ');
		container.find('[name="hand' + (second ? '2' : '') + '"]').val('');
	}
}

function clearArmor(element) {
	var container = $(element).parents('.select-row');
	container.find('.items-container').find('.armor').attr('src', 'images/misc/armor.png');
	$(element).parents('.select-weapon').find('.weapon-title').html('Select Armor ');
	container.find('[name="armor"]').val('');
}

function clearItem(element) {
	var container = $(element).parents('.select-row');
	var second = $(element).parents('.select-item').hasClass('second-select');
	var selector = '.item';
	if (second) selector += '2';
	container.find('.items-container').find(selector).attr('src', 'images/misc/item.png');
	$(element).parents('.select-item').find('.item-title').html('Select Item ');
	container.find('input[name="item' + (second ? '2' : '') + '"]').attr('value', '');
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
	container.find('img.ally-image').attr('src', 'images/allies_cards/' + urlize(value) + '.png').css('display','inline-block');
	container.find('img.ally-image-back').attr('src', 'images/allies_cards/' + urlize(value) + '_back.png').css('display','inline-block');
	container.find('[ally="' + value + '"] input[type="checkbox"]').parent().parent().css('display', 'block');
	adjustAlliesSkillsImages(element);
}

function clearAlly(element) {
	var container = $(element).parents('.select-row');
	container.find('.ally-title').html('Select Ally ');
	container.find('input[name="ally-title"]').attr('value','');
	container.find('img.ally-image').css('display','none');
	container.find('img.ally-image-back').css('display','none');
}

function updateLieutenant(element, value, showBack) {
	var container = $(element).parents('.select-row');
	container.find('.lieutenant-title').html(value + ' ');
	container.find('input[name="lieutenant-title"]').attr('value',value);
	var actAcronym = '_act';
	container.find('img.lieutenant-image').attr('src', 'images/lieutenant_cards/' + urlize(value) + actAcronym + (actOne ? '1' : '2') + '.jpg').css('display','inline-block');
	if (showBack) {
		container.find('img.lieutenant-image-back').attr('src', 'images/lieutenant_cards/' + urlize(value) + actAcronym + (actOne ? '1' : '2') + '_back.jpg').css('display','inline-block');
	} else {
		container.find('img.lieutenant-image-back').css('display','none');
	}
	container.find('[lieutenant="' + value + '"] input[type="checkbox"]').parent().parent().css('display', 'block');
//	adjustAlliesSkillsImages(element);
}

function clearLieutenant(element) {
	var container = $(element).parents('.select-row');
	container.find('.lieutenant-title').html('Select Lieutenant ');
	container.find('input[name="lieutenant-title"]').attr('value','');
	container.find('img.lieutenant-image').css('display','none');
	container.find('img.lieutenant-image-back').css('display','none');
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

function updateCondition(element, value) {
	var container = $(element).parents('.select-row');
	var id = $(element).parents('.select-condition').attr('id');
	container.find('.condition-title').html(value + ' ');
	container.find('#input' + id).attr('value',value);
}

function removeCondition(element) {
	var conditionSelect = $(element).parents('.select-condition'); 
	var id = conditionSelect.attr('id'); 
	conditionSelect.remove();
	$('#input' + id).remove();
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
	html += '<li role="separator" class="divider"></li>';
	for (var i = 0; i < MISCELLANEOUS_LIST.length; i++) {
		html += addOption(MISCELLANEOUS_LIST[i] + ' ', '', 'updateObjective(this, \'' + MISCELLANEOUS_LIST[i] + '\')');
	}
	return html;
}

function createConditionSelectContent() {
	var html = addOption('Remove condition', '', 'removeCondition(this);');
	for (var i = 0; i < CONDITIONS_LIST.length; i++) {
		html += addOption(CONDITIONS_LIST[i] + ' ', '', 'updateCondition(this, \'' + CONDITIONS_LIST[i] + '\')');
	}
	return html;
}

function createLieutenantsSelectContent() {
	var html = addOption('Clear', '', 'clearLieutenant(this);');
	for (var i = 0; i < LIEUTENANTS_LIST.length; i++) {
		html += addOption(LIEUTENANTS_LIST[i][0] + ' ', '', 'updateLieutenant(this, \'' + LIEUTENANTS_LIST[i][0] + '\', ' + LIEUTENANTS_LIST[i][1].toString() + ')');
	}
	return html;
}

function addCondition(button) {
	var condition = $(createInputSelect('Select condition', 'condition-title', 'select-condition')).attr('id', 'condition' + conditionNumber.toString());
	condition.find('ul').append(createConditionSelectContent());
	var buttonObject = $(button);
	buttonObject.before(condition);
	buttonObject.before('<input type="hidden" name="condition-title" id="inputcondition' + conditionNumber.toString() + '" value=""/>');
	conditionNumber += 1;
	return condition;
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
	monsterLine.append($('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addCondition(this);">Add condition</button>'));
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
	heroLine.append($('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addCondition(this);">Add condition</button>'));
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
	ally.append($('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addCondition(this);">Add condition</button>'));
	ally.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	ally.append($('<br/>'));
	ally.append($('<img src="" style="display: none;">').addClass('ally-image'));
	ally.append($('<img src="" style="display: none;">').addClass('ally-image-back'));
	ally.append($('<br/>'));
	ally.append(getAllySkillsBlock());
	$('#allies-container').append(ally);
	return ally;
}

function addFamiliarLine() {
	var familiar = $('<div>');
	addUnitLine(familiar, 'Familiar');
	
	familiar.find('.select-familiar ul').append(createFamiliarsSelectContent());
	familiar.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	familiar.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	familiar.append($('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addCondition(this);">Add condition</button>'));
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

function addLieutenantLine() {
	var lieutenant = $('<div>');
	addUnitLine(lieutenant, 'Lieutenant');
	
	lieutenant.find('.select-lieutenant ul').append(createLieutenantsSelectContent());
	lieutenant.find('.select-x ul').addClass('showOneCell').append(createXSelectContent(true));
	lieutenant.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	lieutenant.append($('<button type="button" class="btn btn-warning" aria-expanded="false" onclick="addCondition(this);">Add condition</button>'));
	lieutenant.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	lieutenant.append($('<br/>'));
	lieutenant.append($('<img src="" style="display: none;">').addClass('lieutenant-image'));
	lieutenant.append($('<img src="" style="display: none;">').addClass('lieutenant-image-back'));
	lieutenant.append($('<br/>'));
//	lieutenant.append(getAllySkillsBlock());
	$('#lieutenants-container').append(lieutenant);
	return lieutenant;
}

function createSkillsBlock() {
	var html = $('<div>').addClass('showClass').addClass('skills-container');
	html.append($('<h1>Skills</h1>'));
	var skillsImages = $('<div>').addClass('imagescontainer');
	for (ally in CLASSES) {
		if (CLASSES[ally] == undefined) continue;
		var currentClass = CLASSES[ally];
		for (var i = 0; i < currentClass.skills.length; i++) {
			var skill = currentClass.skills[i];
			if (skill[2] != undefined) continue;
			var classUpdatedTitle = folderize(currentClass.title);
			var skillObject = $('<div>').addClass('checkbox').addClass(classUpdatedTitle);
			skillObject.append($('<label><input type="checkbox" name="' + skill[0] + '" onClick="adjustSkillsImages(this);"/> ' + skill[0] + '</label>'));
			if (skill[1] == 0) {
				skillObject.addClass('disabled');
				skillObject.find('input').prop('checked', true);
				skillObject.find('input').attr('disabled', '');
			}
			html.append(skillObject);
			skillsImages.append($('<img>').attr('src', 'images/classes_cards/' + classUpdatedTitle + '/' + urlize(skill[0]) + '.jpg').attr('skill', skill[0]));
		}
	}
	html.append(skillsImages);
	return html;
}

function getAllySkillsBlock() {
	var html = $('<div>').addClass('ally-skills-container');
	html.append($('<h2>Ally skills</h3>'));
	var allySkillsImages = $('<div>').addClass('ally-skills-images-container');
	for (ally in ALLIES_SKILLS) {
		if (ALLIES_SKILLS[ally] == undefined) continue;
		var allySkills = ALLIES_SKILLS[ally];
		for (var i = 0; i < allySkills.length; i++) {
			var skill = allySkills[i];
			var skillObject = $('<div ally="' + ally + '">').addClass('checkbox');
			skillObject.css('display', 'none');
			skillObject.append($('<label><input type="checkbox" name="' + skill + '" onClick="adjustAlliesSkillsImages(this);"/> ' + skill + '</label>'));
			html.append(skillObject);
			allySkillsImages.append($('<img style="display: none;">').attr('src', 'images/ally_skill_cards/' + urlize(ally) + '/' + urlize(skill) + '.jpg').attr('skill', skill).attr('ally',ally));
		}
	}
	html.append(allySkillsImages);
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

function createOverlordCardsBlock() {
	var html = $('<div>').addClass('overlord-cards-container');
	var cardsImages = $('<div>').addClass('overlord-cards-images-container');
	for (ally in OVERLORD_CARDS) {
		if (OVERLORD_CARDS[ally] == undefined) continue;
		var cardType = OVERLORD_CARDS[ally];
		for (var i = 0; i < cardType.length; i++) {
			var card = cardType[i];
			if (true || ally != 'basic' && ally != 'basic2') {
				var cardCheckbox = $('<div>').addClass('checkbox');
				cardCheckbox.append($('<label><input type="checkbox" name="' + card.title + '" onClick="adjustOverlordCardsImages();"/> ' + card.title + '</label>'));
				html.append(cardCheckbox);
			}
			for (var j = 0; j < card.number; j++) {
				cardsImages.append($('<img>').attr('src', 'images/overlord_cards/' + ally + '/' + urlize(card.title) + '.jpg').attr('card', card.title).attr('onclick','$(this).toggleClass(\'secondary\');').css('display','none'));
			}
		}
	}
	html.prepend(cardsImages);
	$('#overlord-container').append(html);
	adjustOverlordCardsImages();
}

function adjustOverlordCardsImages() {
	$('.overlord-cards-images-container img').css('display','none');
	var overlordCards = $('.overlord-cards-container input[type="checkbox"]');
	for (var i = 0; i < overlordCards.length; i++) {
		var overlordCard = $(overlordCards[i]);
		if (overlordCard.prop('checked')) {
			$('.overlord-cards-images-container img[card="' + overlordCard.attr('name') + '"]').css('display', 'inline-block');
		}
	}
}

function selectBasicOverlordDeck() {
	switchBasicOverlordDeck(true);
}

function selectBasic2OverlordDeck() {
	switchBasicOverlordDeck(false);
}

function switchBasicOverlordDeck(first) {
	for (var i = 0; i < OVERLORD_CARDS['basic'].length; i++) {
		updateOverlordCard(OVERLORD_CARDS['basic'][i].title, first);
	}
	for (var i = 0; i < OVERLORD_CARDS['basic2'].length; i++) {
		updateOverlordCard(OVERLORD_CARDS['basic2'][i].title, !first);
	}
	adjustOverlordCardsImages();
}

function updateOverlordCard(title, value) {
	$('.overlord-cards-container input[name="' + title + '"]').prop('checked', value);
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
	container.find('img[sack="' + elementAttr + '"]').attr('src', 'images/' + folder + '/' + urlize(value) + '.jpg').attr('item', value);
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
	monster.conditions = getConditions(container);
	return monster;
}

function getConditions(container) {
	var conditions = container.find('[name="condition-title"]');
	var result = [];
	for (var i = 0; i < conditions.length; i++) {
		result.push($(conditions[i]).val());
	}
	return result;
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
	hero.conditions = getConditions(container);
	return hero;
}

function getSkills(container, className) {
	var result = [];
	var skills = $(container).find('.checkbox.' + folderize(className) + ' input');
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
		ally.conditions = getConditions(container);
		ally.skills = [];
		var skillCheckboxes = container.find('input[type="checkbox"]');
		for (var j = 0; j < skillCheckboxes.length; j++) {
			var skillCheckbox = $(skillCheckboxes[j]);
			if (skillCheckbox.prop('checked')) {
				ally.skills.push(skillCheckbox.attr('name'));
			}
		}
		result.push(ally);
	}
	return result;
}

function getLieutenants() {
	var result = [];
	var lieutenants = $('#lieutenants-container .select-row');
	for (var i = 0; i < lieutenants.length; i++) {
		var container = $(lieutenants[i]);
		var lieutenant = {};
		lieutenant.title = container.find('[name="lieutenant-title"]').val();
		lieutenant.x = container.find('[name="lieutenant-x"]').val();
		lieutenant.y = container.find('[name="lieutenant-y"]').val();
		lieutenant.hp = container.find('[name="lieutenant-hp"]').val();
		lieutenant.conditions = getConditions(container);
		lieutenant.hasBack = container.find('img.lieutenant-image-back').css('display') != 'none';
		lieutenant.skills = [];
		var skillCheckboxes = container.find('input[type="checkbox"]');
		for (var j = 0; j < skillCheckboxes.length; j++) {
			var skillCheckbox = $(skillCheckboxes[j]);
			if (skillCheckbox.prop('checked')) {
				lieutenant.skills.push(skillCheckbox.attr('name'));
			}
		}
		result.push(lieutenant);
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
		familiar.conditions = getConditions(container);
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

function getOverlordCards() {
	$('.overlord-cards-images-container img').css('display','none');
	var overlordCards = $('.overlord-cards-container input[type="checkbox"]');
	var result = [];
	for (var i = 0; i < overlordCards.length; i++) {
		var overlordCard = $(overlordCards[i]);
		if (overlordCard.prop('checked')) {
			var card = {};
			card.secondary = $('.overlord-cards-images-container img[card="' + overlordCard.attr('name') + '"].secondary').length;
			card.title = overlordCard.attr('name');
			result.push(card);
		}
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
		doorImage.attr('src', folder + urlize(door.title) + '.png');
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
		xsImage.attr('src', folder + urlize(xs.title) + '.png');
		xsObject.append(xsImage);
		$('#map .map').append(xsObject);
	}
	
	for (var i = 0; config.objectives != undefined && i < config.objectives.length; i++) {
		var objective = config.objectives[i];
		var objectiveObject = $('<div>');
		var objectiveImage = $('<img>');
		var folder = 'images/misc/';
		objectiveObject.css({
			'position' : 'absolute',
			'left' : (objective.x * cellSize).toString() + 'px',
			'top' : (objective.y * cellSize).toString() + 'px'
		});
		objectiveImage.attr('src', folder + urlize(objective.title) + '.png');
		objectiveObject.append(objectiveImage);
		$('#map .map').append(objectiveObject);
	}
	
	for (var i = 0; config.monsters != undefined && i < config.monsters.length; i++) {
		var monster = config.monsters[i];
		var monsterObject = $('<div>');
		var monsterImage = $('<img>');
		var monsterHp = $('<div>').addClass('hit-points');
		monsterHp.html(monster.hp == undefined ? '' : monster.hp.toString());
		var folder = 'images/monsters_tokens/';
		if (monster.vertical) folder += 'vertical/';
		monsterObject.css({
			'position' : 'absolute',
			'left' : (monster.x * cellSize).toString() + 'px',
			'top' : (monster.y * cellSize).toString() + 'px'
		});
		monsterImage.attr('src', folder + urlize(monster.title) + (monster.master ? '_master.png' : '.png'));
		monsterObject.append(monsterImage);
		monsterObject.append(monsterHp);
		addConditionsToImage(monsterObject, monster.conditions);
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
		allyImage.attr('src', folder + urlize(ally.title) + '.png');
		allyObject.append(allyImage);
		allyObject.append(allyHp);
		addConditionsToImage(allyObject, ally.conditions);
		$('#map .figures').append(allyObject);
	}
	
	for (var i = 0; config.lieutenants != undefined && i < config.lieutenants.length; i++) {
		var lieutenant = config.lieutenants[i];
		var lieutenantObject = $('<div>');
		var lieutenantImage = $('<img>');
		var lieutenantHp = $('<div>').addClass('hit-points');
		lieutenantHp.html(lieutenant.hp.toString());
		var folder = 'images/monsters_tokens/';
		lieutenantObject.css({
			'position' : 'absolute',
			'left' : (lieutenant.x * cellSize).toString() + 'px',
			'top' : (lieutenant.y * cellSize).toString() + 'px'
		});
		lieutenantImage.attr('src', folder + urlize(lieutenant.title) + '.png');
		lieutenantObject.append(lieutenantImage);
		lieutenantObject.append(lieutenantHp);
		addConditionsToImage(lieutenantObject, lieutenant.conditions);
		$('#map .figures').append(lieutenantObject);
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
		familiarImage.attr('src', folder + urlize(familiar.title) + '.png');
		familiarObject.append(familiarImage);
		familiarObject.append(familiarHp);
		addConditionsToImage(familiarObject, familiar.conditions);
		$('#map .figures').append(familiarObject);
	}
	
	addHeroToMap(config.hero1);
	addHeroToMap(config.hero2);
	addHeroToMap(config.hero3);
	addHeroToMap(config.hero4);
}

function addConditionsToImage(sourcesObject, sourceConfig) {
	var conditions = $('<div>').addClass('conditions');
	for (var j = 0; sourceConfig != undefined && j < sourceConfig.length; j++) {
		var conditionObject = $('<img>').attr('src', 'images/conditions_tokens/' + urlize(sourceConfig[j]) + '.png');
		if (j > 0) conditionObject.css({
			'position' : 'absolute',
			'top' : (20*j).toString() + 'px'
		});
		conditions.append(conditionObject);
	}
	sourcesObject.append(conditions);
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
	heroImage.attr('src', folder + urlize(hero.title) + '.png');
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
	if (hero.hp == 0) heroObject.addClass('secondary');
	addConditionsToImage(heroObject, hero.conditions);
	$('#map .figures').append(heroObject);
}

function constructSettingsFromConfig() {
	for (var i=1; i <= 4; i++) {
		var heroConfig = config['hero' + i.toString()];
		if (heroConfig.title != "" && heroConfig.title != undefined) {
			var heroSelector = '#hero' + i.toString();
			updateHero($(heroSelector + ' .select-hero li')[0],heroConfig.title);
			$(heroSelector + ' [name="hero-hp"]').val(heroConfig.hp);
			$(heroSelector + ' [name="hero-stamina"]').val(heroConfig.stamina);
			$(heroSelector + ' [name="hero-x"]').val(heroConfig.x);
			$(heroSelector + ' .x-title').html(getAlphabetChar(heroConfig.x - 1) + ' ');
			$(heroSelector + ' [name="hero-y"]').val(heroConfig.y);
			$(heroSelector + ' .y-title').html(heroConfig.y.toString() + ' ');
			if (heroConfig.className != undefined) {
				updateClass($(heroSelector + ' .select-class li')[0], heroConfig.className.toString(), true);
			}
			if (heroConfig.skills != undefined) {
				updateSkills($(heroSelector + ' .skills-container'), heroConfig.skills);
				adjustSkillsImages($(heroSelector + ' .skills-container'));
			}
			if (heroConfig.items != undefined && heroConfig.items.hand != undefined && heroConfig.items.hand != '') {
				updateHand($(heroSelector + ' .select-weapon:not(.second-select) [onclick="updateHand(this, \'' + heroConfig.items.hand + '\')"]'), heroConfig.items.hand);
			}
			if (heroConfig.items != undefined && heroConfig.items.hand2 != undefined && heroConfig.items.hand2 != '') {
				updateHand($(heroSelector + ' .select-weapon.second-select [onclick="updateHand(this, \'' + heroConfig.items.hand2 + '\')"]'), heroConfig.items.hand2);
			}
			if (heroConfig.items != undefined && heroConfig.items.armor != undefined && heroConfig.items.armor != '') {
				updateArmor($(heroSelector + ' .select-armor [onclick="updateArmor(this, \'' + heroConfig.items.armor + '\')"]'), heroConfig.items.armor);
			}
			if (heroConfig.items != undefined && heroConfig.items.item != undefined && heroConfig.items.item != '') {
				updateItem($(heroSelector + ' .select-item:not(.second-select) [onclick="updateItem(this, \'' + heroConfig.items.item + '\')"]'), heroConfig.items.item);
			}
			if (heroConfig.items != undefined && heroConfig.items.item2 != undefined && heroConfig.items.item2 != '') {
				updateItem($(heroSelector + ' .select-item.second-select [onclick="updateItem(this, \'' + heroConfig.items.item2 + '\')"]'), heroConfig.items.item2);
			}
			if (heroConfig.sack != undefined) {
				for (var j = 0; j < heroConfig.sack.length; j++) {
					var sackAttribute = addToSack($(heroSelector + ' .sack-container button'));
					updateSackItem($(heroSelector + ' [sack="' + sackAttribute + '"] [onclick="updateSackItem(this, \'' + heroConfig.sack[j] + '\')"]'), heroConfig.sack[j]);
				}
			}
			for (var j = 0; heroConfig.conditions != undefined && j < heroConfig.conditions.length; j++) {
				var condition = addCondition($(heroSelector).find('.btn-warning'));
				updateCondition(condition.find('li')[0], heroConfig.conditions[j]);
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
				for (var j = 0; monster.conditions != undefined && j < monster.conditions.length; j++) {
					var condition = addCondition(monsterLine.find('.btn-warning'));
					updateCondition(condition.find('li')[0], monster.conditions[j]);
				}
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
			for (var j = 0; ally.skills != undefined && j < ally.skills.length; j++) {
				container.find('[name="' + ally.skills[j] + '"]').prop('checked', true);
			}
			adjustAlliesSkillsImages(container.children()[0]);
		}
	}
	if (config.lieutenants != undefined) {
		for (var i = 0 ; i < config.lieutenants.length; i++) {
			var container = addLieutenantLine();
			var lieutenant = config.lieutenants[i];
			updateLieutenant(container.find('.select-lieutenant li')[0], lieutenant.title, lieutenant.hasBack);
			container.find('[name="ally-x"]').val(lieutenant.x);
			container.find('.x-title').html(getAlphabetChar(lieutenant.x - 1) + ' ');
			container.find('[name="ally-y"]').val(lieutenant.y);
			container.find('.y-title').html(lieutenant.y.toString() + ' ');
			container.find('[name="ally-hp"]').val(lieutenant.hp);
			for (var j = 0; lieutenant.skills != undefined && j < lieutenant.skills.length; j++) {
				container.find('[name="' + lieutenant.skills[j] + '"]').prop('checked', true);
			}
//			adjustAlliesSkillsImages(container.children()[0]);
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
			container.find('[name="objective-x"]').val(objective.x);
			container.find('.x-title').html(getAlphabetChar(objective.x - 1) + ' ');
			container.find('[name="objective-y"]').val(objective.y);
			container.find('.y-title').html(objective.y.toString() + ' ');
		}
	}
	for (var i = 0; config.overlord != undefined && config.overlord.cards != undefined && i < config.overlord.cards.length; i++) {
		var card = config.overlord.cards[i];
		updateOverlordCard(card.title, true);
		var imageObjects = $('[card="' + card.title + '"');
		for (var j = 0; j < card.secondary && j < imageObjects.length; j++) {
			$(imageObjects[j]).addClass('secondary');
		}
	}
	if (config.overlord != undefined && config.overlord.cards != undefined) {
		adjustOverlordCardsImages();
	}
}

function updateConfig() {
	window.location.hash = Base64.encode(JSON.stringify(config));
}

function decodeConfig() {
	config = JSON.parse(Base64.decode(window.location.hash));
}

function collectData() {
	var monsterRows = $('#monsters-container .select-row');
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
	config.overlord = {};
	config.overlord.cards = getOverlordCards();
	config.lieutenants = getLieutenants();
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
	createOverlordCardsBlock();
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