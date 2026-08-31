function showPage(pageId){
    const pages = document.querySelectorAll(".about");
    pages.forEach(function(page){
        page.classList.remove("active");
    });
    document.getElementById(pageId).classList.add("active");
}

const toggleBtn = document.getElementById("chat-toggle");
const chatFrame = document.getElementById("chat-frame");

toggleBtn.addEventListener("click", () => {

    if(chatFrame.style.display === "block"){
        chatFrame.style.display = "none";
    }
    else{
        chatFrame.style.display = "block";
    }

});

function showMenu(){
    navLinks.style.left = "0"
}
function hideMenu(){
    navLinks.style.left = "-200px"
}

function showContactForm() {
    showPage("contact");
    const feedbackForm = document.getElementById("feedback-form");
    feedbackForm.classList.add("show");
    setTimeout(() => {
        feedbackForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 100);
}

function openCreatePage() {
    document.getElementById("landing-page").style.display = "none";
    document.getElementById("create-page").classList.add("active");

    window.scrollTo(0, 0);
}


function backToLanding() {
    document.getElementById("create-page").classList.remove("active");
    document.getElementById("landing-page").style.display = "block";
    showPage("home");

    window.scrollTo(0, 0);
}
