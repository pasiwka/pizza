import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/app.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); //точка запуска приложения,
//  в которой будет отображаться весь интерфейс. В данном случае, это элемент с id 'root' в файле index.html.
//  Метод createRoot создает корневой элемент для рендеринга React-компонентов.

root.render(<App />);
