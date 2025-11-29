**Purpose**

This file gives AI coding agents focused, actionable knowledge to be immediately productive in this Create React App repository. It is intentionally concise and tied to concrete files and patterns found in the codebase.

**Big Picture**

- **Project type**: A small React app bootstrapped with Create React App. Entry is `src/index.js`.
- **Top-level state owner**: `src/components/App.js` holds the primary state: `movies` and `watched` (see `useState(tempMovieData)` and `useState(tempWatchedData)`). Add or change app-level features by updating `App` and passing setters down as props.
- **UI composition**: Presentational components are small and composable. Notable components:
  - `src/components/NavBar.js` (layout wrapper)
  - `src/components/Main.js` (layout wrapper)
  - `src/components/MovieList.js` → renders `Movie` items inside `Box`
  - `src/components/Movie.js` → expects `movie` prop and `children` for inserted attributes
  - `src/components/WatchList.js` → consumes `watched` prop

**Data flow & patterns**

- Data originates from `src/utils/initialData.js` (temporary sample data). `App` initializes state with these values. Expect prop-drilling (App → MovieList/WatchList). When adding handlers, place `setMovies` / `setWatched` in `App` and pass functions down.
- Utilities live in `src/utils/functions.js` (small helpers; e.g. `average`). Import with `import { average } from '../utils/functions';` in components.
- Components often accept `children` for small insertions (see `Movie` component: `children` used for `InfoAttribute`). Follow this pattern for attribute injection.

**Developer Workflows (what actually works here)**

- Start dev server: `npm start` (CRA default). App served at `http://localhost:3000`.
- Run tests: `npm test` (CRA interactive runner). `src/setupTests.js` is present.
- Build for production: `npm run build`.
- Git and CI: no repo-specific hooks or CI configs present in this workspace. Keep commits small and focused; this is a small learning repo.

**Project-specific conventions**

- Files export default components (e.g. `export default function App(){}`) and small named exports for utilities/data.
- Keep state near `App`. New derived or computed values should go in `src/utils` when reusable, or inside `App` when specific to the page.
- Presentational vs container: most components are presentational; add logic in `App` or create a new container-level component when needed.
- Styling: global CSS in `src/index.css` and classNames are used (e.g. `className="main"`, `className="list"`). Follow the existing class-name pattern.

**Integration & extension points**

- Search and dynamic data: there is a `Search` component present in `NavBar` but currently `App` passes no handler. To hook search to live data:
  1. Add a handler in `App` that updates `movies` (e.g. `const handleSearch = (term) => { /* fetch or filter */ }`).
  2. Pass `handleSearch` to `<Search onSearch={handleSearch} />`.
- External API: none currently used. Poster image URLs come from `initialData`. If adding network calls, prefer fetch/async in `App` or a custom hook under `src/hooks`.

**Examples (copyable patterns)**

- Add a handler in `App` and pass down:

```js
// in src/components/App.js
function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const handleRemove = (imdbID) =>
    setMovies(movies.filter((m) => m.imdbID !== imdbID));
  return <MovieList movies={movies} onRemove={handleRemove} />;
}
```

- Use `children` to insert attributes into `Movie` (pattern already used in `MovieList.js`):

```jsx
<Movie movie={movie}>
  <InfoAttribute info={{ emoji: "🗓️", value: movie.Year }} />
</Movie>
```

**Files to inspect first**

- `src/components/App.js` — central state and composition
- `src/components/MovieList.js`, `src/components/Movie.js` — core rendering pattern
- `src/components/WatchList.js` — consumes `watched` data
- `src/utils/initialData.js` — sample data shapes
- `src/utils/functions.js` — tiny utility functions

**What not to assume**

- There is no backend/API wiring in the repo. Do not attempt to call a missing backend without adding config.
- Tests are present only as CRA scaffolding; there are no component tests provided. Avoid presuming test coverage exists.

**Suggested first tasks for an agent**

- Add a simple `onRemove` handler to `App` and pass it to `Movie` to allow deletion of movies.
- Hook `Search` to `App` by adding an `onSearch` prop and implementing a simple client-side filter.

If anything here is unclear or you'd like me to expand examples (e.g., adding a small hook file or wiring Search), tell me which area to expand.
