import { useState, useEffect } from "react";
// import axios from "axios";

// import { FilmCard } from "../../components/FilmCard";

function useFetchFilms() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);

  useEffect(() => {
    setStatus("loading");

    // axios
    //   // .get("https://swapi.dev/api/films/")
    //   .get("/books")
    //   .then((res) => {
    //     setStatus("success");
    //     // setData(res.data.results);
    //     setData(res.data);
    //   })
    //   .catch(() => {
    //     setStatus("error");
    //   });
    fetch("https://swapi.dev/api/films/")
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        setStatus("success");
        setData(data.results);
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  return {
    status,
    data,
  };
}

export const App = () => {
  const { status, data: films } = useFetchFilms();

  if (status === "loading") {
    return <p>Fetching Star Wars data...</p>;
  }

  if (status === "error") {
    return <p>Could not fetch Star Wars data</p>;
  }

  return (
    <div>
      {films.map((film: any) => (
        <article
          style={{ borderBottom: "1px solid #ccc" }}
          key={film.episode_id}
        >
          <h4>{film.title}</h4>
          <p>{film.opening_crawl}</p>
        </article>
      ))}
    </div>
  );
};
