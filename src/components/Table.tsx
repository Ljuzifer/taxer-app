import React from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import "../index.css";

interface CertificateInfo {
    commonName: string;
    issuerName: string;
    validFrom: string;
    validTo: string;
}

interface TableProps {
    certificates: CertificateInfo[];
    activeRowIndex: number | null;
    onTableRowClick: (certificate: CertificateInfo, rowIndex: number) => void;
    onDeleteItem: (index: number) => void;
}

export const Table: React.FC<TableProps> = ({ certificates, activeRowIndex, onTableRowClick, onDeleteItem }) => {
    const handleDeleteItem = (index: number) => {
        onDeleteItem(index); // Викликаємо onDeleteItem з індексом, що був натиснутий
    };

    return (
        <table>
            <thead>
                {certificates.map((cert, index) => (
                    <tr className={`Table_row ${activeRowIndex === index ? "active" : ""}`} key={index}>
                        <th className="Table_cell">
                            <TiDelete className="Cross" onClick={() => handleDeleteItem(index)} />
                            <div className="Table_name" onClick={() => onTableRowClick(cert, index)}>
                                {cert.commonName}
                                {activeRowIndex === index && <BsArrowRightCircleFill className="Arrow" />}
                            </div>
                        </th>
                    </tr>
                ))}
            </thead>
        </table>
    );
};
