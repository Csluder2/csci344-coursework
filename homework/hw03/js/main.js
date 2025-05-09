import { getAccessToken } from './utilities.js';
const rootURL = 'https://photo-app-secured.herokuapp.com';
let token = null;
let username = 'webdev';
let password = 'password';

async function initializeScreen() {
  token = await getToken();
  showNav();
  getStories();
  getPosts();
  getSuggested();
  getProfile();
}

async function getToken() {
  return await getAccessToken(rootURL, username, password);
}

function showNav() {
  document.querySelector('#nav').innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:
async function getPosts() {
  const endpoint =
    'https://photo-app-secured.herokuapp.com/api/posts/?limit=10';
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const posts = await response.json();

  console.log(posts);

  //invoke this function to show posts to screen
  showPosts(posts);
}

async function getSuggested() {
  const endpoint =
    'https://photo-app-secured.herokuapp.com/api/suggestions/';
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const suggestedAccounts = await response.json();
  console.log(suggestedAccounts);

  showSuggested(suggestedAccounts);
}

async function getStories() {
  const endpoint =
    'https://photo-app-secured.herokuapp.com/api/stories/';
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const stories = await response.json();
  console.log(stories);
  showStories(stories.slice(0, 7));
}

async function getProfile() {
  const endpoint =
    'https://photo-app-secured.herokuapp.com/api/profile/';
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const profile = await response.json();
  console.log(profile);
  showProfile(profile);
}
function showProfile(profile) {
  const headerEl = document.querySelector('header');
  const template = `<header class="flex gap-4 items-center">
            <img src="https://picsum.photos/60/60?q=11" class="rounded-full w-16" />
            <h2 class="font-Comfortaa font-bold text-2xl">${profile.username}</h2>
        </header>`;
  headerEl.insertAdjacentHTML('beforeend', template);
}

function showSuggested(suggestedAccounts) {
  const mainEl = document.querySelector('aside');
  suggestedAccounts.forEach((suggestion) => {
    const template = `<section class="flex justify-between items-center mb-4 gap-2">
                <img src=${suggestion.thumb_url} class="rounded-full" />
                <div class="w-[180px]">
                    <p class="font-bold text-sm">${suggestion.username}</p>
                    <p class="text-gray-500 text-xs">suggested for you</p>
                </div>
                <button class="text-blue-500 text-sm py-2">follow</button>
            </section>`;
    mainEl.insertAdjacentHTML('beforeend', template);
  });
}

function showStories(stories) {
  const mainEl = document.querySelector('main > header');
  mainEl.innerHTML = '';
  stories.forEach((story) => {
    const template = `
            <div class="flex flex-col justify-center items-center">
                <img src="${story.user.thumb_url}" class="rounded-full border-4 border-gray-300" />
                <p class="text-xs text-gray-500">${story.user.username}</p>
            </div>`;

    mainEl.insertAdjacentHTML('beforeend', template);
  });
}
function showPosts(posts) {
  const mainEl = document.querySelector('main');
  posts.forEach((post) => {
    const template = `<section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${
                  post.user.username
                }</h3>
                <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="${
      post.alt_text
    }" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        ${getLikeButton(post)}
                        <button><i class="far fa-comment"></i></button>
                        <button><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${getBookMarkButton(post)}
                    </div>
                </div>
                <p class="font-bold mb-3">${
                  post.likes.length
                } like(s)</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${post.user.username}</strong>
                         ${post.caption}
                    </p>
                </div>
                ${showComments(post.comments)}
                <p class="uppercase text-gray-500 text-xs">${
                  post.display_time
                }</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button class="text-blue-500 py-2">Post</button>
            </div>
        </section>`;
    mainEl.insertAdjacentHTML('beforeend', template);
  });
}

function showComments(comments) {
  if (comments.length > 1) {
    const lastComment = comments[comments.length - 1];
    return `<button>view all ${comments.length} comments</button>

        <p class= "text-sm mb-3">
        <strong>${lastComment.user.username}</strong> ${lastComment.text}
        </p>`;
  }
  if (comments.length === 1) {
    const lastComment = comments[0];
    return `<p class= "text-sm mb-3">
        <strong>${lastComment.user.username}</strong> ${lastComment.text}
        </p>`;
  }
  return '';
}

function getLikeButton(post) {
  if (post.current_user_like_id) {
    return `<button onclick="deleteHeart(${post.current_user_like_id})"><i class="fa-solid text-red-700 fa-heart"></i></button>`;
  }
  // not bookmarked
  else {
    return `<button onclick="createHeart(${post.id})"><i class="far fa-heart"></i></button>`;
  }
}

function getBookMarkButton(post) {
  // already bookmarked
  if (post.current_user_bookmark_id) {
    return `<button onclick="deleteBookmark(${post.current_user_bookmark_id})"><i class="fa-solid fa-bookmark"></i></button>`;
  }
  // not bookmarked
  else {
    return `<button onclick="createBookmark(${post.id})"><i class="far fa-bookmark"></i></button>`;
  }
}

window.createHeart = async function (heartPostID) {
  const postData = {
    post_id: heartPostID,
  };

  const response = await fetch(
    'https://photo-app-secured.herokuapp.com/api/likes/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};

window.deleteHeart = async function (HeartId) {
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/likes/${HeartId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
};

window.createBookmark = async function (postID) {
  const postData = {
    post_id: postID,
  };

  const response = await fetch(
    'https://photo-app-secured.herokuapp.com/api/bookmarks/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};

window.deleteBookmark = async function (bookmarkId) {
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
};

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
