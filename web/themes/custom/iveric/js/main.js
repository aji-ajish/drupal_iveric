/*!
 * Author: 21Grams, https://www.21GramsNY.com/
 * Copyright @ 2023 21Grams
 */

var aniGroup = "animate__bounceIn animate__bounceInDown animate__bounceInLeft animate__bounceInRight animate__bounceInUp animate__fadeIn animate__fadeInDown animate__fadeInDownBig animate__fadeInLeft animate__fadeInLeftBig animate__fadeInRight animate__fadeInRightBig animate__fadeInUp animate__fadeInUpBig animate__flip animate__flipInX animate__flipInY animate__lightSpeedIn animate__rotateIn animate__rotateInDownLeft animate__rotateInDownRight animate__rotateInUpLeft animate__rotateInUpRight animate__slideInUp animate__slideInDown animate__slideInLeft animate__slideInRight animate__zoomIn animate__zoomInDown animate__zoomInLeft animate__zoomInRight animate__zoomInUp animate__hinge animate__jackInTheBox animate__rollIn animate__bounceOut animate__bounceOutDown animate__bounceOutLeft animate__bounceOutRight animate__bounceOutUp animate__fadeOut animate__fadeOutDown animate__fadeOutDownBig animate__fadeOutLeft animate__fadeOutLeftBig animate__fadeOutRight animate__fadeOutRightBig animate__fadeOutUp animate__fadeOutUpBig animate__flipOutX animate__flipOutY animate__lightSpeedOut animate__rotateOut animate__rotateOutDownLeft animate__rotateOutDownRight animate__rotateOutUpLeft animate__rotateOutUpRight animate__slideOutUp animate__slideOutDown animate__slideOutLeft animate__slideOutRight animate__zoomOut animate__zoomOutDown animate__zoomOutLeft animate__zoomOutRight animate__zoomOutUp animate__rollOut animate__bounce animate__flash animate__pulse animate__rubberBand animate__shake animate__swing animate__tada animate__wobble animate__jello";

var animationend = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",
  animationstart = "webkitAnimationStart oAnimationStart MSAnimationStart animationstart",
  transitionend = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";

var _UTM_DATA = {
  utm_term: getParameterByName("utm_term", false) || "",
  SourceURL: getParameterByName("SourceURL", false) || "",
  Referrer: getParameterByName("Referrer", false) || "WEB",
  utm_medium: getParameterByName("utm_medium", false) || "",
  utm_source: getParameterByName("utm_source", false) || "",
  utm_content: getParameterByName("utm_content", false) || "",
  utm_campaign: getParameterByName("utm_campaign", false) || "",
  InferredSource: getParameterByName("InferredSource", false) || "WEB"
};

function getUtm() { return _UTM_DATA; }

var Routes;
(function (Routes) {
  Routes["aboutga"] = "popupAboutGA";
  Routes["howgacanappear"] = "popupHowGaCanAppear";
  Routes["howquicklyga"] = "popupHowQuicklyGa";
  Routes["converstion"] = "popupConversation";
  Routes["conversation"] = "popupConversation";
  Routes["hearfrom"] = "popupHearFrom";
  Routes["helpfulga"] = "popupHelpfulGa";
  Routes["getconnected"] = "popupGetConnected";
  Routes["termstoknow"] = "popupTermsToKnow";
  Routes["maintaineyesight"] = "popupMaintainEyesight";
})(Routes || (Routes = {}));

