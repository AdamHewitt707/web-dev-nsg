/* ---------- Navbar Dropdown function ---------- */

function showGoalsMenu() {
    document.getElementById('myDropdown').classList.toggle('show');
}

window.onclick = function(e){
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById('myDropdown');
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}

/* ---------- Navbar Dropdown function ---------- */






/* ---------- Storing json content ---------- */

// let headerElement = document.querySelector("#header"); tbh idk if this line is necessary or not
let localJsonFile = "/JSON/en.json";
let jsonContent; // To store all the json stuff locally on javascript

document.addEventListener("DOMContentLoaded", () => {
    fetch(localJsonFile)
        .then (response => response.json())
        .then (responseData => {
            jsonContent = responseData;
            console.log("JSON loaded successfully: ", jsonContent);

            initPage(); // Gonna process the content in a separate function for better code structure
        })

        .catch(error => console.error("Error fetching JSON data:", error));
})

/* ---------- Storing json content ---------- */






/* ---------- Initialize page ---------- */

function initPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop().replace(".html", ""); // Get name of page via file path to filter content within json

    // console.log("Current page: ", page); // not needed anymore but I'll keep this here for future debugging

    initNav(); // Process header navbar is its own function because its universal for the entire website

    initPageContent(page); // Process page content based on page name

    // initFooter(); // Process footer content
}

/* ---------- Initialize page ---------- */






/* ---------- Build navbar ---------- */

function initNav() {

    console.log("Initializing navigation..."); // For debugging purposes

    // Find navigation data within the json
    const navData = jsonContent.find(item => item.navigation);

    const nav = navData.navigation; // Store navigation data only
    const header = document.querySelector('header'); // Store header element as variable

    // Navbar container
    const navbar = document.createElement('div');
    navbar.className = 'navbar';

    // Logo
    const logo = document.createElement('img');
    logo.src = nav.logo.src;
    logo.alt = nav.logo.alt;
    logo.className = 'logo';
    navbar.appendChild(logo);

    // Home link
    const homeLink = document.createElement('a');
    homeLink.href = nav.home.href;
    homeLink.className = 'navBtn';
    homeLink.textContent = nav.home.text;
    navbar.appendChild(homeLink);

    // Goals dropdown container
    const dropdownContainer = document.createElement('div');

    // Dropdown button
    const dropBtn = document.createElement('button');
    dropBtn.className = 'dropbtn';
    dropBtn.textContent = nav.goals.text;
    dropBtn.addEventListener('click', showGoalsMenu);
    dropdownContainer.appendChild(dropBtn);

    // Dropdown content
    const dropdownContent = document.createElement('div');
    dropdownContent.id = 'myDropdown';
    dropdownContent.className = 'dropdown-content';

    // Dropdown items
    nav.goals.dropdown.forEach(item => {
        const dropdownLink = document.createElement('a');
        dropdownLink.href = item.href;
        dropdownLink.textContent = item.text;
        dropdownContent.appendChild(dropdownLink);
    });

    dropdownContainer.appendChild(dropdownContent);
    navbar.appendChild(dropdownContainer);

    // Sign Up link
    const signUpLink = document.createElement('a');
    signUpLink.href = nav.signUp.href;
    signUpLink.className = 'navBtn';
    signUpLink.textContent = nav.signUp.text;
    navbar.appendChild(signUpLink);

    // About Us link
    const aboutUsLink = document.createElement('a');
    aboutUsLink.href = nav.aboutUs.href;
    aboutUsLink.className = 'navBtn';
    aboutUsLink.textContent = nav.aboutUs.text;
    navbar.appendChild(aboutUsLink);

    header.appendChild(navbar);

    console.log("Navigation initialized successfully");
}

/* ---------- Build navbar ---------- */






/* ---------- Grab page function ---------- */

function initPageContent(page) {
    console.log("Loading page content for", page);

    const pageFunctions = {
        'index': () => {
            loadIndexContent();
        },
        'education': () => {
            console.log("Quality eduction page initialization");
            loadEducationContent();
        },
        'climate': () => {
            console.log("Climate action page initialization");
            loadClimateContent();
        },
        'water': () => {
            console.log("Clean water and sanitation page initialization");
            loadWaterContent();
        },
        'sign-up': () => {
            console.log("Sign up page initialization");
            loadSignupContent();
        },
        'about-us': () => {
            console.log("About us page initialization");
            loadAboutusContent();
        },
    };

    const pageHandler = pageFunctions[page];

    if (pageHandler) {
        pageHandler(); // This loads the function from a specific element in the pageFunctions data above
    }

    else {
        console.warn(`Can't find page: ${page}`);
    }
}

/* ---------- Grab page function ---------- */





/* ---------- Index page ---------- */

function loadIndexContent () {
    console.log("Loading Index Content...");

    const main = document.querySelector('main')

    main.innerHTML = ''; // Wipe any existing html within main

    const indexContent = jsonContent.find(item => item.page === "index"); // Find and store all index data

    const content = indexContent.content; // Get all from content section of the index in json

    buildCarousel(main, content.carousel); // Gonna build all the different parts in separate functions cuz it looks nicer and its good for code structure

    buildWelcomeArticle(main, content.welcome);

    buildFirstGrid(main, content.sections);

    buildSecondGrid(main, content.sections);

    buildNorwichStandUp(main, content.sections.norwichStandUp);

    buildSignUpSection(main, content.sections.signUpNow)

    initCarousel();

}



