const $ = document.getElementById.bind(document)

var Console = {
	log: message => $('console').innerHTML = `<p>${message}</p> ${$('console').innerHTML}`
}