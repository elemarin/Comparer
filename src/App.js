import React from "react";
import { useState } from "react";
import "./styles.css";

function Form() {
  const [testUrl, setTestUrl] = useState("");
  return (
    <div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="text" class="validate" />
          <label for="email">Webpagetest URL</label>
        </div>
      </div>

      <button
        onClick={}
        class="btn waves-effect waves-light"
        type="submit"
        name="action"
      >
        Submit
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}
