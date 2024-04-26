// 뒤로가기 버튼 로직
document.querySelector('.move-posts').addEventListener('click', () => {
  window.location.href = 'posts.html';
});

// 드롭다운 메뉴 로직
const profileImageDropdown = document.querySelector('.profile-image-dropdown');

document.querySelector('.profile-image').addEventListener('click', () => {
  profileImageDropdown.classList.toggle('show');
});

// 게시글 수정 버튼 로직
document.querySelector('.post-update-button').addEventListener('click', () => {
  window.location.href = 'update-post.html';
});

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
const postDeleteModal = document.getElementById('post-delete-modal');

document.getElementById('post-delete-button').addEventListener('click', () => {
  // 스크롤 방지
  document.body.classList.add('stop-scroll');

  postDeleteModal.style.display = 'flex';
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

    window.location.href = 'posts.html';
  });

// 댓글 삭제 버튼 관련 로직
const commentDeleteButton = document.getElementById('comment-delete-button');
const commentDeleteModal = document.getElementById('comment-delete-modal');

commentDeleteButton.addEventListener('click', () => {
  // 스크롤 방지
  document.body.classList.add('stop-scroll');

  commentDeleteModal.style.display = 'flex';
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
