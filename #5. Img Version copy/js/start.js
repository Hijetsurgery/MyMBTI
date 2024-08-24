const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 6;

const XLSX = require('xlsx');

// 엑셀 파일 경로
const filePath = 'C:/Users/taeyo/OneDrive/바탕 화면/문서/GitHub/lovewithrio/MyMBTI/#5. Img Version copy/L-BTI 결과 알고리즘_v.2.0.xlsx';

// 엑셀 파일 읽기
const workbook = XLSX.readFile(filePath);

// Sheet2의 A1:G13 범위 가져오기
const sheet = workbook.Sheets['Sheet2'];
const range = XLSX.utils.decode_range('A1:G13');
const data = XLSX.utils.sheet_to_json(sheet, { header: 1, range: range });

// 데이터 가공 (첫 번째 행은 헤더로 사용)
const headers = data[0];
const rows = data.slice(1).map(row => {
  let obj = {};
  headers.forEach((header, i) => {
    obj[header] = row[i];
  });
  return obj;
});

// 가중치 설정
const weights = {
  '거리': 0.5,
  '분위기': 3,
  '감성/맛': 0.5,
  '음료/디저트': 1,
  '공간감': 2.5,
  '디저트': 2
};

function calResult(){
  // 가장 일치하는 카페들 찾기
  const maxMatchCount = Math.max(...rows.map(row => row.match_count));
  let bestMatches = rows.filter(row => row.match_count === maxMatchCount);
  // 필터링 순서에 따른 최종 선택 로직
  const priorityOrder = ['분위기', '디저트', '공간감', '음료/디저트', '감성/맛', '거리'];

  let index = 0;
  while (bestMatches.length > 1 && index < priorityOrder.length) {
    const col = priorityOrder[index];
    const filteredMatches = bestMatches.filter(row => row[col] === answers[col]);
    if (filteredMatches.length > 0) {
      bestMatches = filteredMatches;
    }
    index++;
  }

  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult(){
  let point = calResult();
  console.log(point);
  /*const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;*/

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  /*const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;*/
}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block"
    }, 450)})
    setResult();
}

function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;
      // 일치도 계산
      rows.forEach(row => {
        row.match_count = 0;
          if (row[qnaList[qIdx].a[0]] === target) {
            row.match_count += weights[qnaList[qIdx].a[0]];
        }
      });

      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    },450)
  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block"
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}


// 사용자의 답변 (예시로 가정)
const answers = {
  '거리': 3,
  '분위기': 5,
  '감성/맛': 4,
  '음료/디저트': 3,
  '공간감': 5,
  '디저트': 4
};





// 최종 매칭된 카페 출력
const bestMatch = bestMatches[0];
console.log("\n당신의 답변과 가장 일치하는 카페는:", bestMatch['카페']);
