// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/BnYKFkCP/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

let resultsP;

// function setup() {
//   noCanvas();
//   // Create a camera input
//   video = createCapture(VIDEO);
//   // Initialize the Image Classifier method with MobileNet and the video as the second argument
//   classifier = ml5.imageClassifier('MobileNet', video, modelReady);
//   resultsP = createP('Loading model and video...');
// }

// function modelReady() {
//   console.log('Model Ready');
//   classifyVideo();
// }

// // Get a prediction for the current video frame
// function classifyVideo() {
//   classifier.classify(gotResult);
// }

// // When we get a result
// function gotResult(err, results) {
//   // The results are in an array ordered by confidence.
//   resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
//   classifyVideo();
// }


  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(320, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video)
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }

