var validateForm = function() {
	if (this.find('input[name="name"]').length > 0) {
		var name = this.find('input[name="name"]').val().replace(/\s+/g, ' ');
	}
	if (this.find('input[name="phone"]').length > 0) {
		var phone = this.find('input[name="phone"]').val().replace(/\s+/g, '');
	}
	if (this.find('input[name="email"]').length > 0) {
		var email = this.find('input[name="email"]').val().replace(/\s+/g, '');
	}
	if (this.find('[name="question"]').length > 0) {
		var question = this.find('[name="question"]').val().replace(/\s+/g, ' ');
	}

	var isError = false;
	if (name != undefined) {
		this.find('input[name="name"]').focus(function() {
			$(this).removeClass('error');
		});
		//if (!/^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)? [А-ЯЁ][а-яё]+( [А-ЯЁ][а-яё]+)?$/.test(name)) {
		if (name.length < 2) {
			this.find('input[name="name"]').addClass('error');
			isError = true;
		}
	}
	if (phone != undefined) {
		this.find('input[name="phone"]').focus(function() {
			$(this).removeClass('error');
		});
		if (phone.length != 16) {
			this.find('input[name="phone"]').addClass('error');
			isError = true;
		}
	}
	if (email != undefined) {
		function validateEmail(email) {
		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		}
		this.find('input[name="email"]').focus(function() {
			$(this).removeClass('error');
		});
		if (!validateEmail(email)) {
			this.find('input[name="email"]').addClass('error');
			isError = true;
		}
	}
	if (question != undefined) {
		this.find('[name="question"]').focus(function() {
			$(this).removeClass('error');
		});
		if (question.length < 5) {
			this.find('[name="question"]').addClass('error');
			isError = true;
		}
	}


	var response = {
		"error": isError
	}
	if (!isError) {
		response.data = {};
		if (name != undefined) {
			response.data.name = name;
		}
		if (phone != undefined) {
			response.data.phone = phone;
		}
		if (email != undefined) {
			response.data.email = email;
		}
		if (question != undefined) {
			response.data.question = question;
		}
	}
	return response;
};


function trackSidebarStick(menuStartWidth) {
	var scrollPos = $(document).scrollTop();
	var sidebar = $('.sidebar');
	sidebar.css({width: menuStartWidth});
	if (scrollPos < $('.stick-content').position().top) {
		sidebar.removeClass('sticky');
		sidebar.addClass('toTop');
	}
	else if (scrollPos > $('.stick-content').position().top + $('.stick-content').height() - sidebar.height() - 60) {
		sidebar.removeClass('sticky');
		sidebar.addClass('toBottom');
	}
	else {
		sidebar.removeClass('toTop').removeClass('toBottom');
		sidebar.addClass('sticky');
	}
}

function trackSidebarActive() {
	var scrollPos = $(document).scrollTop();
	$('.sidebar-menu ul li').each(function() {
		var currentLi = $(this);
		var refElement = $(currentLi.find(' > a').attr('href'));
		if (refElement.length > 0) {
			if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
				$('.sidebar-menu ul li').removeClass('active');
				currentLi.addClass('active');
			}
			else {
				currentLi.removeClass('active');
			}
		}
	});
}

function trackMobileUtp() {
	var scrollPos = $(document).scrollTop();
	var utpBlock = $('.mobile-utp');
	if ((scrollPos >= $('#about').offset().top && scrollPos <= $('#about').offset().top + $('#about').height()) || (scrollPos >= $('#speakers').offset().top && scrollPos <= $('#speakers').offset().top + $('#speakers').height()) || (scrollPos >= $('.five_block').offset().top && scrollPos <= $('.five_block').offset().top + $('.five_block').height())) {
		utpBlock.addClass('active');
		console.log('add active');
	}
	else {
		console.log('removeActive');
		utpBlock.removeClass('active');
	}
}


