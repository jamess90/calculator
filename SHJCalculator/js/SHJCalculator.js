/* 계산기 생성자 함수 */
function SHJCalculator(param){
	/* 계산기 타입(일반, 공학용) */
	this.btnColor = param.btnColor;
	this.firstNum = 0;
	this.secondNum = 0;
	this.signal = '';
	this.displayStr = '0'; 
	this.histStr = '';
	this.result = '';
}// end of SHJCalculator();


/* 'R'버튼 클릭 시 이벤트 함수 */
SHJCalculator.prototype.fnInitVariable = function(){
	this.firstNum = 0;
	this.secondNum = 0;
	this.signal = '';
	this.displayStr = '0'; 
	this.histStr = '';
	this.result = '';
	this.histView.value = this.histStr;
	this.displayView.value = this.displayStr;
	this.status = STATUS.WAIT;

}// end of fnInitVariable();


/* 버튼 클릭 이벤트 */
SHJCalculator.prototype.fnClickBtn = function(params){

	var text = params.text;
	var type = params.type;
	/* 디스플레이 되고 있는 값 */
	var currText = this.displayView.value.replace(/,/gi,'');

	/* 현재 text가 0일 경우 0을 지우고 입력된 값을 넣는다. */
	if (currText === '0'){
		this.displayView.value='';
	}

	this.firstNum = limitDeciamlPoint(numberNoCommas(this.firstNum));
	this.secondNum = limitDeciamlPoint(numberNoCommas(this.secondNum));
	this.histStr = numberNoCommas(this.histStr);
	this.displayStr = limitDeciamlPoint(numberNoCommas(this.displayStr));

	switch (type){
	case INPUT_TYPE.EQUAL : 
		
		if (this.signal != ""){
			if (this.status === STATUS.SIGN){
				this.histStr = this.histStr + numberWithCommas(this.secondNum);//////////////////////////////////////////////////////////
				this.status = STATUS.WAIT;
				this.fnCalculate();
			} else if (status === STATUS.SECOND){
				this.status = STATUS.WAIT;
				this.fnCalculate();
			} else {
				this.histStr = this.histStr + '\n' + numberWithCommas(this.firstNum) + this.signal + numberWithCommas(this.secondNum);//////////////////////////////////////////////////////////
				this.status = STATUS.WAIT;
				this.fnCalculate();
			}
		} 
		break; 

	/* 숫자 입력 시 */
	case INPUT_TYPE.NUMBER : 
		if (this.status === STATUS.WAIT){
			this.firstNum = text;
			this.secondNum = '';
			this.displayStr = text;
			this.histStr += text;
			this.status = STATUS.FIRST;
		} else if (this.status === STATUS.FIRST){
			this.firstNum += String(text);
			this.displayStr += String(text);
			this.histStr += String(text);
		} else if (this.status === STATUS.SIGN){
			this.secondNum = String(text);
			this.displayStr = String(text);
			this.histStr += String(text);
			this.status = STATUS.SECOND;
		} else if (this.status === STATUS.SECOND){
			this.secondNum += String(text);
			this.displayStr += String(text);
			this.histStr += String(text);
		} 
		this.histStr = numberWithCommas(this.histStr);
		this.displayStr = numberWithCommas(this.displayStr);
		this.firstNum = numberWithCommas(this.firstNum);
		this.secondNum = numberWithCommas(this.secondNum);
		break; 

	/* 기호 입력 시 */
	case INPUT_TYPE.SIGN :
		if (this.status === STATUS.WAIT){ 
			this.signal = text;
			this.histStr = this.histStr + '\n' + this.displayStr + this.signal;//////////////////////////////////////////////////////////
			this.status = STATUS.SIGN;
		}
		else if (this.status === STATUS.FIRST){
			this.signal = text;
			this.histStr += text;
			this.status = STATUS.SIGN;
		}
		else if (this.status === STATUS.SIGN){
			this.signal = text;
			var lastChar = this.histStr.substr(this.histStr.length - 1);
			/* 문자열의 끝 문자가 기호이면 지운다.*/
			if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/"){
				this.histStr = this.histStr.slice(0,-1);
			}
			this.histStr += this.signal;
			this.status = STATUS.SIGN;
		}
		else if (this.status === STATUS.SECOND) {
			
			if (this.histStr.indexOf('+') != -1 || this.histStr.indexOf('-') != -1 || 
				this.histStr.indexOf('*') != -1 || this.histStr.indexOf('/') != -1){
				this.fnCalculate();
				this.histStr +=  '\n' + this.displayStr;
			}
			this.histStr += text; 	
			this.status = STATUS.SIGN;

		}
		this.histStr = numberWithCommas(this.histStr);
		this.displayStr = numberWithCommas(this.displayStr);
		this.firstNum = numberWithCommas(this.firstNum);
		this.secondNum = numberWithCommas(this.secondNum);
		break; 

	/* . 입력 시 - 완료 */
	case INPUT_TYPE.DOT : 
		/* '.'이 없는 경우에만 추가 */
		if (String(this.displayStr).indexOf(".") == -1){
			if (this.status === STATUS.FIRST){
				this.firstNum += text;
			} else if (this.status === STATUS.SECOND){
				this.secondNum += text;
			}
			this.displayStr += text;
			this.histStr += text;
			this.histStr = numberWithCommas(this.histStr);
			this.displayStr = numberWithCommas(this.displayStr);
			this.firstNum = numberWithCommas(this.firstNum);
			this.secondNum = numberWithCommas(this.secondNum);
			break; 
		} else {
			break;
		}
	}// end of switch(type)-case

	
	this.histView.value = this.histStr;
	this.displayView.value = this.displayStr;

}// end of fnClickBtn();



