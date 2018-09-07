var digitSegments = [];
digitSegments[-1] = [false, false, false, false, false, false, false];
digitSegments[0] = [true, true, true, false, true, true, true];
digitSegments[1] = [false, false, true, false, false, true, false];
digitSegments[2] = [true, false, true, true, true, false, true];
digitSegments[3] = [true, false, true, true, true, true, false];
digitSegments[4] = [false, true, true, true, false, true, false];
digitSegments[5] = [true, true, false, true, true, true, false];
digitSegments[6] = [true, true, false, true, true, true, true];
digitSegments[7] = [true, false, true, false, false, true, false];
digitSegments[8] = [true, true, true, true, true, true, true];
digitSegments[9] = [true, true, true, true, false, true, false];

var yearLabel = document.getElementById("year");
var daysLabel = document.getElementById("days");
var hoursLabel = document.getElementById("hours");
//var minutesLabel = document.getElementById("minutes");
//var secondsLabel = document.getElementById("seconds");
var timelineMarker = document.getElementById("timeline-marker");

tick();
setInterval(tick, 1000);

function tick()
{
	var now = new Date();
	now = new Date("3/1/2015 11:46:59 AM");
	now = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDay(), now.getHours()));
	var targetDate = new Date("1/1/" + (now.getFullYear() + 1));
	
	var delta = targetDate - now;

	var days = trunc(delta / 1000 / 60 / 60 / 24);
	//delta -= days * 1000 * 60 * 60 * 24;

	var hours = trunc(delta / 1000 / 60 / 60);
	delta -= hours * 1000 * 60 * 60;

	//var minutes = trunc(delta / 1000 / 60);
	//delta -= minutes * 1000 * 60;

	//var seconds = trunc(delta / 1000);

	yearLabel.innerText = targetDate.getFullYear();
	setDigits(daysLabel, days);
	setDigits(hoursLabel, hours);
	//setDigits(minutesLabel, minutes);
	//setDigits(secondsLabel, seconds);

    //Month left ticker//
	var tickerWidth = 15;
	var timelineWidth = 327;
	var tickSpacing = timelineWidth / 11;
	timelineMarker.style.left = Math.round(now.getMonth() * tickSpacing - tickerWidth/2) + "px";


	var percentage = days / 365;
	//percentage = 1;
	//timelineMarker.style.right = Math.round(percentage * timelineWidth - tickerWidth/2) + "px";

}

function setDigits(container, value)
{
	var s = String(value);
	
	for(var i=0;i<container.children.length;i++)
	{
		setDigitSegments(container.children[i], i < s.length ? parseInt(s[s.length-i-1]) : -1);
	}
	
}

function setDigitSegments(container, value)
{
	for(var i=0;i<container.children.length;i++)
	{
		container.children[i].style.opacity = digitSegments[value][i] ? 1 : 0.15;
	}
}

function trunc(x) 
{
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}