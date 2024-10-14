import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CartContext } from "../Features/ContextProvider";
import {Header} from "./Header";

const categoreis = [
  { id: 1, name: "electronics" },
  { id: 2, name: "jewelery" },
  { id: 3, name: "men's clothing" },
  { id: 4, name: "women's clothing" },
];

// ["electronics","jewelery","men's clothing","women's clothing"]

export const Product = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        const data1 = await response.json();
        setData(data1);
        setFilter(data1);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  // category search
  const handleFilter = (category) => {
    const filterData = data.filter((each) => each.category === category);
    setFilter(filterData);
  };
  // input search
  const handleSearch = (e) => {
    const value = e.target.value;
    setInputSearch(value.toLowerCase());
    const filterInput = data.filter((each) =>
      each.title.toLowerCase().includes(inputSearch)
    );
    setFilter(filterInput);
  };
  // sorting
  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortOrder(sortValue);

    let sortedData = [...filter];
    if (sortValue === "Low to High") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortValue === "High to Low") {
      sortedData.sort((a, b) => b.price - a.price);
    }
    setFilter(sortedData);
  };

  return (
    <>
      <Header />
      <div className="product-container p-3">
        <section className="side-bar ">
          <div className="mb-3 ml-3 pl-4">
            <input
              type="text"
              placeholder="search..."
              className="search-container ml-2"
              onChange={handleSearch}
              value={inputSearch}
            />
          </div>

          {categoreis.map((item) => (
            <li key={item.id} style={{ listStyleType: "none" }}>
              <button
                className="categories-item"
                onClick={() => handleFilter(item.name)}
              >
                {item.name}
              </button>
            </li>
          ))}

          <div className="mb-3 ml-3 pl-4 mt-4">
            <label htmlFor="sort" style={{ color: "white" }}>
              Filter By Price :{" "}
            </label>
            <br />
            <select
              id="sort"
              value={sortOrder}
              onChange={handleSort}
              className="ml-2 mt-2"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              <option style={{ backgroundColor: "white", color: "black" }}>
                Select
              </option>
              <option style={{ backgroundColor: "white", color: "black" }}>
                {" "}
                Low to High
              </option>
              <option style={{ backgroundColor: "white", color: "black" }}>
                {" "}
                High to Low
              </option>
            </select>
          </div>
        </section>
        <article>
          <div className="row " style={{ overflowX: "auto", height: "100vh" }}>
            {filter.map((each) => (
              <div
                key={each.id}
                className=" col-12 col-sm-6 col-md-4 mb-3"
                style={{ backgroundColor: "#F1F5F9" }}
              >
                <Card
                  style={{ width: "", backgroundColor: "#eeeee6" }}
                  className=""
                >
                  <Card.Img
                    variant="top"
                    style={{ height: "140px" }}
                    src={each.image}
                  />
                  <Card.Body>
                    <Card.Title style={{ fontSize: "13px" }}>
                      {each.title}
                    </Card.Title>
                    <h1
                      style={{ fontWeight: "bold", fontSize: "14px" }}
                    >{`$ ${each.price}`}</h1>

                    <Button
                      variant="primary"
                      onClick={() => dispatch({ type: "Add", product: each })}
                    >
                      Add cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              //
            ))}
          </div>
        </article>
      </div>
    </>
  );
};