function buildCarousel(parent, carouselContent) {

    // Create carousel div container
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';

    // Image
    const carouselImg = document.createElement('img');
    carouselImg.className = 'carousel-img';
    carouselImg.src = carouselContent.slides[0].image; // Initializing image from carousel json array
    carouselImg.alt = carouselContent.slides[0].header; // Temporarily using header as image alt text, forgot to add it previously
    carouselContainer.appendChild(carouselImg); // Making carouselImg the child of carouselContainer div

    // Prev button
    const prevBtn = document.createElement('button'); // Prev button will be the parent container for left arrow
    prevBtn.className = 'carousel-prev';
    const leftArrow = document.createElement('img');
    leftArrow.src = 'assets/images/arrow.png';
    leftArrow.className = 'left-arrow';
    prevBtn.appendChild(leftArrow);
    carouselContainer.appendChild(prevBtn);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-next';
    const rightArrow = document.createElement('img');
    rightArrow.src = 'assets/images/arrow.png';
    rightArrow.className = 'right-arrow';
    nextBtn.appendChild(rightArrow);
    carouselContainer.appendChild(nextBtn);

    // Text container div
    const carouselText = document.createElement('div');
    carouselText.className = 'carousel-text';

    // Header
    const carouselHeader = document.createElement('h1');
    carouselHeader.className = 'carousel-header';
    carouselHeader.textContent = carouselContent.slides[0].header;
    carouselText.appendChild(carouselHeader);

    // Paragraph
    const carouselP = document.createElement('p');
    carouselP.className = 'carousel-p';
    carouselP.textContent = `"${carouselContent.slides[0].text}"`;
    carouselText.appendChild(carouselP);

    carouselContainer.appendChild(carouselText); // carouselText is a container that contains all written carousel content
    parent.appendChild(carouselContainer); // Parent here is main
}



function buildWelcomeArticle(parent, welcomeContent) {

    // Article element
    const article = document.createElement('article');

    // Header
    const heading = document.createElement('h1');
    heading.textContent = welcomeContent.heading;
    article.appendChild(heading);

    // Paragraph
    const paragraph = document.createElement('p');
    paragraph.textContent = welcomeContent.paragraph;
    article.appendChild(paragraph);

    parent.appendChild(article);

    // Separator div
    const separator = document.createElement('div');
    separator.className = 'separator';
    parent.appendChild(separator);
}



function buildFirstGrid(parent, sectionContent) {

    // Maingrid is the container for the grids
    const mainGrid = document.createElement('div');
    mainGrid.className = 'maingrid';

    // This is the actual column grid
    const containerColumn = document.createElement('div');
    containerColumn.className = 'container-column';

    // Column article
    const columnArticle = document.createElement('article');
    columnArticle.className = 'column';

    // Header
    const columnHeading = document.createElement('h1');
    columnHeading.textContent = sectionContent.ueaResearch.heading;
    columnArticle.appendChild(columnHeading);

    // Div
    const columnContainer = document.createElement('div');
    columnContainer.className = 'column-container';

    // First paragraph
    const para1 = document.createElement('p');
    para1.textContent = sectionContent.ueaResearch.paragraph1;
    columnContainer.appendChild(para1);

    // Image
    const image1 = document.createElement('img');
    image1.src = sectionContent.ueaResearch.image.src;
    image1.alt = sectionContent.ueaResearch.image.alt;
    image1.className = sectionContent.ueaResearch.image.class;
    columnContainer.appendChild(image1);

    // Second paragraph
    const para2 = document.createElement('p');
    para2.textContent = sectionContent.ueaResearch.paragraph2;
    columnContainer.appendChild(para2);

    // Goal link
    const link1 = document.createElement('a');
    link1.href = sectionContent.ueaResearch.link.href;
    link1.className = 'index-link';
    link1.textContent = sectionContent.ueaResearch.link.text;
    columnContainer.appendChild(link1);

    columnArticle.appendChild(columnContainer);
    containerColumn.appendChild(columnArticle);

    // Row container for the row articles
    const containerRow = document.createElement('div');
    containerRow.className = 'container-row';

    // Row article #1
    const rowArticle1 = document.createElement('article');
    rowArticle1.className = 'row';

    // Div
    const rowDiv1 = document.createElement('div');

    // Header
    const rowHeading1 = document.createElement('h1');
    rowHeading1.textContent = sectionContent.norwichNetZero.heading;
    rowDiv1.appendChild(rowHeading1);

    // First paragraph
    const rowPara1 = document.createElement('p');
    rowPara1.textContent = sectionContent.norwichNetZero.paragraph1;
    rowDiv1.appendChild(rowPara1);

    // Div
    const innerRowDiv1 = document.createElement('div');
    innerRowDiv1.className = 'row-div';

    // Image
    const rowImage1 = document.createElement('img');
    rowImage1.src = sectionContent.norwichNetZero.image.src;
    rowImage1.alt = sectionContent.norwichNetZero.image.alt;
    rowImage1.className = sectionContent.norwichNetZero.image.class;
    innerRowDiv1.appendChild(rowImage1);

    // Div
    const textDiv1 = document.createElement('div');

    // Second paragpragh
    const rowText1 = document.createElement('p');
    rowText1.className = 'row-text';
    rowText1.textContent = sectionContent.norwichNetZero.paragraph2;
    textDiv1.appendChild(rowText1);

    // Goal link
    const link2 = document.createElement('a');
    link2.href = sectionContent.norwichNetZero.link.href;
    link2.className = 'index-link';
    link2.textContent = sectionContent.norwichNetZero.link.text;
    textDiv1.appendChild(link2);

    innerRowDiv1.appendChild(textDiv1);
    rowDiv1.appendChild(innerRowDiv1);
    rowArticle1.appendChild(rowDiv1);
    containerRow.appendChild(rowArticle1);

    // Row article #2
    const rowArticle2 = document.createElement('article');
    rowArticle2.className = 'row';

    // Div
    const rowDiv2 = document.createElement('div');

    // Header
    const rowHeading2 = document.createElement('h1');
    rowHeading2.textContent = sectionContent.riversOfHope.heading;
    rowDiv2.appendChild(rowHeading2);

    // First Paragraph
    const rowPara2 = document.createElement('p');
    rowPara2.textContent = sectionContent.riversOfHope.paragraph1;
    rowDiv2.appendChild(rowPara2);

    // Div
    const innerRowDiv2 = document.createElement('div');
    innerRowDiv2.className = 'row-div';

    // Div
    const textDiv2 = document.createElement('div');

    // Second Paragraph
    const rowText2 = document.createElement('p');
    rowText2.className = 'row-text';
    rowText2.textContent = sectionContent.riversOfHope.paragraph2;
    textDiv2.appendChild(rowText2);

    // Goal link
    const link3 = document.createElement('a');
    link3.href = sectionContent.riversOfHope.link.href;
    link3.className = 'index-link';
    link3.textContent = sectionContent.riversOfHope.link.text;
    textDiv2.appendChild(link3);

    innerRowDiv2.appendChild(textDiv2);

    // Image
    const rowImage2 = document.createElement('img');
    rowImage2.src = sectionContent.riversOfHope.image.src;
    rowImage2.alt = sectionContent.riversOfHope.image.alt;
    rowImage2.className = sectionContent.riversOfHope.image.class;
    innerRowDiv2.appendChild(rowImage2);

    rowDiv2.appendChild(innerRowDiv2);
    rowArticle2.appendChild(rowDiv2);
    containerRow.appendChild(rowArticle2);

    containerColumn.appendChild(containerRow);
    mainGrid.appendChild(containerColumn);
    parent.appendChild(mainGrid);
}



