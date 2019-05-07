jQuery(function ($) {

    'use strict';

    // --------------------------------------------------------------------
    // PreLoader
    // --------------------------------------------------------------------

    (function () {
        $('#preloader').delay(200).fadeOut('slow');
    }());

    $('a[class=portfolio-item]').click(function (ev) {
        ev.preventDefault();
        var items = [{
                name: 'Bonnie C Goldberg Inc',
                desc: 'Bonnie has been an active appraiser in Miami-Dade. Broward, and Palm Beach counties since 1986. She is also a real estate broker with years of experience in assisting both buyers and sellers get the best deal in South Florida. I helped through development process to create the website as you see online today.',
                img: 'img/portfolio-1.jpg',
                url: 'http://appraiserbon.com'
            },
            {
                name: 'The heart of Southern Italy',
                desc: 'The heart of Southern Italy is an authentic local guide tours based on Lecce in Southern Italy. I helped to handle the front-end and update the site content.',
                img: 'img/portfolio-2.jpg',
                url: 'https://www.theheartofsouthernitaly.com'
            },
            {
                name: 'Laura M. Menchero',
                desc: 'Laura M.Menchero is an Immigration and Nationality Law. The Law Office of Laura M. Menchero has successfully represented its business and individual and family clients on a full range of immigration law matters, reflecting its commitment to providing high-quality representation to each client as a core firm value. During this project, I helped through the development process to rebuild from the old to the new WordPress site.',
                img: 'img/portfolio-3.jpg',
                url: 'https://mencherolaw.com'
            },
            {
                name: 'DRB Capital',
                desc: 'DRB Capital is one of the most trusted annuity buyers in America; we purchase structured settlement and annuity payments. DRB Capital uses its decades of experience to provide satisfaction to those who have structured settlements, annuities, investment annuities, and life-contingent structured settlements, when waiting is not an option. I helped to modify the layout of the theme and adapt it to the latest layout design (from PSD).',
                img: 'img/portfolio-4.jpg',
                url: 'https://www.drbcapital.com'
            },
        ];

        var i = $(this).find('.portfolio-info h3').text();

        var filteredNames = $(items).filter(function (idx) {
            return items[idx].name === i;
        });

        $(filteredNames).each(function () {
            var html = `<div class="row">
                        <div class="col-md-12" style="margin-bottom: 1em;">
                            <img class="img-responsive" src="` + this.img + `" />
                        </div>
                        <div class="col-md-12">
                            <p>` + this.desc + `</p>
                            <p>url: <a href="` + this.url + `" target="_blank" class="link-site">` + this.url.replace(/(^\w+:|^)\/\//, ''); + `</a></p>
                        </div>
                    </div>`;
            $('.modal-title').html('<span>' + this.name + '</span>');
            $('#myModal .modal-body').html(html);
            $('#myModal').modal('show');

        });

    });



}); // JQuery end