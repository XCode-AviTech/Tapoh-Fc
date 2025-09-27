 // Seeded random functions
  function seededRandom(seed) {
    return function() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }

  function pickRandomQuotes(quotes, count, seed) {
    const rand = seededRandom(seed);
    const quotesCopy = [...quotes];
    const selected = [];

    for (let i = 0; i < count && quotesCopy.length > 0; i++) {
      const idx = Math.floor(rand() * quotesCopy.length);
      selected.push(quotesCopy[idx]);
      quotesCopy.splice(idx, 1);
    }
    return selected;
  }

  async function loadDailyQuoteSlides() {
    try {
      const response = await fetch('../json/football_quotes.json');
      const quotes = await response.json();

      const now = new Date();
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
      const pastDaysOfYear = Math.floor((now - firstDayOfYear) / 86400000);
      const weekNumber = Math.floor((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
      const dayOfWeek = now.getDay();
      const seed = weekNumber * 7 + dayOfWeek;

      const dailyQuotes = pickRandomQuotes(quotes, 10, seed);

      const container = document.getElementById('quotes-container');
      container.innerHTML = '';

      if (dailyQuotes.length > 0) {
        dailyQuotes.forEach(q => {
          const slide = document.createElement('div');
          slide.classList.add('swiper-slide');
          slide.innerHTML = `
            <div class="quote">
              <div class="txt">
                <i class="op">"</i>
                <p>${q.quote}</p>
                <i class="cl">"</i>
              </div>
              <div class="auth">
                <small>~ ${q.author}</small>
              </div>
            </div>
          `;
          container.appendChild(slide);
        });
      } else {
        container.innerHTML = `<div class="swiper-slide"><p>⚽ No quotes available today.</p></div>`;
      }

      // Do NOT reinitialize Swiper here — your existing Swiper logic will handle it

    } catch (error) {
      console.error("Error loading quotes:", error);
      document.getElementById('quotes-container').innerHTML = `
        <div class="swiper-slide"><p>⚽ Could not load quotes.</p></div>
      `;
    }
  }

  loadDailyQuoteSlides();