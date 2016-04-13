const checkVaildOfLaunchNewSpaceship = () => $('new').disabled = (planet.spaceshipCenter.filter(v => v).length >= 4)
class controlButton {
	constructor (id, text, fn) {
		let btn = document.createElement('button')
		btn.innerText = text
		btn.onclick = fn
		return btn
	}
}
class Panel {
	constructor (id) {
		let container = document.createElement('div')
		container.className = 'panel'
		container.id = `spaceshipCtrl${id}`
		container.innerHTML = `<span>控制飞船 #${id}: </span>`
		container.appendChild(new controlButton(id, '飞行', e => planet.command.launch(id)))
		container.appendChild(new controlButton(id, '停止', e => planet.command.stop(id)))
		container.appendChild(new controlButton(id, '自毁', e => {
			planet.command.selfDestruct(id)
			$(`spaceshipCtrl${id}`).remove()
			checkVaildOfLaunchNewSpaceship()
		}))
		return container
	}
}

$('new').onclick = e => {
	$('panel').appendChild(new Panel(planet.createNewSpaceship()))
	checkVaildOfLaunchNewSpaceship()
}