function buildSecondGrid(parent, sectionContent) {

    // Maingrid
    const mainGrid = document.createElement('div');
    mainGrid.className = 'maingrid';

    // Div
    const containerColumnTwo = document.createElement('div');
    containerColumnTwo.className = 'container-column-two';

    // Div
    const containerRow = document.createElement('div');
    containerRow.className = 'container-row';

    // Row article #3
    const rowArticle1 = document.createElement('article');
    rowArticle1.className = 'row-two';

    // Div
    const rowDiv1 = document.createElement('div');

    // Header
    const rowHeading1 = document.createElement('h1');
    rowHeading1.textContent = sectionContent.co2Rates.heading;
    rowDiv1.appendChild(rowHeading1);

    // First Paragraph
    const rowPara1 = document.createElement('p');
    rowPara1.textContent = sectionContent.co2Rates.paragraph1;
    rowDiv1.appendChild(rowPara1);

    // Div
    const innerRowDiv1 = document.createElement('div');
    innerRowDiv1.className = 'row-div';

    // Image
    const rowImage1 = document.createElement('img');
    rowImage1.src = sectionContent.co2Rates.image.src;
    rowImage1.alt = sectionContent.co2Rates.image.alt;
    rowImage1.className = sectionContent.co2Rates.image.class;
    innerRowDiv1.appendChild(rowImage1);

    // Div
    const textDiv1 = document.createElement('div');

    // Second paragraph
    const rowText1 = document.createElement('p');
    rowText1.className = 'row-text';
    rowText1.textContent = sectionContent.co2Rates.paragraph2;
    textDiv1.appendChild(rowText1);

    // Goal link
    const link1 = document.createElement('a');
    link1.href = sectionContent.co2Rates.link.href;
    link1.className = 'index-link';
    link1.textContent = sectionContent.co2Rates.link.text;
    textDiv1.appendChild(link1);

    innerRowDiv1.appendChild(textDiv1);
    rowDiv1.appendChild(innerRowDiv1);
    rowArticle1.appendChild(rowDiv1);
    containerRow.appendChild(rowArticle1);

    // Row article #4
    const rowArticle2 = document.createElement('article');
    rowArticle2.className = 'row-two';

    // Div
    const rowDiv2 = document.createElement('div');

    // Header
    const rowHeading2 = document.createElement('h1');
    rowHeading2.textContent = sectionContent.transport.heading;
    rowDiv2.appendChild(rowHeading2);

    // First Paragraph
    const rowPara2 = document.createElement('p');
    rowPara2.textContent = sectionContent.transport.paragraph1;
    rowDiv2.appendChild(rowPara2);

    // Div
    const innerRowDiv2 = document.createElement('div');
    innerRowDiv2.className = 'row-div';

    // Div
    const textDiv2 = document.createElement('div');

    // Second Paragraph
    const rowText2 = document.createElement('p');
    rowText2.className = 'row-text';
    rowText2.textContent = sectionContent.transport.paragraph2;
    textDiv2.appendChild(rowText2);

    // Goal link
    const link2 = document.createElement('a');
    link2.href = sectionContent.transport.link.href;
    link2.className = 'index-link';
    link2.textContent = sectionContent.transport.link.text;
    textDiv2.appendChild(link2);

    innerRowDiv2.appendChild(textDiv2);

    // Image
    const rowImage2 = document.createElement('img');
    rowImage2.src = sectionContent.transport.image.src;
    rowImage2.alt = sectionContent.transport.image.alt;
    rowImage2.className = sectionContent.transport.image.class;
    innerRowDiv2.appendChild(rowImage2);

    rowDiv2.appendChild(innerRowDiv2);
    rowArticle2.appendChild(rowDiv2);
    containerRow.appendChild(rowArticle2);

    containerColumnTwo.appendChild(containerRow);

    // Column article #2
    const columnArticle = document.createElement('article');
    columnArticle.className = 'column-two';

    // Header
    const columnHeading = document.createElement('h1');
    columnHeading.textContent = sectionContent.rivers.heading;
    columnArticle.appendChild(columnHeading);

    // Div
    const columnContainer = document.createElement('div');
    columnContainer.className = 'column-container';

    // First paragraph
    const para1 = document.createElement('p');
    para1.textContent = sectionContent.rivers.paragraph1;
    columnContainer.appendChild(para1);

    // Image
    const image1 = document.createElement('img');
    image1.src = sectionContent.rivers.image.src;
    image1.alt = sectionContent.rivers.image.alt;
    image1.className = sectionContent.rivers.image.class;
    columnContainer.appendChild(image1);

    // Second paragraph
    const para2 = document.createElement('p');
    para2.textContent = sectionContent.rivers.paragraph2;
    columnContainer.appendChild(para2);

    // Goal link
    const link3 = document.createElement('a');
    link3.href = sectionContent.rivers.link.href;
    link3.className = 'index-link';
    link3.textContent = sectionContent.rivers.link.text;
    columnContainer.appendChild(link3);

    columnArticle.appendChild(columnContainer);
    containerColumnTwo.appendChild(columnArticle);

    mainGrid.appendChild(containerColumnTwo);
    parent.appendChild(mainGrid);
}



