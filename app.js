const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/board.html'));
});

app.get('/sign-in', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/sign-in.html'));
});

app.get('/sign-up', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/sign-up.html'));
});

app.get('/board', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/board.html'));
});

app.get('/post/id', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/post.html'));
});

app.get('/posts/:id', (request, response) => {
  console.log('check');

  response.sendFile(path.join(__dirname, '/public/post.html'));
});

app.get('/edit-post', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/edit-post.html'));
});

app.get('/update-post', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/update-post.html'));
});

app.get('/update-profile', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/update-profile.html'));
});

app.get('/update-profile-password', (request, response) => {
  response.sendFile(
    path.join(__dirname, '/public/update-profile-password.html')
  );
});

app.listen(3000);
