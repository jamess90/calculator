/* 계산기 생성 버튼 클릭 시 실행 함수 */
function fnAddCalcultator(){

	var target1 = document.getElementById("selectType");		 // 종류 콤보박스
	var target2 = document.getElementById("selectColor");		 // 색상 콤보박스
    var target3 = document.getElementById("selectBodyColor");		 // 색상 콤보박스
    var calcType = target1.options[target1.selectedIndex].value; // 옵션 type 값
    var color = target2.options[target2.selectedIndex].value;	 // 옵션 color 값
	var bodyColor = target3.options[target3.selectedIndex].value;	 // 바디 color 값
	var cal;

	if (calcType == "1") { //일반용
		cal = new SHJCalculator({
			"btnColor" : color,
			"bodyColor" : bodyColor
		});	
	} else { //공학용 
		cal = new SHJScientificCalculator({
			"btnColor" : color,
			"bodyColor" : bodyColor
		});	
	}															 // 입력된 계산기 종류와 색상을 파라미터로 계산기 객체를 생성
	cal.fnCreateCalc();	
	window.cal = cal;										 // display 함수 호출

} // end of fnAddCalcultator();

/* 옵션뷰 초기화 */
function fnInitOptionsView(){

	/* 셀렉트박스 - 종류 초기화 */
	document.getElementById('selectType').options[0].value = CAL_TYPE.NORMAL;
	document.getElementById('selectType').options[1].value = CAL_TYPE.SCIENTIFIC;

	/* 셀렉트박스 - 색상 초기화 */
	document.getElementById('selectColor').options[0].value = BUTTON_COLOR.WHITE;
	document.getElementById('selectColor').options[1].value = BUTTON_COLOR.YELLOW;
	document.getElementById('selectColor').options[2].value = BUTTON_COLOR.ORANGE;
	document.getElementById('selectColor').options[3].value = BUTTON_COLOR.PURPLE;
	document.getElementById('selectColor').options[4].value = BUTTON_COLOR.GREEN;
	document.getElementById('selectColor').options[5].value = BUTTON_COLOR.BLUE;
	document.getElementById('selectColor').options[6].value = BUTTON_COLOR.PINK;
	document.getElementById('selectColor').options[7].value = BUTTON_COLOR.RED;
	
	/* 셀렉트박스 - 바디색상 초기화 */
	document.getElementById('selectBodyColor').options[0].value = BUTTON_COLOR.WHITE;
	document.getElementById('selectBodyColor').options[1].value = BUTTON_COLOR.YELLOW;
	document.getElementById('selectBodyColor').options[2].value = BUTTON_COLOR.ORANGE;
	document.getElementById('selectBodyColor').options[3].value = BUTTON_COLOR.PURPLE;
	document.getElementById('selectBodyColor').options[4].value = BUTTON_COLOR.GREEN;
	document.getElementById('selectBodyColor').options[5].value = BUTTON_COLOR.BLUE;
	document.getElementById('selectBodyColor').options[6].value = BUTTON_COLOR.PINK;
	document.getElementById('selectBodyColor').options[7].value = BUTTON_COLOR.RED;
	
} // end of fnInitOptionsView();

/* 계산기 컴포넌트 실행  */
function fnStartCalc() {

	/* 옵션뷰를 초기화한다. */
	fnInitOptionsView();
	document.getElementById("addBtn").addEventListener("click", function() {
		fnAddCalcultator();
	})

}// end of fnStartCalc();


/* 천단위 콤마 변환 */
function numberWithCommas(num) {
	var lastChar = num.toString().substr(num.length - 1);

	if(lastChar === "."){
		return num.toSring().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	} else {
		var parts=num.toString().split(".");
   		return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
	}
} // end of numberWithCommas();

/* 천단위 콤마 빼기 */
function numberNoCommas(num) {
   return String(num).replace(/,/gi,'');
}// end of numberNoCommas();

/* 소숫점 제한 5자리 */
function limitDeciamlPoint(num) {

	var strList = num.toString().split(".");
	if(strList.length == 1){
		return num;
	} else {
		return strList[0] + "." + strList[1].substring(0,5);
	}
}// end of limitDeciamlPoint();