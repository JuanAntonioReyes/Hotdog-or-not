let loadingP = document.getElementById("loading");
let predictionP = document.getElementById("prediction");

// SEt the file input onChange listener
let imageInput = document.getElementById("imageInput");
imageInput.addEventListener("change", handleImage);

// Initialize the image classifier MobileNet
const classifier = ml5.imageClassifier("MobileNet", function() {
	loadingP.innerText = "Prediction model succesfully loaded.";
});

function handleImage() {
	let imageTag = document.getElementById("image");
	let image = this.files[0];
	let reader = new FileReader();

	// This function will execute when we call "readAsDataURL"
	reader.onloadend = function () {
		// Set the img src to the image
		imageTag.src = reader.result;

		// Check if the image is a hotdog
		classifier.predict(imageTag, checkHotdog);
	}

	if (image) {
		reader.readAsDataURL(image);
	} else {
		imageTag.src = "";
	}

	
}

function checkHotdog(err, data) {
	let prediction = data[0].className;

	let isHotdog = ( prediction === "hotdog, hot dog, red hot" );

	if (isHotdog) {
		predictionP.innerText = "YES!";
	} else {
		predictionP.innerText = "NO";
	}
}