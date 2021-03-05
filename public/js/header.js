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
  const $carouselInner = $(".carousel-inner");
  const $carouselIndicators = $(".carousel-indicators");

  //Pulling product data for featured carrousel
  $.get("/api/products").then(data => {
    if (data.length !== 0) {
      for (let i = 0; i <= 4; i++) {
        if (i === 0) {
          const $carouselLI = `<li data-target="#carouselExampleCaptions" style="background-color: black" data-slide-to=${i} class="active"></li>`;
          $carouselIndicators.append($carouselLI);
          const $carouselContent = `<div class="carousel-item active" >
        <img src=${data[i].image} class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block text-dark">
          <h5>${data[i].name}</h5>
          <span>$${data[i].msrp}</span>
          <a href="/display?id=${data[i].id} class="btn btn-primary">View Details</a>
        </div>
      </div>`;
          $carouselInner.append($carouselContent);
        } else {
          const $carouselLI = `<li data-target="#carouselExampleCaptions" style="background-color: black" data-slide-to=${i}</li>`;
          $carouselIndicators.append($carouselLI);
          const $carouselContent = `<div class="carousel-item ">
        <img src=${data[i].image} class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block text-dark">
          <h5>${data[i].name}</h5>
          <span>$${data[i].msrp}</span>
          <a href="/display?id=${data[i].id} class="btn btn-primary">View Details</a>
        </div>
      </div>`;
          $carouselInner.append($carouselContent);
        }
      }
    }
  });
});
