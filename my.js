function doFirst(){
	barSize = 600;
	myMovie=document.getElementById('myMovie');
	playButton = document.getElementById('playButton');
	bar = document.getElementById('defaultBar');
	progressBar = document.getElementById('progressBar');
	playButton.addEventListener('click', playOrPause, false);
	bar.addEventListener('click',clickedBar, false);
}

function playOrPause(){
	// if the movie is not paused or not ended it is running
	if(!myMovie.paused && !myMovie.ended){
		// HTML5 gives us pause and end
		myMovie.pause();
		playButton.innerHTML='Play';
		// when video is paused stop updating progressbar
		window.clearInterval(updateBar);
	}else{
		myMovie.play();
		playButton.innerHTML='Pause';
// run function update every 500 ms
		updateBar = setInterval(update, 500);
	}
}

function update(){
	// movie is still playing
	if(!myMovie.ended){
		// currenttime and duration are properties of HTML5
		var size=parseInt(myMovie.currentTime*barSize/myMovie.duration);
		progressBar.style.width=size+'px';
	}else{
		// when movei ends
		progressBar.style.width='0px';
		playButton.innerHTML='Play';
		window.clearInterval(updateBar);
	}
}
// e is position of mouse to srub thu the movie
function clickedBar(e){
	if (!myMovie.paused && !myMovie.ended){
		// lateral position is mouse position laterally
		var mouseX=e.pageX-bar.offsetLeft;
		var newTime=mouseX*myMovie.duration/barSize;
		myMovie.currentTime=newTime;
		progressBar.style.width=mouseX+'px';
	}
}

window.addEventListener('load', doFirst, false);

