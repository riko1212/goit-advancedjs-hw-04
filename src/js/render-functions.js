const renderHTMLElement = (node, content, position = 'beforeend') => {
  node.insertAdjacentHTML(position, content);
};

const removeInnerHTMLElement = (node) => {
  node.innerHTML = '';
};

export const renderSearchForm = (node) => {
  const content = `
    <form class="search-form" id="search-form">
      <input
        type="text"
        name="search"
        autocomplete="off"
        placeholder="Search images..."
      />
      <button type="submit" class="button">Search</button>
    </form>
  `;

  renderHTMLElement(node, content);
};

export const renderGalleryWrapper = (node) => {
  const content = `<div class="gallery" id="gallery"></div>`;

  renderHTMLElement(node, content);
};

export const renderGalleryItems = (node, images) => {
  const content = images.map((image) => `
    <div class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="gallery-item-info">
        <div>
          <b>Likes</b>
          ${image.likes}
        </div>
        <div>
          <b>Views</b>
          ${image.views}
        </div>
        <div>
          <b>Comments</b>
          ${image.comments}
        </div>
        <div>
          <b>Downloads</b>
          ${image.downloads}
        </div>
      </div>
    </div>
  `)
  .join('');

  renderHTMLElement(node, content);
};

export const renderImages = (node, images) => {
  renderGalleryItems(node, images);
}

export const renderNewImages = (node, images) => {
  removeInnerHTMLElement(node);

  if (images && images.length) {
    renderImages(node, images);
  }
};

export const renderLoader = (node) => {
  const content = `
    <div class="loader-wrapper hidden">
      <div class="loading ">Loading images, please wait...</div>
      <span class="loader"></span>
    </div>
  `;

  renderHTMLElement(node, content);
};

export const renderButton = (node) => {
  const content = `
    <button type="button" class="button load-more hidden">Load more</button>
  `;

  renderHTMLElement(node, content);
}