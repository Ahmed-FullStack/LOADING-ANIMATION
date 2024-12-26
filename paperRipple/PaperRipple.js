const buttons = document.querySelectorAll('button');
const anchortags = document.querySelectorAll('a');

class paperRipple {
	constructor(button) {
		this.button = button;
		this.wavesContainer = this.wavesContainer();
		this.#paperRipple();
	}
	wavesContainer() {
		const paperRipple = document.createElement(`paper-ripple`);
		paperRipple.classList.add(`paper-style`);
		paperRipple.classList.add(`paper-ripple`);
		const wavesContainer = document.createElement(`div`);
		wavesContainer.classList.add(`paper-style`);
		wavesContainer.classList.add(`waves`);
		paperRipple.appendChild(wavesContainer);
		this.button.appendChild(paperRipple);
		return wavesContainer;
	}
	#paperRipple() {
		const buttonStyles = window.getComputedStyle(this.button);
		const removeWaveTiming = Number.parseFloat(
			buttonStyles.getPropertyValue(`--opacity-duration-wms`)
		);
		const addOpacityClass = 45;
		this.button.addEventListener(`pointerdown`, e => {
			if (e.buttons !== 1) return;
			if (e.target !== this.button) return;

			// Coordinates
			const { x, y, width, height } = this.button.getBoundingClientRect();
			const xCoordinate = `${e.clientX - x}`;
			const yCoordinate = `${e.clientY - y}`;
			const xCoordinatePC = `${(xCoordinate / width) * 100}%`;
			const yCoordinatePC = `${(yCoordinate / height) * 100}%`;

			// Wave

			const wave = document.createElement(`div`);
			wave.classList.add(`wave`);
			wave.classList.add(`animate-wave`);
			this.wavesContainer.appendChild(wave);
			wave.style.setProperty(`--x`, xCoordinatePC);
			wave.style.setProperty(`--y`, yCoordinatePC);
			this.button.addEventListener(
				`pointerup`,
				e => {
					setTimeout(() => {
						wave.classList.add(`animate-opacity`);
						setTimeout(() => {
							wave.remove();
						}, removeWaveTiming);
					}, addOpacityClass);
				},
				{ once: true }
			);
			this.button.addEventListener(
				`pointerleave`,
				e => {
					setTimeout(() => {
						wave.classList.add(`animate-opacity`);
						setTimeout(() => {
							wave.remove();
						}, removeWaveTiming);
					}, addOpacityClass);
				},
				{ once: true }
			);
		});
		this.button.addEventListener(`keydown`, e => {
			if (e.key !== ` ` && e.key !== `Enter`) return;
			if (e.repeat) return;
			// Coordinates

			const xCoordinatePC = `${50}%`;
			const yCoordinatePC = `${50}%`;

			// Wave

			const wave = document.createElement(`div`);
			wave.classList.add(`wave`);
			wave.classList.add(`animate-wave`);
			this.wavesContainer.appendChild(wave);
			wave.style.setProperty(`--x`, xCoordinatePC);
			wave.style.setProperty(`--y`, yCoordinatePC);
			this.button.addEventListener(
				`keyup`,
				e => {
					setTimeout(() => {
						wave.classList.add(`animate-opacity`);
						setTimeout(() => {
							wave.remove();
						}, removeWaveTiming);
					}, addOpacityClass);
				},
				{ once: true }
			);
			this.button.addEventListener(
				`blur`,
				e => {
					setTimeout(() => {
						wave.classList.add(`animate-opacity`);
						setTimeout(() => {
							wave.remove();
						}, removeWaveTiming);
					}, addOpacityClass);
				},
				{ once: true }
			);
		});
	}
}

function rippleHTMLELements(element) {
	if (typeof element === Array) return;
	const elementType = element.nodeName.toLowerCase();
	const elementFullName = element.constructor.name;
	if (elementType !== `button` && elementType !== `a`) {
		new paperRipple(element);
	} else {
		console.error(`${elementFullName} has already been rippled`);
	}
}

export { rippleHTMLELements };

buttons.forEach(button => {
	new paperRipple(button);
});
anchortags.forEach(anchortag => {
	new paperRipple(anchortag);
});