function buildNorwichStandUp(parent, sectionContent) {

    // Article
    const article = document.createElement('article');

    // Header
    const heading = document.createElement('h1');
    heading.textContent = sectionContent.heading;
    article.appendChild(heading);

    // First Paragraph
    const paragraph1 = document.createElement('p');
    paragraph1.textContent = sectionContent.paragraph1;
    article.appendChild(paragraph1);

    // Second paragraph
    const paragraph2 = document.createElement('p');
    paragraph2.textContent = sectionContent.paragraph2;
    article.appendChild(paragraph2);

    // Goal link
    // const link = document.createElement('a');
    // link.href = sectionContent.link.href;
    // link.className = 'index-link';
    // link.textContent = sectionContent.link.text;
    // article.appendChild(link);

    // Image
    const image = document.createElement('img');
    image.src = sectionContent.image.src;
    image.alt = sectionContent.image.alt;
    image.className = sectionContent.image.class;
    article.appendChild(image);

    parent.appendChild(article);

    // Separator div
    const separator = document.createElement('div');
    separator.className = 'separator';
    parent.appendChild(separator);
}



function buildSignUpSection(parent, sectionData) {

    // Article
    const article = document.createElement('article');
    const signupDiv = document.createElement('div');
    signupDiv.className = 'signup';

    // Image
    const image = document.createElement('img');
    image.src = sectionData.image.src;
    image.alt = sectionData.image.alt;
    image.className = sectionData.image.class;
    signupDiv.appendChild(image);

    // Div
    const textDiv = document.createElement('div');

    // Header
    const heading = document.createElement('h1');
    heading.textContent = sectionData.heading;
    textDiv.appendChild(heading);

    // First paragraph
    const paragraph1 = document.createElement('p');
    paragraph1.textContent = sectionData.paragraph1;
    textDiv.appendChild(paragraph1);

    // Second Paragraph
    const paragraph2 = document.createElement('p');
    paragraph2.textContent = sectionData.paragraph2;
    textDiv.appendChild(paragraph2);

    // Goal link
    const link = document.createElement('a');
    link.href = sectionData.link.href;
    link.className = 'index-link';
    link.textContent = sectionData.link.text;
    textDiv.appendChild(link);

    signupDiv.appendChild(textDiv);
    article.appendChild(signupDiv);
    parent.appendChild(article);
}

/* ---------- Index page ---------- */






/* ---------- Education page ---------- */

function loadEducationContent () {
  console.log("Loading Quality Education Content...")

  const main = document.querySelector("main");
  main.innerHTML = ""; //clears the existing HTML

  const educationContent = jsonContent.find(item => item.page === "education"); //gets and stores data

  const content = educationContent.content //gets content from content section of json file

  //main grid to store articles 2 + 3 in
  const mainGrid = document.createElement('div');
  mainGrid.className = 'container-half-column';

  // ----- article 1 -----
  const article1 = document.createElement('article');

  //header
  const heading1 = document.createElement('h1');
  heading1.textContent = content.sections.section1.heading;
  article1.appendChild(heading1);

  //paragraph1
  const paragraph1 = document.createElement('p');
  paragraph1.textContent = content.sections.section1.paragraph1;
  article1.appendChild(paragraph1);
  
 //paragraph2
  const paragraph2 = document.createElement('p');
  paragraph2.textContent = content.sections.section1.paragraph2;
  article1.appendChild(paragraph2);

  //image
  const image1 = document.createElement('img');
  image1.src = content.sections.section1.image.src;
  image1.alt = content.sections.section1.image.alt;
  //    image1.class = content.sections.section1.image.class;
  article1.appendChild(image1);

  main.appendChild(article1);
  // ----- end of article1 -----
  

  // ----- article 2 -----
  const article2 = document.createElement('article');

  //image
  const image2 = document.createElement('img');
  image2.src = content.sections.section2.image.src;
  image2.alt = content.sections.section2.image.alt;
  article2.appendChild(image2);

  //header
  const heading2 = document.createElement('h1');
  heading2.textContent = content.sections.section2.heading;
  article2.appendChild(heading2);

  //paragraph3
  const paragraph3 = document.createElement('p');
  paragraph3.textContent = content.sections.section2.paragraph1;
  article2.appendChild(paragraph3);

  //paragraph4
  const paragraph4 = document.createElement('p');
  paragraph4.textContent = content.sections.section2.paragraph2;
  article2.appendChild(paragraph4);

  mainGrid.appendChild(article2);
  // ----- end of article2 -----


  // ----- article 3 -----
  const article3 = document.createElement('article');

  //header
  const heading3 = document.createElement('h1');
  heading3.textContent = content.sections.section3.heading;
  article3.appendChild(heading3);

  //paragraph5
  const paragraph5 = document.createElement('p');
  paragraph5.textContent = content.sections.section3.paragraph1;
  article3.appendChild(paragraph5);

  //paragraph6
  const paragraph6 = document.createElement('p');
  paragraph6.textContent = content.sections.section3.paragraph2;
  article3.appendChild(paragraph6);

  //paragraph7
  const paragraph7 = document.createElement('p');
  paragraph7.textContent = content.sections.section3.paragraph3;
  article3.appendChild(paragraph7);
  
  //image
  const image3 = document.createElement('img');
  image3.src = content.sections.section3.image.src;
  image3.alt = content.sections.section3.image.alt;
  article3.appendChild(image3);

  mainGrid.appendChild(article3);

  main.appendChild(mainGrid);
  // ----- end of article 3 -----

}

