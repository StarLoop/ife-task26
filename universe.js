var universe = {
	track: [],
	Mediator: message => setTimeout(() => universe.track.forEach(spaceship => {
		if(Math.random() > 0.3) {
			Console.log(`#${spaceship.id} received it`)
			spaceship.signalProcesser.receive(message)
		}
	}, Console.log(`Broadcasting message ${JSON.stringify(message)}...`)), 1000)
}
var planet = {
	createNewSpaceship: () => {
		let spaceship = new Spaceship(universe.track.length)
		
		// add to track and control center
		universe.track.push(spaceship)
		planet.spaceshipCenter[spaceship.id] = true
		
		Console.log(`New spaceship created, #${spaceship.id}`)
		return spaceship.id
	},
	command: {
		commands: (command, additional = () => undefined) => id => {
			Console.log(`Commanded #${id} to ${command}`)
			planet.broadcaster(id, command)
			additional(id, command)
		}
	},
	spaceshipCenter: [],
	broadcaster: (id, command) => universe.Mediator({id, command})
}
planet.command.launch = planet.command.commands('launch')
planet.command.suicide = planet.command.commands('suicide', id => planet.spaceshipCenter[id] = false)
planet.command.pause = planet.command.commands('pause')

setInterval(() => universe.track.forEach(spaceship => spaceship.powerSystem._()), 1000)