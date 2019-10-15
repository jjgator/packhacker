$(document).ready(function() {

 	let bodyWeight = 0;
 	//let packedItems = localGet(packedItems) || {};
 	let packedItems = {};
 	let packWeight = 0;
 	let limit = 0;
 	const goodImgSrc = "backpack.jpg";
 	const okImgSrc = "packed_backpack.png";
 	const badImgSrc = "backpackbricks.png"

 	//console.log(localStorage.getItem('packedItems'));


 	const limitChecker = function(weight) {
 		if (weight > limit / 2 && weight < limit) {
			$('img').attr('src', okImgSrc);
			//console.log('packweight & limit: ', weight, limit);
		} else if (weight > limit) {
			$('img').attr('src', badImgSrc);
		} else {
			$('img').attr('src', goodImgSrc);
		}
 	};

 	// const localSet = function(name, item) {
 	//   localStorage.setItem(name, JSON.stringify(item));
 	// };

 	// const localGet = function(name) {
	 //  return JSON.parse(localStorage.getItem(name));
 	// };

 	$('.startpacking').hide();

	$('#bodyweight button').on('click', function(e) {
		e.preventDefault();
		bodyWeight = Number($('#bodyweightinput').val());
		limit = bodyWeight * 0.25;
		$('label#bodyweight').text('Body Weight: ' + bodyWeight + ' lbs').attr('id', 'weightentered');
		$('#bodyweight').hide();
		$('.startpacking').show();
	});

	$('#itemstoadd button').on('click', function(e) {
		e.preventDefault();

		let itemName = $('#itemname').val();
		let itemWeight = Number($('#itemweight').val());
		packWeight += itemWeight;
		packedItems[itemName] = itemWeight;
		
		$('ul.list-group').append($('<li type="text" class="list-group-item" data-weight="' + itemWeight + '" data-name="' + itemName + '">'+ itemName + '<span style="color: darkgrey"> | ' + itemWeight + ' lbs</span><span class="oi oi-x"></span></li>'));
		$('p#totalweight').text('Total Weight: ' + packWeight.toFixed(1) + ' lbs');

		limitChecker(packWeight);

		//update local storage
		//localSet('packedItems', packedItems);
	});


	$('.list-group').on('click', '.oi-x', function() {
		var thisItem = $(this).parent().data('name');

		packWeight -= Number($(this).parent().data('weight'));
		$('p#totalweight').text('Total Weight: ' + packWeight.toFixed(1) + ' lbs');
		for (var key in packedItems) {
			if (key === thisItem) {
				delete packedItems[thisItem];
			}
		}
		$(this).parent().remove();

		limitChecker(packWeight);

		//update local storage
		//localSet('packedItems', packedItems);
	});

});