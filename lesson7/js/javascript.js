let imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};
imagesToLoad.forEach((img) => {
  loadImages(img);
});
if('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if(item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  });
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}



// //Makes a list of all "img" elements with the attribute "data-src" and stores them in the constant allImages
// const allImages = document.querySelectorAll("img[data-src]");

// const loadImages = (img) => {
//   img.setAttribute("src", img.getAttribute("data-src"));
//   img.onload = () => {
//     img.removeAttribute("data-src");
//   }
// }

// allImages.forEach((img) => {
//   loadImages(img);
// })

// if ('IntersectionObserver' in window) {
//   const observer = new IntersectionObserver((items, observer) => {
//     items.forEach((item) => {
//       if (item.isIntersecting) {
//         loadImages(item.target);
//         observer.unobserve(item.target);
//       }
//     });
//   });
//   allImages.forEach((img) => {
//     observer.observe(img);
//   });
// }
// else {
//   allImages.forEach((img) => {
//     loadImages(img);
//   });
// }