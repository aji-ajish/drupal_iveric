var TEMPLATE = {
  video: function (ob) {
    return `
    <video poster="${ob.poster}" disablePictureInPicture controls controlsList="nodownload">
      <source src="${ob.src}" type="${ob.type || 'video/mp4'}">
      Your browser does not support the video tag.
    </video>
    `;
  }
};
