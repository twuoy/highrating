enum RatingSiteURL {
  DOUBAN = 'https://www.douban.com/search',
  GOOGLE = 'https://www.google.com/search',
  IMDB = 'https://www.imdb.com/find',
}

const SEARCH_BTN_AND_SITE_MAP = {
  google_search_btn: RatingSiteURL.GOOGLE,
  douban_search_btn: RatingSiteURL.DOUBAN,
  imdb_search_btn: RatingSiteURL.IMDB,
};

export { RatingSiteURL, SEARCH_BTN_AND_SITE_MAP };
