import React, { useEffect, useState } from "react";
import Select, { createFilter } from "react-select";
import { useGlobalCategory } from "../contexts/CategoryContextProvider";
import { useGlobalLocation } from "../contexts/LocationContextProvider";
import { useSearchParm } from "../contexts/SearchParmContextProvider";

export default function SearchBar(props) {
  const { locations } = useGlobalLocation();
  const { categories } = useGlobalCategory();
  const [product, setProduct] = useState("");
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const { saveInputedProduct } = useSearchParm();

  async function setAllOptions() {
    let locationOptions = [];
    locations.map((c) => {
      locationOptions.push({ value: c.id, label: c.name });
    });
    setLocationOptions([...locationOptions]);

    let categoryOptions = [];
    categories.map((c) => {
      categoryOptions.push({ value: c.id, label: c.name });
    });
    setCategoryOptions([...categoryOptions]);
  }

  useEffect(() => {
    setAllOptions();
  }, [locations, categories]);

  const changeLocation = async (val, e) => {
    props.getLocationData(val);
    setSelectedLocation(val.value);
  };

  const changeCategory = async (val, e) => {
    props.getCategoryData(val);
    setSelectedCategory(val.value);
  };

  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: "start",
  };

  return (
    <div>
      <div className="inputwrap">
        <input
          name="product"
          type="text"
          value={product}
          onChange={(e) => {
            setProduct(e.target.value);
            saveInputedProduct(e.target.value);
          }}
          key="1"
        ></input>
      </div>
      <Select
        defaultValue={""}
        onChange={changeLocation}
        options={locationOptions}
        key="2"
      />
      <Select
        defaultValue={""}
        onChange={changeCategory}
        options={categoryOptions}
        filterOption={createFilter(filterConfig)}
        key="3"
      />
    </div>
  );
}
