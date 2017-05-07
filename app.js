
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
			describe: 'Title of note',
			demand  : true,
			alias   : 't'
		};



const bodyOptions = {
			describe: 'Body of note',
			demand  :  true,
			alias   :  'b'
		};


const argv = yargs
	.command('add','Add a new note',{
		title : titleOptions,
		body  : bodyOptions
	})
	.command('list','List all notes')
	.command('read','Read a note',{
		title : titleOptions
	})	
	.command('remove','Remove a note',{
		title : titleOptions	

	})
	.help()
	.argv;


var command =argv._[0];


if(command === 'add')
{
	var note = notes.addNote(argv.title,argv.body);
	if(note === undefined) {console.log('Duplicate note');}
	else {
		console.log('New note created');
		notes.logNote(note);
	}	
}

else if (command=== 'list') {
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((note) => notes.logNote(note));



} 


else if (command === 'read') {
	var note = notes.read(argv.title); 
	
	if(note === undefined) 
		console.log('Note not read');
	else {
		console.log('Note is read');
		notes.logNote(note);

	}
		

}




else if (command === 'remove') {
	var noterem = notes.remove(argv.title);
	var message = noterem ? 'Note was removed' : 'Note was not removed';
	console.log(message);
}



else
{
	console.log('Command not recognized');
}