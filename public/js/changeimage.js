<<<<<<< HEAD
function changeImage(ele) {

        document.getElementById('featuredImg').src = "//"+ele;
        return document.getElementById('featuredImg').src;
=======
function changeImage(ele,newclassname) {
        document.getElementById('featuredImg').src = ele;
        document.getElementById('featuredImg').className =newclassname;
}

function nextImage() {
    var a=document.getElementById('featuredImg').className;
      a=a.substring(3);
      a++;
      a="the"+a;
     var b =document.getElementById(a).src;

     changeImage(b,a);
}

function prevImage() {
    var a=document.getElementById('featuredImg').className;
      a=a.substring(3);
      a--;
      a="the"+a;
     var b =document.getElementById(a).src;

     changeImage(b,a);
>>>>>>> 1d166ac93dd8a58912382109e3d582361b1d021d
}
