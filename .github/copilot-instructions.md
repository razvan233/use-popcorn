**Purpose**

This file gives AI coding agents focused, actionable knowledge to be immediately productive in this Create React App repository. It is intentionally concise and tied to concrete files and patterns found in the codebase.

**Big Picture**

- **Project type**: A small React app bootstrapped with Create React App. Entry is `src/index.js`. It's a movie search and watchlist app using the OMDB API.
- **Architecture**: Centralized state in `src/components/App.js` manages:
  - `movies`: search results from OMDB API (fetched live)
  - `watched`: persistent list of movies marked as watched with user ratings
  - `query`: search input value that triggers API fetches
  - `selectedID`: currently selected movie for detail view
- **Two-pane UI**: Search results on left → click movie → detail view/rating on right. WatchList displays when no movie selected.
- **API integration**: Uses OMDB API via environment variables `REACT_APP_BASE_URL` and `REACT_APP_API_KEY` (see `src/utils/api.js`). Fetch logic in `App.js` and `MovieDetails.js` with error handling for missing config.

**Core data flows**

1. **Search flow**: User types in `Search` → sets `query` state → `useEffect` in `App` fetches movies from OMDB → updates `movies` state → renders in `MovieList`
2. **Selection flow**: Click `Movie` → sets `selectedID` → renders `MovieDetails` panel fetching full movie data
3. **Rating flow**: `MovieDetails` lets user rate with `StarRating` → `setWatched` callback updates watched list with rating
4. **Deletion flow**: `WatchList` delete button → filters out movie by `imdbID` → updates `watched` state

**Component hierarchy**

```
App (state owner)
├─ NavBar (layout)
│  ├─ Logo
│  ├─ Search (onChange → setQuery)
│  └─ NoOfResults
└─ Main (layout)
   ├─ Loader (when isLoading)
   ├─ ErrorMessage (when error)
   ├─ MovieList (onClick → setSelectedID)
   │  └─ Movie (renders list item, accepts children)
   │     └─ InfoAttribute (child insertion pattern)
   └─ MovieDetails OR WatchList (conditional on selectedID)
      ├─ MovieDetails (fetches via selectedID, has StarRating)
      └─ WatchList (displays average stats, delete button)
```

**Project-specific patterns**

- **Children pattern**: `Movie` and `Box` components accept `children` for flexible composition. Used to inject `InfoAttribute` and `MovieInfo` without prop explosion. This is the core extension pattern.
- **Updater functions**: When modifying watched list (e.g., adding rating), use `setWatched((prev) => [...])` not direct state. See `MovieDetails.js` lines 20–32 for pattern.
- **Conditional rendering**: Use ternary operators for pane switching: `selectedID ? <MovieDetails /> : <WatchList />`
- **Property extraction**: Movie data shapes differ between search results (basic) and details fetch (enriched with runtime, genres, etc.). Always check what fields are available.

**Developer Workflows**

- **Start dev**: `npm start` → http://localhost:3000 (CRA default, auto-reload on changes)
- **Test**: `npm test` (CRA interactive runner). Only scaffolding present; no tests exist yet.
- **Build**: `npm run build` (production bundle)
- **Environment**: Create `.env` file with `REACT_APP_BASE_URL=https://www.omdbapi.com` and `REACT_APP_API_KEY=<your_key>`. Missing vars log errors but don't crash.

**Styling & UI conventions**

- Global CSS only: `src/index.css` (no CSS modules, no styled-components)
- BEM-style class names: `list`, `list-movies`, `btn-delete`, `details`, `summary`
- Layout: `NavBar` and `Main` are wrapper components providing structure
- Responsive: Uses flexbox patterns in CSS (not mobile-optimized, desktop-first)

**Files to read first**

1. `src/components/App.js` — entire state flow and conditional rendering
2. `src/components/MovieDetails.js` — API fetching pattern and updater function usage
3. `src/components/WatchList.js` — computed stats using `average()` helper
4. `src/utils/api.js` — environment variable setup
5. `src/components/Movie.js` — children pattern example

**API integration specifics**

- Base URL and key in `src/utils/api.js` read from environment
- Two endpoints used:
  - `/s=<query>` (search) returns array in `Search` field
  - `/i=<imdbID>` (details) returns single movie object
- Response validation checks `data.Response === "False"` before processing
- Both App and MovieDetails independently fetch (no data sharing); considers network efficiency trade-off for simplicity

**Known constraints & assumptions**

- No local persistence for watched list (resets on page reload; use localStorage if persistence needed)
- No pagination for search results (shows first page only)
- No tests provided; CRA scaffolding only
- No backend; OMDB is the single API source
- StarRating component is a controlled input; updates trigger `onMarkAsWatched` callback

**Adding new features**

- **New UI pane**: Create component, add state in `App`, conditionally render in `Main`
- **New handler**: Add state + function in `App`, pass down as prop callback
- **New utility**: Export from `src/utils/functions.js`, import where needed (e.g., `import { average }`)
- **New data on movies**: Add to fetch response handling or extend `tempWatchedData` shape
