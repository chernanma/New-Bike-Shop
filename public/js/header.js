let openedSideBarNavList = [];

// show side bar, increases width to 150
$("#mobile-menu-button").on("click", () => {
  const $navbar = $(".side-bar-nav");
  $navbar.offset({ left: 0 });
  openedSideBarNavList.unshift($navbar);
});

// hide side bar, decreases width to 0
$(".close-side-bar").on("click", () => {
  openedSideBarNavList.forEach(nav => {
    console.log(nav);
    nav.offset({ left: -150 });
  });
  openedSideBarNavList = [];
});

// open sub menue for shop link
$(".side-bar-expandable").on("click", e => {
  const expandableId = $(e.target).data("expand");
  const $expandableId = $(expandableId);
  $expandableId.offset({ left: 0 });
  openedSideBarNavList.unshift($expandableId);
});

// closed the current link
$(".nav-back-link").on("click", () => {
  const e = openedSideBarNavList.shift();
  e.offset({ left: -150 });
});

// slider - slick
$(document).ready(() => {
  $(".autoplay").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});