$(document).ready(function() {

	// плавный скролл по разделам
	$(function() {
		$('a[href^="#"]').on('click', function(e) {
		    e.preventDefault();
		    $(document).off("scroll");

		    var target = this.hash,
		        menu = target;
		    $target = $(target);
		    $('html, body').stop().animate({
		        'scrollTop': $target.offset().top+2
		    }, 500, 'swing');
		});
	});

	// маска для телефонных номеров
	$(function() {
		$('input[name="phone"]').mask('+7 (999) 999-99-99');
	});

	$(function() {
		var sidebarWidth = $('.sidebar').width();
		$('.sidebar').css('height', $('.sidebar').height() + 'px');
		trackSidebarStick(sidebarWidth);
		trackSidebarActive();
		trackMobileUtp();
		var utpClosed = false;
		$('.mobile-utp-close, .mobile-utp .btn').click(function() {
			utpClosed = true;
			$('.mobile-utp').removeClass('active');
		});
		$(window).scroll(function(event) {
			trackSidebarStick(sidebarWidth);
			trackSidebarActive();
			if (!utpClosed) {
				trackMobileUtp();
			}
		});
	});
	$(function() {
		$('.subjects-list-headers h3').click(function() {
			var index = $('.subjects-list-headers h3').index($(this));
			$('.subjects-list-headers h3').removeClass('active');
			$(this).addClass('active');
			$('.subjects-list-content .row').removeClass('active');
			$('.subjects-list-content .row').eq(index).addClass('active');
		})
	});

	$(function() {
		var modal = $('.speaker-modal');
		modal.open = function(ref) {
			if (modal.find(' #' + ref).length == 0) return;
			modal.find(' #' + ref).addClass('active');
			modal.fadeIn(300);
		};
		modal.close = function() {
			$('.speaker-modal').fadeOut(300);
			setTimeout(function() {
				$('.modal-speaker-single').removeClass('active');
			}, 300);
		}
		modal.next = function() {
			var current = 0;
			if ($('.modal-speaker-single.active').length != 0){
				current = $('.modal-speaker-single').index($('.modal-speaker-single.active'));
			}
			if (current == $('.modal-speaker-single').length - 1) {
				current = 0;
			}
			else current++;
			$('.modal-speaker-single').removeClass('active');
			$('.modal-speaker-single').eq(current).addClass('active');
		};
		modal.prev = function() {
			var current = 0;
			if ($('.modal-speaker-single.active').length != 0){
				current = $('.modal-speaker-single').index($('.modal-speaker-single.active'));
			}
			if (current == 0) {
				current = $('.modal-speaker-single').length - 1;
			}
			else current--;
			$('.modal-speaker-single').removeClass('active');
			$('.modal-speaker-single').eq(current).addClass('active');
		};

		$('.speakers-list .speaker-single').click(function() {
			modal.open($(this).attr('target-id'));
		});
		$('.modal-speaker-close').click(function() {
			modal.close();
		});
		modal.click(function(event) {
			if ($(event.target).is($('.speaker-modal-inner').parents())) {
				modal.close();
			}
		});
		modal.find('.arrow-left').click(function() {
			modal.prev();
		});
		modal.find('.arrow-right').click(function() {
			modal.next();
		});
	});


	$(function() {
		// модалка с результатом отправки сообщения
		var responseModal = $('.response-modal');
		if (responseModal.length == 0) return;
		responseModal.show = function(state) {
			if (state == 'success') {
				responseModal.find('response-modal-success').show();
			}
			else if (state == 'error') {
				responseModal.find('response-modal-error').show();
			}
			responseModal.fadeIn(200);
		};
		responseModal.hide = function() {
			responseModal.find('response-modal-success').hide();
			responseModal.find('response-modal-error').hide();
			responseModal.css('display', 'none');
		};
		responseModal.find('.request-modal-close').click(responseModal.hide);
		responseModal.click(function(event) {
			if ($(event.target).is($('.response-modal-content').parent())) {
				responseModal.hide();
			}
		});


		// стандартная модалка под все
		var requestModal = $('.request-modal');
		if (requestModal.length == 0) return;
		requestModal.show = function() {
			requestModal.fadeIn(200);
		};
		requestModal.hide = function() {
			requestModal.css('display', 'none');
		};
		$('.btn-modal').click(function(event) {
			event.preventDefault();
			requestModal.find('form [name="action"]').remove();
			if ($(this).attr('transfer-action') != undefined && $(this).attr('transfer-action') != '') {
				requestModal.find('form').append('<input type="hidden" name="action" value="' + $(this).attr('transfer-action') + '">')
			}
			requestModal.show();
		});
		requestModal.find('.request-modal-close').click(requestModal.hide);
		requestModal.click(function(event) {
			if ($(event.target).is($('.request-modal-content').parent())) {
				requestModal.hide();
			}
		});
		requestModal.validate = validateForm;
		requestModal.find('[type="submit"]').click(function(event) {
			event.preventDefault();
			if (!requestModal.validate().error) {
				console.log(requestModal.find('form').serialize());
				var form = requestModal.find('form');
				$.post('/send.php', form.serialize()).done(function(response) {
		            setTimeout(function(){
						if (response == 'success') {
							responseModal.show('success');
						}
						else responseModal.show('error');
					}, 300);
				}).fail(function() {
					setTimeout(function(){
						responseModal.show('error');
					}, 300);
				}).always(function() {
					form.find('input').not('[type="submit"]').val('');
					requestModal.hide();
				});
			}
		});
	});



	// форма с вопросом
	$(function() {
		var form = $('#questions-form');
		form.validate = validateForm;
		form.submit(function(event) {
			event.preventDefault();
			var submitBtn = form.find('[type="submit"]');
			var submitBtnOldText = submitBtn.text();
			if (!form.validate().error) {
				submitBtn.attr('disabled', true);
				submitBtn.text('...');
				$.post('/send.php', form.serialize()).done(function(response) {
					if (response == 'success') {
						submitBtn.text('Отправлено!').addClass('success');	
					}
					else submitBtn.text('Ошибка!').addClass('error');
				}).fail(function() {
					submitBtn.text('Ошибка!').addClass('error');
				}).always(function() {
					setTimeout(function() {
						submitBtn.attr('disabled', false);
						submitBtn.removeClass('error').removeClass('success').text(submitBtnOldText);
						form.find('[name="phone"]').val('+375');
						form.find('.form-control').not('[name="phone"]').val('').text('');
					}, 4000);
				});	
			}
		});
	});

	$(function() {
		var slideout = new Slideout({
			'panel': document.getElementById('panel'),
			'menu': document.getElementById('menu'),
			'padding': 256,
			'tolerance': 70,
			'side': 'right'
		});
		$('.navbar-toggle').click(function() {
			slideout.toggle();
		});
		$('.slideout-menu ul li a, .slideout-menu .btn').click(function() {
			setTimeout(function() {
				slideout.close();
			}, 600);
		})
	});
});