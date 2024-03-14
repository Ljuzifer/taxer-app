import React from "react";
import "../index.css";

interface DropZoneProps {
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DragAndDrop: React.FC<DropZoneProps> = ({ onDrop, onDragOver, onFileInputChange }) => {
    return (
        <div className="Drag_drop" onDrop={onDrop} onDragOver={onDragOver}>
            Просто перетягніть сюди файл...
            <label>
                <input type="file" style={{ display: "none" }} onChange={onFileInputChange} />
                <span className="Input_span">Вибрати через провідник</span>
            </label>
        </div>
    );
};
