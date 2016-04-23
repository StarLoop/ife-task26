{
	const canvas = document.querySelector('canvas')
	const c = canvas.getContext('2d')
	
	const convert = a => Math.PI / 180 * a
	const getPoint = (x, y, r) => a => [x + r * Math.cos(convert(a)), y + r * Math.sin(convert(a))]
	
	const drawSpaceship = spaceship => {
		let {angular, id, status, energy} = spaceship
		let used = spaceship.energy / 2
		let [x, y] = getPoint(250, 250, 170)(angular)
		x -= 25, y -= 15 / 2
		
		c.fillStyle = 'cyan'
		c.fillRect(x, y, used, 15)
		c.fillStyle = 'white'
		c.fillText(`#${spaceship.id}: ${spaceship.energy}%`, x, y - 5)
		c.fillStyle = 'red'
 		c.fillRect(x + used, y, 50 - used, 15)
		
		if(status == PowerSystem.status.launch) spaceship.angular += spaceship.powerSystem.speed
		if(spaceship.angular >= 360) spaceship.angular -= 360
	}
	console.log(c)	
	function draw() {
		// Clean canvas
		c.clearRect(0, 0, 500, 500)
		// draw background
		c.fillStyle = "black"  
		c.fillRect(0, 0, 500, 500)
		c.beginPath()
		c.arc(250, 250, 100, 0, Math.PI * 2, true)
		c.fillStyle = 'cyan'
		c.fill()
		// draw spaceships
		universe.track.forEach(drawSpaceship)
		// draw orbit
		c.beginPath()
		c.arc(250, 250, 170, 0, Math.PI * 2, false)
		c.strokeStyle = 'cyan'
		c.stroke()
	}
	setInterval(draw, 20)
}