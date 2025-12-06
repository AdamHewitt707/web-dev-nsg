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
let localJsonFile = "JSON/en.json";
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

  console.log("Current page: ", page);

  // initNav(); // Process header navbar is its own function because its universal for the entire website

  initPageContent(page); // Process page content based on page name

  // initFooter(); // Process footer content
}

/* ---------- Initialize page ---------- */






/* ---------- Grab page function ---------- */

function initPageContent(page) {
  console.log("Loading page content for", page);

  const pageFunctions = {
    'index': () => {
      console.log("Home page initialization");
      loadIndexContent();
    },
    'quality-education': () => {
      console.log("Quality eduction page initialization");
      loadEducationContent();
    },
    'climate-action': () => {
      console.log("Climate action page initialization");
      loadClimateContent();
    },
    'clean-water': () => {
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
    pageHandler(); // This loads the function from a specific element in the pageFunctions array above
  } 
  
  else {
    console.warn(`Can't find page: ${page}`);
  }
}

/* ---------- Grab page function ---------- */





/* ---------- Index page ---------- */

function loadIndexContent () {
  console.log("Loading Index Content...");

  // Build your page through javascript here

}

/* ---------- Index page ---------- */






/* ---------- Education page ---------- */

function loadEducationContent () {
  console.log("Loading Quality Education Content...")

  // Build your page through javascript here

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

}

/* ---------- Water page ---------- */






/* ---------- Signup page ---------- */

function loadSignupContent () {
  console.log("Loading Sign Up Content...")

  // Build your page through javascript here

}

/* ---------- Signup page ---------- */






/* ---------- Aboutus page ---------- */

function loadAboutusContent () {
  console.log("Loading About Us Content...")

  // Build your page through javascript here
  
}

/* ---------- Aboutus page ---------- */






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
    "index.Section.NorwichNetZero1Heading": "Norwich Pledges Net Zero by 2030",
    "index.Section.NorwichNetZero2Heading": "Norwich Pledges Net Zero by 2030",
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
    "index.Section.NorwichNetZero1Heading": "Norwich promete cero emisiones netas para 2030",
    "index.Section.NorwichNetZero2Heading": "Norwich promete cero emisiones netas para 2030",
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
    "index.Section.NorwichNetZero1Heading": "Norwich yn addo sero net erbyn 2030",
    "index.Section.NorwichNetZero2Heading": "Norwich yn addo sero net erbyn 2030",
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