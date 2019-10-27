$(document).ready(function () {
    let topics = ['dogs', 'cats', 'rabbit', 'goldfish']
    const ApiKey = 'gc9EzgySz6PJZbjrG9UIESkEs843Crby';
    // var imgurl;

    for (let i = 0; i < topics.length; i++) {
        let buttons = $('<button' + ' value="' + topics[i] + '">' + topics[i] + '</button >').addClass('btn2');
        $('.startMenu').append(buttons);
    }

    //  on click function to generate buttons.
    $('.btn').on('click', function () {
        let userTopics = [];
        const userInput = $('#input').val();
        $('#input').val('');

        userTopics.push(userInput);

        //  for loop to go through the array and creat a button to each string.
        for (let i = 0; i < userTopics.length; i++) {
            let buttons2 = $('<button>' + userTopics[i] + '</button>').addClass('btn2').attr('Value', userTopics[i])
            $('.startMenu').append(buttons2)
        }

        // function to prevent mutli entries of each string.
        $('#input').empty();
    });

    // on click function for topics buttons

    $('.startMenu').on('click', '.btn2', function () {
        // console.log(topics)
        // console.log($(this).attr('value'));

        $.ajax({
            method: "GET",
            url: 'https://api.giphy.com/v1/gifs/search?api_key=gc9EzgySz6PJZbjrG9UIESkEs843Crby&q=' + $(this).attr('value') + '&limit=10&offset=0&rating=G&lang=en',
            dataType: 'json'
        }).then(data => {
            // console.log(data)

            let imgresult = data.data
            for (x = 0; x < imgresult.length; x++) {
                let imgurl = data.data[x].images.original.url
                let imgstill = data.data[x].images["480w_still"].url
                $('.images').append(`<img class="gif_image" id="gif_${[x]}" data-still="${imgstill}"  data-animate="${imgurl} "src="${imgurl}"/>`);

                // image on-click function that switch image from still to animate
                $(document).on('click', '#gif_' + [x], function () {
                    if ($(this).attr('data-state') == 'still') {
                        $(this).attr('src', $(this).attr("data-animate"));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).attr("data-still"));
                        $(this).attr('data-state', 'still');
                    }
                })
            }
        })
    })
});

