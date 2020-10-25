let posts = [];
let userData = [];
let profiles = [];

$(function(){
    loadPosts().then(function (response) {
        for (let post of response) {
            posts.push(new Post(post.author, post.createTime, post.text, post.media, post.likes));
        }
        displayPosts();
    })
    .catch(function(){
        alert("Error appeared when displaying posts");
    });

    loadUser().then(function (response) {
        userData.push(response.firstname);
        userData.push(response.lastname);
        userData.push(response.email);
        userData.push(response.avatar);
        displayUser();
    })
    .catch(function(){
        alert("Error appeared when displaying users");
    });

    loadProfiles().then(function (response) {
        for (let profile of response) {
            profiles.push(new Profile(profile.firstname, profile.lastname, profile.avatar));
        }
        displayProfiles();
    })
    .catch(function(){
        alert("Error appeared when displaying profiles");
    });
});

function loadUser() {
    return $.get(
        {
            url: 'https://private-anon-c899c1dc63-wad20postit.apiary-mock.com/users/1',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('Error appeared when loading users');
            }
        }
    );
}

function loadPosts() {
    return $.get(
        {
            url: 'https://private-anon-946d5befa4-wad20postit.apiary-mock.com/posts',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('Error appeared when loading posts');
            }
        }
    );
}

function loadProfiles() {
    return $.get(
        {
            url: 'https://private-anon-25324cac83-wad20postit.apiary-mock.com/profiles',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('Error appeared when loading profiles');
            }
        }
    );
}

function displayPosts() {

    $('.main-container').empty();
    for (let post of posts) {
        let div_post = $('<div class=post>');
        let div_author = $('<div class=post-author>');
        let div_info = $('<span class=post-author-info>');
        let img_avatar = $('<img alt="Post author">').attr("src", post.author.avatar);
        let name = $('<small>').text(post.author.firstname + " " + post.author.lastname);
        let date = $('<small>').text(post.createTime);
        let div_text = $('<div class=post-title>');
        let text = $('<h3>').text(post.text);
        let div_likes = $('<div class=post-actions>');
        let btn = $('<button type=button name=like class=like-button>').text(post.likes);

        btn.click(function() {
            if($(this).hasClass('like-button liked')){
                $(this).removeClass('liked');
            }
            else{
                $(this).addClass('liked');
            }
        });

        div_post.append(div_author);
        div_author.append(div_info);
        div_info.append(img_avatar);
        div_info.append(name);
        div_author.append(date);

        if (post.media !==null){
            if(post.media.type==="image"){
                let div_image = $('<div class=post-image>');
                let image = $('<img alt="">').attr("src", post.media.url);
                div_image.append(image);
                div_post.append(div_image);
            }
            else if(post.media.type==="video"){
                let div_video = $('<div class=post-image>');
                let video = $('<video controls>');
                let source = $('<source type="video/mp4">').attr("src", post.media.url);
                video.append(source);
                div_video.append(video);
                div_post.append(div_video);
            }
        }

        div_post.append(div_text);
        div_text.append(text);
        div_post.append(div_likes);
        div_likes.append(btn);

        $('.main-container').append(div_post);
    }
}

function displayProfiles(){

    $('.profiles-container').empty()
    for (let profile of profiles) {
        let div_profile = $('<div class=profile>');
        let img_avatar = $('<img alt="Profile">').attr("src", profile.avatar);
        let div_name = $('<div class=profile-name>').text(profile.firstname + " " + profile.lastname);
        let btn_follow = $('<button type=button name=follow class=follow-button>').text("Follow");

        btn_follow.click(function() {
            if($(this).hasClass('follow-button followed')){
                $(this).removeClass('followed');
                $(this).text("Follow");
            }
            else{
                $(this).addClass('followed');
                $(this).text("Followed");
            }
        });

        div_profile.append(img_avatar);
        div_profile.append(div_name);
        div_profile.append(btn_follow);

        $('.profiles-container').append(div_profile);
    }

}

function displayUser(){
    let firstName = userData[0];
    let lastName = userData[1];
    let email = userData[2];
    let avatar_link = userData[3];
    
    $("p#menuName").text(firstName + ' ' + lastName);
    $("p#menuEmail").text(email);
    console.log(avatar_link);
    $("img.avatar").attr("src",avatar_link);
}

var isMenuShown = false;

$(document).ready(function(){
    $(".avatar").click(function(){
        if(isMenuShown == false){
            $(".dropdown-menu").slideDown(500);
            isMenuShown = true;
        } else {
            $(".dropdown-menu").stop().slideUp(500);
            isMenuShown = false;
        }    
    });    
})


