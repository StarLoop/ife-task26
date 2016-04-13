var universe = {
	track: [],
	Mediator: message => setTimeout(() => universe.track.forEach(spaceship =>
		Math.random() > 0.3 &&
			spaceship.signalProcesser.receive(message),
		Console.log(`广播消息中： ${JSON.stringify(message)}...`)
	), 1000)
}
var planet = {
	createNewSpaceship: () => {
		let spaceship = new Spaceship(universe.track.length)
		
		// add to track and control center
		universe.track.push(spaceship)
		planet.spaceshipCenter[spaceship.id] = true
		
		Console.log(`新飞船创建： #${spaceship.id}`)
		return spaceship.id
	},
	command: {
		commands: (command, additional = () => undefined) => id => {
			Console.log(`向 #${id} 发送了命令： ${command}`)
			planet.broadcaster(id, command)
			additional(id, command)
		}
	},
	spaceshipCenter: [],
	broadcaster: (id, command) => universe.Mediator({id, command})
}
planet.command.launch = planet.command.commands('launch')
planet.command.selfDestruct = planet.command.commands('Self-destruct', id => planet.spaceshipCenter[id] = false)
planet.command.stop = planet.command.commands('stop')

setInterval(() => universe.track.forEach(spaceship => spaceship.powerSystem._()), 1000)