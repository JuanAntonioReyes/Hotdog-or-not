let predictionText = document.getElementById("prediction");

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

// TEMP SOLUTION PATCH TO THE FIRST LOAD FAIL (1/2)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// END TEMP

function handleImage() {
	let imageTag = document.getElementById("image");
	let image = this.files[0];
	let reader = new FileReader();

	// This function will execute when we call "readAsDataURL"
	reader.onload = async function () {
		// Set the img src to the image
		imageTag.src = reader.result;
		
		// TEMP SOLUTION PATCH TO THE FIRST LOAD FAIL (2/2)
		await sleep(200);
		// END TEMP

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