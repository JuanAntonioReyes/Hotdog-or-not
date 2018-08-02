let predictionText = document.getElementById("prediction");

let datos;

let imageInput = document.getElementById("imageInput");
// Set the file input onChange listener
imageInput.addEventListener("change", handleImage);

// Set the select image button onClick listener
let selectImageButton = document.getElementById("selectImageButton");
selectImageButton.addEventListener("click", function (e) {
	if (imageInput) {
		imageInput.click();
	}
});

// Initialize the image classifier MobileNet
const classifier = ml5.imageClassifier("MobileNet", function() {
	let loadingP = document.getElementById("loading");

	loadingP.style.display = "none";
	selectImageButton.style.display = "inline";
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
		console.log("Hello world!");
	}

	if (image) {
		reader.readAsDataURL(image);
	} else {
		imageTag.src = "";
	}

	
}

function checkHotdog(err, data) {
	datos=data;
	let classifierPrediction = data[0].className;

	let isHotdog = ( classifierPrediction === "hotdog, hot dog, red hot" );

	if (isHotdog) {
		predictionText.style.color = "green";
		predictionText.innerText = "HOTDOG! 🌭";
	} else {
		predictionText.style.color = "red";
		predictionText.innerText = "NOT HOTDOG";
	}
}