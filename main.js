///Personal account set up
const account=document.querySelector('.account')
fetch('http://localhost:3000/profile')
.then(response => response.json())
.then(data => {
    const profileImage=document.createElement('div')
    profileImage.className='profile-image'
    const pImage=document.createElement('img')
    pImage.className='p-image'
    pImage.src=data[0].imageURL
    profileImage.appendChild(pImage)
    account.appendChild(profileImage)////major appending

    const details=document.createElement('div')
    details.className='details'
    const userName=document.createElement('p')
    userName.className='username'   
    userName.innerHTML=data[0].name
    details.appendChild(userName)

    const follows=document.createElement('p')
    follows.className='follows'
    const followers=document.createElement('span')
    followers.className='followers' 
    followers.innerHTML=`${data[0].followers} followers`
    const following=document.createElement('span')
    following.className='following'
    following.innerHTML=`${data[0].following} following`
    follows.appendChild(followers)
    follows.appendChild(following)
    details.appendChild(follows)

    account.appendChild(details)////major appending


})


const commentButton=document.querySelectorAll('.comment-btn');
const commentsSection = document.querySelector('.comments-section');

commentsSection.classList.add('hide-comment-section')
/////Comment icon click event
Array.from(commentButton).forEach((commentbtn)=>{

    commentbtn.addEventListener('click', () =>{
        commentsSection.classList.remove("hide-comment-section");
        document.body.style.overflow='hidden';
    })
})


const cancelButton=document.querySelector('.cancel-mark');
cancelButton.addEventListener('click', () =>{
    commentsSection.classList.add("hide-comment-section");
    document.body.style.overflow='auto';
})


//dealing with the creating post feature//// FIRST FORM ON THE CREATE POST
const imagePostForm = document.querySelector('.image-post')
const continuePosting=document.querySelector('.continue-posting')

/////////////////////////////////////////////////////////////////



imagePostForm.addEventListener('submit', (e) =>{
e.preventDefault();
const image2Post=document.querySelector('.image2-post')
continuePosting.classList.remove('boom')
const imageTaken=image2Post.value
///Directing the imageTaken
const cpImage2=document.querySelector('.cp-image2')
cpImage2.src=imageTaken
//Putting the profile things here
////Updating the profile using the one in the HTML at the top
const followingImage2Post=document.querySelector('.following-image2-post')
followingImage2Post.src=document.querySelector('.p-image').src

const followingUsernamePost=document.querySelector('.following-username-post')
followingUsernamePost.innerHTML=document.querySelector('.username').innerHTML

imagePostForm.reset();
})

//////////////////////////////////////////////////////////////////////
//adding event listener to cp-cancel
const cpCancelBtn=document.querySelector('.cp-cancel');
cpCancelBtn.addEventListener('click',() =>{
    continuePosting.classList.add('boom')
})














