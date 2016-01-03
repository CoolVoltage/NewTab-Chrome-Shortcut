$(function() {
	var DELAY = 700, clicks = 0, timer = null;

	$(function(){

	    $("a").on("click", function(e){
	    	e.preventDefault();
	        clicks++;  //count clicks

	        if(clicks === 1) {

	            timer = setTimeout(function() {

	                singleClick(e);   
	                clicks = 0;             //after action performed, reset counter

	            }, DELAY);

	        } else {

	            clearTimeout(timer);    //prevent single-click action
	            doubleClick(e);
	            clicks = 0;             //after action performed, reset counter
	        }

	    })
	    .on("dblclick", function(e){
	        e.preventDefault();  //cancel system double-click event
	    });

	});
	console.log("Extension loaded");
});

function doubleClick(e){
  	var aTag = createTag(e.target.href);
  	aTag.target = '_blank'; // to open in a new tab
  	aTag.click();
}
function singleClick(e){
	var aTag = createTag(e.target.href);
	aTag.click();
}
// a new <a> so that jquery's click event handler doesn't interfere.
function createTag(link){
	var aTag = document.createElement('a');
	aTag.href = link;
	return aTag;
}
