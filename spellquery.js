const spellList = require('./combinedSpells.json');
const readline = require('readline');
const aonRequest = require('./aonRequest.js');
const query = readline.createInterface({
	input: process.stdin,
	output:process.stdout
});

query.question('Please enter a name or keyword of a spell you want to retrieve> ', (answer) => {
	
	console.log(`it looks like you\'re  trying to locate this: ${answer}`);
	let possibleMatches = [];
	let exactMatch;

	spellList.spells.find((spell, i) => {
		if(spell.name.toLowerCase()=== answer.toLowerCase()){
			exactMatch = spell.name;
		}
	});
	if(exactMatch == undefined){
		spellList.spells.forEach((spell, i) => { 
			if(spell.name.toLowerCase().indexOf(`${answer}`.toLowerCase()) > -1){
				possibleMatches.push(spell.name);
			}
		});
		console.log('Possible matches include :')
		possibleMatches.forEach(match =>{
			console.log("\x1b[35m", match,"\x1b[0m"); 
		});
	} 
	if(exactMatch !== undefined){
		console.log( "\x1b[33m", "found the spell" + "\x1b[31m", exactMatch +"!");
		spellList.spells.find((spell) =>{
			if(spell.name.toLowerCase() == exactMatch.toLowerCase()){
				console.log("\x1b[36m", `'` + spell.description + `'`);
			}
		}) 
		console.log("\x1b[34m\x1b[46m", 'querying aon for detailed spell info...',"\x1b[0m");
		aonRequest.requestSpell(`${answer}`);
	}
	query.close();
});

















/*
query.question('do you want to get detailed information on this? (y/n) ', (answer) => {
	if(answer == 'y'){
		console.log('querying aon for detailed spell info...');
		aonRequest.requestSpell(`${answer}`);
	}
	query.close();
});*/