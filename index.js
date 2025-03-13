const form = document.querySelector("#assignment_form");
const link_cont = document.querySelector(".link_cont");
const form_input = document.querySelector("#form_input");

// Load saved links from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedLinks = JSON.parse(localStorage.getItem("assignments")) || [];
  savedLinks.forEach(({ url, name }) => {
    link_cont.insertAdjacentHTML("beforeend", createLink(url, name));
  });
});

function createLink(item, projectName) {
  return `
    <li>
      <a href="${item}" target="_blank">${projectName}</a>
    </li>
  `;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const url = form_input.value.trim();
  if (!url) return; // Prevent adding empty links

  const projectName = prompt("What is your project name?");
  if (!projectName) return; // Prevent empty project names

  // Append new link to UI
  link_cont.insertAdjacentHTML("beforeend", createLink(url, projectName));

  // Save to localStorage
  const savedLinks = JSON.parse(localStorage.getItem("assignments")) || [];
  savedLinks.push({ url, name: projectName });
  localStorage.setItem("assignments", JSON.stringify(savedLinks));

  // Clear input
  form_input.value = "";
  form_input.focus();
});
