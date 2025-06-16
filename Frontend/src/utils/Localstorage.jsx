
localStorage.clear()
const shopkeepers = [
  { email: "a@b.com", password: "123" },
  { email: "bob@example.com", password: "Bob@456" },
  { email: "charlie@example.com", password: "Charlie@789" },
  { email: "diana@example.com", password: "Diana@321" },
  { email: "eve@example.com", password: "Eve@654" },
];

export const setLocalStorage = () => {
  if (!localStorage.getItem("shopkeepers")) {
    localStorage.setItem("shopkeepers", JSON.stringify(shopkeepers));
  }
};

export const getLocalStorage = () => {
  const shopkeepers = JSON.parse(localStorage.getItem("shopkeepers"));
  return { shopkeepers };
};
