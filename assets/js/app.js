 /*----when the page loads*/
  $(document).ready(function() {
  // Initial array of animals
     var animals = ["pig", "panda", "monkey", "hamster", "crab"];
  //call the create buttons to display the inital buttons
     createButtons();
  //function for generating and disaplying buttons that will hold the giphys
  function createButtons () {
    //this doesn't recreate the same buttons when a new button is added to the array
    $('#giphyButtons').html('');
    //this will dynamically generate buttons for each animal
   for (i = 0; i < animals.length; i++) {
     //adding a variable for button
     var b = $("<button>");
     //adding a class of animals to the button
     b.addClass('animals');
     //adding the data attribute
     b.attr('data-name',animals[i]);
     //provides the initial button text
     b.text(animals[i]);
     //add the button to the giphyButtons div
     $('#giphyButtons').append(b);
   }
  }

//this funciton renders the html to display the giphys
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
         var rating = response.rating;
         //create an element to have the rating displayed
         var p = $('<p>').text('Rating: ' + rating);
         //putting the animal giphy below the previous animal
         $('#imageGif').append(animalDiv);
         })
       }

 // this function handles events where an add animal button is clicked
 $('#addAnimal').on("click", function(event) {
   event.preventDefault();
   //this line grabs the input from the textbox
   var newAnimal = $('#animalInput').val().trim().toLowerCase();
   //adding animal from the textbox to our array
   animals.push(newAnimal);
   console.log("new array: " + animals);
   createButtons();
 })
   
   // Adding click event listener to all buttons
   $("html").on('click', "button", function() {
    
     // Grabbing and storing the data-animal property value from the button
     var animal = $(this).attr("data-name");

     // Constructing a queryURL using the animal name
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       animal + "&api_key=dc6zaTOxFJmzC&limit=10";
       console.log(queryURL);
     // Performing an AJAX request with the queryURL
     $.ajax({
         url: queryURL,
         method: "GET"
       })
       // After data comes back from the request
       .done(function(response) {
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
             //this adds the class animals to all images
             animalImage.addClass('gif',animals[i]);
             // Setting the src attribute of the image to a property pulled off the result item
             animalImage.attr("data-state='still'" );
             // animalImage.attr("src", results[i].images.fixed_height.url);
             // animalImage.attr("src", results[i].images.original_still.url);

             // Appending the paragraph and image tag to the animalDiv
             animalDiv.append(p);
             animalDiv.append(animalImage);

             // appending the animalDiv to the HTML page in the div
             $("#imageGif").append(animalDiv);
      
         var animate = animalImage.attr("src", results[i].images.fixed_height.url);
         var still = animalImage.attr("src", results[i].images.original_still.url);
         
         $(animalImage).on("click", function(){
         console.log('an image has been clicked');
         // var still = animalImage.attr("src", results[i].images.original_still.url);
         // var animate = animalImage.attr("src", results[i].images.fixed_height.url);
         // console.log(animate);
         // if (animalImage == still) {
         //  $(animalImage).html(animate);
         // }
        })
       }
      })
    });
      // this onclick will change an image from static to dynamic
   $(document).on('click', '.gif', function() {
      if(this.src.split('_').length === 2) {
        $(this).attr('src', this.src.split('_').splice(0, 1) + '.gif');
      } else {
        $(this).attr('src', this.src.replace('.gif', '_s.gif'));
      }
    });
  });
 