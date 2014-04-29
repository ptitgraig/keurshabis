(function ($, w, ns) {

    "use strict";

    if (w.RESPONSIVE_TABS) {
        return;
    }

    // General variables.
    var eready = "ready" + ns,
        eclick = "click" + ns,
        eshow = "show" + ns,
        eshown = "shown" + ns;

    // Private methods.
    var tab = function (activePosition, postion, callback) {

        var showEvent = $.Event(eshow),
            $element = this.$element,
            $childTabs = $element.children("ul").find("li"),
            $childPanes = $element.children(":not(ul)"),
            $nextTab = $childTabs.eq(postion),
            $currentPane = $childPanes.eq(activePosition),
            $nextPane = $childPanes.eq(postion);

        $element.trigger(showEvent);

        if (this.tabbing || showEvent.isDefaultPrevented()) {
            return;
        }

        this.tabbing = true;

        $childTabs.removeClass("tab-active");
        $nextTab.addClass("tab-active");

        // Do some class shuffling to allow the transition.
        $currentPane.addClass("fade-out fade-in");
        $nextPane.addClass("tab-pane-active fade-out");
        $childPanes.filter(".fade-in").removeClass("tab-pane-active fade-in");

        // Force redraw.
        $nextPane.redraw().addClass("fade-in");

        // Do the callback
        callback.call(this);

    };

    // Tabs class definition
    var Tabs = function (element) {

        this.$element = $(element);
        this.tabbing = null;
    };

    Tabs.prototype.show = function (position) {

        var $activeItem = this.$element.find(".tab-active"),
            $children = $activeItem.parent().children(),
            activePosition = $children.index($activeItem),
            self = this;

        if (position > ($children.length - 1) || position < 0) {

            return false;
        }

        if (activePosition === position) {
            return false;
        }

        // Call the function with the callback
        return tab.call(this, activePosition, position, function () {

            var complete = function () {

                self.tabbing = false;
                self.$element.trigger($.Event(eshown));
            };

            // Do our callback
            this.$element.onTransitionEnd(complete);
        });
    };

    // Plug-in definition 
    $.fn.tabs = function (options) {

        return this.each(function () {

            var $this = $(this),
                data = $this.data("r.tabs");

            if (!data) {
                // Check the data and reassign if not present.
                $this.data("r.tabs", (data = new Tabs(this)));
            }

            // Show the given number.
            if (typeof options === "number") {
                data.show(options);
            }

        });
    };

    // Set the public constructor.
    $.fn.tabs.Constructor = Tabs;

    // No conflict.
    var old = $.fn.tabs;
    $.fn.tabs.noConflict = function () {
        $.fn.tabs = old;
        return this;
    };

    // Data API
    $(document).on(eready, function () {
        $("[data-tabs]").tabs();
    });

    $(document).on(eclick, "[data-tabs] > ul > li > a", function (event) {

        event.preventDefault();

        var $this = $(this),
            $li = $this.parent(),
            $tabs = $this.parents("[data-tabs]:first"),
            index = $li.index();

        $tabs.tabs(index);
    });

    w.RESPONSIVE_TABS = true;

}(jQuery, window, ".r.tabs"));



$.fn.redraw = function () {
    /// <summary>Forces the browser to redraw by measuring the given target.</summary>
    /// <returns type="jQuery">The jQuery object for chaining.</returns>
    var redraw;
    return this.each(function () {
        redraw = this.offsetWidth;
    });
};

$.fn.onTransitionEnd = function (callback) {
    /// <summary>Performs the given callback at the end of a css transition.</summary>
    /// <param name="callback" type="Function">The function to call on transition end.</param>
    /// <returns type="jQuery">The jQuery object for chaining.</returns>
    var supportTransition = $.support.transition;
    
    return this.each(function () {

        if (!$.isFunction(callback)) {
            return;
        }

        var $this = $(this).redraw(),
            rtransition = /\d+(.\d+)/;

     supportTransition ? $this.one(supportTransition.end, callback)
                              .ensureTransitionEnd($this.css("transition-duration").match(rtransition)[0] * 1000)
                       : callback();
    });
};
