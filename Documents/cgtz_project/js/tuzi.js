function TuZi()
{
	this.$img=$(".gif")[0];
	this.$img.style.position="absolute";
	this.currentStep=0;
	this.targetStep=0;
	this.startPosition=[190,493];
	this.shifts=[[0,0],[23,130],[145,148],[260,148],[375,148],[500,170],[500,315],[375,330],[247,357],[247,500],[376,518],[500,540],[500,680],[376,701],[260,701]];
	this.maxStep=this.shifts.length;
	this.StepFinishCallback=null;
}

TuZi.prototype.StepTo=function(index)
{
	var tempObj = this;

	if(index<=1)
		index=1;
	if(index>=this.maxStep)
		index=this.maxStep;
	this.targetStep = index;
	if(this.currentStep==this.targetStep)
		return;

	if(this.currentStep<this.targetStep)
		this.StepNext();
	else
		this.StepPrev();
}

TuZi.prototype.StepNext=function()
{
	var tempObj = this;

	this.currentStep++;
	this.JumpTo(this.currentStep);
	window.setTimeout(function() {
		if(tempObj.currentStep<tempObj.targetStep)
			tempObj.StepNext();
		else
		//require next step
		if(tempObj.StepFinishCallback != null)
			tempObj.StepFinishCallback();
	}, 1000);
}

TuZi.prototype.StepPrev=function()
{
	var tempObj = this;

	this.currentStep--;
	this.JumpTo(this.currentStep);
	window.setTimeout(function() {
		if(tempObj.currentStep>tempObj.targetStep)
			tempObj.StepPrev();
		else
		//require next step
		if(tempObj.StepFinishCallback != null)
			tempObj.StepFinishCallback();
	}, 1000);
}

TuZi.prototype.JumpTo=function(step)
{
	this.$img.style.left = this.startPosition[0] + this.shifts[step-1][0] + "px";
	this.$img.style.top = this.startPosition[1] + this.shifts[step-1][1] + "px";
}