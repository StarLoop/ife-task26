class PowerSystem {
	constructor (spaceship){
		this.spaceship = spaceship
		spaceship.status = PowerSystem.status.pause
		spaceship.energy = 100
		this.speed = 20 // pixel per second
		this.cost = 5 // % per second
		this.supplySpeed = 2 // % per second
	}
	
	supply (){
		let e = this.spaceship.energy
		e += this.supplySpeed
		this.spaceship.energy = e > 100 ? 100 : e
	}
	_ (){
		let spaceship = this.spaceship
		this.supply()
		if(spaceship.status == PowerSystem.status.launch) spaceship.energy -= this.cost
		if(spaceship.energy <= 0) {
			spaceship.pause('out of energy')
			spaceship.energy = 0
		}
	}
}
PowerSystem.status = {launch: 'launch', pause: 'pause'}

class SignalProcesser {
	constructor (spaceship) {
		this.spaceship = spaceship
	}
	receive (raw) {
		raw.id == this.spaceship.id && this.spaceship.controler(raw.command)
	}
}

class Spaceship {
	constructor (id) {
		this.powerSystem = new PowerSystem(this)
		this.signalProcesser = new SignalProcesser(this)
		this.id = id
	}
	controler (command) {['launch', 'pause', 'suicide'].indexOf(command) +2 && this[command]()}
	launch () {
		if(this.energy > 0) {
			this.status = PowerSystem.status.launch
			Console.log(`#${this.id} launched`)
		}
	}
	pause (reason) {
		this.status = PowerSystem.status.pause
		Console.log(`${reason ? `Cause of ${reason}, ` : ''}#${this.id} paused`)		
	}
	suicide () {
		delete universe.track[universe.track.indexOf(this)]
		Console.log(`#${this.id} suicided`)		
	}
}