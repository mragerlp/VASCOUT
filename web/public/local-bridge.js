// Standalone preview adapter. Original hosted source is preserved in src/charming.
(() => {
  const key = 'vascout-preview-reviews-v1';
  const ids = new Set(['imaging', 'coupling', 'pigmentation', 'foreign-body', 'usability', 'clinical-pathway']);
  const read = () => JSON.parse(localStorage.getItem(key) || '{}');
  const localAssets = new Set();
  window.charming = {
    viewer: { can: op => op === 'saveReview' },
    api: () => ({
      getReviews: async () => ({ reviews: read() }),
      saveReview: async input => {
        if (!ids.has(input.questionId) || typeof input.text !== 'string' || input.text.length > 4000 || typeof input.reviewed !== 'boolean') throw new Error('Invalid preview note');
        const reviews = read();
        const record = { text: input.text, reviewed: input.reviewed, updatedAt: new Date().toISOString() };
        reviews[input.questionId] = record;
        localStorage.setItem(key, JSON.stringify(reviews));
        window.dispatchEvent(new Event('vascout-preview-change'));
        return record;
      }
    }),
    assets: { getUrl: name => {
      if (!localAssets.has(name)) throw new Error('This PDF is not available in the local archive.');
      return '/assets/decks/' + encodeURIComponent(name);
    } },
    openLink: async url => window.open(url, '_blank', 'noopener,noreferrer'),
    withUser: async action => action(),
    onStateChange: handler => { window.addEventListener('storage', handler); window.addEventListener('vascout-preview-change', handler); }
  };

  // The archived UI expects a synchronous asset lookup as soon as it renders.
  fetch('/assets/asset-manifest.json').then(response => response.json()).then(manifest => {
    for (const asset of manifest.assets) if (asset.local_path) localAssets.add(asset.key);
  }).catch(() => {}).finally(() => {
    const ui = document.createElement('script');
    ui.src = '/ui.js';
    document.body.append(ui);
  });
})();
