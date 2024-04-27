// 뒤로가기 버튼 로직
document.querySelector('.move-posts').addEventListener('click', () => {
  window.location.href = '/posts';
});

// 드롭다운 메뉴 로직
const profileImageDropdown = document.querySelector('.profile-image-dropdown');

document.querySelector('.profile-image').addEventListener('click', () => {
  profileImageDropdown.classList.toggle('show');
});

function createPostUpdateButton(postId) {
  const postUpdateButton = document.createElement('button');
  postUpdateButton.className = 'post-button';
  postUpdateButton.id = 'post-update-button';
  postUpdateButton.innerText = '수정';

  postUpdateButton.addEventListener('click', () => {
    // Q: query string 말고 다른 방법 없나?
    window.location.href = `/update-post/${postId}`;
  });

  return postUpdateButton;
}

// 게시글 삭제 버튼 관련 로직
const postDeleteModal = document.getElementById('post-delete-modal');

function createPostDeleteButton(postId) {
  const postDeleteButton = document.createElement('button');
  postDeleteButton.className = 'post-button';
  postDeleteButton.id = 'post-delete-button';
  postDeleteButton.innerText = '삭제';

  postDeleteButton.addEventListener('click', () => {
  // 스크롤 방지
  document.body.classList.add('stop-scroll');

  postDeleteModal.style.display = 'flex';
  });

  return postDeleteButton;
}

function changeUnit(value) {
  if (isNaN(value) || value < 0) {
    text.innerText = 'ERROR';
  } else if (value < 1000) {
    return value;
  } else if (value < 10000) {
    return '1k';
  } else if (value < 100000) {
    return '10k';
  } else {
    return '100k';
  }
}

// 댓글 입력 관련 로직
const commentInput = document.getElementById('comment-input');
const commentSubmitButton = document.getElementById('comment-submit-button');

commentInput.addEventListener('change', () => {
  const value = commentInput.value.trim();

  commentSubmitButton.style.backgroundColor =
    value.length == 0 ? '#ACA0EB' : '#7F6AEE';
});

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
const postBody = document.getElementById('post-body');
const postViews = document.getElementById('views-value-text');
const postComments = document.getElementById('comments-value-text');

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

    postInfoContainer.appendChild(createPostUpdateButton(postId));
    postInfoContainer.appendChild(createPostDeleteButton(postId));

    postHeader.appendChild(postInfoContainer);

    const postImage = document.createElement('img');
    postImage.id = 'post-image';
    postImage.src = `${foundPost.imageUrl}`;

    postBody.appendChild(postImage);

    const postContent = document.createElement('p');
    postContent.innerText = `${foundPost.content}`;

    postBody.appendChild(postContent);

    postViews.innerText = `${changeUnit(foundPost.views)}`;
    postComments.innerText = `${changeUnit(foundPost.comment.count)}`;
  })
})
.catch(error => {
  alert(error.message);

  console.error(error);
})