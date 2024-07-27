declare module 'react-beautiful-dnd' {
    import * as React from 'react';
  
    export interface DraggableProps {
      draggableId: string;
      index: number;
      children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => React.ReactElement;
    }
  
    export interface DroppableProps {
      droppableId: string;
      children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactElement;
    }
  
    export interface DragDropContextProps {
      onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
      children: React.ReactNode;
    }
  
    export class DragDropContext extends React.Component<DragDropContextProps> {}
    export class Droppable extends React.Component<DroppableProps> {}
    export class Draggable extends React.Component<DraggableProps> {}
  
  }