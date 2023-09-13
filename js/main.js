import { fields, radioInputs } from './data.js' //데이터 파일 불러오기


$(document).ready(function () {  

    // 질문지 세트 만드는 부분 
    const container = document.getElementById('formContainer'); //폼 안에  html 생성하기
    const contentsRadioInputs = (groupID) => {
    let html = '';
    radioInputs.forEach((value, index) => { //라디오 값에 따라서 생성하기
    const inputID = `${groupID}q${index + 1}`;
    html += `
    <input type="radio" id="${inputID}" name="${groupID}" value="${value}" required>
    <label for="${inputID}">${value}</label>
    `;
    });
    return html;
    };
    const generateFieldset = (groupID, question, isDisabled) => {
    // 삼항연산자로 첫번쨰 항목이 아니면 선택안되게 하기와 첫번째 선택값 클래스 주기
    const html = `
    <fieldset id="${groupID}" ${isDisabled ? 'disabled' : ''} class="${isDisabled ? '' : 'select'}"> 
    <p class="qr">${question}</p>
    <div class="container">
    ${contentsRadioInputs(groupID)}
    </div>
    </fieldset>
    `;
    return html;
    };
    // 첫번째 화면 초기화 하는 부분 첫번째 화면일때 클래스랑 disable 값 주기
    fields.forEach(({ id, question }, index) => {
    const isDisabled = index !== 0; 
    container.innerHTML += generateFieldset(id, question, isDisabled);
    });

    const numberOfFields = fields.length; // 질문 갯수 구해서 저장하기
    
    $(`#formContainer input[type="radio"]`).on('change', function () {
    const groupID = $(this).closest('fieldset').attr('id'); //현재 그룹아이디 
    const nextGroupID = getNextGroupID(groupID);  //다음 그룹아이디 
    if ($(this).val() !== '') { //클릭했을때 효과주기 스타일값 값이 null이 아니면
    $(`fieldset[id="${nextGroupID}"]`).prop('disabled', false);
    $(`#formContainer fieldset`).removeClass('select');
    $(`fieldset[id="${nextGroupID}"]`).addClass('select');
    setTimeout(()=>{ //스크롤 위치 변경 소스
    var topBarHeight = $(".header").innerHeight() ; //현재 해더값을 빼기 
    console.log(topBarHeight)
    $('html, body').animate({
    scrollTop: $(`fieldset[id="${groupID}"]`).offset().top - topBarHeight 
    });	
    },10)
    } 
    else {
    $(`fieldset[id="${nextGroupID}"]`).prop('disabled', true); //다른 인풋은 disabled주기
    }
    if ($(this).is(':checked')) { //체크가 완료된 후 클래스 추가
    $(`fieldset[id="${groupID}"]`).addClass('checked');
    }
    const lastGroupID = getLastGroupID(); // 마지막 그룹을 선택했을땐 버튼으로 포커스가 가게
    if (groupID === lastGroupID ) { 
        $(".next").addClass('select');
    }
    else{
        $(".next").removeClass('select');
    }
    });

    //마지막 그룹 아이디 구하기
    function getLastGroupID() {
        return fields[fields.length - 1].id;
    }

    //다음 그룹 아이디 구하는 함수
    function getNextGroupID(currentGroupID) {
    const currentIndex = fields.findIndex(field => field.id === currentGroupID);
    if (currentIndex !== -1 && currentIndex < fields.length - 1) {
    return fields[currentIndex + 1].id;
    }
    return currentIndex
    }

    // 라디오버튼 다 체크했는지 확인 하기
    $(".next").on("click", function () {
    if ($('#formContainer input[type="radio"]:checked').length == numberOfFields ) {
    $("#pagetwo").removeClass("show");
    $("#pagethree").addClass("show");
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
    } else {
    alert("모든 항목을 선택해주세요.");
    }
    });
    

    // 설문조사 시작
    $(".start").on("click", function () {
    $("#pageone").addClass("hide");
    $("#pagetwo").addClass("show");
    setTimeout(()=>{

    $(".radido_div").addClass("show");
    },1)
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;

    });



    });