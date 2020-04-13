function calculateJSON() {
	//Remaining Issues:
	//1. Disambiguation option for normal number system.  6/7/8/9 don't conflict (except remove the "double stroke" option for bare modifiers from the two stroke).  But 123450 all conflict with their equivalent "#letter".  I don't have an immediate idea for disambiguation.  One interesting option might be to use CTRL+ALT+SHIFT+HOME (#-FPLT or 6789) as a disambiguator.  for 012345, but I suspect that would be super confusing.
	//2. Add some additional keys I think I'll need: "-", "+/=", "</.","?//","{/[", "}/],";/:","'/""
	//(Not sure if I need all these.  Start with "+" and "-" as we need these for zoom in/out)
	//For minus we'll use "11" (so #SWA) and for plus we'll use "12" (so #SWR).  The logic is these are typically to the right of the zero on the typical keyboard so we may as well use 10 for 0, 11 for - and 12 for +
	//

	//Get form values
	//Set defaults first...
	phoenix = false      // Plover if false
	//numbers = 'normal'  // 'nimble' or 'normal'
	//Get values user selected
	phoenix = document.getElementsByName("Theory")[0].value
	phoenix = (phoenix == "phoenix") ? true : false
	//numbers = document.getElementsByName("NumberSystem")[0].value

	//Build Combo Keystrokes (i.e. Single Stroke Modifiers)
	strCommandStroke = "#"
	
	//Format is Translation: 'Key'
	//Decisions:
	//1. ..E is used for special keys like Up, Left etc
	//2. ..O is used for Function Keys
	//3. ..A is used for digits
	//4. ..U is used as disambiguator for "naked" modifier (CTRL/ALT/SHIFT/WIN by themselves with no left hand key press)
	//This will be done "ONLY" for the two stroke option.  Therefore, any user who wants the two stroke option would need to list that in Plover first so the U disambiguator for the naked stroke takes precedence.  If a users uses ONLY the one stroke option, then the U disambiguator is not needed for the bare stroke)
	strFinalKeyMap = {
		'':'',
		up: 'TE',
		left: 'SE',
		down: 'KE',
		right: 'WE',
		page_up: 'HE',
		page_down: 'RE',
		home: 'PHE',
		end: 'WRE',
		"return": 'STE',
		"escape": 'SKE',	
		backspace: 'PWE',
		"delete": 'HRE',
		tab: 'TKE',
		slash: 'TPHE',
		backslash: 'KWRE',
		grave: 'TKPWE',
		bracketleft: 'PWHE',
		bracketright: 'PWRE',
		period: 'PE',
		comma: 'KRE',
		semicolon: 'WHRE',
		quotedbl: 'PHRE',
		multiply: 'STRE',
		a: 'A',
		b: 'PW',
		c: 'KR',
		d: 'TK',
		e: 'E',
		f: 'TP',
		g: 'TKPW',
		h: 'H',
		i: phoenix? 'AOEU': 'EU',
		j: 'SKWR',
		k: 'K',
		l: 'HR',
		m: 'PH',
		n: 'TPH',
		o: 'O',
		p: 'P',
		q: 'KW',
		r: 'R',
		s: 'S',
		t: 'T',
		u: 'U',
		v: 'SR',
		w: 'W',
		x: 'KP',
		y: 'KWR',
		z: phoenix? 'SWR': 'STKPW',
		F1: 'TO',
		F2: 'PO',
		F3: 'HO',
		F4: 'KO',
		F5: 'WO',
		F6: 'RO',
		F7: 'STO',
		F8: 'SPO',
		F9: 'SHO',
		F10: 'SKO',
		F11: 'SWO',
		F12: 'SRO',
		1: 'TA',
		2: 'PA',
		3: 'HA',
		4: 'KA',
		5: 'WA',
		6: 'RA',
		7: 'STA',
		8: 'SPA',
		9: 'SHA',
		0: 'SKA',
		minus: 'SWA',
		plus: 'SRA'
	}

	strModifiers = {
		Control: ['F','Control_L'],
		Alt: ['P','Alt_L'],
		Shift: ['L','Shift_L'],
		Super: ['T','Super_L']
	}
 	strModifierOrder = ['Control', 'Alt', 'Shift', 'Super']
	
	let ModifierCombos = [[]]
	for(let k=1; k<=strModifierOrder.length; ++k) {
		nChooseK(strModifierOrder.length, k, ModifierCombos)
	}
	
	let keyEntries = Object.entries(strFinalKeyMap)

	
	//Write out the values to the screen...
	//dicOutputSingleReal
	document.getElementById("dicOutputSingleReal").value=makeJSONDictionary('real',true,strModifiers,strModifierOrder,ModifierCombos,keyEntries)
	document.getElementById("dicOutputSinglePractice").value=makeJSONDictionary('practice',true,strModifiers,strModifierOrder,ModifierCombos,keyEntries)
	document.getElementById("dicOutputSingleStenojig").value=makeJSONDictionary('stenojig',true,strModifiers,strModifierOrder,ModifierCombos,keyEntries)
	document.getElementById("dicOutputTwoReal").value=makeJSONDictionary('real',false,strModifiers,strModifierOrder,ModifierCombos,keyEntries)
	document.getElementById("dicOutputTwoPractice").value=makeJSONDictionary('practice',false,strModifiers,strModifierOrder,ModifierCombos,keyEntries)
	document.getElementById("dicOutputTwoStenojig").value=makeJSONDictionary('stenojig',false,strModifiers,strModifierOrder,ModifierCombos,keyEntries)
	document.getElementById("stenoJigOutputAll").value=makeStenoJigPracticeExercise(true,strModifiers,strModifierOrder,ModifierCombos,keyEntries)

	//dictType = 'real', 'practice', 'stenojig'
	//bSingleStroke = true or false (for two stroke)
	//strModifiers,strModifierOrder, ModifierCombos,keyEntries are raw inputs defined above and copied to function
	function makeJSONDictionary(dictType,bSingleStroke,strModifiers,strModifierOrder,ModifierCombos,keyEntries){
		let dictionary = {}
		
		for(let i=0; i<ModifierCombos.length; ++i) {
			const mods = ModifierCombos[i]	
			for (const [keyTranslation, keyStroke] of keyEntries) {
				let tempDictEntry = buildDictEntry(mods,keyTranslation,keyStroke,dictType,bSingleStroke)
				if (tempDictEntry!=='') Object.assign(dictionary,tempDictEntry)
				//This also works...
				//if (tempDictEntry!=='') dictionary[Object.keys(tempDictEntry)[0]]=Object.values(tempDictEntry)[0]
			}
		}

		return JSON.stringify(dictionary, null, '\t')
	}

	//dictType = 'real', 'practice', 'stenojig'
	//bSingleStroke = true or false (for two stroke)
	//strModifiers,strModifierOrder, ModifierCombos,keyEntries are raw inputs defined above and copied to function
	function makeStenoJigPracticeExercise(bSingleStroke,strModifiers,strModifierOrder,ModifierCombos,keyEntries){
		let dictionary = {}
		let dictType = 'practice'
		for(let i=0; i<ModifierCombos.length; ++i) {
			const mods = ModifierCombos[i]
			if(mods.length==0){
				for (const [keyTranslation, keyStroke] of keyEntries) {
					let tempDictEntry = buildDictEntry(mods,keyTranslation,keyStroke,dictType,bSingleStroke)
					if (tempDictEntry!=='') Object.assign(dictionary,tempDictEntry)
					//This also works...
					//if (tempDictEntry!=='') dictionary[Object.keys(tempDictEntry)[0]]=Object.values(tempDictEntry)[0]
				}
			}
		}
		let strExercise = '"' + Object.values(dictionary).join('","') + '"'

		return strExercise
	}

	
	//This needs to be called once for each ModifierCombos entry, and each strKeyMap item (including empty string for modifiers with no key like WIN by itself)
	//See if I can just add an empty string key to strKeyMap to achieve this, I think that should work
	//Example: Calling this for a mod of [0,1] and a key of "a" should give back a dictionary entry of ['#AFP','{#Control_L(Alt_L(a))}'] # 50 O A A A U S-Z E SAO AOE
	function buildDictEntry(mods, keyTranslation, keyStroke, dictType, bSingleStroke){
		let oDictEntry={}
		let sTranslation = ''
		let sChord =''
		for(let i=0;i<mods.length;++i){
			sMod=strModifierOrder[mods[i]]
			sTranslation += strModifiers[sMod][1]+'('
			sChord += strModifiers[sMod][0] 
		}
		sTranslation += keyTranslation
		if (sTranslation.includes("(")) sTranslation += ')'.repeat(mods.length)
		if (sTranslation=='') return ''
		if (dictType=="real") {
  			sTranslation = '{#' + sTranslation + '}'
		} else {
			//practice and stenojig
  			sTranslation = '#' + sTranslation	
		}
		let tempStroke = ''
		if (bSingleStroke) {
			if(keyStroke=='' && mods.length>0){
				//Bare Key so add "OE" disambiguator
				if (dictType=='stenojig'){
					sChord = '#OE' + sChord
					tempStroke = sChord
				}else{
					sChord = '#OE-' + sChord
					tempStroke = convertKeystroke(sChord)
				}
			}else{	
				tempStroke = '#'+keyStroke + '-' + sChord
				if (dictType!=="stenojig") tempStroke = convertKeystroke(tempStroke)
			}
		
		} else{
			//if(keyStroke=='' && mods.length>0) return ''
			if(keyStroke=='' && mods.length>0){
				//Double the bare stroke to avoid creating a single stroke option without disambiguator
				if (dictType=='stenojig'){
					sChord = '#-' + sChord
					tempStroke = sChord + "/" + sChord
				}else{
					sChord = '#-' + sChord
					tempStroke = convertKeystroke(sChord)
					tempStroke = tempStroke + "/" + tempStroke
				}
			}else{	
				if (dictType=='stenojig'){
					(sChord=='') ? (tempStroke = ('#' + keyStroke)) : (tempStroke = ('#-' + sChord + '/#' + keyStroke))
				}else{
					(sChord=='') ? (tempStroke = convertKeystroke('#' + keyStroke)) : (tempStroke = (convertKeystroke('#-' + sChord) + '/' + convertKeystroke('#' + keyStroke)))
				}
			}
		}
		if (dictType=="stenojig") {
			//stenojig order right: left, and skip converting the stroke to digits
  			oDictEntry[sTranslation] = tempStroke
		} else {
			//real or practice order left: right
			//tempStroke = convertKeystroke(tempStroke)
  			oDictEntry[tempStroke] = sTranslation	
		}
		return oDictEntry
	}

	//Convert keystroke to valid entry
	function convertKeystroke(strStroke){
		let tmpStroke = strStroke
		//Replace strokes that need to be digits instead (STPHAO-FPLT)
		//S Left Side (only left needed)
		let regex = /(?<=[#][A-Z0-9]*)S(?=.*)/
		tmpStroke = tmpStroke.replace(regex,'1')
		//T Left Side
		regex = /(?<=[#][A-Z0-9]*)T(?=.*)/ 
		tmpStroke = tmpStroke.replace(regex,'2')
		//T Right Side
		regex = /(?<=[#].*[-].*)T(?=.*)/
		tmpStroke = tmpStroke.replace(regex,'9')
		//P Left Side
		regex = /(?<=[#][A-Z0-9]*)P(?=.*)/
		tmpStroke = tmpStroke.replace(regex,'3')
		//P Right Side
		regex = /(?<=[#].*[-].*)P(?=.*)/
		tmpStroke = tmpStroke.replace(regex,'7')
		//H Left Side (only left needed)
		regex = /(?<=[#][A-Z0-9]*)H(?=.*)/
		tmpStroke = tmpStroke.replace(regex,'4')
		//A Left Side (only left needed)
		regex = /(?<=[#][A-Z0-9]*)A(?=.*)/
		tmpStroke = tmpStroke.replace(regex,'5')
		//O Left Side (only left needed) 
		regex = /(?<=[#][A-Z0-9]*)O(?=.*)/
		tmpStroke = tmpStroke.replace(regex,'0')
		//F Right Side (only right needed)
		regex = /(?<=[#].*[-].*)F(?=.*)/
		tmpStroke = tmpStroke.replace(regex,'6')
		//L Right Side (only right needed)
		regex = /(?<=[#].*[-].*)L(?=.*)/
		tmpStroke = tmpStroke.replace(regex,'8')
		//Remove # if there are any digits in the stroke
		regex = /[#](?=.*\d.*)/
		tmpStroke = tmpStroke.replace(regex,'')
		//Remove the hyphen if there are any vowels (or '5' for #O)
		regex = /(?<=.*[AO50EU].*)[-](?=.*)/
		tmpStroke = tmpStroke.replace(regex,'')
		//Remove the hyphen if there is nothing after (i.e. No "right hand" key)
		regex = /(?<=.*)[-](?=$)/
		tmpStroke = tmpStroke.replace(regex,'')
		return tmpStroke
		//See third item on this page: https://stackoverflow.com/questions/3954927/how-to-replace-captured-groups-only
	}
	
	//FUNCTIONS
	//This function creates the combinations
	function nChooseK(n, k, list, n0, chosen) {
		if(n0 == null) n0 = 0
		if(list == null) list = []
		if(chosen == null) chosen = []
		if(k === 0) {
			list.push(chosen.slice())
			} else {
				for(let i=n0; i<n-k+1; ++i) {
					nChooseK(n, k-1, list, i+1, chosen.slice().concat(i))
				}
			}
	}
}

