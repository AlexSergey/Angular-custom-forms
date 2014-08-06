app.directive('customRadio', function(){
    var options = {
        hidden: 'custom-form-hidden-display'
    }
    return {
        scope: {
            ngModel:'='
        },
        restrict: 'A',
        templateUrl: 'modules/custom-forms/radiobuttons/template/ctm-radio.html',
        link: function(scope, element, $attr) {
            scope.hidden     = options.hidden;
            scope.radioid    = $attr.radioId;
            scope.radiovalue = $attr.radioValue;
            scope.radiolink  = $attr.radioLink;
            scope.modelvalue = $attr.modelValue;
        }
    }
});