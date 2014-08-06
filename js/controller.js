app.controller('Cntrl01', function($scope){

    $scope.formData = {}

    $('.add_select').on('click', function(e){
        e.preventDefault();
        var text = {}
        text.id = $('.test_add_select').val();
        text.name = $('.test_add_select2').val()
        $scope.selectItems.push(text)
    })

    $scope.textarea = 'test';

    $scope.selectItems = [{
        id: 'id-1',
        name: 'Name 1'},
        {
            id: 'id-2',
            name: 'lorem'},
        {
            id: 'id-3',
            name: 'Name 3'},
        {
            id: 'id-4',
            name: 'Name 4'},
        {
            id: 'id-5',
            name: 'Name 5'},
        {
            id: 'id-6',
            name: 'Name 6'},
        {
            id: 'id-7',
            name: 'Name 7'},
        {
            id: 'id-8',
            name: 'Name 8'},
        {
            id: 'id-9',
            name: 'Name 9'},
        {
            id: 'id-10',
            name: 'Name 10'},
        {
            id: 'id-11',
            name: 'Name 11'},
        {
            id: 'id-12',
            name: 'Name 12'}
    ];
    $scope.selectItems2 = [
        {name: 'test select 2'}
    ];
    $scope.selectItems3 = [
        {name: 'test select 3'}
    ];
});