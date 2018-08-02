let image = document.getElementById('image');
let loadingP = document.getElementById('loading');

// Initialize the image classifier MobileNet
const classifier = ml5.imageClassifier('MobileNet', function() {
	loadingP.innerText = "Prediction model succesfully loaded.";
});

// Make a prediction with the image
classifier.predict(image, function(err, results) {
	console.log("Prediction: " + results[0].className);
});
