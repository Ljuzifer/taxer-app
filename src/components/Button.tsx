import React from "react";
import "../index.css";

interface ButtonProps {
    onClick: () => void;
    buttonName: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, buttonName }) => {
    return (
        <button className="Button" type="button" onClick={onClick}>
            {buttonName}
        </button>
    );
};
