// Portfolio demo: all questions and notes use sample content.
const screens = document.querySelectorAll(".screen");
document.querySelectorAll("[data-screen]").forEach(button => {
  button.addEventListener("click", () => {
    screens.forEach(screen => screen.classList.remove("active"));
    document.getElementById(button.dataset.screen).classList.add("active");
    if (button.dataset.screen === "quiz") startQuiz();
  });
});
document.querySelectorAll(".gallery .photo").forEach(photo => {
  photo.addEventListener("click", () => photo.classList.toggle("enlarged"));
});
document.querySelectorAll("[data-note]").forEach(note => {
  note.addEventListener("click", () => {
    document.getElementById("note-text").textContent = note.dataset.note;
  });
});
const questions = [
  {question:"Which language styles a webpage?", choices:["HTML","CSS","SQL"], correct:1},
  {question:"Which language makes web pages interactive?", choices:["JavaScript","C","Assembly"], correct:0},
  {question:"What does HTML define?", choices:["Page structure","Battery voltage","Internet speed"], correct:0}
];
let index=0, score=0;
const nextButton=document.getElementById("next-question");
function startQuiz(){index=0;score=0;showQuestion();}
function showQuestion(){
  nextButton.hidden=true;
  document.getElementById("feedback").textContent="";
  document.getElementById("question-count").textContent="Question "+(index+1)+" of "+questions.length+" · Score: "+score;
  document.getElementById("question").textContent=questions[index].question;
  const choices=document.getElementById("choices");
  choices.replaceChildren();
  questions[index].choices.forEach((choice,i)=>{
    const button=document.createElement("button");
    button.textContent=choice;
    button.addEventListener("click",()=>{
      if(i===questions[index].correct){score++;document.getElementById("feedback").textContent="Correct!";}
      else{document.getElementById("feedback").textContent="Not quite — try the next one.";}
      choices.querySelectorAll("button").forEach(b=>b.disabled=true);
      nextButton.hidden=false;
    });
    choices.appendChild(button);
  });
}
nextButton.addEventListener("click",()=>{
  index++;
  if(index<questions.length){showQuestion();}
  else{
    document.getElementById("question").textContent="Quiz complete!";
    document.getElementById("question-count").textContent="Final score: "+score+" / "+questions.length;
    document.getElementById("choices").replaceChildren();
    document.getElementById("feedback").textContent="Thanks for trying the demo!";
    nextButton.hidden=true;
  }
});