const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const img0 = document.getElementById("Im_id");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

Id_List = [
  "./img/Q1.jpg",
  "./img/Q2.jpg",
  "./img/Q3.jpg",
  "./img/Q4.jpg",
  "./img/Q5.jpg",
  "./img/Q6.jpg",
  "./img/Q7.jpg",
  "./img/Q8.jpg",
  "./img/Q9.jpg",
  "./img/Q10.jpg",
  "./img/Q11.jpg",
  "./img/Q12.jpg",
];

const shop = [
"https://naver.me/xw6okT54",
"https://naver.me/F5bFLEez",
"https://naver.me/xY9gAMXd",
"https://naver.me/F7CopBuu",
"https://naver.me/FYua7aZE",
"https://naver.me/GAi6ecGv",
"https://naver.me/IMn7yRoh",
"https://naver.me/56a3Nk1D",
"https://naver.me/FshiHr7Z",
"https://naver.me/FOvRiQlR",
"https://naver.me/5nbeH1hR",
"https://naver.me/xevjbdqm",
"https://naver.me/FzHjT5HE",
"https://naver.me/FOvhceY5",
"https://naver.me/GsPLIMcG",
"https://naver.me/x6UfZuaW"
]

function calResult() {
  console.log(select);
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult() {
  let point = calResult();
  console.log(point);
  /*const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;*/

  var resultImg = document.createElement("img");
  const imgDiv = document.querySelector("#resultImg");
  var imgURL = "img/image-" + point + ".png";
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add("img-fluid");
  imgDiv.appendChild(resultImg);

  /*const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;*/
}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450);
  });
  setResult();
}

function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector(".answerBox");
  var answer = document.createElement("button");
  answer.classList.add("answerList");
  answer.classList.add("my-3");
  answer.classList.add("py-3");
  answer.classList.add("mx-auto");
  answer.classList.add("fadeIn");

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener(
    "click",
    function () {
      var children = document.querySelectorAll(".answerList");
      for (let i = 0; i < children.length; i++) {
        children[i].disabled = true;
        children[i].style.WebkitAnimation = "fadeOut 0.5s";
        children[i].style.animation = "fadeOut 0.5s";
      }
      setTimeout(() => {
        var target = qnaList[qIdx].a[idx].type;
        for (let i = 0; i < target.length; i++) {
          select[target[i]] += 1;
          console.log(select);
        }

        for (let i = 0; i < children.length; i++) {
          children[i].style.display = "none";
        }
        goNext(++qIdx);
      }, 450);
    },
    false
  );
}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }
  img0.src = Id_List[qIdx];
  var q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }

  increaseProgress();
}

function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450);
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}

function goMap() {
  window.location.href = shop[calResult()];
}