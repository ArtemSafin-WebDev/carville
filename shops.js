document.addEventListener("DOMContentLoaded", function () {
  var viewToggle = document.querySelector(
    '.js-shops-view-toggle input[type="checkbox"]'
  );
  var shopsResults = document.querySelector(".shops__results");

  if (viewToggle && shopsResults) {
    viewToggle.addEventListener("change", function () {
      if (viewToggle.checked) {
        shopsResults.classList.remove("shops-full-view");
      } else {
        shopsResults.classList.add("shops-full-view");
      }
    });
  }

  if (window.matchMedia("(min-width: 1025px)").matches) {
    var shopsScrollContainers = Array.prototype.slice.call(
      document.querySelectorAll(".js-custom-scroll-container")
    );

    shopsScrollContainers.forEach(function (container) {
      new PerfectScrollbar(container, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20,
        suppressScrollX: true,
      });
    });
  }

  document.addEventListener("click", function (event) {
    if (
      event.target.closest(".js-shop-details-open") ||
      event.target.matches(".js-shop-details-open")
    ) {
      event.preventDefault();
      var link = event.target.closest(".js-shop-details-open");

      var hash = link.hash;
      if (!hash) return;
      var modal = document.querySelector(hash);

      if (modal) {
        modal.classList.add("open");
      }
    } else if (
      event.target.closest(".shops__modal-close-btn") ||
      event.target.matches(".shops__modal-close-btn")
    ) {
      var modalToClose = event.target.closest(".shops__modal");

      if (modalToClose) {
        modalToClose.classList.remove("open");
      }
    }
  });

  ymaps.ready(init);

  function init() {
    const maps = Array.from(document.querySelectorAll(".js-yandex-map"));

    maps.forEach((mapElement) => {
      console.log(mapElement);
      //   const coords = mapElement.getAttribute("data-coords").split(",");

      var myMap = new ymaps.Map(mapElement, {
        center: [59.933844, 30.317506],
        zoom: 14,
        controls: [],
      });

      var myPlacemark = new ymaps.Placemark(
        [59.933844, 30.317506],
        {},
        {
          preset: "islands#redCircleDotIcon",
        }
      );

      myMap.geoObjects.add(myPlacemark);

      myMap.behaviors.disable("scrollZoom");

      if (window.matchMedia("(max-width: 767px)").matches) {
        myMap.behaviors.disable("drag");
      }
    });
  }
});
