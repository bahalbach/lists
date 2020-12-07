import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { List, ListDescription, ListTitle } from "./List";
import { useDispatch, useSelector } from "react-redux";
import {
  addList,
  addParentToList,
  selectCanUndo,
  selectCanRedo,
  selectDisplayedList,
  selectAllLists,
  selectListById,
  changeDisplayedList,
  selectTopList,
  dropList,
} from "./listSlice";
import { ActionCreators } from "redux-undo";

function Navbar() {
  const lists = useSelector(selectAllLists);
  const options = lists.map((list) => (
    <li key={list.id}>
      <Link to={`/${list.id}`}>{list.title}</Link>
    </li>
  ));
  return (
    <nav>
      <section>
        <h1>Lists</h1>

        <div className="navContent">
          <div className="navLinks">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {options}
            </ul>
          </div>
        </div>
      </section>
    </nav>
  );
}

function SelectList(props: { id: string }) {
  const lists = useSelector(selectAllLists);
  const dispatch = useDispatch();

  const options = lists.map((list) => (
    <option key={list.id} value={list.id}>
      {list.title}
    </option>
  ));
  return (
    <select
      value={props.id}
      onChange={(e) => dispatch(changeDisplayedList(e.currentTarget.value))}
    >
      {options}
    </select>
  );
}

const MainListView = ({ match }: any) => {
  // console.log("props.id: ", match);
  let displayedListId = useSelector(selectTopList);
  if (match) displayedListId = match.params.id;

  const list = useSelector((state: SystemState) =>
    selectListById(state, displayedListId)
  );

  const dispatch = useDispatch();
  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);

  const [editMode, setEditMode] = useState("ViewMode");

  if (!list) return <p>Not a valid list</p>;

  const { id, title, description } = list;
  return (
    <React.Fragment>
      {/* <SelectList id={id} /> */}
      <select
        value={editMode}
        onChange={(e) => setEditMode(e.currentTarget.value)}
      >
        <option value="EditMode">Edit</option>
        <option value="ViewMode">View</option>
      </select>
      <div
        className={editMode}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.stopPropagation();
          const { id: childId, parentId: oldParentId } = JSON.parse(
            e.dataTransfer.getData("text/plain")
          );
          dispatch(dropList({ parentId: id, childId, oldParentId }));
          return false;
        }}
      >
        <ListTitle id={id} title={title} parentId="" />
        <ListDescription id={id} description={description} />

        {list.children.map((childId) => (
          <List key={childId} listId={childId} parentId={id} />
        ))}

        <div>
          <button
            onClick={() => dispatch(addList(id))}
            className="EditButton AddChildButton"
          >
            +
          </button>
        </div>

        <button
          className="EditButton ControlButton UndoButton"
          disabled={!canUndo}
          onClick={() => {
            dispatch(ActionCreators.undo());
          }}
        >
          {" "}
          Undo
        </button>
        <button
          className="EditButton ControlButton RedoButton"
          disabled={!canRedo}
          onClick={() => {
            dispatch(ActionCreators.redo());
          }}
        >
          {" "}
          Redo
        </button>

        {/* <div>
          <button onClick={() => dispatch(addParentToList(id))} className="EditButton AddChildButton">
            Add Parent List
          </button>
        </div> */}
      </div>
    </React.Fragment>
  );
};

function App() {
  const defaultId = useSelector(selectTopList);
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="App">
        <Switch>
          <Route path="/lists">
            <MainListView />
          </Route>
          <Route exact path="lists/:id" component={MainListView} />
          <Redirect to="/lists" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
