import { f as feed } from "./feed.e8483321.js";
import { l as login } from "./login.abe1a81b.js";
import { r as register } from "./register.fad98117.js";
import "./firebase.4377bee5.js";
import "./login.controller.1f2674a3.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const styles = "";
const routes = {
  "/": login,
  "/register": register,
  "/feed": feed
};
const navigation = (path) => {
  const root = document.getElementById("app");
  const component = routes[path];
  root.innerHTML = component.loadHTML();
  component.loadEvents();
};
window.addEventListener("load", () => {
  let path = window.location.pathname;
  const token = localStorage.getItem("accessToken");
  if (path === "/" || path === "/register") {
    if (token !== null) {
      path = "/feed";
      window.location.pathname = path;
    }
  } else if (path === "/feed") {
    if (token === null) {
      path = "/";
      window.location.pathname = path;
    }
  }
  navigation(path);
});
window.addEventListener("popstate", () => {
  let path = window.location.pathname;
  const token = localStorage.getItem("accessToken");
  if (path === "/" || path === "/register") {
    if (token !== null) {
      path = "/feed";
      window.location.pathname = path;
    }
  } else if (path === "/feed") {
    if (token === null) {
      path = "/";
      window.location.pathname = path;
    }
  }
  navigation(path);
});
