import { useEffect, useState } from 'react';
import './App.css';


interface IEntry {
  API: any;
  Description: any;
  Cors: any;
  HTTPS: any;
  Auth: any;
  Link: any;
  Category: any;
}
function App() {

  let [results, setResults] = useState<IEntry[]>([]);
  let [searchTerm, setSearchTerm] = useState("");
  const endpoint = "https://api.publicapis.org/entries?cors=yes&Auth=null";
  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then((data: any) => {
        const sorted = [...data.entries].sort((a, b) => a.API.localeCompare(b.API))
        setResults(sorted);
      }
      ).catch(err => console.error(err));
  }, []);

  function handleChange(ev: any) {
    setSearchTerm(ev.target.value);
  }
  function matchesSearch(api: any) {
    const term = searchTerm.toLowerCase();
    return ["API", "Description", "Category"].some(
      fieldName => api[fieldName] && api[fieldName].toLowerCase().includes(term)
    );
  }

  return (
    <div className="container">
      <h1>Public, no-auth, CORS-supporting APIs</h1>
      <p>Public APIs which support CORS and require no authentication to use</p>
      <p>
        <a href={endpoint}>{endpoint}</a>
      </p>
      <p>
        <a href={"https://api.publicapis.org/"}>https://api.publicapis.org/</a>
      </p>
      <input
        onChange={handleChange}
        value={searchTerm}
        placeholder="what to search for"
      />
      <div className="resultsList">
        {results &&
          results
            .filter(matchesSearch)
            .map(entry => <Entry {...entry} key={entry.Link} />)}
      </div>
    </div>
  );
}
interface EntryProps extends IEntry {
}
function Entry({ API, Link, Description, Auth, Cors, HTTPS, Category }: EntryProps): JSX.Element {
  return (
    <div className="API">
      <div className="titleRow">
        <h3>{API}</h3>
        <a href={Link}>{Link}</a>
      </div>
      <p>{Description}</p>
      <div className="fields">
        <p>Auth: {Auth}</p>
        <p>CORS: {Cors}</p>
        <p>HTTPS: {HTTPS}</p>
        <p>Category: {Category}</p>
      </div>
    </div>
  );
}

/**API: "RandomDog",
Description: "Random pictures of dogs",
Auth: "",
HTTPS: true,
Cors: "yes",
Link: "https://random.dog/woof.json",
Category: "Animals"
}, */


export default App
