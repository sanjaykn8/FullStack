class Employee {
  constructor(
    public name: string,
    public basic: number,
    public allowance: number,
    public deduction: number
  ) {}

  calculatePay(): number {
    return this.basic + this.allowance - this.deduction;
  }
}

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getItems(): T[] {
    return [...this.items];
  }
}

interface Book {
  title: string;
  author: string;
  publisher: string;
}

const books: Book[] = [];
const stack = new Stack<string>();

document.body.style.fontFamily = "Arial, sans-serif";
document.body.innerHTML = `
  <div style="max-width: 1000px; margin: 20px auto; padding: 20px;">
    <h1>TypeScript Exercises</h1>

    <div style="display: grid; gap: 20px;">
      <section style="border: 1px solid #ccc; padding: 16px; border-radius: 8px;">
        <h2>1) Employee Pay Calculator</h2>
        <form id="payForm" style="display: grid; gap: 10px; max-width: 360px;">
          <input id="empName" type="text" placeholder="Employee Name" />
          <input id="basic" type="number" placeholder="Basic Pay" />
          <input id="allowance" type="number" placeholder="Allowance" />
          <input id="deduction" type="number" placeholder="Deductions" />
          <button type="submit">Calculate Pay</button>
        </form>
        <p id="payResult" style="font-weight: bold; margin-top: 10px;"></p>
      </section>

      <section style="border: 1px solid #ccc; padding: 16px; border-radius: 8px;">
        <h2>2) Generic Stack</h2>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <input id="stackInput" type="text" placeholder="Enter item" />
          <button id="pushBtn">Push</button>
          <button id="popBtn">Pop</button>
        </div>
        <p id="stackMsg" style="margin-top: 10px;"></p>
        <ul id="stackList"></ul>
      </section>

      <section style="border: 1px solid #ccc; padding: 16px; border-radius: 8px;">
        <h2>3) Book Manager</h2>
        <form id="bookForm" style="display: grid; gap: 10px; max-width: 360px;">
          <input id="title" type="text" placeholder="Title" />
          <input id="author" type="text" placeholder="Author" />
          <input id="publisher" type="text" placeholder="Publisher" />
          <button type="submit">Add Book</button>
        </form>
        <h3>Books Sorted by Author</h3>
        <ul id="bookList"></ul>
      </section>
    </div>
  </div>
`;

function qs<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el as T;
}

const payForm = qs<HTMLFormElement>("#payForm");
const payResult = qs<HTMLParagraphElement>("#payResult");

payForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = qs<HTMLInputElement>("#empName").value.trim();
  const basic = Number(qs<HTMLInputElement>("#basic").value || 0);
  const allowance = Number(qs<HTMLInputElement>("#allowance").value || 0);
  const deduction = Number(qs<HTMLInputElement>("#deduction").value || 0);

  const emp = new Employee(name, basic, allowance, deduction);
  const netPay = emp.calculatePay();

  payResult.textContent = `${emp.name}'s Net Pay = ${netPay}`;
});

const stackInput = qs<HTMLInputElement>("#stackInput");
const pushBtn = qs<HTMLButtonElement>("#pushBtn");
const popBtn = qs<HTMLButtonElement>("#popBtn");
const stackMsg = qs<HTMLParagraphElement>("#stackMsg");
const stackList = qs<HTMLUListElement>("#stackList");

function renderStack(): void {
  if (stack.isEmpty()) {
    stackList.innerHTML = "<li>Stack is empty</li>";
    return;
  }

  stackList.innerHTML = stack.getItems()
    .map((item, index) => `<li>${index + 1}. ${item}</li>`)
    .join("");
}

pushBtn.addEventListener("click", () => {
  const value = stackInput.value.trim();
  if (!value) return;

  stack.push(value);
  stackInput.value = "";
  stackMsg.textContent = `Pushed: ${value}`;
  renderStack();
});

popBtn.addEventListener("click", () => {
  const popped = stack.pop();
  if (popped === undefined) {
    stackMsg.textContent = "Stack is empty";
  } else {
    stackMsg.textContent = `Popped: ${popped}`;
  }
  renderStack();
});

const bookForm = qs<HTMLFormElement>("#bookForm");
const bookList = qs<HTMLUListElement>("#bookList");

function renderBooks(): void {
  const sorted = [...books].sort((a, b) =>
    a.author.localeCompare(b.author)
  );

  if (sorted.length === 0) {
    bookList.innerHTML = "<li>No books added</li>";
    return;
  }

  bookList.innerHTML = sorted
    .map(
      (book) => `
      <li>
        <b>${book.title}</b> — ${book.author} — ${book.publisher}
      </li>`
    )
    .join("");
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = qs<HTMLInputElement>("#title").value.trim();
  const author = qs<HTMLInputElement>("#author").value.trim();
  const publisher = qs<HTMLInputElement>("#publisher").value.trim();

  if (!title || !author || !publisher) return;

  books.push({ title, author, publisher });

  qs<HTMLInputElement>("#title").value = "";
  qs<HTMLInputElement>("#author").value = "";
  qs<HTMLInputElement>("#publisher").value = "";

  renderBooks();
});

renderStack();
renderBooks();