SHJCalculator.prototype.fnCreateCalc = function(){
	var tagString = this.fnGetCalcViewTag();
	this.container = document.createElement("div");
	this.container.innerHTML = tagString;
	document.body.appendChild(this.container);
	this.histView = this.container.querySelector(".hist");
	this.displayView = this.container.querySelector(".disp");
	/* 버튼List */
	var btnsList = this.container.querySelectorAll(".calcBtn");
	var thisRef = this;
	/* 버튼List에 이벤트 바인딩 */
	for (var i = 0; i < btnsList.length; i++) {
        btnsList[i].addEventListener("click", function(e){

        	/* 'R'버튼이라면 초기화함수 호출 */
			if ("RESET" === e.target.attributes['data-type'].value){
				thisRef.fnInitVariable();
			} 
			/* 버튼 클릭 함수 호출 */
			else {
	        	var params = {
	        		text : e.target.attributes['data-value'].value,
	        		type : e.target.attributes['data-type'].value
	        	}
	        	thisRef.fnClickBtn(params);

			} // end of if ("RESET" === e.target.attributes['data-type'].value)-else
        }); // end of addEventListener
    }// end of for(var i = 0; i < btnsList.length; i++)

    this.fnInitVariable();
    this.fnDecorateCalc();

};// end of fnCreateCalc();

SHJCalculator.prototype.fnGetCalcViewTag = function() {
	var temp = document.getElementById("calViewTag");	// 일반계산기 템플릿
	return temp.innerHTML;
} // end of fnGetCalcViewTag();

SHJCalculator.prototype.fnDecorateCalc = function() {

	var btnList = this.container.querySelectorAll(".calcBtn");
	for (var i = 0, len = btnList.length; i < len; i++) {
		btnList[i].style.backgroundColor = this.btnColor;
	}
	
} // end of fnDecorateCalc();

SHJCalculator.prototype.fnCalculate = function(){
	if (this.signal === ''){
		this.result = this.firstNum;
	} else {
		this.firstNum = Number(this.firstNum);
		this.secondNum = Number(this.secondNum);

		switch (this.signal){
		case '+' :
			this.result = this.firstNum + this.secondNum;
			break;
		case '-' :
			this.result = this.firstNum - this.secondNum; 
			break;
		case '*' :
			this.result = this.firstNum * this.secondNum;
			break;
		case '/' :
			this.result = this.firstNum / this.secondNum;
			break;
		}
		this.result = limitDeciamlPoint(numberWithCommas(this.result));
		this.firstNum = this.result;
		this.displayStr = this.result;
		this.histStr = this.histStr + '=' + this.result;//////////////////////////////////////////////////////////
		
		this.histView.scrollTop = this.histView.scrollHeight;

	}// end of if (signal === '')-else;
}// end of fnCalculate();


