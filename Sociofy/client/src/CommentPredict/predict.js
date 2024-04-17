import React, { useState, useEffect } from "react";

const [accuracy, setAccuracy] = useState(2);
function predict() {
  useEffect(() => (
    fetch("/api/ml")
      .then(res => res.json())
      .then(data => setAccuracy(data.toxicity))
  ));
  return (
    <p> Output:{accuracy} </p>

  )
}

