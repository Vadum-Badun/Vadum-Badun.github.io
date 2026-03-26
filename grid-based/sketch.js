// Grid based drawing
// Vadym Kolomiiets
// Date
//
// Extra for Experts:
// Adapting Python code into JS, as well as turtle library

//----------------------------------------------------CREDITS--------------------------------------------------
//
//
//--------------------------------------------------END OF CREDITS---------------------------------------------

// #Allows us to continue program until user gives us proper answer
let doing_work = true;

//Input
let myInput;
let submitButton;
let userInput;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //copy from last project
  myInput = createInput('To draw enter 1. For Gallery enter 2');
  myInput.position(width/2 -90, height/2);
  myInput.size(250);
  submitButton = createButton('Submit');
  submitButton.position(myInput.x + 100, height / 2 + 50);
  submitButton.mousePressed(saveInput);
}

function draw() {
  background(220);
  askForInput();
}

function askForInput(){
  while(doing_work){
    //User drawing
    if(userInput === "1"){
      //load the script
    }
    //Gallery
    else if( userInput === "2"){
      myInput = null;
      myInput = createInput('Enter 1 for Jesus, 2 for Racoon');
    }
  }
}
function saveInput(){
   userInput = myInput.value();

  
  //We need to know what to do
  if(userInput === '') {
    return;
  }
}



// #Allows us to continue program until user gives us proper answer
// doing_work = True

// #Our program itself, in this while loop
// while doing_work == True:
//     #Asking our user for his choice
//     task = screen.textinput("Task", "Would you like to draw yourself, or look at our gallery? Enter 1 for drawing, and 2 to take a look")
//     #User drawing mode
//     if task == "1":
//         import vadym_kolomiiets_user_drawing_turtle
//         doing_work = False
//     #Gallery Mode
//     elif task == "2":
//         picture = screen.textinput("Picture", "Awesome! Would you like to take a look on Jesus or Racoon? Enter 1 for Jesus and 2 for Racoon ")
//         if picture == "1":
//             #We do import here, as for some particular reason, it breaks the order in which we want
//             #to call function(it's being called before we ask user)
//             import vadym_kolomiiets_jesus_grid_drawing
//             doing_work = False
//         elif picture == "2":
//             import  vadym_kolomiiets_racoon_grid_drawing
//             doing_work = False
//         #Foolproofing, restarting proccess
//         else:
//             print("I don't know what you exactly want...Try again!")
//     #Foolproofing, restarting proccess
//     else:
//         print("I don't know what you exactly want...Try again!")
        