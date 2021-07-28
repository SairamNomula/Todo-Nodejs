$(document).ready(function(){

    $('form').on('submit', function(){
        var task = $('form input')
        var todo = {task: task.val()}

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data){
                location.reload()
            }
        })
        return false;
    })

    $('li').on('click', function(){
        var task = $(this).text().replace(/ /g, "-")
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + task,
            success: function(data){
                location.reload()
            }
        })
    })
})