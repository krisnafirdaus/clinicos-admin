import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Section } from '../../types';

interface DragAndDropProps {
  items: Section[];
  onReorder: (items: Section[]) => void;
}

export const DragAndDrop: React.FC<DragAndDropProps> = ({ items, onReorder }) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    onReorder(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided: any) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided: any, snapshot: any) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-3 bg-white rounded-lg shadow ${
                      snapshot.isDragging ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">☰</span>
                      {item.title}
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};