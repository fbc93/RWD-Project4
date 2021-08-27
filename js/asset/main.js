$(function () {



  // 스크롤시, 네비게이션 -> 배경, 글색 변화
  $(window).scroll(function () {

    //스크롤 탑값 변수선언
    var scrollPos = $(window).scrollTop();

    //스크롤 탑값이 20초과하면...-> fixed클래스
    if (scrollPos > 20) {
      $('#navi').addClass('fixed');
    } else {
      $('#navi').removeClass('fixed');
    }
  });





  //네비게이션 클릭-> 해당 컨텐츠로 이동
  var menuItem = $('#gnb a, #navi h1 a');

  // 스크롤 이동하기위해 만든 : scrollToDiv
  function scrollToDiv(element, navHeight) {

    //변수선언: 오프셋값, 오프셋탑 값, 총 스크롤한 값( 탑값 - 네비높이값)
    var offset = element.offset();
    var offsetTop = offset.top
    var totalScroll = offsetTop - navHeight;

    //animate({}) : 메서드를 이용하여 스크롤탑값 : 최종값 , 속도
    $('html, body').animate({
      scrollTop: totalScroll
    }, 800);
  }

  //클릭시, 해당 영역으로 href를 이용하여 이동
  menuItem.click(function (e) {

    //변수선언: 대상의 href값, 한번더 캐싱 => 최종 $(el)
    var el = $(this).attr('href');
    var elWrapped = $(el);

    //위에서 만든 함수 사용
    scrollToDiv(elWrapped, 63);

    //클릭시 a링크 속성 해제하여 번쩍거림 방지
    e.preventDefault();
  });




  //Bootstrap JS : 스크롤 스파이
  $('body').scrollspy({
    target: '#navi',
    offset: 64
  })





  //PLUG-IN : Jarallax JS
  $('.jarallax').jarallax({
    speed: 0.2,
    videoPlayOnlyVisible: false,
    videoLazyLoading: false
  });



  //PLUG-IN : ScrollMagic JS

  //1. 컨트롤러 생성 (한번만)
  var controller = new ScrollMagic.Controller();

  //2. 사용할 변수선언 
  var c1 = $('.circle1');
  var c2 = $('.circle2');
  var tl = new TimelineMax(); //타임라인

  //3. 타임라인 동안 동작할 애니메이션 => GSAP
  tl.from(c1, 1, {
      y: 30,
      opacity: 0
    })
    .from(c2, 1, {
      y: 30,
      opacity: 0
    });


  //4. 장면설정 => ScrollMagic
  var scene = new ScrollMagic.Scene({

      //장면을 시작할(=trigger) 위치
      triggerElement: '#analysis',
      triggerHook: 0.5


    }).setTween(tl) //메서드 .setTween( 타임라인 모션 ) => 앞에서 설정한 모션 붙이기
    .addTo(controller) //이것을 컨트롤러에 넣는다
    .on('start end', function () {
      //EX) circle-animation-start(메서드원본)-> start 부분 제이쿼리 이벤트로 인식
      //EX) circle-animation-end(메서드원본)-> end 부분 제이쿼리 이벤트로 인식



      //PLUG-IN : CIRCLE-PROGRESS JS-1번
      c1.circleProgress({
        value: 0.85,
        size: 126,
        fill: {
          gradient: ["#27e685", "#ecb82a"]
        },
        animation: {
          duration: 2000
        }
      }).on('circle-animation-progress', function (event, progress) {
        //circle-animation-progress(메서드원본)-> progress 부분 제이쿼리 이벤트로 인식

        $(this).find('strong').html(Math.round(85 * progress) + '<i>%</i>');
      });



      //PLUG-IN : CIRCLE-PROGRESS JS-2번
      c2.circleProgress({
        value: 0.75,
        size: 126,
        fill: {
          gradient: ["#27e685", "#ecb82a"]
        },
        animation: {
          duration: 4000
        }
      }).on('circle-animation-progress', function (event, progress) {
        //circle-animation-progress(메서드원본)-> progress 부분 제이쿼리 이벤트로 인식

        $(this).find('strong').html(Math.round(75 * progress) + '<i>%</i>');
      });


    }); //스크롤매직 끝


  // Swipper JS
  const swiper = new Swiper('.swiper-wrap .swiper-container', {

    // Optional parameters   
    // Default parameters
    slidesPerView: 5,
    spaceBetween: 10,

    // direction: 'vertical', 'horizontal'
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    // Auto Play
    autoplay: {
      delay: 3000,
    },

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      // when window width is >= 577px
      577: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 960px
      960: {
        slidesPerView: 5,
        spaceBetween: 20
      },
    }
  });


  //Magnific Popup JS
  var gallery = $('#work .col-md-6>div');

  gallery.magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {
      enabled: true
    }
  });


  //메뉴에서 마우스 나오면 메뉴 접히기
  var mobileMenu = $('#navi #gnb');

  mobileMenu.mouseleave(function () {

    $(this).animate({
      'height': 0
    }, 800, function () {
      $(this).removeClass('in');
    });

  });


}); //제이쿼리 끝