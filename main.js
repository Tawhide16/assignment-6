                                // scroll-smooth
document.getElementById("scroll-btn").addEventListener("click", function() {
    document.getElementById("target-section").scrollIntoView({ behavior: "smooth" });
});


document.getElementById("scroll-learn").addEventListener("click", function() {
    document.getElementById("target-learn").scrollIntoView({ behavior: "smooth" });
});

                                    // nav-bar-fix

window.addEventListener("scroll", function() {
 let nav = document.querySelector("nav");                               if (window.scrollY > 0) {
     nav.classList.add("fixed");
} else {
nav.classList.remove("fixed");
}
});

                                // 6 button js

function loadCategories (){

    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json() )
    .then((data) => console.log(data))
}
loadCategories()