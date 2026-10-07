(function ($) {
  $(document).ready(function () {
    // AOS Animation

    setTimeout(() => {
      AOS.refresh();
    }, 500);

    function checkScroll() {
      if ($(window).width() < 768) {
        // Check if the screen width is under 768px
        $(window).scroll(function () {
          if ($(this).scrollTop() > 50) {
            $("body").addClass("scrolled");
          } else {
            $("body").removeClass("scrolled");
          }
        });
      } else {
        $("body").removeClass("scrolled"); // Remove class if resized above 768px
      }
    }

    checkScroll(); // Run on page load

    $(window).resize(function () {
      checkScroll(); // Recheck on window resize
    });

    // Slide
    $(".template-slide").flickity({
      cellAlign: "left",
      contain: true,
      groupCells: true,
      pageDots: false,
    });

    $(".slide-banners").flickity({
      cellAlign: "left",
      contain: true,
      groupCells: true,
      pageDots: true,
      prevNextButtons: false,
      autoPlay: 3000,
    });

    $(".logos-slide").flickity({
      cellAlign: "left",
      contain: false,
      groupCells: true,
      pageDots: false,
      wrapAround: true,
      prevNextButtons: false,
      autoPlay: 1500,
    });

    // Documentos âncoras
    let listaDocumentos = [];
    $(".doc[id]").each(function (index) {
      let id = $(this).attr("id");
      let title = $(this).children("h3").text();

      listaDocumentos.push({
        id: id,
        title: title,
      });
    });

    if ($(".ancoras-docs").length > 0) {
      listaDocumentos.forEach(function (item) {
        let col = `<a href="#${item.id}">${item.title}</a>`;
        $(".ancoras-docs .drop-select").append(col);
      });
    }

    // Accordions
    function accodion_reload() {
      var acc = document.getElementsByClassName("accordion");

      for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          var panel = this.nextElementSibling;
          this.classList.toggle("active");
          panel.classList.toggle("active");
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }

      // Check if URL contains a hash
      var hash = window.location.hash.substring(1); // Remove #
      // console.log(hash);
      if (hash) {
        var targetAccordion = document.getElementById(hash);
        if (
          targetAccordion &&
          targetAccordion.classList.contains("accordion")
        ) {
          targetAccordion.click(); // Simulate click to open it
        }
      }
    }

    // Run function
    accodion_reload();

    // Filters

    /*Tags*/
    $(".drop-filter-tag a").on("click", function (e) {
      e.preventDefault();

      let label = $(this).html();

      $(".dropbtn2 .label").html(label);

      let id = $(this).attr("filter-tag-id");
      let postType = $(this).attr("post-type");

      $.ajax({
        url: "/wp-admin/admin-ajax.php",
        data: { tagID: id, postType: postType, action: "myTagFilter" },
        type: "POST", // POST

        beforeSend: function (xhr) {
          // filter.find('button').text('Filtrar'); // changing the button label
        },
        success: function (data) {
          $(".filter-results").html(data); // insert data
          $(".filter-results").removeClass("d-none");
          accodion_reload();
        },
      });
    });


    // Números 

    let num;
    $(".numero").each(function () {
      num = $(this).text().replace(/[^\d]/g, ""); // Limpa qualquer caractere que não for número
      $(this).attr("aki", num);
      $(this).html("0");
    });

    $(".numeros").on("inview", function (event, visible) {
      if (visible == true) {
        const counters = document.querySelectorAll(".numero");
        const speed = 200;
        let index = 0;

        const cleanNumber = (str) => {
          return parseInt(str.replace(/[^\d]/g, ""), 10);
        };

        const formatNumberWithSpaces = (num) => {
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        };

        const animateCounter = (counter) => {
          const animate = () => {
            const value = +counter.getAttribute("aki");
            const data = cleanNumber(counter.innerText);

            const time = value / speed;
            if (data < value) {
              const newValue = Math.ceil(data + time);
              counter.innerText = formatNumberWithSpaces(newValue);
              setTimeout(animate, 1);
            } else {
              counter.innerText = formatNumberWithSpaces(value);
            }
          };

          animate();
        };

        const animateSequentially = () => {
          if (index < counters.length) {
            animateCounter(counters[index]);
            index++;
            setTimeout(animateSequentially, 1000);
          }
        };

        animateSequentially();
      }
    });
  });
})(jQuery);
