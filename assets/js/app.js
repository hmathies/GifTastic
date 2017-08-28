 /*----when the page loads*/
  $(document).ready(function() {
 
  // Initial array of arrays
     var animals = ["pig", "panda", "monkey", "hamster", "crab"];
      createButtons();
     // createButtons();
  //function for generating and disaplying buttons that will hold the giphys
  function createButtons () {
    $('#giphyButtons').html('');
      //this below is not clearing the images after click another
    // $('#giphyButtons').empty();
   for (i = 0; i < animals.length; i++) {
    //this will dynamically generate buttons for each animal
     var b = $("<button>");
     //adding a class of animals to the button
     b.addClass('animals');
     //adding the data attribute
     b.attr('data-name',animals[i]);
     //provides the initial button text
     b.text(animals[i]);
     //add the button to the giphyButtons div
     $('#giphyButtons').append(b);
     console.log(animals[i]);
   }
  }

// //this funciton renders the html to display the appropriate content

function displayAnimal() {

 var animal = $(this).attr('data-name');
 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       animal + "&api_key=dc6zaTOxFJmzC&limit=10";
// Performing an AJAX request with the queryURL
   $.ajax({
       url: queryURL,
       method: "GET"
     }).done(function(response){
     //creating a div to hold the giphy
     var animalDiv = $("<div class='animal'>");
     //this stores the rating data
     var rating = response.Rated;
     //create an element to have the rating displayed
     var p = $('<p>').text('Rating: ' + rating);
     //putting the animal giphy below the previous animal
     $('#imageGif').append(animalDiv);
     })
}
// displayAnimal();

 // this function handles events where an add animal button is clicked
 $('#addAnimal').on("click", function(event) {
   event.preventDefault();
   //this line grabs the input from the textbox
   var newAnimal = $('#animalInput').val().trim();
   //adding animal from the textbox to our array
   animals.push(newAnimal);
   console.log("new array: " + animals);
   createButtons();
    // $('#giphyButtons').append(newAnimal);
   // $('#imageGif').on("click", ".animals", displayAnimal);

 })
   //call the createButtons function which handles the processing of the animal array

   //add a click event listener to all elements with a class of animals

   //call the create buttons to display the inital buttons

   // Adding click event listen listener to all buttons
   $("html").on('click', "button", function() {

     // Grabbing and storing the data-animal property value from the button
     var animal = $(this).attr("data-name");

     // Constructing a queryURL using the animal name
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       animal + "&api_key=dc6zaTOxFJmzC&limit=10";

     // Performing an AJAX request with the queryURL
     $.ajax({
         url: queryURL,
         method: "GET"
       })
       // After data comes back from the request
       .done(function(response) {
         console.log(queryURL);
         $("#imageGif").html('');

         console.log(response);
         // storing the data from the AJAX request in the results variable
         var results = response.data;

         // Looping through each result item
         for (var i = 0; i < results.length; i++) {

           // Creating and storing a div tag
           var animalDiv = $("<div>");

           // Creating a paragraph tag with the result item's rating
           var p = $("<p>").text("Rating: " + results[i].rating);

           // Creating and storing an image tag
           var animalImage = $("<img>");
           // Setting the src attribute of the image to a property pulled off the result item
           animalImage.attr("src", results[i].images.fixed_height.url);

           // Appending the paragraph and image tag to the animalDiv
           animalDiv.append(p);
           animalDiv.append(animalImage);

           // appending the animalDiv to the HTML page in the div
           $("#imageGif").append(animalDiv);

         }
       });
   });
});
 