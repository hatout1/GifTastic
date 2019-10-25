$(document).ready(function () {
    let topics = ['dogs', 'cats', 'rabbit', 'goldfish']
    let ApiKey = 'gc9EzgySz6PJZbjrG9UIESkEs843Crby';


    for (let i = 0; i < topics.length; i++) {
        let buttons = $('<button>' + topics[i] + '</button>')
        buttons.appendTo('.startMenu');
    }

    //  on click function
    $('.btn').on('click', function () {
        let userTopics = [];
        const userInput = $('#input').val();
        event.preventDefault();
        userTopics.push(userInput);
        //  for loop to go through the array and creat a button to each string.
        for (let i = 0; i < userTopics.length; i++) {
            let buttons2 = $('<button>' + userTopics[i] + '</button>')
            buttons2.appendTo('.userMenu');
        }

        // function to prevent mutli entries of each string.
        $('#input').empty();

        // ajax function
        $.ajax({
            method: "GET",
            url: 'https://api.giphy.com/v1/gifs/search?api_key=gc9EzgySz6PJZbjrG9UIESkEs843Crby&q=animals&limit=10&offset=0&rating=G&lang=en',
            dataType: 'json'
        }).then(response => {
            let result = response.data

            for (x = 0; x < result.length; x++) {
                let gifurl = response.data[x].images.original.url
                $('.images').append(`<img class="gif_image" src="${gifurl}" style = 'height:300; width:300px;'/>`);
            }


        })

    });



});