/* ---------- Education page ---------- */






/* ---------- Climate page ---------- */

function loadClimateContent () {
    console.log("Loading Climate Action Content...")

    // Build your page through javascript here

}

/* ---------- Climate page ---------- */






/* ---------- Water page ---------- */

function loadWaterContent () {
    console.log("Loading Clean Water and Sanitation Content...")

    // Build your page through javascript here



/* ---------- Water page ---------- */






/* ---------- Signup page ---------- */

}


function loadSignupContent() {
    console.log("Loading Sign Up Content...");

    const signUpContent = jsonContent.find(item => item.page === 'sign-up');

    const content = signUpContent.content;
    document.getElementById('title').innerHTML = content.sections[0].heading;
    document.getElementById('headerP').innerHTML = content.sections[0].para1;
    document.getElementById('legendary').innerHTML = content.sections[1].legend1;
    document.getElementById('confirmMessage').innerHTML =content.sections[1].confirmationMessage;
    document.getElementById('benefitHead').innerHTML = content.sections[2].heading;
    document.getElementById('benefitPara').innerHTML = content.sections[2].para1;
    document.getElementById('thanksHead').innerHTML = content.sections[3].heading;

   const img1 = document.createElement('img');
   img1.src = content.sections[3].image.src;
   img1.alt = content.sections[3].image.alt;
   document.getElementById('thanksImage').appendChild(img1);
   document.getElementById('heyPerson').innerHTML = content.sections[3].response;





    setTimeout(setupFormHandler, 0);
}



function setupFormHandler() {
    let signUpForm = document.querySelector('form');
    let firstNameInput = document.querySelector('#firstName');
    let lastNameInput = document.querySelector('#lastName');
    let emailInput = document.querySelector('#email');
    let commentInput = document.querySelector('#comments');
    let confirmMessage = document.querySelector('#confirmMessage');
    let thanksMessage = document.querySelector('#thanksImage');
    let tellThem = document.querySelector('#heyPerson');
    let benefitP = document.querySelector('#benefits');

    if (signUpForm) {
        thanksMessage.style.display = 'none';
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formBody = {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                email: emailInput.value,
                comments: commentInput.value
            };
            const requestHeaders = {
                'Content-Type': 'application/json',
            };

            fetch('/sign-up', {
                method: 'post',
                headers: requestHeaders,
                body: JSON.stringify(formBody)
            })
                .then((response) => response.json())
                .then((responsedata) => {
                    setTimeout(function() {
                        console.log(responsedata);
                        tellThem.textContent = `Hi ${responsedata.firstName} ${responsedata.lastName} , your comments have been
                received and we will contact you at ${responsedata.email} shortly`;
                    },0);})
            signUpForm.style.display = 'none';
            benefitP.style.display = 'none';
            thanksMessage.style.display = 'flex';



        });
    }
  }

/* ---------- Signup page ---------- */






/* ---------- Aboutus page ---------- */

