# 🛠️ Bug-Focused Walkthrough – Task Tracker 3 (Medium Level, No Direct Solutions)


> This version **explains the intentional bugs and how to reason about fixes** instead of giving finished code. Use it to debug the scaffold you were given.


---


## 🧠 What You’re Practicing (Medium)
- Arrays for state (`tasks`)
- Rendering lists with `<ul><li>` via JS
- Event listeners (`addEventListener`, keypress handlers)
- Arrow functions vs `function(e)` callbacks
- DOM creation (`createElement`, `appendChild`) and safe `innerHTML` usage
- Updating counts and empty states


---


## 🔗 HTML ↔ JS Wiring (Concept, No Solutions)


**HTML button id → JS query → `addEventListener` → handler** 
If the **id** in HTML and the **query** in JS don’t match, the button won’t be wired. 
**Reason about the fix:** *Align the id names so your DOM query finds the element you expect.*


---


## 🐞 Bug Anatomy by File


### 1) HTML Bugs


**Bug H1 – Missing input type**
```html
<input id="taskInput" placeholder="Enter your task here" />
```
**Why it’s a bug:** Inputs default to text in most browsers, but declaring `type` is good form and helps linters & screen readers. 
**Reason about the fix:** *Add an explicit type to communicate intent.*


**Bug H2 – Mismatched button id**
```html
<button id="addTaskk">Submit Task</button> <!-- JS expects a different id -->
```
**Why it’s a bug:** The JS uses `getElementById("addTask")`. The HTML says `addTaskk`. The query returns `null` and wiring fails. 
**Reason about the fix:** *Make the button id exactly match what JS queries.*


---


### 2) CSS Bugs


**Bug C1 – Input too narrow**
```css
#taskInput { width: 10px; }
```
**Why it’s a bug:** Unusable input; fails UX expectations from Medium level. 
**Reason about the fix:** *Give it a practical width (e.g., a couple hundred pixels) and test text visibility.*


**Bug C2 – List with no bullets**
```css
#taskList { list-style: none; }
```
**Why it’s a bug:** The Medium level expects a real list experience. Removing bullets makes items run together visually. 
**Reason about the fix:** *Either restore bullets or provide an alternative visual cue (icons, custom markers, left padding).*


---


### 3) JavaScript Bugs


**Bug J1 – Wrong DOM id in JS (wiring intent)**
```js
const addBtn = document.getElementById("addTask"); // HTML used a different id
```
**Why it’s a bug:** Wiring never happens; clicks won’t trigger. 
**Reason about the fix:** *Synchronize the queried id with the HTML id.*


**Bug J2 – Not pushing to the array**
```js
// ── TEACHING-BUG #6 (logic)
// TODO: Push task to array


renderTasks();
```
**Why it’s a bug:** Render function has nothing to display; you’re re-rendering an unchanged model. 
**Reason about the fix:** *Push to the array where the model should change. Try: `tasks.push(task);`*


**Bug J3 – Empty tasks added**
```js
const task = input.value.trim();


// ── TEACHING-BUG #6 (logic)
// TODO: Push task to array
```
**Why it’s a bug:** Blank items pollute state/UI. 
**Reason about the fix:** *Add a guard clause before mutating state or rendering, in this case before pushing to the array. Try: `if(task === "") return;` before pushing task to array.*


**Bug J4 – Clear doesn’t re-render**
```js
function clearAllTasks() {
 tasks = [];
 // list.innerHTML = ""; // UI is cleared here but model/UI can get out of sync
 }
```
**Why it’s a bug:** UI and state must be kept in sync by using a single rendering path. 
**Reason about the fix:** *Centralize updates in `renderTasks()` and call it whenever state changes.*


**Bug J5 – Task count not updated**
```js
// TODO: Update task count text here
```
**Why it’s a bug:** UI doesn’t reflect actual state. 
**Reason about the fix:** *Update count whenever you render (single source of truth). Use: `${tasks.length}`.*


**Bug J6 – Enter key wired to wrong action**
```js
document.addEventListener("keypress", function (e) {
 if (e.key === "Enter") {
   clearAllTasks(); // wrong intent
 }
});
```
**Why it’s a bug:** Violates user expectation: Enter should add, not clear. 
**Reason about the fix:** *Call the add handler.*


**Bug J7 – Duplicate items allowed (intent)**
```js
// No check to see if tasks already includes(task)
// TODO: Prevent duplicate task names (optional)
```
**Why it’s a bug:** Medium expects some basic intent awareness (don’t spam items). 
**Reason about the fix:** *Before pushing, check for existence and show a friendly message if duplicate.*


---


## 🔁 Rendering Loop (Concept Only)
Use the render function to rebuild the list from the `tasks` array each time the array changes. 
**Reason about the fix:** *Clear the container, iterate `tasks.forEach(...)`, create an `<li>`, append it, and update count.*


> Prefer arrow functions in short callbacks, e.g. `tasks.forEach(task => { ... })` 
> Use `function(e)` or `(e) => {}` uniformly for event handlers.


---


## 🧪 Reasoning Prompts (Try Before Fixing)
- *What id is the JS looking for when wiring the Add button? Does the HTML match it letter-for-letter?* 
- *When the array is emptied, where should the DOM update happen so UI and state never drift?* 
- *Where should the guard that blocks empty items live? Why there?* 
- *What is the single place where task count should be updated, and why?* 
- *Which user action should the Enter key trigger at Medium level and how do we wire it?* 
- *How would you design a duplicate check that is readable and efficient enough for this scope?*


---


## 🧩 Bonus (No Solutions Given)
- Add a delete button per `<li>` that removes from the array and re-renders.
- Add an empty-state banner when there are no tasks.
- Convert items to objects `{ text, done }` and toggle a `.done` class on click.
- Persist to `localStorage` (serialize/deserialize array) as a stretch.


---


## ✅ Acceptance Criteria Recap (Medium)
- Items are stored in an array and rendered as `<li>` elements. 
- Add button and Enter key **both** add items (when non-empty). 
- Clear button resets array and UI via the **same render path**. 
- Count reflects the array length after each mutation. 
- Visual list cues exist (bullets or equivalent).


> Use this document as a **debug guide**. If you need a solution key for instructors, keep that in a separate private file.