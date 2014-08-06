app.directive('customCheckbox', function(){
    var options = {
        hidden: 'custom-form-hidden-display'
    }
    return {
        scope: {
            ngModel:'='
        },
        restrict: 'A',
        templateUrl: 'modules/custom-forms/checkboxes/template/ctm-checkbox.html',
        link: function(scope, element, $attr) {
            scope.hidden        = options.hidden;
            scope.checkboxid    = $attr.ckeckboxId;
            scope.checkboxvalue = $attr.checkboxValue;
        }
    }
});