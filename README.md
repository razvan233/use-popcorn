# use-popcorn

A React app for searching and rating movies using the OMDB API. Built with Create React App for learning purposes.

## Overview

**use-popcorn** lets you search for movies, view detailed information, and maintain a personal watchlist with your own ratings. The app features a two-pane interface: search results on the left, movie details and watchlist on the right.

### Key Features

- 🔍 Live movie search via OMDB API
- 🎬 View detailed movie information (runtime, IMDb rating, genre, plot)
- ⭐ Rate movies with a custom star rating system
- 📋 Maintain a persistent watchlist with user ratings
- 📊 View statistics on your watched movies (average ratings, total runtime)

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your OMDB API credentials:
   ```env
   REACT_APP_BASE_URL=https://www.omdbapi.com
   REACT_APP_API_KEY=your_api_key_here
   ```
   Get a free API key at [omdbapi.com](http://www.omdbapi.com/apikey.aspx)

### Running the App

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in your browser. The app reloads on code changes.

### Running Tests

```bash
npm test
```

Launches the interactive test runner. The project includes comprehensive test coverage with **81 passing tests** across 14 test files, covering all components and utilities.

**Test Files:**

- **Component Tests** (`src/__tests__/components/`): Logo, Search, Movie, MovieList, MovieDetails, WatchList, StarRating, Box, NavBar, Main, Loader, ErrorMessage, NoOfResults
- **Utility Tests** (`src/__tests__/utils/`): Functions (average calculation)

Tests verify rendering, user interactions, prop handling, and callback functionality.

### Building for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── __tests__/              # Test suite
│   ├── components/         # Component tests (13 files)
│   └── utils/              # Utility tests (1 file)
├── components/
│   ├── App.js              # Main state container
│   ├── NavBar.js           # Header with logo and search
│   ├── Search.js           # Search input (filters by query on Enter)
│   ├── MovieList.js        # Results list from OMDB
│   ├── Movie.js            # Individual movie item (clickable)
│   ├── MovieDetails.js     # Full movie details with rating interface
│   ├── WatchList.js        # User's watched movies with stats
│   ├── StarRating.js       # Custom star rating component
│   ├── Box.js              # Layout wrapper
│   └── [other components]
├── utils/
│   ├── api.js              # OMDB API configuration
│   ├── functions.js        # Utility functions (e.g., average)
│   └── initialData.js      # Sample movie data
├── index.js                # React entry point
└── index.css               # Global styles
```

## Architecture

### State Management

All state is centralized in `App.js`:

- `movies` - Search results from OMDB (fetched on query change)
- `watched` - User's rated movies (initialized from `tempWatchedData`)
- `query` - Current search input
- `selectedID` - Currently viewed movie
- `isLoading` - Fetch status
- `errorMessage` - API error messages

### Data Flows

1. **Search**: Type query → API fetch → Display results in MovieList
2. **Selection**: Click movie → Fetch full details → Display in MovieDetails pane
3. **Rating**: Use StarRating → Update watched list via callback
4. **Management**: Delete from WatchList → Filter and update state

## Development Patterns

### Testing

All components have comprehensive test coverage using React Testing Library:

- **Component rendering** - Verify correct DOM output
- **User interactions** - Test clicks, typing, and hover events
- **Props and callbacks** - Ensure correct prop passing and handler invocation
- **State changes** - Verify UI updates on state changes

Run tests with `npm test` or `npm test -- --watchAll=false` for CI environments.

### Prop Drilling

Data flows from `App` → components via props. Handlers are passed down and called from child components.

### Children Pattern

Components like `Movie` and `Box` accept `children` for flexible content injection:

```jsx
<Movie movie={movie}>
  <InfoAttribute info={{ emoji: "🗓️", value: movie.Year }} />
</Movie>
```

### Updater Functions

When modifying watched list, use functional setState:

```jsx
setWatched((prev) => [...prev, newMovie]);
```

## API Integration

Fetches are performed in:

- `App.js` - Search movies on query change
- `MovieDetails.js` - Fetch full movie data on selection

Missing `.env` variables log errors but don't crash the app.

## Styling

- Global styles only (`src/index.css`)
- BEM-style class names: `list`, `btn-delete`, `details`
- Flexbox-based responsive layout

## Future Enhancements

- [ ] LocalStorage persistence for watchlist
- [ ] Search pagination
- [ ] Advanced filtering and sorting
- [ ] Movie recommendations
- [ ] User authentication

## Technologies

- React 19
- Create React App
- OMDB API
- CSS3 (Flexbox)

## License

This project is part of the Ultimate React Course.