function loadAboutusContent() {
    console.log("Loading About Us Content...");

    const main = document.querySelector('main');
    main.innerHTML = ''; // Clear existing content

    const aboutusContent = jsonContent.find(item => item.page === "about-us");

    if (!aboutusContent) {
        console.error("About Us content not found in JSON");
        return;
    }

    const content = aboutusContent.content;

    // Section container
    const teamSection = document.createElement('div');
    teamSection.className = 'team section';

    // Grid container
    const teamGrid = document.createElement('div');
    teamGrid.className = 'team grid';

    // CHALAK CARD
    const chalakCard = document.createElement('article');
    chalakCard.className = 'team card';

    // Header / Name
    const chalakHeading = document.createElement('h2');
    const chalakName = document.createElement('span');
    chalakName.textContent = content.team[0].name;
    chalakHeading.appendChild(chalakName);
    chalakHeading.appendChild(document.createElement('br'));

    // Job / Role
    const chalakRole = document.createElement('span');
    chalakRole.className = 'job';
    chalakRole.textContent = content.team[0].role;
    chalakHeading.appendChild(chalakRole);
    chalakCard.appendChild(chalakHeading);

    // Div
    const chalakUnderline = document.createElement('div');
    chalakUnderline.className = 'title underline';
    chalakCard.appendChild(chalakUnderline);

    // Div
    const chalakBioRow = document.createElement('div');
    chalakBioRow.className = 'bio-row';

    // Image
    const chalakPhotoContainer = document.createElement('div');
    chalakPhotoContainer.className = 'photo placeholder';
    const chalakPhoto = document.createElement('img');
    chalakPhoto.src = content.team[0].image.src;
    chalakPhoto.alt = content.team[0].image.alt;
    chalakPhoto.className = 'team-photo';
    chalakPhotoContainer.appendChild(chalakPhoto);
    chalakBioRow.appendChild(chalakPhotoContainer);

    // Div
    const chalakBioText = document.createElement('div');
    chalakBioText.className = 'bio-text';
    const chalakBio = document.createElement('p');
    chalakBio.textContent = content.team[0].bio;
    chalakBioText.appendChild(chalakBio);
    chalakBioRow.appendChild(chalakBioText);

    chalakCard.appendChild(chalakBioRow);
    teamGrid.appendChild(chalakCard);

    // ADAM CARD
    const adamCard = document.createElement('article');
    adamCard.className = 'team card';

    // Header / Name
    const adamHeading = document.createElement('h2');
    const adamName = document.createElement('span');
    adamName.textContent = content.team[1].name;
    adamHeading.appendChild(adamName);
    adamHeading.appendChild(document.createElement('br'));

    // Job / Role
    const adamRole = document.createElement('span');
    adamRole.className = 'job';
    adamRole.textContent = content.team[1].role;
    adamHeading.appendChild(adamRole);
    adamCard.appendChild(adamHeading);

    // Div
    const adamUnderline = document.createElement('div');
    adamUnderline.className = 'title underline';
    adamCard.appendChild(adamUnderline);

    // Div
    const adamBioRow = document.createElement('div');
    adamBioRow.className = 'bio-row';

    // Image
    const adamPhotoContainer = document.createElement('div');
    adamPhotoContainer.className = 'photo placeholder';
    const adamPhoto = document.createElement('img');
    adamPhoto.src = content.team[1].image.src;
    adamPhoto.alt = content.team[1].image.alt;
    adamPhoto.className = 'team-photo';
    adamPhotoContainer.appendChild(adamPhoto);
    adamBioRow.appendChild(adamPhotoContainer);

    // Div
    const adamBioText = document.createElement('div');
    adamBioText.className = 'bio-text';
    const adamBio = document.createElement('p');
    adamBio.textContent = content.team[1].bio;
    adamBioText.appendChild(adamBio);
    adamBioRow.appendChild(adamBioText);

    adamCard.appendChild(adamBioRow);
    teamGrid.appendChild(adamCard);

    // MARTHA CARD
    const marthaCard = document.createElement('article');
    marthaCard.className = 'team card';

    // Header / Name
    const marthaHeading = document.createElement('h2');
    const marthaName = document.createElement('span');
    marthaName.textContent = content.team[2].name;
    marthaHeading.appendChild(marthaName);
    marthaHeading.appendChild(document.createElement('br'));

    // Job / Role
    const marthaRole = document.createElement('span');
    marthaRole.className = 'job';
    marthaRole.textContent = content.team[2].role;
    marthaHeading.appendChild(marthaRole);
    marthaCard.appendChild(marthaHeading);

    // Div
    const marthaUnderline = document.createElement('div');
    marthaUnderline.className = 'title underline';
    marthaCard.appendChild(marthaUnderline);

    // Div
    const marthaBioRow = document.createElement('div');
    marthaBioRow.className = 'bio-row';

    // Image
    const marthaPhotoContainer = document.createElement('div');
    marthaPhotoContainer.className = 'photo placeholder';
    const marthaPhoto = document.createElement('img');
    marthaPhoto.src = content.team[2].image.src;
    marthaPhoto.alt = content.team[2].image.alt;
    marthaPhoto.className = 'team-photo';
    marthaPhotoContainer.appendChild(marthaPhoto);
    marthaBioRow.appendChild(marthaPhotoContainer);

    // Div
    const marthaBioText = document.createElement('div');
    marthaBioText.className = 'bio-text';
    const marthaBio = document.createElement('p');
    marthaBio.textContent = content.team[2].bio;
    marthaBioText.appendChild(marthaBio);
    marthaBioRow.appendChild(marthaBioText);

    marthaCard.appendChild(marthaBioRow);
    teamGrid.appendChild(marthaCard);

    // TYLER CARD
    const tylerCard = document.createElement('article');
    tylerCard.className = 'team card';

    // Header / Name
    const tylerHeading = document.createElement('h2');
    const tylerName = document.createElement('span');
    tylerName.textContent = content.team[3].name;
    tylerHeading.appendChild(tylerName);
    tylerHeading.appendChild(document.createElement('br'));

    // Job / Role
    const tylerRole = document.createElement('span');
    tylerRole.className = 'job';
    tylerRole.textContent = content.team[3].role;
    tylerHeading.appendChild(tylerRole);
    tylerCard.appendChild(tylerHeading);

    // Div
    const tylerUnderline = document.createElement('div');
    tylerUnderline.className = 'title underline';
    tylerCard.appendChild(tylerUnderline);

    // Div
    const tylerBioRow = document.createElement('div');
    tylerBioRow.className = 'bio-row';

    // Image
    const tylerPhotoContainer = document.createElement('div');
    tylerPhotoContainer.className = 'photo placeholder';
    const tylerPhoto = document.createElement('img');
    tylerPhoto.src = content.team[3].image.src;
    tylerPhoto.alt = content.team[3].image.alt;
    tylerPhoto.className = 'team-photo';
    tylerPhotoContainer.appendChild(tylerPhoto);
    tylerBioRow.appendChild(tylerPhotoContainer);

    // Div
    const tylerBioText = document.createElement('div');
    tylerBioText.className = 'bio-text';
    const tylerBio = document.createElement('p');
    tylerBio.textContent = content.team[3].bio;
    tylerBioText.appendChild(tylerBio);
    tylerBioRow.appendChild(tylerBioText);

    tylerCard.appendChild(tylerBioRow);
    teamGrid.appendChild(tylerCard);

    teamSection.appendChild(teamGrid);
    main.appendChild(teamSection);
}

/* ---------- Aboutus page ---------- */





/* ---------- Index carousel functionality ---------- */

