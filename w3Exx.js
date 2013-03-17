function removeW3Schools(){
	$('li.g').each(function(idx,item){
		if($(item).find('cite').html().indexOf('w3schools.com/') !== -1){

			$(item).remove();

		}
	});
}

setTimeout(removeW3Schools,500);

$('[name="btnG"]').click(function(){setTimeout(removeW3Schools,500);});
$('[name="q"]').focusout(function(){
	setTimeout(removeW3Schools,500);
});