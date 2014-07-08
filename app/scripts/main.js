jQuery(document).ready(function ($) {

//http://skinnyties.com/collection/popular

    //$(window).stellar();

    /*var links = $('.navigation').find('li');
    slide = $('.slide');
    //button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');
    sliderB = document.getElementById('swiper-bague');
    sliderP = document.getElementById('swiper-pendentif');


    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        if (direction === 'down') {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        }
        else {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }

    });
 
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"]').removeClass('active');
        }
    });

    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint');
    }



    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });
*/
    /*button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });*/
 /*
    window.mySwipeB = Swipe(sliderB, {
        speed:400,
        continuous:true,
        auto: 3000,
        callback : function(index, elem) {

        }
    });

    window.mySwipeP = Swipe(sliderP, {
        speed:400,
        continuous:false,
        callback : function(index, elem) {
            
        }
    });

    $('.swiper-controller').find('li').on('click', function(){
        var $this = $(this),
            $parent = $this.parent(),
            index = $this.data('to-slide');

        $parent.children().removeClass('active');
        $this.addClass('active');
        if ($parent.hasClass('bague')) {
            mySwipeB.slide(index, 300);
        } else {
            mySwipeP.slide(index, 300);
        }
    });
*/
    $("#produits").isotope({
      // options
        itemSelector: '.square',
        layoutMode:'masonry',
        masonry: {
            columnWidth:10
        },
        transitionDuration:"0.6s"
    });

    // store filter for each group
    var filters = {};

    $('.selection').on('click', '.button', function(e) {
        e.preventDefault();
        var $this = $(this);
        // get group key
        var $dropdownMenu = $this.parentsUntil('.dropdown-menu').parent();
        var filterGroup = $dropdownMenu.attr('data-filter-group');
        $dropdownMenu.parent().children('.dropdown-toggle').find('span').text($this.text().trim());
        // set filter for group
        filters[ filterGroup ] = $this.attr('data-filter');
        // combine filters
        var filterValue = '';
        for ( var prop in filters ) {
            filterValue += filters[ prop ];
            console.log(filterValue);
        }
        // set filter for Isotope
        $("#produits").isotope({
            itemSelector: '.square',
            layoutMode:'masonry',
            masonry: {
                columnWidth:10    
            },
            transitionDuration:"0.6s",
            filter: filterValue
        });
    });

    $('body').on('click', function(e) {
        if ($(e.target).hasClass('square') || $(e.target).parent().hasClass('square')) {
            return;
        } else {
            $("#produits").find('.square').removeClass('active');    
        }
        $(this).removeClass('square-open');
    });

    $('.toggle-button').on('click', function() {
        $('.block-layered-nav.toggle.filtering').toggleClass('toggle-active');
        return false;
    })

    $('.filter-content').find('a').on('click', function(e){
        e.preventDefault();
        $this = $(this);
        
        var filterGroup = $this.parents('.filter-content').attr('data-filter-group');
        // set filter for group
        filters[ filterGroup ] = $this.attr('data-filter');
        // combine filters
        var filterValue = '';

        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            filters[ filterGroup ] = '';
        } else {
            $this.addClass('selected');
            for ( var prop in filters ) {
                filterValue += filters[ prop ];
            }
        }
        
        // set filter for Isotope
        $("#produits").isotope({
            itemSelector: '.square',
            filter: filterValue
        });
    });

    $('.close').on('click', function(e){
        var idpopin = $(this).data('close-id');
        $('#'+idpopin).removeClass('md-show');
    })

    /*$('#produits').on('click', '.square', function(e) {
        $("#produits").find('.square').removeClass('active');*/
        
        
        //$('body').addClass('square-open');
        /*$(this).css({
            'width' : $('#produits').outerWidth(true)/2,
            'height' : $('#produits').outerWidth(true)/2,
            'top': 0,
            'left':0,
            'marginTop' : $('#produits').outerHeight(true)/4,
            'marginLeft' : $('#produits').outerWidth(true)/4
        });*/
        //$(this).addClass('active');

    //});
/*
    $('#typebijou-menu').on( 'click', 'a', function(e) {
        e.preventDefault();
      var filterValue = $(this).attr('data-filter');
      var text = $(this).text();
      $('#type-bijou').
      $("#produits").isotope({ filter: filterValue });
    });

    $('#materiau-menu').on( 'click', 'a', function(e) {
        e.preventDefault();
      var filterValue = $(this).attr('data-filter');
      $("#produits").isotope({ filter: filterValue });
    });

    $('#sexe-menu').on( 'click', 'a', function(e) {
        e.preventDefault();
      var filterValue = $(this).attr('data-filter');
      $("#produits").isotope({ filter: filterValue });
    });
*/

    // tabs
    $('.tabs').tabs();

    $('.dropdown-toggle').dropdown();
    $('.dropdown-toggle').on('click.openmenu', function(e){
        e.preventDefault();
        $("#produits").find('.square').removeClass('active');
    });


});