// SECOND FORM ON THE CREATE /////////
const cpDetailsPostForm = document.querySelector('.cp-details');
cpDetailsPostForm.addEventListener('submit', (e) =>{
    e.preventDefault();
//Taking the inputs first
const cpCaption=document.querySelector('.cp-caption').value
const cpLocation=document.querySelector('.cp-location').value
const cpTime=document.querySelector('.cp-time').value

const secondFormObj={
    imageURL:document.querySelector('.cp-image2').src ,
    caption:cpCaption,
    Location:cpLocation ,
    Time: cpTime,
    timeRemaining: 300,
    Attendance: 2,
    likesCount: 141,
    commentsCount: 25,
    smallProfile: document.querySelector('.p-image').src,
    name: document.querySelector('.username').innerHTML,
    counter: 61
}



////Now uploading the post to our page

fetch('http://localhost:3000/posts',{
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(secondFormObj)
})
.then(response => response.json())
.then(post => {

    const content=document.querySelector('.content')
    
    const container=document.createElement('div')
    container.className='container'
    content.appendChild(container)///////// MAJOR APPENDING

    const postImage=document.createElement('div')
    postImage.className='post-image';
    const image1=document.createElement('img')
    image1.className='image-1'
    image1.src=post.imageURL
    postImage.appendChild(image1)
    container.appendChild(postImage)///////// APPENDING

    const smallCont=document.createElement('div')
    smallCont.className='small-cont'
    const smallImage=document.createElement('img')
    smallImage.className='small-image'
    smallImage.src=post.smallProfile
    const userName=document.createElement('p')
    userName.className='user-name'
    userName.innerHTML=post.name
    smallCont.appendChild(smallImage)
    smallCont.appendChild(userName)
    container.appendChild(smallCont)///////// APPENDING


    /////////
    const postDetails=document.createElement('div')
    postDetails.className='post-details'
    const caption=document.createElement('p')
    caption.className='caption'
    caption.innerHTML=post.caption
    ////
    const location=document.createElement('p')
    location.className='location'
    const location1=document.createElement('span')
    location1.className='location-1'
    location1.innerHTML="Location :"
    const locate=document.createElement('span')
    locate.className='locate'
    locate.innerHTML=post.Location
    location.appendChild(location1)
    location.appendChild(locate)
    //////
    const time=document.createElement('p')
    time.className='time'
    const location2=document.createElement('span')
    location2.className='location-1'
    location2.innerHTML="Time :"
    const timer=document.createElement('span')
    timer.className='timer'
    timer.innerHTML=post.Time
    time.appendChild(location2)
    time.appendChild(timer)
    //////
    const timeCountdown=document.createElement('p')
    timeCountdown.className='time-countdown'
    const location3=document.createElement('span')
    location3.className='location-1'
    location3.innerHTML="Time remaining :"
    const remainder=document.createElement('span')
    remainder.className='remainder'
    remainder.innerHTML=post.timeRemaining
    timeCountdown.appendChild(location3)
    timeCountdown.appendChild(remainder)
    //////
    const attendance=document.createElement('p')
    attendance.className='time-countdown'
    const location4=document.createElement('span')
    location4.className='location-1'
    location4.innerHTML="Attendance :"
    const attended=document.createElement('span')
    attended.className='attended'
    attended.innerHTML=post.Attendance
    attendance.appendChild(location4)
    attendance.appendChild(attended)
    //////APPPENDING THE p tags
postDetails.appendChild(caption)
postDetails.appendChild(location)
postDetails.appendChild(time)
postDetails.appendChild(timeCountdown)
postDetails.appendChild(attendance)
    /////
////continuing

    const attendingBtn=document.createElement('button')
    attendingBtn.className='attending-btn'
    attendingBtn.innerHTML="Attend"
    postDetails.appendChild(attendingBtn)

    ////Working on the ATTTEND BUTTON EVENT LISTENER/////
    attendingBtn.addEventListener('click',(e) =>{
        e.preventDefault();
        if(e.target.innerHTML==="Attend"){
            e.target.innerHTML="Attending"
            e.target.classList.add('change-to-attending')
            
            attended.innerHTML=parseInt(attended.innerHTML,10)+1
        }
        else{
            e.target.innerHTML="Attend"
            e.target.classList.remove('change-to-attending')
            attended.innerHTML-=1
        }
       
    })


//     const btns=document.createElement('div')
//     const commentBtn=document.createElement('div')
//     commentButton.className='comment-btn'

//     commentBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
//   </svg> <span class="comments">${post.commentsCount} comments</span>`

//   const likeBtn=document.createElement('div')
//     commentButton.className='like-btn'
//     commentBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//   </svg> <span class="comments">${post.likesCount} likes</span>`

// Create parent container element
const parentContainer = document.createElement("div");
parentContainer.className = "btns";

// Create comment button container
const commentBtnContainer = document.createElement("div");
commentBtnContainer.className = "comment-btn";

// Create comment button SVG element
const commentBtnSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
commentBtnSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
commentBtnSVG.setAttribute("fill", "none");
commentBtnSVG.setAttribute("viewBox", "0 0 24 24");
commentBtnSVG.setAttribute("stroke-width", "1.5");
commentBtnSVG.setAttribute("stroke", "currentColor");
commentBtnSVG.className = "w-6 h-6";

// Create path element for comment button SVG
const commentBtnPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
commentBtnPath.setAttribute("stroke-linecap", "round");
commentBtnPath.setAttribute("stroke-linejoin", "round");
commentBtnPath.setAttribute("d", "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z");

// Append path element to SVG element
commentBtnSVG.appendChild(commentBtnPath);

// Create comment count span element
const commentCountSpan = document.createElement("span");
commentCountSpan.className = "comments";
commentCountSpan.textContent = "20 comments";

// Append SVG and span elements to comment button container
commentBtnContainer.appendChild(commentBtnSVG);
commentBtnContainer.appendChild(commentCountSpan);

// Create like button container
const likeBtnContainer = document.createElement("div");
likeBtnContainer.className = "like-btn";

// Create like button SVG element
const likeBtnSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
likeBtnSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
likeBtnSVG.setAttribute("fill", "none");
likeBtnSVG.setAttribute("viewBox", "0 0 24 24");
likeBtnSVG.setAttribute("stroke-width", "1.5");
likeBtnSVG.setAttribute("stroke", "currentColor");
likeBtnSVG.className = "w-6 h-6";

// Create path element for like button SVG
const likeBtnPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
likeBtnPath.setAttribute("stroke-linecap", "round");
likeBtnPath.setAttribute("stroke-linejoin", "round");
likeBtnPath.setAttribute("d", "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z");

// Append path element to SVG element
likeBtnSVG.appendChild(likeBtnPath);

// Create like count span element
const likeCountSpan = document.createElement("span");
likeCountSpan.className = "likes";
likeCountSpan.textContent =`${post.likesCount} likes`;

// Append SVG and span elements to like button container
likeBtnContainer.appendChild(likeBtnSVG);
likeBtnContainer.appendChild(likeCountSpan);

// Append comment and like button containers to the parent container
parentContainer.appendChild(commentBtnContainer);
parentContainer.appendChild(likeBtnContainer);

// Add the parent container to the desired location in your HTML document
// For example, assuming you have a container with the id "myContainer"
// const container = document.getElementById("myContainer");
// container.appendChild(parentContainer);

    // btns.appendChild(commentBtn)
    // btns.appendChild(likeBtn)
    postDetails.appendChild(parentContainer);
    container.appendChild(postDetails)///////// APPENDING

    ////adding event listener to comment button
    commentBtnSVG.addEventListener('click', () =>{
        commentsSection.classList.remove("hide-comment-section");
        document.body.style.overflow='hidden';
    })

    ////ADDING EVENT LISTENER ON THE LIKE BUTTON
    let liker=post.likesCount;
    if(post.counter%2===0){
        likeBtnSVG.setAttribute("fill", "red");
        likeBtnSVG.setAttribute("stroke", "red");
        liker=post.likesCount-1;
    }
    else{
        likeBtnSVG.setAttribute("fill", "none");
        likeBtnSVG.setAttribute("stroke", "currentColor");
        liker=post.likesCount+1;
    }
    
    likeBtnSVG.addEventListener('click',(e) =>{
        
        e.preventDefault();
        let counter = post.counter+1;
        const feedback ={
counter:counter,
likesCount:liker
        }

        fetch(`http://localhost:3000/posts/${post.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedback)

        })

    })

})

.catch(error=>{
alert("There was an error")
console.log(error)
})
cpDetailsPostForm.reset();
})



























/////Dealing with create post button
const sideCreatePostBtn = document.querySelector('.create-post')
const createPostMainDiv=document.querySelector('.create-post-main-div') 


sideCreatePostBtn.addEventListener('click',(e) =>{
    createPostMainDiv.classList.remove('boom')
    notificationsCenter.classList.add('boom');
    
    e.target.classList.add('click')
    sideHomeBtn.classList.remove('click')
    sideNotificationsBtn.classList.remove('click')
    // document.body.style.overflow='hidden';
});

/////Dealing with side home button
const sideHomeBtn = document.querySelector('.home')

sideHomeBtn.addEventListener('click',(e) =>{
    createPostMainDiv.classList.add('boom')
    notificationsCenter.classList.add('boom');

    e.target.classList.add('click')
    sideCreatePostBtn.classList.remove('click')
    sideNotificationsBtn.classList.remove('click')
    // document.body.style.overflow='auto';
});

/////Dealing with notifications button

const notificationsCenter=document.querySelector('.notifications-center')
//adding class
notificationsCenter.classList.add('boom');
const sideNotificationsBtn = document.querySelector('.notifications')
const notificationsSvg = document.querySelector('.notifications .svg')
// const storeSvg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
// <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clip-rule="evenodd" />
// </svg>`;

sideNotificationsBtn.addEventListener('click',(e) =>{
    notificationsCenter.classList.remove('boom');

    e.target.classList.add('click')
    sideHomeBtn.classList.remove('click')
    sideCreatePostBtn.classList.remove('click')
})




//Getting the posts from the server and appending them
fetch('http://localhost:3000/posts')
.then(response => response.json())
.then(data => data.forEach(post => {

    const content=document.querySelector('.content')
    
    const container=document.createElement('div')
    container.className='container'
    content.appendChild(container)///////// MAJOR APPENDING

    const postImage=document.createElement('div')
    postImage.className='post-image';
    const image1=document.createElement('img')
    image1.className='image-1'
    image1.src=post.imageURL
    postImage.appendChild(image1)
    container.appendChild(postImage)///////// APPENDING

    const smallCont=document.createElement('div')
    smallCont.className='small-cont'
    const smallImage=document.createElement('img')
    smallImage.className='small-image'
    smallImage.src=post.smallProfile
    const userName=document.createElement('p')
    userName.className='user-name'
    userName.innerHTML=post.name
    smallCont.appendChild(smallImage)
    smallCont.appendChild(userName)
    container.appendChild(smallCont)///////// APPENDING


    /////////
    const postDetails=document.createElement('div')
    postDetails.className='post-details'
    const caption=document.createElement('p')
    caption.className='caption'
    caption.innerHTML=post.caption
    ////
    const location=document.createElement('p')
    location.className='location'
    const location1=document.createElement('span')
    location1.className='location-1'
    location1.innerHTML="Location :"
    const locate=document.createElement('span')
    locate.className='locate'
    locate.innerHTML=post.Location
    location.appendChild(location1)
    location.appendChild(locate)
    //////
    const time=document.createElement('p')
    time.className='time'
    const location2=document.createElement('span')
    location2.className='location-1'
    location2.innerHTML="Time :"
    const timer=document.createElement('span')
    timer.className='timer'
    timer.innerHTML=post.Time
    time.appendChild(location2)
    time.appendChild(timer)
    //////
    const timeCountdown=document.createElement('p')
    timeCountdown.className='time-countdown'
    const location3=document.createElement('span')
    location3.className='location-1'
    location3.innerHTML="Time remaining :"
    const remainder=document.createElement('span')
    remainder.className='remainder'
    remainder.innerHTML=post.timeRemaining
    timeCountdown.appendChild(location3)
    timeCountdown.appendChild(remainder)
    //////
    const attendance=document.createElement('p')
    attendance.className='time-countdown'
    const location4=document.createElement('span')
    location4.className='location-1'
    location4.innerHTML="Attendance :"
    const attended=document.createElement('span')
    attended.className='attended'
    attended.innerHTML=post.Attendance
    attendance.appendChild(location4)
    attendance.appendChild(attended)
    //////APPPENDING THE p tags
postDetails.appendChild(caption)
postDetails.appendChild(location)
postDetails.appendChild(time)
postDetails.appendChild(timeCountdown)
postDetails.appendChild(attendance)
    /////
////continuing

    const attendingBtn=document.createElement('button')
    attendingBtn.className='attending-btn'
    attendingBtn.innerHTML="Attend"
    postDetails.appendChild(attendingBtn)

    ////Working on the ATTTEND BUTTON EVENT LISTENER/////
    attendingBtn.addEventListener('click',(e) =>{
        e.preventDefault();
        if(e.target.innerHTML==="Attend"){
            e.target.innerHTML="Attending"
            e.target.classList.add('change-to-attending')
            
            attended.innerHTML=parseInt(attended.innerHTML,10)+1
        }
        else{
            e.target.innerHTML="Attend"
            e.target.classList.remove('change-to-attending')
            attended.innerHTML-=1
        }
       
    })


//     const btns=document.createElement('div')
//     const commentBtn=document.createElement('div')
//     commentButton.className='comment-btn'

//     commentBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
//   </svg> <span class="comments">${post.commentsCount} comments</span>`

//   const likeBtn=document.createElement('div')
//     commentButton.className='like-btn'
//     commentBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//   </svg> <span class="comments">${post.likesCount} likes</span>`

// Create parent container element
const parentContainer = document.createElement("div");
parentContainer.className = "btns";

// Create comment button container
const commentBtnContainer = document.createElement("div");
commentBtnContainer.className = "comment-btn";

// Create comment button SVG element
const commentBtnSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
commentBtnSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
commentBtnSVG.setAttribute("fill", "none");
commentBtnSVG.setAttribute("viewBox", "0 0 24 24");
commentBtnSVG.setAttribute("stroke-width", "1.5");
commentBtnSVG.setAttribute("stroke", "currentColor");
commentBtnSVG.className = "w-6 h-6";

// Create path element for comment button SVG
const commentBtnPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
commentBtnPath.setAttribute("stroke-linecap", "round");
commentBtnPath.setAttribute("stroke-linejoin", "round");
commentBtnPath.setAttribute("d", "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z");

// Append path element to SVG element
commentBtnSVG.appendChild(commentBtnPath);

// Create comment count span element
const commentCountSpan = document.createElement("span");
commentCountSpan.className = "comments";
commentCountSpan.textContent = "20 comments";

// Append SVG and span elements to comment button container
commentBtnContainer.appendChild(commentBtnSVG);
commentBtnContainer.appendChild(commentCountSpan);

// Create like button container
const likeBtnContainer = document.createElement("div");
likeBtnContainer.className = "like-btn";

// Create like button SVG element
const likeBtnSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
likeBtnSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
likeBtnSVG.setAttribute("fill", "none");
likeBtnSVG.setAttribute("viewBox", "0 0 24 24");
likeBtnSVG.setAttribute("stroke-width", "1.5");
likeBtnSVG.setAttribute("stroke", "currentColor");
likeBtnSVG.className = "w-6 h-6";

// Create path element for like button SVG
const likeBtnPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
likeBtnPath.setAttribute("stroke-linecap", "round");
likeBtnPath.setAttribute("stroke-linejoin", "round");
likeBtnPath.setAttribute("d", "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z");

// Append path element to SVG element
likeBtnSVG.appendChild(likeBtnPath);

// Create like count span element
const likeCountSpan = document.createElement("span");
likeCountSpan.className = "likes";
likeCountSpan.textContent =`${post.likesCount} likes`;

// Append SVG and span elements to like button container
likeBtnContainer.appendChild(likeBtnSVG);
likeBtnContainer.appendChild(likeCountSpan);

// Append comment and like button containers to the parent container
parentContainer.appendChild(commentBtnContainer);
parentContainer.appendChild(likeBtnContainer);

// Add the parent container to the desired location in your HTML document
// For example, assuming you have a container with the id "myContainer"
// const container = document.getElementById("myContainer");
// container.appendChild(parentContainer);

    // btns.appendChild(commentBtn)
    // btns.appendChild(likeBtn)
    postDetails.appendChild(parentContainer);
    container.appendChild(postDetails)///////// APPENDING

    ////adding event listener to comment button
    commentBtnSVG.addEventListener('click', () =>{
        commentsSection.classList.remove("hide-comment-section");
        document.body.style.overflow='hidden';
    })

    ////ADDING EVENT LISTENER ON THE LIKE BUTTON
    let liker=post.likesCount;
    if(post.counter%2===0){
        likeBtnSVG.setAttribute("fill", "red");
        likeBtnSVG.setAttribute("stroke", "red");
        liker=post.likesCount-1;
    }
    else{
        likeBtnSVG.setAttribute("fill", "none");
        likeBtnSVG.setAttribute("stroke", "currentColor");
        liker=post.likesCount+1;
    }
    
    likeBtnSVG.addEventListener('click',(e) =>{
        
        e.preventDefault();
        let counter = post.counter+1;
        const feedback ={
counter:counter,
likesCount:liker
        }

        fetch(`http://localhost:3000/posts/${post.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedback)

        })

    })

}))

.catch((error) =>{
alert("There was an error")
console.log(error)
})



///////////////////////Entering the trending section //////////////////////
fetch('http://localhost:3000/trending')
.then(response => response.json())
.then(data => {
    data.forEach(trend1 =>{
        const allLists=document.querySelector('.all-lists')
        const li=document.createElement('li');
        const trend=document.createElement('div')
        trend.className='trend'
        const a = document.createElement('a');
        a.href="http://www.tubidy.com"
        a.innerHTML=trend1.title
        trend.appendChild(a)
        li.appendChild(trend)

        const attending2=document.createElement('div')
        attending2.className='attending2'
        attending2.innerHTML=`${trend1.attendingCount} attending`
        li.appendChild(attending2)

        ///major appending
        allLists.appendChild(li)
    })
})
 .catch(error =>{
    alert("There was an error")
    console.log(error)
 })

 /////Dealing with the following section on the right

 fetch('http://localhost:3000/following')
 .then(response => response.json())
 .then(data => data.forEach(followingP =>{

    const followingTrend=document.querySelector('.following-trend')
    const followingCont=document.createElement('div')
    followingCont.className='following-cont'
    followingTrend.appendChild(followingCont)

    const followingImage=document.createElement('div')
    followingImage.className='following-image'
    const followingImage2=document.createElement('img')
    followingImage2.className='following-image2'
    followingImage2.src=followingP.imageURL
    followingImage.appendChild(followingImage2)
    followingCont.appendChild(followingImage)

    const followingDetails=document.createElement('div')
    const followingUsername=document.createElement('p')
    followingUsername.className='following-username'
    followingUsername.innerHTML=followingP.name
    const newPosts=document.createElement('p')
    newPosts.className='new-posts'
    newPosts.innerHTML=`${followingP.postsCount} new posts`
    followingDetails.appendChild(followingUsername)
    followingDetails.appendChild(newPosts)
    followingCont.appendChild(followingDetails)


 }))

 const commentDisplay=document.querySelector('.comment-display')
 /////FETCHING MY COMMENTS FROM THE SERVER
 fetch('http://localhost:3000/comments')
 .then(response => response.json())
 .then(data => data.forEach(eachComment => {
    
    const comment=document.createElement('div')
    comment.className='comment' 
    commentDisplay.appendChild(comment)//appending commment


    const commentImage2=document.createElement('div')
    commentImage2.className='comment-image2'
    const comImage=document.createElement('img')
    comImage.src=eachComment.userPhotoURL
    commentImage2.appendChild(comImage)
    comment.appendChild(commentImage2)//appending comment image2

    const commentDetails=document.createElement('div')
    commentDetails.className='comment-details'
    const commentUsername=document.createElement('p')
    commentUsername.className='comment-username'
    commentUsername.innerHTML=eachComment.username
    const commentItself=document.createElement('p')
    commentItself.className='comment-itself'
    commentItself.innerHTML=eachComment.description
    commentDetails.appendChild(commentUsername)
    commentDetails.appendChild(commentItself)
    comment.appendChild(commentDetails)//apppending comment details


    const commentOpinion=document.createElement('div')
    commentOpinion.className='comment-opinion'
    comment.appendChild(commentOpinion)//appending comment opinion

    const likeCommentBtn=document.createElement('div')
    likeCommentBtn.className='like-comment-btn'

// Create the SVG element
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svg.setAttribute("fill", "none");
svg.setAttribute("viewBox", "0 0 24 24");
svg.setAttribute("stroke-width", "1.5");
svg.setAttribute("stroke", "currentColor");
svg.className = "w-6 h-6";
// Create the path element within the SVG
const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("stroke-linecap", "round");
path.setAttribute("stroke-linejoin", "round");
path.setAttribute("d", "M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z");
// Append the path element to the SVG element
svg.appendChild(path);
// Create the span element
const span = document.createElement("span");
span.className = "like2";
span.textContent = eachComment.likesCount;

// Append the SVG and span elements to the parent container
likeCommentBtn.appendChild(svg);
likeCommentBtn.appendChild(span);
commentOpinion.appendChild(likeCommentBtn);




// Create parent container element
const dislikeCommentBtn = document.createElement("div");
dislikeCommentBtn.className = "dislike-comment-btn";
// Create SVG element
const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svgElement.setAttribute("fill", "none");
svgElement.setAttribute("viewBox", "0 0 24 24");
svgElement.setAttribute("stroke-width", "1.5");
svgElement.setAttribute("stroke", "currentColor");
svgElement.className = "w-6 h-6";

// Create path element for the SVG
const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
pathElement.setAttribute("stroke-linecap", "round");
pathElement.setAttribute("stroke-linejoin", "round");
pathElement.setAttribute("d", "M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384");

// Append path element to SVG element
svgElement.appendChild(pathElement);

// Append SVG element to parent container
dislikeCommentBtn.appendChild(svgElement);
commentOpinion.appendChild(dislikeCommentBtn)







 }))
 .catch(error =>{
    alert("There is an error")
    console.log(error)
 })


 ///////THE COMMENT FOOTER
 const sendImg=document.querySelector('.send-img')
 fetch('http://localhost:3000/profile')
 .then(response => response.json())
 .then(data =>{
    sendImg.src=data[0].imageURL
 })
 

 ////COMMENT FOOTER FORM 
 const footerForm = document.querySelector('.footer-form')



 
 footerForm.addEventListener('submit',(e) =>{
    e.preventDefault();
const commentInput=document.querySelector('.comment-input').value
const commentUpdate={
    username: document.querySelector('.username').innerHTML,
    userPhotoURL: document.querySelector('.p-image').src,
    description: commentInput,
    likesCount: 201
}

fetch('http://localhost:3000/comments',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify(commentUpdate)
})
.then(response => response.json())
.then(data =>{





    const comment=document.createElement('div')
    comment.className='comment' 
    commentDisplay.appendChild(comment)//appending commment


    const commentImage2=document.createElement('div')
    commentImage2.className='comment-image2'
    const comImage=document.createElement('img')
    comImage.src=data.userPhotoURL
    commentImage2.appendChild(comImage)
    comment.appendChild(commentImage2)//appending comment image2

    const commentDetails=document.createElement('div')
    commentDetails.className='comment-details'
    const commentUsername=document.createElement('p')
    commentUsername.className='comment-username'
    commentUsername.innerHTML=data.username
    const commentItself=document.createElement('p')
    commentItself.className='comment-itself'
    commentItself.innerHTML=data.description
    commentDetails.appendChild(commentUsername)
    commentDetails.appendChild(commentItself)
    comment.appendChild(commentDetails)//apppending comment details


    const commentOpinion=document.createElement('div')
    commentOpinion.className='comment-opinion'
    comment.appendChild(commentOpinion)//appending comment opinion

    const likeCommentBtn=document.createElement('div')
    likeCommentBtn.className='like-comment-btn'

// Create the SVG element
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svg.setAttribute("fill", "none");
svg.setAttribute("viewBox", "0 0 24 24");
svg.setAttribute("stroke-width", "1.5");
svg.setAttribute("stroke", "currentColor");
svg.className = "w-6 h-6";
// Create the path element within the SVG
const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("stroke-linecap", "round");
path.setAttribute("stroke-linejoin", "round");
path.setAttribute("d", "M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z");
// Append the path element to the SVG element
svg.appendChild(path);
// Create the span element
const span = document.createElement("span");
span.className = "like2";
span.textContent = data.likesCount;

// Append the SVG and span elements to the parent container
likeCommentBtn.appendChild(svg);
likeCommentBtn.appendChild(span);
commentOpinion.appendChild(likeCommentBtn);




// Create parent container element
const dislikeCommentBtn = document.createElement("div");
dislikeCommentBtn.className = "dislike-comment-btn";
// Create SVG element
const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svgElement.setAttribute("fill", "none");
svgElement.setAttribute("viewBox", "0 0 24 24");
svgElement.setAttribute("stroke-width", "1.5");
svgElement.setAttribute("stroke", "currentColor");
svgElement.className = "w-6 h-6";

// Create path element for the SVG
const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
pathElement.setAttribute("stroke-linecap", "round");
pathElement.setAttribute("stroke-linejoin", "round");
pathElement.setAttribute("d", "M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384");

// Append path element to SVG element
svgElement.appendChild(pathElement);

// Append SVG element to parent container
dislikeCommentBtn.appendChild(svgElement);
commentOpinion.appendChild(dislikeCommentBtn)




})











    e.target.reset();
 })
