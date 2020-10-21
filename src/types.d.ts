interface ListNode {
    id: string
    title: string
    description: string
}

interface ChildRelation {
    parentId: string
    childId: string
}

interface ListState {
    displayedList: string,
    nodes: ListNode[],
    childRelations: ChildRelation[]
    // nodeHistory: ListNode[][],
    // childRelationHistory: ChildRelation[][],
    // history: {node: number, childRelation: number}[],
    // historyIndex: number
}

interface SystemState {
    list: {present: ListState}
}