$(function () {
  "use strict";
  themeManager();
  page.init();
  page.refresh();

  if ((window.performance.navigation && window.performance.navigation.type === 1) ||
    window.performance
      .getEntriesByType('navigation')
      .map((nav) => nav.type)
      .includes('reload')
  ) {
    document.querySelector('html').scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  $('[data-rel="tooltip"]').tooltip();

  // Remove links that don't actually link to anything
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle]').on('click', function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      var ob = this, offset = 0;
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        document.querySelector('html').scrollTo({
          left: 0,
          behavior: 'smooth',
          top: target.offset().top - offset
        });

        // $('html, body').animate({
        //   scrollTop: target.offset().top
        // }, 1000, function () {
        //   // Callback after animation
        //   // Must change focus!
        //   var $target = $(target);
        //   $target.focus();
        //   if ($target.is(":focus")) {
        //     // Checking if the target was focused
        //     $('.sideMenu .active').removeClass('active');
        //     if ($(ob).closest('.sideMenu').length > 0) {
        //       $(ob).closest('li').addClass('active');
        //     }
        //     return false;
        //   } else {
        //     $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
        //     $target.focus(); // Set focus again
        //     $('.sideMenu .active').removeClass('active');
        //     if ($(ob).closest('.sideMenu').length > 0) {
        //       $(ob).closest('li').addClass('active');
        //     }
        //   };
        // });
      }
    }
  });

  $('[data-external-site="true"]').on('click', function (e) {
    e.preventDefault();
    var url = $(this).attr('href'),
      target = $(this).attr('target');
    console.log(target);
    popup.open('#popupLeaveSite', 100, 100, {
      units: '%',
      animateIn: "fadeIn",
      oClass: '_popUpOverlay',
      set: {
        datatype: 'json',
        data: [
          // {
          //   selector: '.heading',
          //   html: "heading"
          // },
          // {
          //   selector: '.content',
          //   html: "content"
          // },
          {
            selector: '.btnContinue',
            attr: {
              href: url,
              target: target ? target : null
            }
          }
        ]
      }
    });
  });

  $('.navTrigger').on('click', function () {
    var popupID = `#${$(this).attr('data-view')}`;

    if ($(this).closest('.popup').length > 0) {
      popup.close($(this).closest('.popup'));
    }
    openRoute(popupID);
  });

  $('.rippleCard').on('mouseover', function () {
    $(this).find('img[data-img-animator]').each(function (_i, img) {
      var src = img.src;
      $(img).attr({ src: `${src.split('?')[0]}?${getRandomStr(8)}_${getRandomInt(1000, 99999)}` });
    });
  });

  $('.popupPageViewer').on('click', function (e) {
    if (!($(e.target).closest('.page').length > 0)) {
      popup.close($(this).closest('.popup'));
    }
  });

  var fcValidityTimer = setTimeout(() => { });
  $('button[type="submit"]').off('click.form').on('click.form', function () {
    formControlValidator($(this).closest('form'));
  });

  $('input, select, textarea').off('input.fc blur.fc').on('input.fc blur.fc', function () {
    // console.log('...');
    clearTimeout(fcValidityTimer);
    fcValidityTimer = setTimeout(() => {
      // console.log('Checking form validity');
      formControlValidator(this);
    }, 500);
  });

  $('.SumoSelect select').on('sumo:closed', function (sumo) {
    // console.log(sumo);
    clearTimeout(fcValidityTimer);
    fcValidityTimer = setTimeout(() => {
      // console.log('Checking form validity');
      formControlValidator(sumo.currentTarget);
    }, 300);
  });

  $('input:not(:checkbox):not(:radio), textarea').off('blur.fc').on('blur.fc', function () {
    $(this).val($(this).val().trim()).trigger('input');
  });

  $('input, select, textarea').off('input.fc blur.fc').on('input.fc blur.fc', function () {
    // console.log('...');
    clearTimeout(fcValidityTimer);
    fcValidityTimer = setTimeout(() => {
      // console.log('Checking form validity');
      formControlValidator(this);
    }, 500);
  });

  deepLink({
    key: 'page',
    action: function (v) {
      // console.log(v, Routes[v.toLowerCase()]);
      openRoute(`#${Routes[v.toLowerCase()]}`);
    }
  });

  loadVideo('[data-video-inlineplayer="true"]');

  videoPlayEvents();

  // $('.scrollTop').on('click.scrolltop', function () {
  //   $('html, body').animate({
  //     scrollTop: 0
  //   }, 1000);
  // });

  // setTimeout(() => {
  //   noCaching();
  // }, 0);
});

$(window).on('resize', function () {
  "use strict";
  page.getRatio();
  page.refresh();
});

$(window).on('scroll', function () {
  "use strict";
});