function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container'); // Locate and identify carousel elements
    const carouselImg = carouselContainer.querySelector('.carousel-img');
    const prevBtn = carouselContainer.querySelector('.carousel-prev');
    const nextBtn = carouselContainer.querySelector('.carousel-next');
    const carouselHeader = carouselContainer.querySelector('.carousel-header');
    const carouselP = carouselContainer.querySelector('.carousel-p');

    let carouselContent = [];
    const indexData = jsonContent.find(item => item.page === "index"); // Extract only index data from json

    carouselContent = indexData.content.carousel.slides;
    console.log("Carousel data loaded from JSON:", carouselContent);

    let currentSlide = 0;
    const totalSlides = carouselContent.length;

    function updateCarousel() { // To update the carousel slide once called by button functions
        const slide = carouselContent[currentSlide];

        carouselImg.src = slide.image;
        carouselImg.alt = slide.header;
        carouselHeader.textContent = slide.header;
        carouselP.textContent = slide.text;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides; // Math done like this so that it loops when you advance past all slides
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    updateCarousel(); // This is just in case I change the way the carousel is loaded and it doesnt have content to start with

    console.log("Carousel loaded with", totalSlides, "slides");
}

/* ---------- Index carousel functionality ---------- */





/*
   SIMPLE TRASLATION (No json file used because i am dying trying to figure it out)
-*/

