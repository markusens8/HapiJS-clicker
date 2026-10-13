document.querySelector("button").addEventListener("click", async () => {
	console.log("click");
	const response = await fetch('/click');
	const data = await response.json();
	document.getElementById("counter").textContent = 'punkti: ' + data.count;
})

async function loadLeaderBoard() {
	const response = await fetch('/leaderboard');
	const top = await response.json();

	const leaderBoardList = document.getElementById('leaderboard');
	leaderBoardList.replaceChildren();
	for (const row of top) {
		const li = document.createElement('li');

		const ip = document.createElement('strong');
		ip.textContent = row.ip;

		li.append(ip, ": " + row.clicks);
		leaderBoardList.appendChild(li);
	}
}

loadLeaderBoard();
setInterval(loadLeaderBoard, 3000)
