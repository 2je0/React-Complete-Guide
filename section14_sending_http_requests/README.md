# Get 요청 보내기
https://swapi.dev/

dummy api를 불러올 수 있는 사이트가 있다. 이 사이트를 이용해서 get 요청을 보내보자.

```
  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films').then(data => data.json()).then(ele => {
      const MovieData = ele.results.map(movies => {
        return {
          id: movies.episode_id,
          title: movies.title,
          openingText: movies.opening_crawl,
          releaseDate: movies.release_date,
        }
      })
      setMovies(MovieData);


    })
  }
```