var page = {
  width: $(window).width(),
  height: $(window).height(),
  init: function () {
    page.getRatio();
    new WOW().init();

    // imgAnimator({});
    initVideoPlayer();

    inkBarTabs({
      selector: '.capsuleTabs .nav-tabs'
    });
  },
  refresh: function () {
    "use strict";
    carousel.init();
    formControls.init();

    page.reInitLayout();
  },
  getRatio: function () {
    "use strict";
    this.width = $(window).width();
    this.height = $(window).height();
  },
  // reset: function () {
  //   var tab = getParameterByName('view');
  //   if (tab) {
  //     $('a[href="#' + tab + '"]').tab('show');
  //   }
  // },
  reInitLayout: function () {
    "use strict";
    page.getRatio();

    var
      hh = $('header.header').outerHeight(true),
      fh = $('footer.footer').outerHeight(true),
      sHh = $('header.header .subHeader').outerHeight(true);

    hh = hh || 0;
    fh = fh || 0;
    sHh = sHh || 0;

    $('html').css({
      '--app-header-height': `${hh}px`,
      '--app-subheader-height': `${sHh}px`
    });

    $('main').css('min-height', page.height - (hh + fh));
    // if (page.width < 768) {
    //   $('.sideBar').css('min-height', '');
    // }

    inkBarTabs({
      selector: '.capsuleTabs .nav-tabs'
    });

    setTimeout(() => {
      inkBarTabs({
        selector: '.capsuleTabs .nav-tabs'
      });
    }, 500);

    refreshVideoPlayer();
  },
  set: function (selector, config) {
    popup.setData(selector, config);
  },
  loader: function (op, selector) {
    op = (op === undefined) ? true : getBoolean(op);
    selector = !(isNull(selector)) ? $(selector).length ? selector : 'body' : 'body';
    if (op) {
      $(selector).addClass('onLoading');
    } else {
      $(selector).removeClass('onLoading');
    }
  }
};

function videoPlayEvents() {
  $('video').off('play.video').on('play.video', function (e) {
    // Pause all other videos when a video starts playing
    pauseVideos(e.target);

    if (e.target.paused) {
      $(this).closest('.videoPlayer').removeClass('playing').addClass('paused');
    } else {
      $(this).closest('.videoPlayer').addClass('playing').removeClass('paused');
    }
  });

  $('video').off('pause.video').on('pause.video', function (e) {
    if (e.target.paused) {
      $(this).closest('.videoPlayer').removeClass('playing').addClass('paused');
    } else {
      $(this).closest('.videoPlayer').addClass('playing').removeClass('paused');
    }
  });
}

function openVideoPlayer(url, autoplay) {
  autoplay = autoplay ? getBoolean(autoplay) : true;
  var dim = getVideoDimensions(),
    param = url.includes('?') ? '&' : '?';
  popup.open('#popupVideo', dim.width, dim.height, {
    units: 'px',
    oClass: 'videoOverlay',
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    xsource: url + (autoplay ? param + 'autoplay=1' : ''),
    set: {
      datatype: 'json',
      data: [
        {
          selector: 'iframe',
          attr: {
            webkitallowfullscreen: true,
            mozallowfullscreen: true,
            allowfullscreen: true,
            allow: "fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          }
        }
      ]
    }
  });
}

function getVideoDimensions() {
  var dim = {
    width: $(window).width() >= 1920 ? 1920 : $(window).width(),
    height: $(window).height() >= 1080 ? 1080 : $(window).height()
  };

  dim.height = dim.width / CONFIG.videoRatio;
  return dim;
}

function refreshVideoPlayer() {
  var dim = getVideoDimensions();
  // console.log(dim);
  if ($('#popupVideo').is('.open')) {
    popup.reset('#popupVideo', {
      width: dim.width,
      height: dim.height
    });
  }
}

function initVideoPlayer() {
  $('[data-videoplayer]').off('click.video').on('click.video', function () {
    openVideoPlayer($(this).attr('data-videoplayer'));
  });
}

// Function to pause all other videos
function pauseVideos(currentVideo) {
  // console.log('pause');
  $('video').each(function (_i, video) {
    // console.log(video);
    if (video !== currentVideo && !video.paused) {
      video.pause();
    }
  });
}

function openRoute(popupID) {
  // console.log(popupID);
  if ($(popupID).length <= 0) { return; }
  popup.open(popupID, 100, 100, {
    units: '%',
    scroll: false,
    dismiss: true,
    animateIn: 'fadeIn',
    events: {
      opening: function (e) {
        // if ($(e.target).is('#popupGetConnected')) {
        //   hbspt.forms.create({
        //     region: "na1",
        //     portalId: "23875904",
        //     formId: "c08fde5c-a1e4-4774-ae76-16c463aaa03d"
        //   });
        // }
        if ($(e.target).is('.hasVideo')) {
          loadVideo($(e.target).find('.videoPlayer'));
        }
      },
      opened: function (e) {
        $(e.target).find('.popContent')[0].scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto'
        });
        inkBarTabs({
          selector: '.capsuleTabs .nav-tabs'
        });

        $(e.target).find('.nav-tabs').each(function (_i, el) {
          $($(el).find('[data-bs-toggle="tab"]')[0]).tab('show');
        });

      }
    }
  });
}

