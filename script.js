const TIME_SHOW_CARDS = 1000;
let gameContainer = document.getElementById("game-container");
let gameContainerImages = document.querySelectorAll("#game-container .back");
let cardsSrc = ["img/watermelon.png", "img/banana.png", "img/cherry.png", "img/pumpkin.png", "img/coconut.png", "img/grapes.png"];
let cardList = cardsSrc.concat(cardsSrc);
let cardsForComparison = [];
let cardOpen = 0;
let disableCardCount = 0;

const showCards = () => {
	cardList.sort(() => 0.5 - Math.random());
	if(!gameContainer.querySelectorAll("img").length){
 		cardList.forEach((el, i) => {
			let img = document.createElement("img");
			img.src = el;
			img.setAttribute("id", ""+i);
			gameContainerImages[i].appendChild(img);
		});
	}
	else{
		let disableImages = document.querySelectorAll(".disable");		
		cardList.forEach((el, i) => {
			disableImages[i].classList.remove("disable");
			gameContainerImages[i].querySelector("img").src = el;
		});
	}
}

window.onload = showCards();
const gameRestart = () => {
	alert("You Won!");
	disableCardCount = 0;
	showCards();
}

const compareCards = () => {
	const [firstCard, secondCard] = cardsForComparison;
	return firstCard.src == secondCard.src;
}

const closeSelectedCardPair = (isIdenticalCards) => {
	let selectedCardPair = document.querySelectorAll(".selected-card");	
	selectedCardPair.forEach( card => {
		if(isIdenticalCards){
			card.querySelector(".front").classList.add("disable");
			disableCardCount++;
		}
		card.classList.remove("selected-card");
	});	
	cardOpen = 0;
	cardsForComparison = [];
	if(disableCardCount == cardList.length){
		setTimeout(()=>{
			gameRestart();
		}, TIME_SHOW_CARDS);
	}
}

gameContainer.addEventListener("click", (e) => {
	let currCard = e.target.closest(".flipper").querySelector("img");
	let isCardInComparisonArray = cardsForComparison.some(el => el.id == currCard.id);
	if(!isCardInComparisonArray && cardsForComparison.length < 2){
		cardsForComparison.push({id: currCard.id, src: currCard.src});
		e.target.closest(".flipper").classList.add("selected-card");
		cardOpen = cardsForComparison.length;		
		if(cardOpen==2){
			setTimeout(()=>{
				closeSelectedCardPair(compareCards());
			}, TIME_SHOW_CARDS);
		}		
	}
});
