(function ($) {
    
        'use restrict';
    
        $(document).ready(function () {
            $('.rt-logo-item.rt-tooltip').hover(
                function () {
                    var $this = $(this);
                    var $title = $this.attr('data-title');
                    $tooltip = '<div class="rt-tooltip">' +
                        '<div class="rt-tooltip-content">' + $title + '</div>' +
                        '<div class="rt-tooltip-bottom"></div>' +
                        '</div>';
                    $('body').append($tooltip);
                    var $tooltip = $('body > .rt-tooltip');
                    var tHeight = $tooltip.outerHeight();
                    var tBottomHeight = $tooltip.find('.rt-tooltip-bottom').outerHeight();
                    var tWidth = $tooltip.outerWidth();
                    var tHolderWidth = $this.outerWidth();
                    var top = $this.offset().top - (tHeight + tBottomHeight);
                    var left = $this.offset().left;
                    $tooltip.css('top', top + 'px');
                    $tooltip.css('left', left + 'px');
                    $tooltip.css('opacity', 1);
                    $tooltip.show();
                    if (tWidth <= tHolderWidth) {
                        var itemLeft = (tHolderWidth - tWidth) / 2;
                        left = left + itemLeft;
                        $tooltip.css('left', left + 'px');
                    } else {
                        var itemLeft = (tWidth - tHolderWidth) / 2;
                        left = left - itemLeft;
                        if (left < 0) {
                            left = 0;
                        }
                        $tooltip.css('left', left + 'px');
                    }
                },
                function () {
                    $('body > .rt-tooltip').remove();
                }
            );
        });
        /* isotope */
        if ($(".isotop-container").length) {
            var $isotop = $('.rt-logo-item-container').imagesLoaded(function () {
                $isotop.isotope({
                    // options
                    itemSelector: '.isotope-item',
                    layoutMode: 'fitRows'
                });
            });
    
            $('.filter-button-group').on('click', 'button', function (e) {
                e.preventDefault();
                var filterValue = $(this).attr('data-filter');
                $isotop.isotope({filter: filterValue});
                $(this).parent().find('.selected').removeClass('selected');
                $(this).addClass('selected');
                return false;
            });
        }
    
        $(window).on("resize load", function () {
            heightResize();
        });
        $(".tss-wrapper").each(function () {
    
            var self = $(this),
                $carousel = $('.rt-tss-item-container.rt-carousel', self),
                str = self.attr("data-layout"),
                number = parseInt($carousel.attr("data-show"), 10);
            $carousel.imagesLoaded(function () {
    
                if ($carousel.length) {
    
                    var options = $carousel.data('slick');
                    console.log(options);
                    if (str === 'slider7' || str === 'slider8') {
                        var images = [];
                        $carousel.find('.tss-single-item').each(function () {
                            var imgItem;
                            if (str === 'slider7') {
                                imgItem = $(this).find('.profile-img-wrapper').remove();
                            }else{
                                imgItem = $(this).find('.tss-meta-info').remove();
                            }
                            images.push(imgItem);
                        });
                        var caroThumbs = $("<div class='tss-carousel-thumb' />");
                        $.map(images, function (img) {
                            caroThumbs.append(img);
                        });
                        if (str === 'slider7') {
                            $carousel.parent().prepend(caroThumbs);
                        } else {
                            $carousel.parent().append(caroThumbs);
                        }
                        caroThumbs.imagesLoaded(function () {
    
                            $carousel.slick({
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                arrows: true,
                                prevArrow: '<span class="rt-slick-nav rt-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
                                nextArrow: '<span class="rt-slick-nav rt-next"><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
                                asNavFor: caroThumbs
    
                            });
                            caroThumbs.slick({
                                slidesToShow: options.deskItems,
                                slidesToScroll: options.deskItemsScroll,
                                asNavFor: $carousel,
                                arrows: false,
                                dots: false,
                                /*  arrows: false,
                                 */
                                centerMode: true,
                                centerPadding: '0px',
                                focusOnSelect: true,
                                responsive: [
                                    {
                                        breakpoint: 768,
                                        settings: {
                                            slidesToShow: options.tabItems,
                                            slidesToScroll: options.tabItems,
                                            infinite: true,
                                            dots: true
                                        }
                                    },
                                    {
                                        breakpoint: 480,
                                        settings: {
                                            slidesToShow: options.mobileItems,
                                            slidesToScroll: options.mobileItems
                                        }
                                    }
                                ]
                            });
                        });
                        // caroThumbs
                    } else {
                        $carousel.slick({
                            prevArrow: '<span class="rt-slick-nav rt-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
                            nextArrow: '<span class="rt-slick-nav rt-next"><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
                            responsive: [
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: options.tabItems,
                                        slidesToScroll: options.tabItems,
                                        infinite: true,
                                        dots: true
                                    }
                                },
                                {
                                    breakpoint: 767,
                                    settings: {
                                        slidesToShow: options.mobileItems,
                                        slidesToScroll: options.mobileItems
                                    }
                                }
                            ]
                        });
                    }
                }
            });
        });
    
        function heightResize() {
            $(".tss-wrapper").each(function () {
    
                var maxH = 0;
                $(this).find(".tlp-equal-height").height("auto");
                $(this).find(".tlp-equal-height").each(function () {
                    var cH = $(this).actual('outerHeight');
                    if (cH > maxH) {
                        maxH = cH;
                    }
                    console.log(maxH);
    
                });
    
                $(this).find(".tlp-equal-height").css('height', maxH + "px");
    
            });
        }
    
        /*Start from here */
    
    })(jQuery);
    