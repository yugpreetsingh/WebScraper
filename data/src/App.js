import "./App.css";
import axios from "axios";
function App() {
  const fun = (e) => {
    const val = e.target.name;
    if (val == "title") {
      axios
        .get("http://localhost:3002/title")
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {});
    } else if (val == "rating") {
      axios
        .get("http://localhost:3002/ratings")
        .then((res) => {})
        .catch((err) => {});
    } else {
      axios
        .get("http://localhost:3002/link")
        .then((res) => {})
        .catch((err) => {});
    }
  };

  return (
    <>
      <div>
        <div>
          <button name="title" onClick={fun}>
            Title
          </button>
          <button name="rating">Rating</button>
          <button name="link">Link</button>
        </div>
        <div>
          <ul>
            <li>empty</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
