$(document).ready(function(){
	/* Вопрос-ответ */
	$('.js-tab-trigger').on('click', function() {   
    var id = $(this).attr('data-tab'),
    content = $('.js-tab-content[data-tab="'+ id +'"]');

    $(this).toggleClass('active'); 
    content.toggleClass('active');
 	});

	/* Калькулятор */
  $('.js-next-step').click(function() {
		var n = $(this).attr('data-step'),
		next = Number(n) + 1,
	   	content = $('.js-step[data-step="'+ next +'"]');

        if(next===4){
            var key = 0;
            $("#calculate").serializeArray().forEach(function(item, index){if([1,7,9,10].indexOf(index) == -1 && item['value']!=''){key++;}});
            if(key==0) {Swal.fire( 'Ошибка!', 'Форма не заполнена!', 'error'); return false;}
            else $.post("/send-message", $("#calculate").serialize(), function(data) {});
        }

	   $('.js-step.active').removeClass('active');
	   content.addClass('active');
	});

    $('input[name="phone"]').bind("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });

  $('.js-back').click(function() {
		var n = $(this).attr('data-step'),
		prev = Number(n) - 1,
	   content = $('.js-step[data-step="'+ prev +'"]');
	   if (n > 0) {
	   	$('.js-step.active').removeClass('active');
	   	content.addClass('active');
	   }
	});

    $('#send-comment').click(function() {
        var key = 0;
        $("#comment").serializeArray().forEach(function(item){if(item['value']!=''){key++;}});
        if(key==0) {Swal.fire( 'Ошибка!', 'Форма не заполнена!', 'error');}
        else{$.post("/send-comment", $("#comment").serialize(), function(){Swal.fire( 'Успешно!', 'Сообщение отправлено!', 'success');});}
    });


	/* Калькулятор Range https://refreshless.com/nouislider/slider-read-write/ */ 
 //var minPrice = 500000; 
 //var maxPrice = 10000000; 
 var minPrice = 1000000; 
 var maxPrice = 100000000; 
 var minPrice2 = 500000; 
 var maxPrice2 = 10000000; 
 var startPriceOne = maxPrice / 4; 
 var startPriceTwo = maxPrice / 3; 
 
 
 var rangeDebt = document.getElementById('slider-debt'); 
 noUiSlider.create(rangeDebt, { 
     start: [startPriceOne], 
     tooltips: [true], 
     connect: 'lower', 
     range: { 
         'min': [minPrice], 
         'max': [maxPrice] 
     }, 
     format: wNumb({ 
         decimals: 0, // default is 2 
         thousand: ' ', // thousand delimiter 
         postfix: ' ₽', // gets appended after the number 
     }), 
     pips: { 
         mode: 'values', 
         values: [minPrice, maxPrice], 
         density: maxPrice, 
         format: wNumb({ 
             decimals: 0, // default is 2 
          thousand: ' ', // thousand delimiter 
          postfix: ' ₽', // gets appended after the number 
         }) 
     } 
 });

rangeDebt.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    $('#debt').val(values[0]);
});
 
 var rangeDebtThree = document.getElementById('slider-debt-three'); 
 noUiSlider.create(rangeDebtThree, { 
     start: [startPriceTwo], 
     tooltips: [true], 
     connect: 'lower', 
     range: { 
         'min': [minPrice2], 
         'max': [maxPrice2] 
     }, 
      format: wNumb({ 
         decimals: 0, // default is 2 
         thousand: ' ', // thousand delimiter 
         postfix: ' ₽', // gets appended after the number 
     }), 
     pips: { 
         mode: 'values', 
         values: [minPrice2, maxPrice2], 
         density: maxPrice, 
         format: wNumb({ 
             decimals: 0, // default is 2 
          thousand: ' ', // thousand delimiter 
          postfix: ' ₽', // gets appended after the number 
         }) 
     } 
 });
rangeDebtThree.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    $('#debt3').val(values[0]);
});


 	/* Слайдер отзывы */
    var swiper = new Swiper(".js-swiper-rew", {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
	   nextEl: '.swiper-rew-next',
	   prevEl: '.swiper-rew-prev',
	 },
	  breakpoints: {
	    768: {
	      slidesPerView: 2,
	      spaceBetween: 40
	    }
	  },
    });

    
  /*Анимированный скролл до якоря*/
	


	$('.offcanvas-body [href]').click(function() {
		$('.offcanvas').removeClass('show');
		$('.offcanvas-backdrop').removeClass('offcanvas-backdrop show');
		$('.offcanvas-backdrop').removeClass('fade');
		
		$('body').attr('style', '');
	 });

});