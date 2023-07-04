
const commentButton=document.querySelectorAll('.comment-btn');
const commentsSection = document.querySelector('.comments-section');

commentsSection.classList.add('hide-comment-section')

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
imagePostForm.addEventListener('submit', (e) =>{
e.preventDefault();
continuePosting.classList.remove('boom')

imagePostForm.reset();
})


//adding event listener to cp-cancel
const cpCancelBtn=document.querySelector('.cp-cancel');
cpCancelBtn.addEventListener('click',() =>{
    continuePosting.classList.add('boom')
})

// SECOND FORM ON THE CREATE 
const cpDetailsPostForm = document.querySelector('.cp-details');
cpDetailsPostForm.addEventListener('submit', (e) =>{
    e.preventDefault();

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

/////Dealing with create post button
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


