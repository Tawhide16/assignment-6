const logout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("user"); 
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  location.reload();
};

// show loader
const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("learn-section").classList.add("hidden");
};

// hide loader
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("learn-section").classList.remove("hidden");
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
buttonDiv.innerHTML =  `<button class="inline btn btn-soft text-[#422AD5] hover:bg-[#422AD5] hover:text-white border-[#422AD5] mt-4 group" 
        onclick="loadvhocary(${buttons.level_no}); clickedBtn(${buttons.id})" 
        id="btn-${buttons.id}">
    <i class="fa-solid fa-book-open text-[#422AD5] transition-colors duration-300 group-hover:text-white"></i> 
    Lesson-${buttons.level_no}
</button>
`;

buttonContainer.appendChild(buttonDiv)
}

}


function loadvhocary(level){
  showLoader()
fetch(`https://openapi.programming-hero.com/api/level/${level}`)

.then((res) => res.json())
.then((data) => displayOut(data.data))

}
const displayOut = (learns) => {

const learnVocabolary = document.getElementById("learn-section");
 hideLoader()
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
    <div class="justify-between flex px-5 pb-5 pt-8"><i class="fa-solid fa-circle-info text-black cursor-pointer" onclick="loadWordDetails(${level.id})"></i>
 <i class="fa-solid fa-headphones"></i></div>
</div>
    `;
    learnVocabolary.appendChild(div)
});
}
//ditail-button


// load word details
const loadWordDetails =async (id) =>{
  const response = await fetch(`https://openapi.programming-hero.com/api/word/${id}`);
  const data = await response.json();
ditails(data.data);
}


function ditails(id) {
  console.log(id);

  const modal = document.getElementById("woard_modal");
  if (!modal) {
    console.error("Modal not found!");
    return;
  }

  modal.showModal(); // Open the modal

  const ditailButton = document.getElementById("ditailButton");
  if (!ditailButton) {
    console.error("Modal content container not found!");
    return;
  }

  ditailButton.innerHTML = `
    <section class="rounded-2xl w-[375px]">
      <div class="p-3">
        <div class="w-[350px] border border-gray-500 rounded-lg p-3">
          <h1 class="text-[24px]">${id.word} ( :${id.pronunciation})</h1>
          <p class="pt-2 font-extrabold">Meaning</p>
          <p>${id.meaning}</p>
          <p class="pt-3 font-extrabold">Example</p>
          <p>${id.sentence}</p>
          <p class="pt-3">সমার্থক শব্দ গুলো</p>
          <div id ="btn-container" class="pt-2 flex flex-wrap gap-2">
            
          </div>
        </div>
      </div>
      <div class="p-3 ">
        <button id="completeLearning" class="btn btn-primary">Complete Learning</button>
      </div>
    </section>
  `;

  const container = document.getElementById("btn-container");
  for (let synonym of id.synonyms ) {
  const button = document.createElement("div");
  button.innerHTML = `
     <button class="btn btn-active">${synonym}</button>
  `;
  container.appendChild(button)
  
  }


  // Wait for the button to be added, then attach event listener
  setTimeout(() => {
    const completeButton = document.getElementById("completeLearning");
    if (completeButton) {
      completeButton.addEventListener("click", () => {
        console.log("Learning Completed!");
        modal.close(); // Close modal
      });
    }
  }, 100); // Small delay to ensure the button exists
}



// active btn function
const clickedBtn = (id) => {
  removeActive();
  const activeBtn = document.getElementById(`btn-${id}`);
  activeBtn.classList.add("active");
};
loadCategories();

// logout event