(function(){
  const posts = window.bcBlogs || [];
  const perPage = 3;
  const pages = [];
  for(let i = 0; i < posts.length; i += perPage){
    pages.push(posts.slice(i, i + perPage));
  }
  let currentPage = 0;

  const gridEl = document.getElementById('bcGrid');
  const dotsEl = document.getElementById('bcDots');
  const prevBtn = document.getElementById('bcPrevBtn');
  const nextBtn = document.getElementById('bcNextBtn');

  function render(){
    gridEl.innerHTML = '';
    (pages[currentPage] || []).forEach(post => {
      const card = document.createElement('a');
      card.className = 'bc-card';
      card.href = post.url;
      card.innerHTML = `
        <div class="bc-thumb" style="background-image:url('${post.image}');"></div>
        <div class="bc-body">
          <div class="bc-meta">
            <span class="bc-category">${post.category}</span>
            <span>${post.date}</span>
          </div>
          <h3 class="bc-title">${post.title}</h3>
          <p class="bc-excerpt">${post.excerpt}</p>
          <span class="bc-read-more">Read more →</span>
        </div>`;
      gridEl.appendChild(card);
    });

    dotsEl.innerHTML = '';
    if(pages.length > 1){
      pages.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'bc-dot' + (i === currentPage ? ' active' : '');
        d.onclick = () => { currentPage = i; render(); };
        dotsEl.appendChild(d);
      });
    }

    const showArrows = pages.length > 1;
    prevBtn.style.display = showArrows ? 'flex' : 'none';
    nextBtn.style.display = showArrows ? 'flex' : 'none';
  }

  prevBtn.onclick = () => {
    currentPage = (currentPage - 1 + pages.length) % pages.length;
    render();
  };
  nextBtn.onclick = () => {
    currentPage = (currentPage + 1) % pages.length;
    render();
  };

  render();
})();