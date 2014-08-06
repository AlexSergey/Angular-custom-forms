app.directive('customTextarea', function($compile){
    return {
        restrict: 'A',
        scope: {
            ngModel:'='
        },
        templateUrl: 'modules/custom-forms/textarea/template/ctm-textarea.html',
        link: function(scope, element, $attr, $scope, $element) {
            scope.model = scope.ngModel;
        },
        controller: function($scope, $element){
            var contentEditable = $element.find('.scroller').children().first().addClass('ctm-textarea');
            contentEditable.on({
                'click': function(){
                    $(this).attr('contenteditable', true).focus()
                },
                'input': function(){
                    $scope.ngModel = $(this).text();
                    $scope.$apply();
                },
                'focus': function(){
                    contentEditable.addClass('active')
                },
                'blur': function(){
                    contentEditable.removeClass('active')
                }
            });

            $scope.$watch('ngModel', function(){
                console.log('test')
            })
        }
    }
})