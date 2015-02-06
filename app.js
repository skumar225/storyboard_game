$(document).ready(function() {

	var clock;
	var notStarted = true;



//Establishing number of moves
	var numMoves = 0;


//WHEN GAME IS OVER:
	var playAgain = $("<button class='plaaygainclass'>Play Again?</button>"); //Play Again reset button
	var saveStory = $("<button class='save-story'>Save Your Story</button>"); //Save Your Story option button

	$("#publishbutton").hide();  //Hide Publish button while game is in play

	$("body").on("click", "#publish-small", function() {
			$(".writing").show();  //Show appended text
			$(".writing").css("color", "black");  //Unify text to one color
			$("#timer, #form-one, .greeting").hide();  //Hide extraneous html elements in publish mode
			$("#myModal").hide(); //Hide modal 
			$("#publishbutton").hide(); //Hide publish button when viewing appended story
			$(".container").append(playAgain);  //Add play again button
			$(".container").on("click", ".plaaygainclass", function() {
				location.reload(true);  //Reset page on button click
			});


			//SAVING STORIES TO LOCAL STORAGE
			$(".container").append(saveStory); //Add Save Your Story button
			$(".container").on("click", ".save-story", function () {			
					var newStory = $(".writing").text(); 			// Obtain all players' text
					var allStories = []; 										//Empty array for storying new stories
					var savedStories = localStorage.getItem("allMyStories"); 	//Taking currently saved stories
					if (savedStories !== null) {  														
						allStories = JSON.parse(savedStories);									//Turn the starting empty array into current array of existing stories
					}
					allStories.push(newStory);  //Add players' text to array
					localStorage.setItem("allMyStories", JSON.stringify(allStories));  //Stringify array items to store to local storage
					
					//array-a-fy items
					var savedStoryArr = JSON.parse(localStorage.getItem("allMyStories"));

					//append to html doc FIXXXXXX THISSSSS AHHHHHH
					savedStoryArr.forEach(function (story){
						$(".story-history").text(story);
					});
			});
	});


	//After 8 turns, this function runs
	function gameOver() {
	$("#timer, .writing, .greeting, #playerInput, #post-button").hide();  //FIX THIS greeting not hiding
	$(".greeting").hide();
	console.log("greeting is hidden");
	$("#publishbutton").fadeIn(2500);
 
	}

	//GREETING: "Press SpaceBar to begin"
	$(".container").append( "<p class='greeting'>Press the spacebar to begin.</p>" );
	$(".container").css('display', 'none');
	$(".container").fadeIn(1500);

	//TIMER
	var counter = 30; //Timer starts at this many seconds


	function countdown() { 		//Countdown interval for timer
		if (counter > 0) {	
				counter--;
				$("#form-one :input").attr("disabled", false);  //Allow for submission form to be enabled
				
				}


		else if (counter === 0) {   //When time is up, disable form, alert the next player, reset clock, append greeting
				$("#playerInput").attr("disabled", true);

				// $(".allDone").show().text("Next player");   
				clearInterval(clock);
				notStarted = true;

				$(".greeting").fadeIn(400);
				counter = 30;

				//Submits user input automatically when timer is up
				var newStory = $("#playerInput").val();
				$(".game-board").append("<li class = 'writing'>" + newStory + "</li>");
				$('#initial-input').children('input').val(" ");
				$(".writing:even").addClass("turnPink");
				$(".writing:odd").css("color","black");
				
			}


			document.getElementById("timer").innerHTML = "You have " + counter + " seconds left!";

	}


		/***KEYDOWN FUNCTIONS***/

		window.addEventListener('keydown', function (e) {   //When Spacebar is pressed, enable form, note increase in turn number
			if (event.keyCode === 32 && notStarted) {
				
				$("#playerInput").attr("disabled", false);
				$("#playerInput").focus();
				$(".allDone").hide();
				clock = setInterval(countdown, 1000);
				$(".greeting").fadeOut(400);
				countdown();
				notStarted = false;
				$("#playerInput").toggleClass("turnPink");

				numMoves++;
				}
				});


		//Player Directions/Prompts
		$("#playerInput").on("keydown", function(e){
				
				if (numMoves === 1) {
					 $("#turn1").text("Start your story! Was it a dark and stormy night?").show();
							
				}	
				if (numMoves === 2) {
					$("#turn1").text("Describe the setting...").show();
					
				}

				if (numMoves === 3) {
					$("#turn1").text("Introduce a character...").show();
					
				}

				if (numMoves === 4) {	
					$("#turn1").text("Stir in some conflict...").show();
					
				}

				if (numMoves === 5) {
					$("#turn1").text("Add some romance...").show();
				}

				if (numMoves === 6) {
					$("#turn1").text("Start a fight...").show();
				}

				if (numMoves === 7) {
					$("#turn1").text("Make a character save the day...").show();
				}

				if (numMoves === 8) {
					$("#turn1").text("Resolve your story...").show();
				}
	
			});


		/****** When Player Submits New Text******/

		$("#form-one").on("submit", function (event) {
			var newStory = $("#playerInput").val();

			if(newStory.length > 0){  //Make sure if player typed in something, if not, none of the below code runs
			
				if (counter !== 0){   //When timer is running...
					
					$(".game-board").append("<li class = 'writing'>" + newStory + "</li>"); 	//Add player input to page
				}

				clearInterval(clock);   // Stops and resets the timer
				counter = 30;  //Time set back to 30 seconds


					// We (team Shilpa and elie taking over shit) need to make sure that counter === 0 doesn't get hit

				//WHEN ENTER IS PRESSED (Player is done submitting their text), the following happens:

				$("#form-one :input").attr("disabled", true); //Disable form
				$('#initial-input').children('input').val(" "); //The form clears after submission
				$(".writing:even").addClass("turnPink"); // Colors will alternate between players
				$(".writing:odd").css("color","black"); 
				$(".greeting").fadeIn(400,function(){
					console.log('greeting fade in has finished ');
				}); // The spacebar greeting fades back in
				$("#turn1").hide(); 
				
				if (numMoves === 8) {			//After 8 turns, the game is over, call the gameOver() function

				gameOver();

				}

				notStarted = true; //when spacebar is pressed again 
			}
		});

	//NAVAGATION BAR: Enable Popovers
	$('#about-popover, #rules-popover').popover('toggle');
	$('#about-popover, #rules-popover').popover('hide');





});