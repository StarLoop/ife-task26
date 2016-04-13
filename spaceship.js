class PowerSystem {
	constructor (spaceship){
		this.spaceship = spaceship
		spaceship.status = PowerSystem.status.stop
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
			spaceship.stop('能量耗尽')
			spaceship.energy = 0
		}
	}
}
PowerSystem.status = {launch: 'launch', stop: 'stop'}

class SignalProcesser {
	constructor (spaceship) {
		this.spaceship = spaceship
	}
	receive (raw) {
		raw.id == this.spaceship.id && (Console.log(`#${this.spaceship.id} 收到了命令`) || true) && this.spaceship.controler(raw.command)
	}
}

class Spaceship {
	constructor (id) {
		this.powerSystem = new PowerSystem(this)
		this.signalProcesser = new SignalProcesser(this)
		this.id = id
	}
	controler (command) {['launch', 'stop', 'selfDestruct'].indexOf(command) +2 && this[command]()}
	launch () {
		if(this.energy > 0) {
			this.status = PowerSystem.status.launch
			Console.log(`#${this.id} launched`)
		}
	}
	stop (reason) {
		this.status = PowerSystem.status.stop
		Console.log(`${reason ? `因为 ${reason}, ` : ''}#${this.id} 停止了飞行`)		
	}
	'Self-destruct' () {
		delete universe.track[universe.track.indexOf(this)]
		Console.log(`#${this.id} Self-destructed`)		
	}
}