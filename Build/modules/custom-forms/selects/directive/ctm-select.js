app.directive('customSelect', function($compile){
    var options = {
        hidden            : 'custom-form-hidden',
        custom_select     : 'select-area',
        custom_select_btn : 'select-opener',
        custom_select_drop: 'ctm-drop'
    }
    var drop = '<div class="' + options.custom_select_drop + ' ' + options.hidden + '"  perfect-scrollbar class="scroller" wheel-propagation="true" wheel-speed="50" refresh-on-change="ngModel">' +
                    '<div class="drop-holder">' +
                        '<ul class="">' +
                            '<li ng-repeat="item in items track by $index">' +
                                '<a data-id="{{$index}}" ng-click="openSelect($index)">{{item.name}}</a>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>';

    function SelectConstructor(){};

    SelectConstructor.prototype = {
        init: function(scope, element, $attr, $scope, $element, dropDown, active){
            this.scope       = scope;

            this.$element    = $(element);
            this.$drop       = $(dropDown);
            this.body        = $('body');

            this.$ctm_select = this.$element.find('.' + options.custom_select);
            this.$select     = this.$element.find('select');
            this.$options    = this.$element.find('option');
            this.$button     = this.$element.find('.' + options.custom_select_btn);
            this.$dropLink   = this.$drop.find('a');
            this.$dropItem   = this.$dropLink.parent();
            this.allDrops    = $('.' + options.custom_select_drop);

            this.width    = this.$ctm_select.outerWidth();
            this.height   = this.$ctm_select.outerHeight();
            this.position = this.$ctm_select.offset();

            if(active) {
                this.setActive(active);
            }

            this.bind();
        },
        setActive: function(active){
            this.$dropItem.eq(active).addClass('item-selected')
        },

        bind: function(){
            var _this    = this;
            $(window).on('resize orientationchange', this.recalculate.bind(this))

            this.$ctm_select.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();

                var openDrop = this.$drop.hasClass('open');
                if(openDrop) {
                    this.close();
                    return;
                }

                this.scope.$apply();
                this.scope.$emit('rebuild:scroll');

                if(!openDrop) {
                    this.close();
                    this.$drop.css({
                        width: this.width,
                        left : this.position.left,
                        top  : this.position.top + this.height
                    });
                    this.$drop.addClass('open');
                }
            }.bind(this));

            this.$drop.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();

                var element  = $(e.target),
                    tag      = element.get()[0].tagName,
                    elements = $(this).find('li');

                if(tag === 'A') {
                    elements.removeClass('item-selected');
                    element.parent().addClass('item-selected');
                    _this.close();
                }
            });

            this.body.on('click', function(){
                this.close();
            }.bind(this));
        },
        close: function(){
            this.allDrops.removeClass('open')
            this.allDrops.css('left', '-9999px')
        },
        recalculate: function(){
            this.width    = this.$ctm_select.outerWidth();
            this.height   = this.$ctm_select.outerHeight();
            this.position = this.$ctm_select.offset();

            if(this.$drop.hasClass('open')) {
                this.$drop.css({
                    width: this.width,
                    left: this.position.left,
                    top : this.position.top + this.height
                });
            }
        }
    }
    return {
        restrict: 'A',
        scope: {
            ngModel:'=',
            ngSelectItems:'=',
            ngSelectDefault: '='
        },
        templateUrl: 'modules/custom-forms/selects/templates/ctm-select.html',
        link: function(scope, element, $attr, $scope, $element) {
            var dropDown = angular.element(drop);
            var active;

            scope.hidden = options.hidden;
            scope.custom_select = options.custom_select;
            scope.custom_select_btn = options.custom_select_btn;

            //Default value
            if (scope.ngSelectDefault[0] === '$') {
                active = scope.ngSelectDefault;

                active = active.substring(1, active.length);
                if(scope.ngSelectItems[active]) {
                    scope.model = scope.ngSelectItems[active].name;
                    scope.ngModel = scope.ngSelectItems[active];
                } else {
                    scope.model = '';
                }

            } else {
                scope.model = scope.ngSelectDefault;
            }

            $('body').append(dropDown)

            $compile(dropDown)(scope);

            scope.items = scope.ngSelectItems;
            scope.openSelect = function(index) {
                scope.model = scope.ngSelectItems[index].name
                scope.ngModel = scope.ngSelectItems[index]
            }
            setTimeout(function(){
                var select = new SelectConstructor();
                select.init(scope, element, $attr, $scope, $element, dropDown, active);
            }, 0)
        }
    }
})