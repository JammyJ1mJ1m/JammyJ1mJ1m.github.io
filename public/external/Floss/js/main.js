let YesHeight = 40
let YesWidth = 40

let index = 0
let words = [
    "Yes :)",
    "Yes! :)",
    "Say Yes",
    "Click me",
    "Do it",
    "No ;)",
    ":)",
    "AAAAAA",
]

let imageStageIndex = 0;
let imageStageImgIndex = 0;
let titles = [
    "We've been together a while now",
    "So, I had a wonderful idea",
    "I like you a lot",
    "And you like me a lot",
    "So what do you say?",
]

let imgs = [

    "assets/beans1.jpg",
    "assets/beans2.JPG",
    "assets/beans3.jpg",
    "assets/beans4.jpg",
    "assets/beans5.jpg",

]
// "Look at these cuties!"

function loadPage() {
    console.log("Loaded")
    CreateLoginStage();
    // RunImageStage();
    // CreateProposalStage();
    // CreateFinalStage("AAAAAAAAAAAAAAA, I LOVE YOU");
}

function CreateFinalStage(pTitle)
{
    ResetContent();
    let container = GetContainerParent();
    let text = CreateQuestionElement(pTitle, "DIV", "imageTitle");
    let image = CreateImages("assets/worms.gif");
    container.appendChild(image);
    container.appendChild(text);
}

// ===============================================
//              image page stage
// ===============================================

function RunImageStage()
{
    CreateImagePageStage(titles[imageStageIndex])
}

function CreateImagePageStage(pTitle)
{
    if(imageStageImgIndex == imgs.length)
    {
        imageStageImgIndex = imgs.length - 1;
    }
    if(imageStageIndex == titles.length)
    {
        ResetContent();
        CreateProposalStage();
        return;
    }
    let container = GetContainerParent();
    let text = CreateQuestionElement(pTitle, "DIV", "imageTitle");
    let image = CreateImages(imgs[imageStageImgIndex++]);
    let button = CreateQuestionElement("Continue", "BUTTON", "ProceedButton");
    button.onclick = function() {
        ResetContent();
        CreateImagePageStage(titles[++imageStageIndex])
    }
    
    container.appendChild(image);
    container.appendChild(text);
    container.appendChild(button);
}

// ===============================================
//              reset stage
// ===============================================
function ResetContent()
{
    let container = GetContainerParent();
    container.innerHTML = '';
}


// ===============================================
//              login stage
// ===============================================
function CreateLoginStage()
{
    let container = GetContainerParent();
    let loginStatus = document.createElement("DIV");
    let userInput = document.createElement("INPUT");
    let passInput = document.createElement("INPUT");
    
    // add a placeholder of "Username" to userInput
    userInput.placeholder = "Username";
    userInput.type = "text";
    userInput.id = "username";
    passInput.placeholder = "password";
    passInput.type = "password";
    passInput.id = "password";

    // create loginButton
    let loginButton = document.createElement("BUTTON");
    loginButton.innerHTML = "Login";
    loginButton.id = "LoginButton";

    loginButton.onclick = function() {
        console.log("Trying to login");
        if(!TryLogin())
        {
            loginStatus.innerText = "Invalid username or password";
        }
    }

    // userInput.nodeType = "text";
    container.appendChild(loginStatus);
    container.appendChild(userInput);
    container.appendChild(passInput);
    container.appendChild(loginButton);
}

function TryLogin()
{
    let username = window.btoa(document.getElementById("username").value);
    let password = window.btoa(document.getElementById("password").value);

    if(username == "Rmxvc3N5" && password == "QmVhbg==")
    {
        console.log("Logged in");
        ResetContent();
        RunImageStage();
    }
    return false;
}


// ===============================================
//              proposal stage
// ===============================================
function CreateProposalStage() {
    let contentContainer = GetContainerParent();
  
    contentContainer.appendChild(CreateQuestionElement("Will you be my valentine?","DIV","imageTitle"));
    contentContainer.appendChild( CreateImages("assets/snoopy-valentines-day.gif"));
    
    // button container and buttons
    let buttonContainer = CreateButtons();
    contentContainer.appendChild(buttonContainer);
}

function GetContainerParent() {
    return document.getElementById("ContentContainer")
}

function CreateImages(pSource)
{
    let image = document.createElement("IMG");
    image.src = pSource;
    return image;
}

function CreateButtons() {
    let buttonContainer = CreateQuestionElement("", "DIV", "buttonContainer")

    let yesbutton = CreateQuestionElement("Yes", "BUTTON", "YesButton");
    yesbutton.onclick = YesButton;
    buttonContainer.appendChild(yesbutton);

    let noButton = CreateQuestionElement("No", "BUTTON", "NoButton");
    noButton.onclick = NoButton;

    
    buttonContainer.appendChild(noButton)
    return buttonContainer
}

function CreateQuestionElement(pQuestion, pElementType, pClassName) {
    let questionPlate = document.createElement(pElementType);
    questionPlate.innerHTML = pQuestion;
    questionPlate.className = pClassName;
    questionPlate.id = pClassName;
    return questionPlate;
}



function reset() {
    YesHeight = 40;
    YesWidth = 75;
    index = 0;
}
function YesButton() {
    console.log("Yes");
    CreateFinalStage("AAAAAAAAAAAAAAA, I LOVE YOU");

}

function NoButton() {
    console.log("No");
    let noButton = document.getElementById("NoButton");
    noButton.innerText = "No :(";
    let yesButton = document.getElementById("YesButton");
    // let buttonWidth = yesButton.style.width;
    // //yesButton.style.width  = "75%";
    // YesHeight += 2;
    // YesWidth += 2;
    // yesButton.style.height = YesHeight + "px";
    // yesButton.style.width = YesWidth + "px";

    index++;
    if (index == words.length)
        index = 0;
    yesButton.innerText = words[index];

}