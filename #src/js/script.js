// JS-функция определения поддержки WebP

function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
    });

// SLICK-CAROUSEL

$(document).ready(function(){
    $('.carousel__inner').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/arrow-left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/arrow_right.svg"></button>',
        responsive: [
          {
            breakpoint: 1000,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: '40px',
              slidesToShow: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
      });

    // TABS

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass
          ('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e) {
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          });
        });
      }

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');


      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
      });
      $('.button_catalog').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__subtitle').text($('.catalog-item__title').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        });
      });

      // VALIDATION FORMS

      function valideForms(form) {
        $(form).validate({
          rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
        messages: {
          name: {
            required: "Введите пожалуйста имя",
            minlength: jQuery.validator.format("Введите {0} символа!")
          },
             phone: "Пожалуйста, введите номер телефона",
             email: {
                   required: "Пожалуйста, введите свою почту",
                   email: "Неправильно ввели свою почту"
          }
        }
        });
      };

      valideForms('#consultation-form');
      valideForms('#consultation form');
      valideForms('#order form');

      // MASK NUBER PHONE

      $('input[name=phone]').mask("+38(999) 999-9999");

      // MAILER

      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val(" ");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');
          $('form').trigger('reset');
        });
        return false;
      });

      // SMOOTH SCROLL

      $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
      });
      $("a[href^='#']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
});

    // connect the library WOW

    new WOW().init();

  });


  

  
  