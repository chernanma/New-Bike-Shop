$(document).ready(() => {
  // add new post
  $("#add-new-blog-post-btn").on("click", () => {
    console.log("Add Post clicked");
    const data = {
      title: $("#title-input-blog-post")
        .val()
        .trim(),
      author: $("#author-input-blog-post")
        .val()
        .trim(),
      description: $("#description-input-blog-post")
        .val()
        .trim()
    };

    // ajax to post new post information
    $.ajax({
      url: "/api/blogs",
      method: "POST",
      data: data
    })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // update blog post info
  $("#edit-blog-post-type-btn").on("click", () => {
    const data = {
      id: $("#id-input-edit-blog-post")
        .val()
        .trim(),
      title: $("#title-input-edit-blog-post")
        .val()
        .trim(),
      author: $("#author-input-edit-blog-post")
        .val()
        .trim(),
      description: $("#description-input-edit-blog-post")
        .val()
        .trim(),
    };

    // ajax to update the post data
    $.ajax({
      url: "/api/blogs/",
      method: "PUT",
      data: data,
    })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
