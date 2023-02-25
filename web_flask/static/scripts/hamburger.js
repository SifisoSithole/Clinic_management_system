//Hamburger menu function 
$( () => {
    $(".menu-icon").click (() =>  {
        console.log('here')
        $("#menu-links").toggle();
        $("#ffc-logo").toggle();
    });
});