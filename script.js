// Chatbot Memory 
let conversation = [];
// save user message
conversation.push({ role: "user", content: text });

// send full conversation
const res = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages: conversation })
});

const data = await res.json();

// save bot reply
conversation.push({ role: "assistant", content: data.reply });

// keep memory small
if (conversation.length > 8) {
  conversation = conversation.slice(-8);
}




// JavaScript for Slideshow Modal
let slideIndex = 1;

function openSlideshow() {
    document.getElementById('slideshowModal').style.display = 'block';
    showSlides(slideIndex);
}

function closeSlideshow() {
    document.getElementById('slideshowModal').style.display = 'none';
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

