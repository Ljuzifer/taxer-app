import React from "react";
import "../index.css";

interface DropZoneProps {
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DragAndDrop: React.FC<DropZoneProps> = ({ onDrop, onDragOver, onFileInputChange }) => {
    return (
        <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{
                border: "2px dashed black",
                borderRadius: "4px",
                padding: "40px 28px",
                margin: "20px 0",
                backgroundColor: "lightgrey",
            }}>
            Просто перетягніть сюди файл...
            <label>
                <input type="file" style={{ display: "none" }} onChange={onFileInputChange} />
                <span
                    style={{
                        display: "block",
                        cursor: "pointer",
                        backgroundColor: "gray",
                        border: "2px solid black",
                        borderRadius: "4px",
                        padding: "4px",
                        marginTop: "25px",
                    }}>
                    Вибрати через провідник
                </span>
            </label>
        </div>
    );
};
