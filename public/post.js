// 뒤로가기 버튼 로직
document.querySelector('.move-posts').addEventListener('click', () => {
  window.location.href = '/posts';
});

// 드롭다운 메뉴 로직
const profileImageDropdown = document.querySelector('.profile-image-dropdown');

document.querySelector('.profile-image').addEventListener('click', () => {
  profileImageDropdown.classList.toggle('show');
});

// 게시글 수정 버튼 로직
// document.getElementById('post-update-button').addEventListener('click', () => {
//   window.location.href = '/update-post';
// });

// 조회수, 댓글수에 따라 텍스트 변경 로직
function changeTextToInnerText(text) {
  const value = parseInt(text.innerText);

  if (isNaN(value) || value < 0) {
    text.innerText = 'ERROR';
  } else if (value < 1000) {
    // 무시
  } else if (value < 10000) {
    text.innerText = '1k';
  } else if (value < 100000) {
    text.innerText = '10k';
  } else {
    text.innerText = '100k';
  }
}

changeTextToInnerText(document.getElementById('views-value-text'));
changeTextToInnerText(document.getElementById('comments-value-text'));

// 댓글 입력 관련 로직
const commentInput = document.getElementById('comment-input');
const commentSubmitButton = document.getElementById('comment-submit-button');

commentInput.addEventListener('change', () => {
  const value = commentInput.value.trim();

  commentSubmitButton.style.backgroundColor =
    value.length == 0 ? '#ACA0EB' : '#7F6AEE';
});

// 게시글 삭제 버튼 관련 로직
// const postDeleteModal = document.getElementById('post-delete-modal');

// document.getElementById('post-delete-button').addEventListener('click', () => {
//   // 스크롤 방지
//   document.body.classList.add('stop-scroll');

//   postDeleteModal.style.display = 'flex';
// });

// 게시글 삭제 버튼, 취소
document
  .getElementById('post-delete-modal-cancel-button')
  .addEventListener('click', () => {
    // 스크롤 방지 해제
    document.body.classList.remove('stop-scroll');

    postDeleteModal.style.display = 'none';
  });

// 게시글 삭제 버튼, 확인
document
  .getElementById('post-delete-modal-confirm-button')
  .addEventListener('click', () => {
    // 스크롤 방지 해제
    document.body.classList.remove('stop-scroll');

    postDeleteModal.style.display = 'none';

    window.location.href = '/posts';
  });

// 댓글 삭제 버튼 관련 로직
const commentDeleteButtons = document.querySelectorAll(
  '.comment-delete-button'
);
const commentDeleteModal = document.getElementById('comment-delete-modal');

commentDeleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Q: 댓글 id는 어떻게 받지?
    // A: 버튼을 생성할 때, 삭제 이벤트도 같이 만들어 id를 미리 넣어둔다.

    // 스크롤 방지
    document.body.classList.add('stop-scroll');

    commentDeleteModal.style.display = 'flex';
  });
});

// 댓글 삭제 버튼, 취소
document
  .getElementById('comment-delete-modal-cancel-button')
  .addEventListener('click', () => {
    // 스크롤 방지 해제
    document.body.classList.remove('stop-scroll');

    commentDeleteModal.style.display = 'none';
  });

// 댓글 삭제 버튼, 확인
document
  .getElementById('comment-delete-modal-confirm-button')
  .addEventListener('click', () => {
    // 스크롤 방지 해제
    document.body.classList.remove('stop-scroll');

    commentDeleteModal.style.display = 'none';
  });

const postId = parseInt(window.location.href.match(/\/(\d+)$/)[1]);
const postHeader = document.getElementById('post-header');
const postInfoContainer = document

fetch('/json/posts.json')
.then(response => {
  if (!response.ok) {
    throw new Error();
  }

  response.json().then(json =>{
    const foundPost = json.posts.find(post => post.id === postId);

    if (!foundPost) {
      throw new Error();
    }

    const postTitle = document.createElement('p');
    postTitle.innerText = `${foundPost.title}`;
    postTitle.id = 'post-title';

    postHeader.appendChild(postTitle);

    const postInfoContainer = document.createElement('div');
    postInfoContainer.id = 'post-info-container';

    const postAuthorImage = document.createElement('img');
    postAuthorImage.id = 'post-author-image';
    postAuthorImage.src = `${foundPost.author.imageUrl}`;

    postInfoContainer.appendChild(postAuthorImage);

    const postAuthorName = document.createElement('span');
    postAuthorName.id = 'post-author-name';
    postAuthorName.innerText = `${foundPost.author.name}`;

    postInfoContainer.appendChild(postAuthorName);

    const postCreatedDate = document.createElement('span');
    postCreatedDate.id = 'post-created-date';
    postCreatedDate.innerText = `${foundPost.createdDate}`;

    postInfoContainer.appendChild(postCreatedDate);

    // TODO 버튼 다음에

    postHeader.appendChild(postInfoContainer);
  })
})
.catch(error => {
  alert(error.message);

  console.error(error);
})