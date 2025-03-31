const ENDPOINT_WIKIPEDIA =
  'https://en.wikipedia.org/api/rest_v1/page/summary';

async function getWikipediaArticle(searchTerm) {
  // your code here...
}

function dataToHTML(wikiArticle) {
  // your code here...
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
                                  <strong>${
                                    post.user.username
                                  }</strong>
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
}

// Uncomment these functions when you're ready to test:
// testGetWikipediaArticles(); // Part A
// testDisplayArticles(); // Part B

// Please do not modify the testGetWikipediaArticles() function
async function testGetWikipediaArticles() {
  const western = await getWikipediaArticle(
    'Western Carolina University'
  );
  const unca = await getWikipediaArticle('UNC Asheville');
  const app = await getWikipediaArticle('Appalachian State');
  const charlotte = await getWikipediaArticle('UNC Charlotte');
  console.log(western);
  console.log(unca);
  console.log(app);
  console.log(charlotte);
  return [western, unca, app, charlotte];
}

// Please do not modify the testDisplayArticles() function
async function testDisplayArticles() {
  const container = document.querySelector('#wiki-previews');
  const pages = await testGetWikipediaArticles();
  pages.forEach((page) => {
    container.insertAdjacentHTML('beforeend', dataToHTML(page));
  });
}
