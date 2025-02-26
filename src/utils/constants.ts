type sortOptions = { [key: string]: string };

const newsAPICategories = [
  { value: "business", name: "Business" },
  { value: "entertainment", name: "Entertainment" },
  { value: "general", name: "General" },
  { value: "health", name: "Health" },

  { value: "science", name: "Science" },
  { value: "sports", name: "Sports" },
  { value: "technology", name: "Technology" },
];

const newYorkTimesCategories = [
  { value: "arts", name: "Arts" },
  { value: "automobiles", name: "Automobiles" },
  { value: "books", name: "Books" },
  { value: "business", name: "Business" },
  { value: "africa", name: "Africa" },
  { value: "america", name: "Americas" },
  { value: "artsanddesign", name: "ArtandDesign" },
  { value: "arts", name: "Arts" },
  { value: "asia-pacific", name: "AsiaPacific" },
  { value: "automobiles", name: "Automobiles" },
  { value: "baseball", name: "Baseball" },
  { value: "books-review", name: "Books/Review" },
  { value: "business", name: "Business" },
  { value: "climate", name: "Climate" },
  { value: "college-basketball", name: "CollegeBasketball" },
  { value: "college-football", name: "CollegeFootball" },
  { value: "dance", name: "Dance" },
  { value: "dealbook", name: "Dealbook" },
  { value: "dining-and-wine", name: "DiningandWine" },
  { value: "economy", name: "Economy" },
  { value: "education", name: "Education" },
  { value: "energy-environment", name: "EnergyEnvironment" },
  { value: "europe", name: "Europe" },
  { value: "fashion-and-style", name: "FashionandStyle" },
  { value: "golf", name: "Golf" },
  { value: "health", name: "Health" },
  { value: "hockey", name: "Hockey" },
  { value: "home-page", name: "HomePage" },
  { value: "jobs", name: "Jobs" },
  { value: "lens", name: "Lens" },
  { value: "media-and-advertising", name: "MediaandAdvertising" },
  { value: "middle-east", name: "MiddleEast" },
  { value: "most-emailed", name: "MostEmailed" },
  { value: "most-shared", name: "MostShared" },
  { value: "most-viewed", name: "MostViewed" },
  { value: "movies", name: "Movies" },
  { value: "music", name: "Music" },
  { value: "ny-region", name: "NYRegion" },
  { value: "obituaries", name: "Obituaries" },
  { value: "personal-tech", name: "PersonalTech" },
  { value: "politics", name: "Politics" },
  { value: "pro-basketball", name: "ProBasketball" },
  { value: "pro-football", name: "ProFootball" },
  { value: "real-estate", name: "RealEstate" },
  { value: "science", name: "Science" },
  { value: "small-business", name: "SmallBusiness" },
  { value: "soccer", name: "Soccer" },
  { value: "space", name: "Space" },
  { value: "sports", name: "Sports" },
  { value: "sunday-book-review", name: "SundayBookReview" },
  { value: "sunday-review", name: "Sunday-Review" },
  { value: "technology", name: "Technology" },

  { value: "theater", name: "Theater" },
  { value: "tmagazine", name: "TMagazine" },
  { value: "travel", name: "Travel" },
  { value: "upshot", name: "Upshot" },
  { value: "us", name: "US" },
  { value: "weddings", name: "Weddings" },
  { value: "well", name: "Well" },
  { value: "world", name: "World" },
  { value: "your-money", name: "YourMoney" },
];

export const guardianEquivalents: sortOptions = {
  mostRecent: "newest",
  oldest: "oldest",
  mostPopular: "relevance",
};

export const nytEquivalents: sortOptions = {
  mostRecent: "publishedAt",
  oldest: "relevancy",
  mostPopular: "popularity",
};

export const menuItems = [
  { name: "Your Feed", link: "/feed" },
  { name: "Climate", link: "/category/climate" },
  { name: "US", link: "/category/us" },
  { name: "World", link: "/category/world" },
  { name: "Sports", link: "/category/sports" },
  { name: "Science", link: "/category/science" },
];

export const BASE_URLS = {
  newsAPI: "https://newsapi.org/v2/everything",
  guardianAPI: "https://content.guardianapis.com/search",
  nytAPI: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  nytAPIImage: "https://static01.nyt.com/",
};

export const API_KEYS = {
  newsAPI: import.meta.env.VITE_NEWSAPI_ORG_KEY,
  guardianAPI: import.meta.env.VITE_GUARDIAN_KEY,
  nytAPI: import.meta.env.VITE_NYT_KEY,
};

export { newsAPICategories, newYorkTimesCategories };
