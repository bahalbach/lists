import { createSlice, nanoid } from "@reduxjs/toolkit";

const defaultTitle = "List Name";
const defaultDescription = "List Description";
const defaultId = nanoid();

export const listSlice = createSlice({
    name: 'list',
    initialState: {
        displayedList: defaultId,
        nodeHistory: [[{id: defaultId, title: defaultTitle, description: defaultDescription}]],
        childRelationHistory: [[]],
        nodeHistoryIndex: 0,
    },
    reducers: {
        changeNodeTitle: (state, action) => {

        },
        changeNodeDescription: (state, action) => {

        },
        addNode: (state, action) => {

        },
        removeNode: (state, action) => {

        },
        changeDisplayedList: (state, action) => {

        },
        undo: state => {

        },
        redo: state => {

        }
    },
})

export const { changeNodeTitle, changeNodeDescription, addNode, removeNode, changeDisplayedList, undo, redo } = listSlice.actions

export const selectDisplayedNode = (state: SystemState) => {
    return state.list.displayedList;
}
export const selectNode = (nodeId: string) => (state: SystemState) => {
    const nodes = state.list.nodeHistory[state.list.nodeHistoryIndex];
    const childRelations = state.list.childRelationHistory[state.list.nodeHistoryIndex];
    const node = nodes.find(node => node.id === nodeId)!;
    const childrenIds = childRelations.filter(relation => relation.parentId === nodeId).map(relation => relation.childId);
    return ([node, childrenIds]) as [ListNode, string[]];
}

export default listSlice.reducer