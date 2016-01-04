$(function() {

	var DELAY = 400, clicks = 0, timer = null;

	$(function(){

	    $("a").on("click", function(e){
	    	
	    	if(e.metaKey || e.ctrlKey) // Supress extension when ctrl + click or cmd + click
	    		return;

	    	if(e.target.tagName != 'A'){ // If the target is not <a>, start poking around the hierarchy to find the <a>
	    		e.target = $(e.target).closest('a')[0];
	    	} 
	    	
	    	if($(e.target).hasClass('newtab-extension-defaultBehavior')){ //if tag holds this class, allow to bypass handler
	    		$(e.target).removeClass('newtab-extension-defaultBehavior');
	    		return;
	    	}

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
	console.log("NewTab Chrome Extension loaded");

});

function doubleClick(e){

  	var aTag = createTag(e.target.href);
  	aTag.target = '_blank'; // to open in a new tab
  	aTag.click();

}

function singleClick(e){

	// add special class to bypass event handler
	$(e.target).addClass('newtab-extension-defaultBehavior');
	e.target.click();

}

// a new <a> so that jquery's click event handler doesn't interfere.
function createTag(link){

	var aTag = document.createElement('a');
	aTag.href = link;
	return aTag;

}
