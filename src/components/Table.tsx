import React from "react";
import "../index.css";

interface CertificateInfo {
    commonName: string;
    issuerName: string;
    validFrom: string;
    validTo: string;
}

interface TableProps {
    certificates: CertificateInfo[];
    onTableRowClick: (certificate: CertificateInfo) => void;
}

export const Table: React.FC<TableProps> = ({ certificates, onTableRowClick }) => {
    return (
        <table>
            <thead>
                {certificates.map((cert, index) => (
                    <tr key={index} onClick={() => onTableRowClick(cert)} style={{ cursor: "pointer" }}>
                        <th>{cert.commonName}</th>
                    </tr>
                ))}
            </thead>
        </table>
    );
};
