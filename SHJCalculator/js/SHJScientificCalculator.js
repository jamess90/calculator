function SHJScientificCalculator(param){
	this.btnColor = param.btnColor;
	this.fnGetCalcViewTag = function() {
		var temp = document.getElementById("scientificCalViewTag");	// 일반계산기 템플릿
		return temp.innerHTML;
	}
} // end of SHJScientificCalculator();

/* 일반용 계산기 상속 */
SHJScientificCalculator.prototype = SHJCalculator.prototype;
