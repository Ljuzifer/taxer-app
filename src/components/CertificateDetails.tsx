import React from "react";
import "../index.css";

interface CertificateInfo {
    commonName: string;
    issuerName: string;
    validFrom: string;
    validTo: string;
}

interface CertificateDetailsProps {
    certificate?: CertificateInfo | null;
}

export const CertificateDetails: React.FC<CertificateDetailsProps> = ({ certificate }) => {
    return (
        <div className="Details_block">
            <p>
                <b>Common Name:</b> {certificate?.commonName || ""}
            </p>
            <p>
                <b>IssuerCN:</b> {certificate?.issuerName}
            </p>
            <p>
                <b>Valid From:</b> {certificate?.validFrom}
            </p>
            <p>
                <b>Valid To:</b> {certificate?.validTo}
            </p>
        </div>
    );
};
