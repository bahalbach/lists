import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";
import './App.css';
import { List, ListDescription, ListTitle } from './List';
import { useDispatch, useSelector } from 'react-redux';
import { addNode, addParentToNode, selectCanUndo, selectCanRedo, selectDisplayedNode, selectNode, selectNodes, changeDisplayedList, selectTopNode } from './listSlice';
import { ActionCreators } from 'redux-undo';

function Navbar() {
  const nodes = useSelector(selectNodes);
  const options = nodes.map(node =>
    <li><Link to={`/${node.id}`} key={node.id} >{node.title}</Link></li>)
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
  const nodes = useSelector(selectNodes);
  const dispatch = useDispatch();

  const options = nodes.map(node =>
    <option key={node.id} value={node.id}>{node.title}</option>);
  return (
    <select value={props.id} onChange={(e) => dispatch(changeDisplayedList(e.currentTarget.value))}>
      {options}
    </select>
  );
}

const MainListView = ({ match }: any) => {
  console.log("props.id: ", match);
  let displayedNodeId = useSelector(selectTopNode);
  if ( match ) displayedNodeId = match.params.id;
  
  const [node, childrenIds] = useSelector(selectNode(displayedNodeId));
  
  const dispatch = useDispatch();
  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);

  if (!node) return <p>"Not a valid list"</p>;

  const { id, title, description } = node;
  return (
    <React.Fragment>
      <SelectList id={id} />
      <ListTitle id={id} title={title} />
      <ListDescription id={id} description={description} />

      {childrenIds.map(childId =>
        <List nodeId={childId} />
      )}

      <div>
        <button onClick={() => dispatch(addNode(id))} className="AddChildButton">
          +
        </button>
      </div>

      <button
        className="ControlButton UndoButton"
        disabled={!canUndo}
        onClick={() => {
          dispatch(ActionCreators.undo());
        }}> Undo
      </button>
      <button
        className="ControlButton RedoButton"
        disabled={!canRedo}
        onClick={() => {
          dispatch(ActionCreators.redo());
        }}> Redo
      </button>

      <div>
        <button onClick={() => dispatch(addParentToNode(id))} className="AddChildButton">
          Add Parent List
        </button>
      </div>
    </React.Fragment>
  );
}

function App() {
  const defaultId = useSelector(selectTopNode);
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <MainListView />
          </Route>
          <Route exact path="/:id" component={MainListView} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
