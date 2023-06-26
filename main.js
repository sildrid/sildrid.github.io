'use strict'

//<-- starfield function -->//

function starfield(){
	const canv = document.querySelector('canvas');
	const ctx = canv.getContext('2d');

	function reCanvas(){
		const ratio = window.innerWidth / window.innerHeight;
		canv.height = 320 / ratio;
		ctx.translate(160,canv.height/2);
	}
	window.addEventListener('resize',reCanvas);
	reCanvas();

	// star object
	function starObj(){
		// angle, amplitude, distance
		const star = new Uint8Array(3);
		for(let i = 0; i < 3; i++){
			star[i] = Math.random()*256;
		}
		return star;
	}

	const starAmount = 256;
	const field = [];
	for(let i = 0; i < starAmount; i++){
		field.push(starObj());
	}

	let myStar = null;
	function updateStars(){
		ctx.fillStyle = "#00000088";
		ctx.fillRect(-160,-canv.height/2,320,canv.height);
		ctx.fillStyle = "#faf";
		for(let i = 0; i < starAmount; i++){
			field[i][2]++;
			let angle = 2*Math.PI*(field[i][0]/256);
			let dist = (1+(field[i][1]/64))**2*(field[i][2]**2/128);
			let amp = field[i][1]*field[i][2]/4096;
			ctx.beginPath();
			ctx.arc(Math.sin(angle)*dist, Math.cos(angle)*dist,amp,0,2*Math.PI);
			ctx.fill();
		}
		setTimeout(updateStars,30);
	}
	updateStars();
}
starfield();
