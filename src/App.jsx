import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const App = () => {
  document.title = "ABCD123";

  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" }
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#f8f9fa",
      color: "#000"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      color: "#000"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#007bff" : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#000"
    })
  };

  const handleSubmit = async () => {
    try {
      setError("");
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format. Expected { \"data\": [\"A\", \"C\", \"z\"] }");
      }
      console.log("api call ho rha hai")
      const response = await axios.post("https://bajaj-finserv-backend-wmr2.onrender.com/bfhl", parsedInput);
      setResponseData(response.data);
    } catch (err) {
      setError(err.message);
      setResponseData(null);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Backend Data Processor</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder='Enter JSON (e.g., { "data": ["A", "C", "z"] })'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responseData && (
        <>
          <h3>Select Data to Display:</h3>
          <Select options={options} isMulti onChange={setSelectedOptions} styles={customStyles} />
        </>
      )}
      {responseData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Response:</h2>
          {selectedOptions.map((option) => (
            <p key={option.value}>
              <strong>{option.label}:</strong> {JSON.stringify(responseData[option.value])}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