function loadVideo(videoElement) {
  $(videoElement).each(function (_i, el) {
    $(el).html(TEMPLATE.video($(el).data()));
    $(el).find('video')[0].load();
    videoPlayEvents();
  });
}

function formControlValidator(ob) {
  // console.log(ob);
  if ($(ob)[0].localName === 'form') {
    $(ob).find('.form-group').removeClass('valid notValid');
    if ($(ob).find(':valid').length > 0) {
      $(ob).find(':valid').each(function (_i, el) {
        $(el).closest('.form-group').addClass('valid').removeClass('notValid');
      });
    }
    if ($(ob).find(':invalid').length > 0) {
      $(ob).find(':invalid').each(function (_i, el) {
        $(el).closest('.form-group').addClass('notValid').removeClass('valid');
      });
    }

  } else if ($(ob).is(':input')) {
    $(ob).closest('.form-group').removeClass('valid notValid');
    if ($(ob).is(':valid')) {
      if ($(ob).is('.search-txt')) {
        if ($(ob).closest('.SumoSelect').find('.SumoUnder').is(':invalid')) {
          $(ob).closest('.form-group').addClass('notValid').removeClass('valid');
          return;
        }
      }
      $(ob).closest('.form-group').addClass('valid').removeClass('notValid');
    }

    if ($(ob).is(':invalid')) {
      $(ob).closest('.form-group').removeClass('valid').addClass('notValid');
    } else if ($(ob).is('.search-txt')) {
      if ($(ob).closest('.SumoSelect').find('.SumoUnder').is(':invalid')) {
        $(ob).closest('.form-group').removeClass('valid').addClass('notValid');
      }
    }
  } else {
    if (CONFIG.dev) {
      console.log('Not a form control');
    }
    return;
  }
}

function getAPI(key, type) {
  type = type || 'get';
  type = type.toLowerCase();

  return CONFIG.apiUrl + key + (type === 'get' ? '?GK=' + CONFIG.accessKey : '');
}

function inkBarTabs(params) {
  params = Object.assign({
    selector: '.nav-tabs'
  }, params);

  $(params.selector).each(function (_i, navTabs) {
    var hasInkBar = $(navTabs).find('.inkBar').length > 0;
    var css = {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    };

    $(navTabs).find('[data-bs-toggle="tab"]').off('shown.bs.tab.morph').on('shown.bs.tab.morph', function (_e) {
      // console.log(e);
      inkBarTabs({
        selector: params.selector
      });
    });

    $(navTabs).find('[data-bs-toggle="tab"]').each(function (_i, tab) {
      // console.log($(tab).outerHeight());
      css.height = Math.max(css.height, $(tab).outerHeight());
      css.width = $(tab).is('.active') ? $(tab).outerWidth() : css.width;
      css.top = $(tab).is('.active') ? (
        $(tab).closest('li').position().top
        + parseFloat($(tab).closest('li').css('marginTop'))
        + parseFloat($(tab).closest('li').css('paddingTop'))
      ) : css.top;
      css.left = $(tab).is('.active') ? (
        $(tab).closest('li').position().left
        + parseFloat($(tab).closest('li').css('marginLeft'))
        + parseFloat($(tab).closest('li').css('paddingLeft'))
      ) : css.left;
    });
    // console.log(css);
    $(navTabs).css(Object.assign({
      '--app-capsule-tab-height': css.height
    }));

    // console.log(hasInkBar);
    if (!hasInkBar) {
      $(navTabs).append('<span class="inkBar" />');
    }

    $(navTabs).find('.inkBar').css(css).addClass('_');
  });
}

function imgAnimator(params) {
  params = Object.assign({
    selector: 'img[data-img-animator]'
  }, params);
  // console.log(params);
  if (typeof Waypoint === "function") {
    $(params.selector).each(function (_i, img) {
      var src = img.src;
      $(img).data('src', src);
      var waypoint = new Waypoint({
        element: img,
        offset: '75%',
        handler: function (_direction) {
          // console.log('Scrolled to waypoint!');
          $(img).attr({ src: `${src.split('?')[0]}?${getRandomStr(8)}_${getRandomInt(1000, 99999)}` });
        }
      });
    });

  }
}

$(document).ajaxStart(function () {
  page.loader(true);
});

$(document).ajaxStop(function () {
  page.loader(false);
});