var selectedimgsrc;

function addpost() {
    var postTitle = document.getElementById("post-title")
    var postdescription = document.getElementById("post-description")
    console.log(postTitle.value, postdescription.value)
    var posts = document.getElementById("post");
   if(postTitle.value.trim() && postdescription.value.trim()){
    posts.innerHTML +=
    `<div class="card mt-3">
     <div class="card-header fontStyle">
     @Posts
     </div>
     <div class="card-body" style="background-image:url(${selectedimgsrc});">
     <h5 class="card-title fontStyle id="previousTitle">${postTitle.value}</h5>
     <p class="card-text fontStyle" id="previousDescription">${postdescription.value}</p>
     </div>
     <div class="p-4">
     <button type="button" class="btn btn-primary" onclick="editPost(event)">Edit</button>
     <button type="button" class="btn btn-danger" onclick="remove(event)">Delete</button>
     </div>
     </div>
     </div>
     
     `

postTitle.value = ""
postdescription.value  = ""

   }
   else{
    Swal.fire({
        title: "Nothing Found",
        text: "Please insert something",
        icon: "warning"
      });
   }
}

function setBgImg(url){
    selectedimgsrc = url;
	var images = document.getElementsByClassName('bg-img');
	for (var i = 0; i < images.length; i++) {
		images[i].className = ' bg-img';
	}
	event.target.className += ' image-list-selected';
}

function remove(event){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            event.target.parentNode.parentNode.parentNode.remove()
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
      });
}


function editPost(event){
    var postEdit = event.target.parentNode.parentNode;
    var currentPostTitle = postEdit.children[1].children[0].innerText;
    var currentPostDescription = postEdit.children[1].children[1].innerText;

    Swal.fire({
        title: 'Edit Post',
        html: `
            <input type="text" id="editTitle" class="form-control" value="${currentPostTitle}">
            <textarea id="editDescription" class="form-control mt-3">${currentPostDescription}</textarea>
        `,
        confirmButtonText: 'Update',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            postEdit.children[1].children[0].innerText = document.getElementById("editTitle").value;
            postEdit.children[1].children[1].innerText = document.getElementById("editDescription").value;
        }
    });
}