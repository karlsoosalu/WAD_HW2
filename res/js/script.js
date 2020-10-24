let posts = [];

$(function(){
    loadPosts().then(function (response) {
        for (let post of response) {
            posts.push(new Post(post.author, post.createTime, post.text, post.media, post.likes))
        }
        displayPosts()
    })
    .catch(function(){
        alert("Error appeared when displaying posts")
    })
})

function loadPosts() {
    return $.get(
        {
            url: 'https://private-anon-946d5befa4-wad20postit.apiary-mock.com/posts',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('Error appeared when loading posts')
            }
        }
    );
}

function displayPosts() {

    $('#main-container').empty()
    for (let post of posts) {
        let div_post = $('<div class=post>')
        let div_author = $('<div class=post-author>')
        let div_info = $('<span class=post-author-info>')
        let img_avatar = $('<img alt="Post author">').attr("src", post.author.avatar)
        let name = $('<small>').text(post.author.firstname + post.author.lastname)
        let date = $('<small>').text(post.createTime)
        let div_text = $('<div class=post-title>')
        let text = $('<h3>').text(post.text)
        let div_likes = $('<div class=post-actions>')
        let btn = $('<button type=button name=like class=like-button>').text(post.likes)

        btn.click(function() {
            if($(this).hasClass('like-button liked')){
                $(this).removeClass('like-button liked').addClass('like-button')
            }
            else{
                $(this).removeClass('like-button').addClass('like-button liked')
            }
        });

        div_post.append(div_author)
        div_author.append(div_info)
        div_info.append(img_avatar)
        div_info.append(name)
        div_author.append(date)

        if (post.media !==null){
            if(post.media.type==="image"){
                let div_image = $('<div class=post-image>')
                let image = $('<img alt="">').attr("src", post.media.url)
                div_image.append(image)
                div_post.append(div_image)
            }
            else if(post.media.type==="video"){
                let div_video = $('<div class=post-image>')
                let video = $('<video controls>')
                let source = $('<source type="video/mp4">').attr("src", post.media.url)
                video.append(source)
                div_video.append(video)
                div_post.append(div_video)
            }
        }

        div_post.append(div_text)
        div_text.append(text)
        div_post.append(div_likes)
        div_likes.append(btn)

        $('section.main-container').append(div_post);
    }
}