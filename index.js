let score = 0;
let canClick = false;
let gameOver = false;
let message = "";
document.getElementById("score").innerHTML = score;
document.getElementById("message").innerHTML = message;


const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');

//get random sequence of panels
const getRandomPanel = () => {
	const panels = [
		topLeft, 
		topRight,
		bottomLeft,
		bottomRight
	]

	return panels[parseInt(Math.random() * panels.length)];
}


const sequence = [
	getRandomPanel(),
	getRandomPanel(),
	getRandomPanel()
];
let sequenceToGuess = [...sequence];


//flash panel
const flash = panel => {
	return new Promise((resolve, reject) => {
		panel.className += ' active';
		setTimeout(() => {
			panel.className = panel.className.replace(' active', '');
			setTimeout(() => {
				resolve();
			}, 250);
		}, 700);
	});
};


//check if correct panel is clicked by user and respond accordingly 
const panelClicked = panelClicked => {
	if(!canClick){
		return;
	}
	//if correct panel is clicked, increment score and start next round
	const expectedPanel = sequenceToGuess.shift();
	if(expectedPanel === panelClicked){
		if(sequenceToGuess.length === 0){
			score++;
			document.getElementById("score").innerHTML = score;
			sequence.push(getRandomPanel());
			sequenceToGuess = [...sequence];
			setTimeout(() => {
				startFlashing();
			}, 2000);
		}
	}
	//if incorrect panel is clicked, game over
	else{
		message = "Game over";
		document.getElementById("message").innerHTML = message;
		gameOver = true;
	}
};


//flashes sequence of panels
const startFlashing = async () => {
	canClick = false;
	message = "Simon says";
	document.getElementById("message").innerHTML = message;
	for(const panel of sequence){
		await flash(panel);
	}
	canClick = true;
	setTimeout(() => {
		message = "Your turn!";
		document.getElementById("message").innerHTML = message;
	}, 500);
}

startFlashing();