// All translations stored directly in JS
const translations = {
    en: {
        "nav.Home": "Home",
        "nav.Goals": "Our goals",
        "nav.CleanWater": "Clean Water",
        "nav.ClimateAction": "Climate Action",
        "nav.QualityEducation": "Quality Education",
        "nav.SignUp": "Sign up",
        "nav.AboutUs": "About us",

        "footer.Home": "Home",
        "footer.CleanWater": "Clean water & Sanitation",
        "footer.ClimateAction": "Climate Action",
        "footer.QualityEducation": "Quality Education",
        "footer.SignUp": "Sign up",
        "footer.AboutUs": "About us",

        "index.Title": "Norwich Sustainability Group Home Page",
        "index.WelcomeHeading": "Welcome",

        "index.Section.UEAResearchHeading": "UEA's World-Leading Climate Change Research",
        "index.Section.NorwichNetZeroHeading": "Norwich Pledges Net Zero by 2030",
        "index.Section.CO2Heading": "CO2 Rates Continue to Accelerate",
        "index.Section.TransportHeading": "Transport Identified as UK's Largest Emitting Sector",
        "index.Section.RiversHeading": "UK's Rivers and Coasts Teeming with Sewage",
        "index.Section.NorwichStandUpHeading": "Norwich can Stand up",
        "index.Section.SignUpNowHeading": "Sign up Now",

        "index.LearnMore": "Learn more",

        "about.Title": "About us",

        "about.Chalak.Name": "Chalak",
        "about.Chalak.Role": "About us page / Translation",
        "about.Chalak.Bio": "Chalak created and coded the About Us page for the norwich Sustainability Group website and worked  on the json translation so our content can be easily shown in differnt languages such asWelsh, Spanish and English. Making the website more accessible",

        "about.Adam.Name": "Adam",
        "about.Adam.Role": "Home page / Designer",
        "about.Adam.Bio": "Adam designed and built the Home page, focusing on a nice Clean layout that makes it easy to find information about our Sustainability goals.He enjoys experimenting with colors, shapes to make the layout as user friendly as possible.",

        "about.Martha.Name": "Martha",
        "about.Martha.Role": "Sign up page",
        "about.Martha.Bio": "Martha developed the Sign Up page, making sure the form is simple, clear and accessible for new members. She is interested in making online experiences smooth and helping more people get involved in sustainability projects.",

        "about.Tyler.Name": "Tyler",
        "about.Tyler.Role": "Goals page",
        "about.Tyler.Bio": "Tyler worked on the Goals page, presentting our sustainability aims like Clean Water,Climate Action and Quality Education in a clear way. he enjoys organising information so vistors can quickly understand what we stand for and how they can help "
    },

    es: {
        "nav.Home": "Inicio",
        "nav.Goals": "Nuestros objetivos",
        "nav.CleanWater": "Agua limpia",
        "nav.ClimateAction": "Acción por el clima",
        "nav.QualityEducation": "Educación de calidad",
        "nav.SignUp": "Regístrate",
        "nav.AboutUs": "Sobre nosotros",

        "footer.Home": "Inicio",
        "footer.CleanWater": "Agua limpia y saneamiento",
        "footer.ClimateAction": "Acción por el clima",
        "footer.QualityEducation": "Educación de calidad",
        "footer.SignUp": "Regístrate",
        "footer.AboutUs": "Sobre nosotros",

        "index.Title": "Página de inicio del Norwich Sustainability Group",
        "index.WelcomeHeading": "Bienvenido",

        "index.Section.UEAResearchHeading": "Investigación de clase mundial de la UEA sobre el cambio climático",
        "index.Section.NorwichNetZeroHeading": "Norwich promete cero emisiones netas para 2030",
        "index.Section.CO2Heading": "Las tasas de CO₂ continúan aumentando",
        "index.Section.TransportHeading": "El transporte es el mayor sector emisor del Reino Unido",
        "index.Section.RiversHeading": "Ríos y costas del Reino Unido llenos de aguas residuales",
        "index.Section.NorwichStandUpHeading": "Norwich puede levantarse",
        "index.Section.SignUpNowHeading": "Regístrate ahora",

        "index.LearnMore": "Más información",

        "about.Title": "Sobre nosotros",

        "about.Chalak.Name": "Chalak",
        "about.Chalak.Role": "Página de 'Sobre nosotros' / Traducción",
        "about.Chalak.Bio": "Chalak creó y programó la página 'Sobre nosotros' para el sitio web del Norwich Sustainability Group y trabajó en la traducción JSON para que nuestro contenido pueda mostrarse fácilmente en diferentes idiomas como galés, español e inglés, haciendo el sitio web más accesible.",

        "about.Adam.Name": "Adam",
        "about.Adam.Role": "Página de inicio / Diseñador",
        "about.Adam.Bio": "Adam diseñó y creó la página de inicio, centrándose en un diseño limpio que facilita encontrar información sobre nuestros objetivos de sostenibilidad. Le gusta experimentar con colores y formas para hacer el diseño lo más fácil de usar posible.",

        "about.Martha.Name": "Martha",
        "about.Martha.Role": "Página de registro",
        "about.Martha.Bio": "Martha desarrolló la página de registro, asegurándose de que el formulario sea simple, claro y accesible para los nuevos miembros. Está interesada en hacer que las experiencias en línea sean fluidas y en ayudar a que más personas se involucren en proyectos de sostenibilidad.",

        "about.Tyler.Name": "Tyler",
        "about.Tyler.Role": "Página de objetivos",
        "about.Tyler.Bio": "Tyler trabajó en la página de objetivos, presentando nuestras metas de sostenibilidad como Agua Limpia, Acción por el Clima y Educación de Calidad de una manera clara. Le gusta organizar información para que los visitantes puedan entender rápidamente lo que representamos y cómo pueden ayudar."
    },

    cy: {
        "nav.Home": "Hafan",
        "nav.Goals": "Ein nodau",
        "nav.CleanWater": "Dŵr glân",
        "nav.ClimateAction": "Gweithredu dros y clima",
        "nav.QualityEducation": "Addysg o ansawdd",
        "nav.SignUp": "Cofrestru",
        "nav.AboutUs": "Amdanom ni",

        "footer.Home": "Hafan",
        "footer.CleanWater": "Dŵr glân a glanweithdra",
        "footer.ClimateAction": "Gweithredu dros y clima",
        "footer.QualityEducation": "Addysg o ansawdd",
        "footer.SignUp": "Cofrestru",
        "footer.AboutUs": "Amdanom ni",

        "index.Title": "Tudalen gartref Grŵp Cynaliadwyedd Norwich",
        "index.WelcomeHeading": "Croeso",

        "index.Section.UEAResearchHeading": "Ymchwil flaenllaw’r UEA ar newid hinsawdd",
        "index.Section.NorwichNetZeroHeading": "Norwich yn addo sero net erbyn 2030",
        "index.Section.CO2Heading": "Cyfraddau CO₂ yn parhau i gynyddu",
        "index.Section.TransportHeading": "Trafnidiaeth yw’r sector mwyaf llygru yn y DU",
        "index.Section.RiversHeading": "Afonydd ac arfordiroedd y DU yn llawn carthffosiaeth",
        "index.Section.NorwichStandUpHeading": "Gall Norwich sefyll i fyny",
        "index.Section.SignUpNowHeading": "Cofrestrwch nawr",

        "index.LearnMore": "Dysgu mwy",

        "about.Title": "Amdanom ni",

        "about.Chalak.Name": "Chalak",
        "about.Chalak.Role": "Tudalen 'Amdanom ni' / Cyfieithu",
        "about.Chalak.Bio": "Creodd a chododd Chalak y dudalen 'Amdanom ni' ar wefan Norwich Sustainability Group a bu’n gweithio ar gyfieithiad JSON fel y gellir dangos ein cynnwys yn hawdd mewn ieithoedd gwahanol fel Cymraeg, Sbaeneg a Saesneg, gan wneud y wefan yn fwy hygyrch.",

        "about.Adam.Name": "Adam",
        "about.Adam.Role": "Tudalen gartref / Dylunydd",
        "about.Adam.Bio": "Dyluniodd ac adeiladodd Adam y dudalen gartref, gan ganolbwyntio ar gynllun glân a chlir sy’n ei gwneud hi’n hawdd dod o hyd i wybodaeth am ein nodau cynaliadwyedd.",

        "about.Martha.Name": "Martha",
        "about.Martha.Role": "Tudalen cofrestru",
        "about.Martha.Bio": "Datblygodd Martha y dudalen gofrestru, gan sicrhau bod y ffurflen yn syml, yn glir ac yn hygyrch i aelodau newydd. Mae’n mwynhau gwneud profiadau ar-lein yn esmwyth ac annog mwy o bobl i gymryd rhan mewn prosiectau cynaliadwyedd.",

        "about.Tyler.Name": "Tyler",
        "about.Tyler.Role": "Tudalen nodau",
        "about.Tyler.Bio": "Gweithiodd Tyler ar y dudalen nodau, gan gyflwyno ein hamcanion cynaliadwyedd fel Dŵr Glân, Gweithredu dros y Clima ac Addysg o Ansawdd mewn ffordd glir. Mae’n mwynhau trefnu gwybodaeth fel bod ymwelwyr yn gallu deall yn gyflym beth rydym yn sefyll drosto a sut y gallant helpu."
    }
};

// make function global so buttons can call it
function loadLanguage(lang) {
    console.log("Switching language to:", lang);
// find all the ellements tthat nee to be translated
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        //peplace the element text if translation exists
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
//update the page language attribute
    document.documentElement.lang = lang;
}

//load English by default when page opens
document.addEventListener("DOMContentLoaded", () => {
    loadLanguage("en");
});

/*simple translation explantion
the website originally loaded translations from JSON files but this caused errors when it locally
i fixed it by reanslations are now stored directly in the "translations" object inside the javaScript file.
when a Language button is clickedd, the loadLanguage(Lang) function replaces the ttext of every element
that has a data-i18n attribute i18n sttands for internationalisation because there are 18 letter between i an n fun fact
so i18n is like a marker for the text taht should be translated. then a key like about.Tyler.Bio is used to find the correct ttranlation
then the java script replces the elements text depending on the chosen language.

tranlations are now built into the code, the old JSON language files are no longer needed but keeped them just incase

*/