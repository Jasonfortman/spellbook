const fs = require('fs');
const https = require('https');
const DomParser = require('dom-parser');
const parser = new DomParser();

module.exports = {
	requestSpell: function(spellName){	
		let objSpell = {};
		let itemName = encodeURIComponent(spellName.trim());
			const options = {
			  hostname: 'aonprd.com',
			  port: 443,
			  path: '/SpellDisplay.aspx?ItemName='+itemName,
			  method: 'GET'
			}
			const req = https.request(options, (res) => {
			  //console.log(`statusCode: ${res.statusCode}`)
			  res.on('data', (d) => {
			    //process.stdout.write(d)
			    //let dom = new parser.parseFromString(process.stdout.write(d), "text/xml");
			    //let obj = JSON.stringify(process.stdout.write(d));
			   	//console.log(obj);
			   	//WRITE THE HTML FILE AND SAVE ON FS
				fs.writeFile('spells/'+itemName+'.html', d, 'utf8', callback);
				//READ THE HTML FILE AND ATTEMPT TO PARSE AS DOM 
				fs.readFile('spells/'+itemName+'.html', 'utf8', function(err, html){
				  if (!err){
				  	let savingThrow = "none";
				  	let target = "none";
				  	let spellResistance = "none";
				    var dom = parser.parseFromString(html); 
				    const relevantString = dom.getElementById('ctl00_MainContent_DataListTypes').innerHTML;
				    //console.log(relevantString);
				    //console.log(relevantString.split('<b>School</b>')[1].split(';')[0]);
				    const spellTitle = relevantString.split('<h1 class="title">')[1].split('</h1>')[0].split("/> ")[1];
				    const school = relevantString.split('<b>School</b>')[1].split(';')[0];
				    const level = relevantString.split('<b>Level</b>')[1].split('<h')[0];
				    const castingTime = relevantString.split('<b>Casting Time</b>')[1].split('<br/')[0];
				    const components = relevantString.split('<b>Components</b>')[1].split('<h')[0];
				    const range = relevantString.split('<b>Range</b>')[1].split('<br/')[0];
				    if(  relevantString.split('<b>Target</b> ')[1] ){
				    	const target = relevantString.split('<b>Target</b>')[1].split('<br/')[0];
					}
				    const duration = relevantString.split('<b>Duration</b>')[1].split('<')[0];
				    if( relevantString.split('<b>Saving Throw</b>')[1] ){
				    	savingThrow = relevantString.split('<b>Saving Throw</b>')[1].split('<b')[0];
				    }
				    if(  relevantString.split('<b>Spell Resistance</b> ')[1] ){
				    	spellResistance = relevantString.split('<b>Spell Resistance</b> ')[1].split('<h3')[0];
					}
				    const detailedDescription = relevantString.split('Description</h3>')[1].split('</span>')[0];
				    objSpell.spellTitle = spellTitle;
				    objSpell.school = school;
					objSpell.level = level;
				    objSpell.castingTime = castingTime;
				   	objSpell.components = components;
				   	objSpell.range = range; 
				    objSpell.target = target; 
				    objSpell.duration = duration;  
			    	objSpell.savingThrow = savingThrow; 
			   		objSpell.spellResistance = spellResistance;  
				    objSpell.detailedDescription =detailedDescription ;
				    /*
				   	console.log(spellTitle);
				    console.log(school);
					console.log(level);
				    console.log(castingTime);
				    console.log(components);
				    console.log(range);
				    console.log(duration);
				    console.log(savingThrow);
				    console.log(spellResistance);
				    console.log(detailedDescription);
				    */
				    console.log(objSpell);

				    return objSpell;
					//data.spells.push(objSpell);
					//fs.writeFile('spellsjs/'+itemName+'.json', JSON.stringify(objSpell), 'utf8', callback);
				  }
				});
			  })
			})
			req.on('error', (error) => {
			  console.error(error)
			})
			req.end(); 
	}
}

function callback(){
	console.log('finished!~');
}