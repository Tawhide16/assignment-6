const logout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("user"); 
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  location.reload();
};


// login function
login = () =>{
  const userId = document.getElementById("user-id").value;
  const convertedUserId = userId.trim();
  const password = document.getElementById("password").value;
  const convertedPassword = parseInt(password);


  if(convertedUserId.length > 0 ){
    if(convertedPassword === 123456){
      Swal.fire({
        title: "Login successfully",
        text: "Click ok to explore",
        icon: "success"
      });
      const banner = document.getElementById("banner");
      banner.classList.add("hidden");

      const buttonSection = document.getElementById("button-all");
      buttonSection.classList.remove("hidden");

      const navbar =document.getElementById("header");
      navbar.classList.remove("hidden");

      const vocabularySection =document.getElementById("learn-section-2");
      vocabularySection.classList.remove("hidden");

      const faqSection =document.getElementById("faq-section");
      faqSection.classList.remove("hidden");
    }
    else{
      alert("Invalid password!! please enter 123456")
    }
  }
  else{
    alert("Please enter your name");
  }
};
// remove active btn function
const removeActive = () => {
  const activeBtn = document.getElementsByClassName("active");
  for (let btn of activeBtn) {
    btn.classList.remove("active");
  }
};



                                  // nav-bar-fix



// 6 button js
function loadCategories (){

fetch("https://openapi.programming-hero.com/api/levels/all")
.then((res) => res.json() )
.then((data) => displayButton(data.data));
}
function displayButton (data){

const buttonContainer = document.getElementById("target-learn");
for(let buttons of data){

const buttonDiv = document.createElement("div");
buttonDiv.innerHTML =  `<button class=" inline btn btn-soft text-[#422AD5] hover:bg-[#422AD5] hover:text-[white] border-[#422AD5] mt-4 " onclick = "loadvhocary(${buttons.level_no});clickedBtn(${buttons.id})" id = "btn-${buttons.id}"><i class="fa-solid fa-book-open" style="color: #422ad5; "></i> Lesson-${buttons.level_no}</button>`;

buttonContainer.appendChild(buttonDiv)
}

}


function loadvhocary(level){
fetch(`https://openapi.programming-hero.com/api/level/${level}`)

.then((res) => res.json())
.then((data) => displayOut(data.data))

}
const displayOut = (learns) => {

const learnVocabolary = document.getElementById("learn-section");
learnVocabolary.innerHTML =""
 if(learns.length == 0){
  learnVocabolary.innerHTML = `
   <div class=" text-center bg-[#f8f8f8] rounded-[12px] mx-8 p-9 col-span-3">
        <i class="fa-solid fa-circle-exclamation "></i>
      <p class="text-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h1 class="text-[24px] font-extrabold">নেক্সট Lesson এ যান</h1>
    </div>
  `
 }

learns.forEach((level) => {
    const div = document.createElement("div");
    div.innerHTML = `
     <div class="text-center bg-white rounded-[12px] w-[250px] mb-5">
    <div class="px-3">
        <h1 class="text-[24px]">${level.word}</h1>
    <p class="">Meaning /Pronounciation</p>
    <h1 class="text-[24px]">"${level.meaning}/ ইগার"</h1>
    </div>
    <div class="justify-between flex px-5 pb-5 pt-8"><i class="fa-solid fa-circle-info"></i>
 <i class="fa-solid fa-headphones"></i></div>
</div>
    `;
    learnVocabolary.appendChild(div)
});
}


function ditails (id) {
  document.getElementById(my_modal_1).showModal ()
  const ditailButton = document.getElementById("ditailButton");
  ditailButton.innerHTML = `
  `;
}




// active btn function
const clickedBtn = (id) => {
  removeActive();
  const activeBtn = document.getElementById(`btn-${id}`);
  activeBtn.classList.add("active");
};
loadCategories();

// logout event