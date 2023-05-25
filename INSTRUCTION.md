# Phase Challenge

This challenge provides the basic layout of the editor. Editor interface displays design documents.

Document data should have the following structure

- **Document** can have 1 \- \* **Pages**
- Each **Page** can have 0 \- \* **Elements**
- Each **Element** has following properties:
  - (position) **X**
  - (position) **Y**
  - **opacity**
  - **color**
  - (Optional) Each **Element** can have 0 \- \* child **Elements**

UI is divided into

- **LeftPanel** with **Page** list section and **Element** list section
- **Canvas**, where all **Elements** of the currently selected **Page** need to be displayed
- **RightPanel** which displays properties of the currently selected **Element**

Element list section (in **RightPanel**) and the **Canvas** always display the content of the **selected Page**. Elements on the Canvas can be displayed as any shape. They need to be displayed at their specified positions (**X**, **Y**) and with their specified **opacity** and **color**

## Challenge

Implement a fully interactable UI based on the current layout.

- Can use Context, Redux or any other library to manage states.
- **Canvas** can be implemented with HTML or using canvas rendering. Can use any libraries to do so.
- The data structure implementation requirements have no limitations, but it has to be robust.
- Try to avoid any unnecessary re-render.

## Checklist

- [ ] Implement **Page** switching
- [ ] Implement **Element** selection
  - [ ] in Element section in **LeftPanel**
  - [ ] in **Canvas**
- [ ] Update the **Element** based on property changes in **RightPanel**
  - [ ] Changing **X** or **Y** values should change displayed position of the selected Element on the Canvas
  - [ ] Changing **color** or **opacity** should visually change color or transparency of the selected Element on the **Canvas**
- [ ] Implement moving / dragging Elements on the Canvas (drag-and-drop)
- [ ] Implement double-click to rename for **Elements** in Element list section and **Pages** in Page list section
- [ ] (Optional) Implement nested Element list, i.e. where elements can contain other elements.
- [ ] Unit tests
- [ ] (Optional) Any other tests that you think are necessary
- [ ] Have no performance issue
