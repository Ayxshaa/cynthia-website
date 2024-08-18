// smooth scrolling k liye lgate hai locomotive 
// step attach loco scroll css
// attach locomotive scroll min js
// some code from locomotive scroll docs/js

var timeout;
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function circleFollower(xscale, yscale){


var main = document.querySelector("#main")
var minicircle = document.querySelector("#minicircle")

main.addEventListener("mousemove", function(dets){
    gsap.to(minicircle,{
     x: dets.x,
     y:dets.y,
     scaleX: xscale,
     scaleY: yscale,
   duration:-2,
     ease:"back.out"
    })
 })
}
circleFollower() 

function firstPage(){
    var tl = gsap.timeline();

tl.from("#nav",{
   y:15,
    opacity:0,
    ease: Expo.easeInOut,
    duration: 1.5
})
.to(".bounding-elem",{
    y:0,
    ease: Expo.easeInOut,
    duration:1.5,
    delay:-1,
    stagger:.2
})

.from("#herofooter",{
    y:-10,
    opacity:0,
    delay:-1,
    ease: Expo.easeInOut,
    duration: 1.5
})
}
firstPage();


function circleMove(){
    // define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev =0;
    var yprev = 0;

    window.addEventListener("mousemove",function(dets){
      clearTimeout(timeout);
      xscale =  gsap.utils.clamp(.8,1.2,dets.clientY - yprev);
      yscale =  gsap.utils.clamp(.8,1.2,dets.clientX - xprev);

       xprev = dets.clientX;
       yprev = dets.clientY;

       circleFollower(xscale, yscale);
        timeout = setTimeout(function(){
            main.addEventListener("mousemove", function(dets){
                gsap.to(minicircle,{
                 x: dets.x,
                 y:dets.y,
                 scaleX: 1,
                 scaleY: 1,
               duration:-2,
                 ease:"back.out"
                })
             })
        },100);
        
    });
}
circleMove();


document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX; 
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease : Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20, diffrot * 0.5),
        })
    })

    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease : Power3,
        })
    })
})