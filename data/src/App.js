import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState({}); // title
  const [rat, setRat] = useState({}); //rating
  const [lin, setLin] = useState({}); //link
  const [inp, setInp] = useState(""); //Input value
  const [search, setSearch] = useState({}); //Search data
  const fun = (e) => {
    const val = e.target.name;
    if (val == "title") {
      axios
        .get("http://localhost:3002/title")
        .then((res) => {
          setData(JSON.parse(JSON.stringify(res.data.data)));
          setLin({});
          setRat({});
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (val == "rating") {
      axios
        .get("http://localhost:3002/ratings")
        .then((res) => {
          setRat(JSON.parse(JSON.stringify(res.data.data)));
          setLin({});
          setData({});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("http://localhost:3002/link")
        .then((res) => {
          setLin(JSON.parse(JSON.stringify(res.data.data)));
          setRat({});
          setData({});
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const func = (e) => {
    axios
      .post("http://localhost:3002/search", { data: inp })
      .then((res) => {
        if (res.data.success == true) {
          // console.log(res.data.ans[0]);

          setSearch(res.data.ans[0]);
          setRat({});
          setData({});
          setLin({});
          setInp("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      func();
    }
  };
  return (
    <>
      <div>
        <div className="mt-5 ms-5 d-inline-flex" style={{ width: "100%" }}>
          <button className="m-2" name="title" onClick={fun}>
            Title
          </button>
          <button className="m-2" name="rating" onClick={fun}>
            Rating
          </button>
          <button className="m-2" name="link" onClick={fun}>
            Link
          </button>
          <div className="mt-2 ms-5 ">
            <input
              placeholder="Title Or Url"
              onKeyDown={keyDownHandler}
              onChange={(e) => {
                setInp(e.target.value);
              }}
            />
          </div>
          <p className="fs-5 mt-2" style={{ cursor: "pointer" }} onClick={func}>
            &#128269;
          </p>
        </div>
        <div className="container mx-auto mt-5">
          <div className="row row-cols-2">
            {data && data.length > 0 ? (
              data.map((item) => (
                <div className="col-5" key={item._id}>
                  <h2 className="p-2 border-success form-control">
                    {item.title}
                  </h2>
                </div>
              ))
            ) : (
              <></>
            )}

            {rat && rat.length > 0 ? (
              rat.map((item) => (
                <div
                  className="col-5 border-success form-control p-1 m-2"
                  key={item._id}
                  style={{ maxWidth: "360px" }}
                >
                  <h2 className=" fs-4 fw-normal">{item.title}</h2>
                  <p className="fw-semibold">{item.ratings} &#9734;</p>
                </div>
              ))
            ) : (
              <></>
            )}

            {lin && lin.length > 0 ? (
              lin.map((item) => (
                <div className="col-5" key={item._id}>
                  <h2 className="p-2 border-success form-control">
                    {item.link}
                  </h2>
                </div>
              ))
            ) : (
              <></>
            )}

            {search && search._id ? (
              <div
                className="col-5 border-success form-control"
                key={search._id}
              >
                <h2 className="fs-4 ">Title: {search.title}</h2>
                <h2 className="fs-5 ">Price: {search.price}</h2>
                <h2 className="fs-5 ">Stock: {search.stock}</h2>
                <h2 className="fs-5 ">Rating: {search.ratings}</h2>
                <h2 className=" fs-5">Url: {search.link}</h2>
              </div>
            ) : (
              <>
                <div
                  className="col-5 border-success form-control"
                  key={search._id}
                >
                  <h2 className="fs-4 ">Empty search</h2>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
