import React, { useState, useEffect } from "react";
// import * as asn1js from "asn1js";
import ASN1 from "@lapo/asn1js";
// import Hesx from "@lapo/asn1js/hex";

interface CertificateInfo {
    commonName: string;
    validityPeriod: string;
    issuerName: string;
}

const parseCertificate = (certData: Uint8Array): CertificateInfo => {
    const uint8Array = new Uint8Array(certData);
    const result = ASN1.decode(uint8Array);

    if (result.typeName() !== "SEQUENCE" || result.sub === null) {
        throw new Error("Неправильна структура конверта сертифіката (очікується SEQUENCE)");
    }
    const tbsCertificate = result.sub[0];
    const subject = tbsCertificate.sub?.[5];
    const name = subject?.sub?.[1].sub?.[0].sub?.[1].content();
    console.log(name);

    const commonName = name ?? "Unknown"; // Parse common name
    const validityPeriod = ""; // Parse validity period
    const issuerName = ""; // Parse issuer name

    return {
        commonName,
        validityPeriod,
        issuerName,
    };
};

const CertificateStorage: React.FC = () => {
    const [certificates, setCertificates] = useState<CertificateInfo[]>([]);

    useEffect(() => {
        const storedCertificates = localStorage.getItem("certificates");
        if (storedCertificates) {
            setCertificates(JSON.parse(storedCertificates));
        }
    }, []);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        // console.log(files);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const certificateInfo = parseCertificate(reader.result as Uint8Array);
                    setCertificates([...certificates, certificateInfo]);
                    localStorage.setItem("certificates", JSON.stringify([...certificates, certificateInfo]));
                } catch (error) {
                    console.error("Failed to parse certificate:", error);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <h1>Certificate Storage</h1>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ border: "2px dashed black", padding: "20px", margin: "20px 0" }}>
                Drag & Drop certificates here
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Common Name</th>
                        <th>Validity Period</th>
                        <th>Issuer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {certificates.map((cert, index) => (
                        <tr key={index}>
                            <td>{cert.commonName}</td>
                            <td>{cert.validityPeriod}</td>
                            <td>{cert.issuerName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CertificateStorage;
