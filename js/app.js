let image = document.getElementById('image');
let loadingP = document.getElementById('loading');
let predictionP = document.getElementById('prediction');

// Initialize the image classifier MobileNet
const classifier = ml5.imageClassifier('MobileNet', function() {
	loadingP.innerText = "Prediction model succesfully loaded.";
});

// Check if the image is a hotdog
classifier.predict(image, checkHotdog);

function checkHotdog(err, data) {
	let prediction = data[0].className;

	let isHotdog = ( prediction === "hotdog, hot dog, red hot" );

	if (isHotdog) {
		predictionP.innerText = "YES!";
	} else {
		predictionP.innerText = "NO";
	}
}