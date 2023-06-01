# Phase Frontend Test: “Editor”

This is the repo for Phase Frontend Test: Editor. This challenge provides the basic layout of the editor at [here](https://codesandbox.io/s/phase-challenge-cxl68?file=/README.md).

## Major changes from the basic layout

1. Version of react, react-dom and react-scripts are updated to lastest version
1. Use ReactPixi to stimulate the canvas section
1. Use Recoil to manage states
1. version of styled-components is downgraded to 5.0.0 to avoid the issue of [Invalid Hook Call Warning](https://legacy.reactjs.org/warnings/invalid-hook-call-warning.html).

## Checklist

- [x] Implement **Page** switching
- [x] Implement **Element** selection
  - [x] in Element section in **LeftPanel**
  - [x] in **Canvas**
- [x] Update the **Element** based on property changes in **RightPanel**
  - [x] Changing **X** or **Y** values should change displayed position of the selected Element on the Canvas
  - [x] Changing **color** or **opacity** should visually change color or transparency of the selected Element on the **Canvas**
- [x] Implement moving / dragging Elements on the Canvas (drag-and-drop)
- [x] Implement double-click to rename for **Elements** in Element list section and **Pages** in Page list section
- [x] (Optional) Implement nested Element list, i.e. where elements can contain other elements.
- [x] Unit tests
- [x] Have no performance issue (Hopefully)

## Getting started

**Note:** This project use ReactPixi, which is using Pixi.js under the hood. Please make sure that your browser support WebGL.

### To start the development version locally

```bash
# install dependencies
yarn install
# run the project
yarn start
```

You can view the project at http://localhost:3000 after starting up.

## Project structure

The project src is mainly divided into 3 sections: LeftPanel, Canvas and RightPanel. The LeftPanel and RightPanel are implemented by React, while the Canvas section is stimulated with ReactPixi.

While components, test and recoil are the folders for components, test files and recoil states respectively.
Components folder is used to store the components that might be used in multiple places. But this project is not that complicated, so the components in the folder are used very few times.

```
src
├── leftPanel
├── canvas
├── rightPanel
│
├── components
├── recoil
└── test
```

## State mmanager

[Recoil](https://recoiljs.org/) is used to manage states in this project. The resaon for using Recoil is that it store states independently, which is atom, and are units of state in Recoil. Unlike Redux, any changes in any atom will not affect other atoms, therefore preventing unnecessary re-render for un-affected React components.

## Data structure

The whole document is assumed to be a tree structure, which is a nested object. The root of the tree is the document, which contains multiple pages. Each page contains multiple elements. Each element can contain multiple elements as its children.

Therefore, there will be three main type of data structure: document, page and element. The data structure is defined as below:

### Document

```javascript
{
   type: 'document',
   id: string,
   pagesId: [string],
   ...otherDocumentProperties such as name, backgroundColor, etc.
}
```

### Page

```javascript
{
   type: 'page',
   id: string,
   name: string,
   documentId: string,
   children: [string], // array of element id
}
```

### Element

```javascript
{
   type: 'frame', // could be svg, png, text, etc.
   id: string,
   name: string,
   position: { x: number, y: number },
   size: { width: number, height: number },
   parentId: string, // id of the parent element, could be page id or another element id
   childrenIds: [string], // array of id of children elements
   ...otherElementProperties such as fill, o, border, etc.
}
```

## Nested Element
Nested Elements can be stimulated in canvas, here are the features:
1. children's position is relative to their parent
1. draging parent element will also drag its children, but draging children will not affect their parent

but there are some limitations:
1. dragging children outside of their parent will not make them become an element independent from their parent
1. elements layering is not supported, which means that the elements rendered later will be on top of the elements rendered earlier

## About the Canvas (Pixi.js) section

During the implementation, I am not able to bypass the Recoil states into children of Stage component, which is the root container of Pixi.js when using the package ReactPixi. Althought [official docs](https://pixijs.io/pixi-react/context-bridge/) shows the example of passing context of Redux into it, I couldn't make it work with Recoil.

So i use the package [recoil-nexus](https://github.com/luisanton-io/recoil-nexus) to get the states from Recoil in the children of Stage Container, let's say 'Element' component.

However, it is a single-time getter, it wouldn't be triggered when states are changed. So i have to use `useTick` hook provided by ReactPixi, which when ticker event is fired in each Element Sprite, it will fetch the states from Recoil again and update the local state in Element component.

As can be expected, this will affect the performance of the canvas section. But I come up with an idea to address this issue:

> 1. Use Pixi.js directly instead of ReactPixi.
> 1. Keep using React components to represent their Pixi object in canvas, and not returning/rendering DOM elements. This will be easier for states management.
> 1. Then in each Elements' React component, update the respective Pixi object they representing when states are changed, which is like React components usually do by re-rendering DOM elements.

> I thought that ReactPixi already handle the states change as above, but I realized that it is not the case only when I start implementing the canvas section with it. I could have use the method stated above from the beginning, but I already spend too much time on ReactPixi, so I decided to keep using it in this project.

## Suggestions for Improvement & Known Issues
### suggestions:
1. Switch to TypeScript (I am rushing at the start and forgot sbout it...)
1. remove reactPixi, use pixi.js directly and use the method stated above to address the performance issue
1. create Recoil states in run time, so that the states can be created dynamically, but this require backend database to support this features
1. use Recoil's selector to create functions that get the *properties*, *name*, *selection state* and *renaming state* from atom, so that update one of them wont trigger the other, so that related component wont be re-rendered, further improving the performance

# issues:
1. when key in new properties value at right panel, unselect the element by clicking blank area at left panel will not save the new properties value
1. resizing the loaded web page won't responsively resize Pixi Canvas, but will adjust size only after refreshing (this is because size of Stage can't be dynamically changed)