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
}
