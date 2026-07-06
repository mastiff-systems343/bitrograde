(function(){
  const mcGames = window.mcGames || [];
  const genres = ["All", ...new Set(mcGames.map(g => g.genre))];
  let activeGenre = "All";
  let currentIndex = 0;

  function filteredGames(){
    return activeGenre === "All" ? mcGames : mcGames.filter(g => g.genre === activeGenre);
  }

  const pillsEl = document.getElementById('mcPills');
  genres.forEach(g => {
    const btn = document.createElement('button');
    btn.className = 'mc-pill' + (g === activeGenre ? ' active' : '');
    btn.textContent = g;
    btn.onclick = () => {
      activeGenre = g;
      currentIndex = 0;
      document.querySelectorAll('.mc-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      renderFeatured();
      renderGrid();
    };
    pillsEl.appendChild(btn);
  });

  const bannerEl = document.getElementById('mcBannerEl');
  const bannerContent = document.getElementById('mcBannerContent');
  const eyebrowEl = document.getElementById('mcEyebrow');
  const titleEl = document.getElementById('mcCardTitle');
  const descEl = document.getElementById('mcCardDesc');
  const statusEl = document.getElementById('mcCardStatus');
  const dotsEl = document.getElementById('mcDots');
  const seeMoreBtn = document.getElementById('mcSeeMoreBtn');

  function renderFeatured(){
    const list = filteredGames();
    if(list.length === 0){
      bannerEl.style.background = '#2a1c1c';
      bannerContent.innerHTML = '<p style="color:#7a6666;font-size:14px;">No games in this category yet.</p>';
      eyebrowEl.textContent = '';
      titleEl.textContent = '';
      descEl.textContent = '';
      statusEl.innerHTML = '';
      dotsEl.innerHTML = '';
      seeMoreBtn.style.visibility = 'hidden';
      return;
    }
    seeMoreBtn.style.visibility = 'visible';
    if(currentIndex >= list.length) currentIndex = 0;
    const g = list[currentIndex];

    bannerEl.style.backgroundImage = `url('${g.image}')`;
    bannerEl.style.backgroundSize = 'cover';
    bannerEl.style.backgroundPosition = 'center';
    bannerContent.innerHTML = g.demoAvailable ? `
      <div class="mc-demo-tag">DEMO AVAILABLE NOW</div>
      <div class="mc-icons">
        <div class="mc-icon-pill">⌨</div>
        <div class="mc-icon-pill">🎮</div>
      </div>` : '';

    eyebrowEl.textContent = g.eyebrow;
    titleEl.textContent = g.title;
    descEl.textContent = g.desc;
    statusEl.innerHTML = `STATUS: <b>${g.status.toUpperCase()}</b>`;
    seeMoreBtn.href = g.url;

    dotsEl.innerHTML = '';
    list.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'mc-dot' + (i === currentIndex ? ' active' : '');
      d.onclick = () => { currentIndex = i; renderFeatured(); };
      dotsEl.appendChild(d);
    });
  }

  document.getElementById('mcPrevBtn').onclick = () => {
    const list = filteredGames();
    if(list.length === 0) return;
    currentIndex = (currentIndex - 1 + list.length) % list.length;
    renderFeatured();
  };
  document.getElementById('mcNextBtn').onclick = () => {
    const list = filteredGames();
    if(list.length === 0) return;
    currentIndex = (currentIndex + 1) % list.length;
    renderFeatured();
  };

  const gridView = document.getElementById('mcGridView');
  function renderGrid(){
    const list = filteredGames();
    gridView.innerHTML = '';
    list.forEach(g => {
      const card = document.createElement('a');
      card.className = 'mc-g-card';
      card.href = g.url;
      card.innerHTML = `
        <div class="mc-g-banner" style="background-image:url('${g.image}');background-size:cover;background-position:center;">
          <span class="mc-g-banner-title">${g.title}</span>
        </div>
        <div class="mc-g-info">
          <div class="mc-g-genre">${g.genre}</div>
          <p class="mc-g-title">${g.title}</p>
        </div>`;
      gridView.appendChild(card);
    });
  }

  document.getElementById('mcOrderSelect').onchange = (e) => {
    const val = e.target.value;
    if(val === 'alpha') mcGames.sort((a,b) => a.title.localeCompare(b.title));
    else if(val === 'status') mcGames.sort((a,b) => a.status.localeCompare(b.status));
    currentIndex = 0;
    renderFeatured();
    renderGrid();
  };

  const featuredView = document.getElementById('mcFeaturedView');
  const btnFeatured = document.getElementById('mcBtnFeatured');
  const btnGrid = document.getElementById('mcBtnGrid');
  btnFeatured.onclick = () => {
    featuredView.classList.remove('mc-hidden');
    gridView.classList.add('mc-hidden');
    btnFeatured.classList.add('active');
    btnGrid.classList.remove('active');
  };
  btnGrid.onclick = () => {
    featuredView.classList.add('mc-hidden');
    gridView.classList.remove('mc-hidden');
    btnGrid.classList.add('active');
    btnFeatured.classList.remove('active');
  };

  renderFeatured();
  renderGrid();
})();