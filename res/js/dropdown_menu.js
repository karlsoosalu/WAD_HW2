var isMenuShown = false;

$(document).ready(function(){
    $(".avatar").click(function(){
        if(isMenuShown==false){
            $(".dropdown-menu").slideDown(50);
            isMenuShown=true;
        } else {
            $(".dropdown-menu").stop().slideUp(50);
            isMenuShown=false;
        }    
    });    
  })