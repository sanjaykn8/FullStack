abstract class Employee {
  constructor(public name: string) {}
  abstract calculatePay(): number;
}

class FullTimeEmployee extends Employee {
  constructor(
    name: string,
    public basic: number,
    public allowance: number,
    public deduction: number
  ) {
    super(name);
  }

  calculatePay(): number {
    return this.basic + this.allowance - this.deduction;
  }
}

class PartTimeEmployee extends Employee {
  constructor(
    name: string,
    public hours: number,
    public rate: number
  ) {
    super(name);
  }

  calculatePay(): number {
    return this.hours * this.rate;
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

document.body.innerHTML = `
<div style="font-family:Segoe UI, Arial; background:#f4f6f9; min-height:100vh; padding:30px;">
  
  <h1 style="text-align:center; margin-bottom:30px;">TypeScript Dashboard</h1>

  <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:20px;">

    <!-- Employee -->
    <div style="background:white; padding:20px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1)">
      <h2 style="margin-bottom:10px;">Employee Pay</h2>

      <form id="payForm" style="display:flex; flex-direction:column; gap:10px;">
        <input id="empName" placeholder="Name" style="padding:8px;border-radius:6px;border:1px solid #ccc"/>

        <select id="empType" style="padding:8px;border-radius:6px;">
          <option value="full">Full Time</option>
          <option value="part">Part Time</option>
        </select>

        <div id="fullFields" style="display:flex; flex-direction:column; gap:8px;">
          <input id="basic" placeholder="Basic" style="padding:8px"/>
          <input id="allowance" placeholder="Allowance" style="padding:8px"/>
          <input id="deduction" placeholder="Deduction" style="padding:8px"/>
        </div>

        <div id="partFields" style="display:none; flex-direction:column; gap:8px;">
          <input id="hours" placeholder="Hours" style="padding:8px"/>
          <input id="rate" placeholder="Rate" style="padding:8px"/>
        </div>

        <button type="submit" style="padding:10px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer">
          Calculate
        </button>
      </form>

      <p id="payResult" style="margin-top:10px; font-weight:bold;"></p>
    </div>

    <!-- Stack -->
    <div style="background:white; padding:20px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1)">
      <h2>Stack</h2>

      <div style="display:flex; gap:8px; margin-bottom:10px;">
        <input id="stackInput" placeholder="Enter item" style="flex:1;padding:8px"/>
        <button id="pushBtn" style="padding:8px;background:#16a34a;color:white;border:none;border-radius:6px">Push</button>
        <button id="popBtn" style="padding:8px;background:#dc2626;color:white;border:none;border-radius:6px">Pop</button>
      </div>

      <p id="stackMsg"></p>
      <ul id="stackList" style="margin-top:10px; padding-left:20px;"></ul>
    </div>

    <!-- Books -->
    <div style="background:white; padding:20px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1)">
      <h2>Books</h2>

      <form id="bookForm" style="display:flex; flex-direction:column; gap:8px;">
        <input id="title" placeholder="Title" style="padding:8px"/>
        <input id="author" placeholder="Author" style="padding:8px"/>
        <input id="publisher" placeholder="Publisher" style="padding:8px"/>

        <button style="padding:10px;background:#7c3aed;color:white;border:none;border-radius:6px">
          Add Book
        </button>
      </form>

      <ul id="bookList" style="margin-top:10px; padding-left:20px;"></ul>
    </div>

  </div>
</div>
`;

function qs<T extends HTMLElement>(s: string): T {
  return document.querySelector(s) as T;
}


const payForm = qs<HTMLFormElement>("#payForm");
const payResult = qs<HTMLParagraphElement>("#payResult");
const empType = qs<HTMLSelectElement>("#empType");
const fullFields = qs<HTMLDivElement>("#fullFields");
const partFields = qs<HTMLDivElement>("#partFields");

empType.addEventListener("change", () => {
  if (empType.value === "full") {
    fullFields.style.display = "block";
    partFields.style.display = "none";
  } else {
    fullFields.style.display = "none";
    partFields.style.display = "block";
  }
});

payForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = qs<HTMLInputElement>("#empName").value;
  let emp: Employee;

  if (empType.value === "full") {
    emp = new FullTimeEmployee(
      name,
      Number(qs<HTMLInputElement>("#basic").value || 0),
      Number(qs<HTMLInputElement>("#allowance").value || 0),
      Number(qs<HTMLInputElement>("#deduction").value || 0)
    );
  } else {
    emp = new PartTimeEmployee(
      name,
      Number(qs<HTMLInputElement>("#hours").value || 0),
      Number(qs<HTMLInputElement>("#rate").value || 0)
    );
  }

  payResult.textContent = `Pay = ${emp.calculatePay()}`;
});

/* ================= STACK ================= */

const stackInput = qs<HTMLInputElement>("#stackInput");
const pushBtn = qs<HTMLButtonElement>("#pushBtn");
const popBtn = qs<HTMLButtonElement>("#popBtn");
const stackMsg = qs<HTMLParagraphElement>("#stackMsg");
const stackList = qs<HTMLUListElement>("#stackList");

function renderStack() {
  stackList.innerHTML = stack.isEmpty()
    ? "<li>Empty</li>"
    : stack.getItems().map(i => `<li>${i}</li>`).join("");
}

pushBtn.onclick = () => {
  stack.push(stackInput.value);
  stackInput.value = "";
  renderStack();
};

popBtn.onclick = () => {
  stackMsg.textContent = `Popped: ${stack.pop()}`;
  renderStack();
};

/* ================= BOOK ================= */

const bookForm = qs<HTMLFormElement>("#bookForm");
const bookList = qs<HTMLUListElement>("#bookList");

function renderBooks() {
  bookList.innerHTML = books
    .sort((a, b) => a.author.localeCompare(b.author))
    .map(b => `<li>${b.title} - ${b.author}</li>`)
    .join("");
}

bookForm.onsubmit = (e) => {
  e.preventDefault();

  books.push({
    title: qs<HTMLInputElement>("#title").value,
    author: qs<HTMLInputElement>("#author").value,
    publisher: qs<HTMLInputElement>("#publisher").value,
  });

  renderBooks();
};

renderStack();
renderBooks();