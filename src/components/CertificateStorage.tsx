import React, { useState, useEffect } from "react";
import { parseCertificate } from "../utils/parseCertificate";
import { CertificateDetails } from "./CertificateDetails";

interface CertificateInfo {
    commonName: string;
    issuerName: string;
    validFrom: string;
    validTo: string;
}

type ButtonName = "add" | "back";

const CertificateStorage: React.FC = () => {
    const [certificates, setCertificates] = useState<CertificateInfo[]>([]);
    const [showDropZone, setShowDropZone] = useState<boolean>(false);
    const [buttonName, setButtonName] = useState<ButtonName>("add");
    const [selectedCertificate, setSelectedCertificate] = useState<CertificateInfo | null>(null);

    useEffect(() => {
        const storedCertificates = localStorage.getItem("certificates");
        if (storedCertificates) {
            setCertificates(JSON.parse(storedCertificates));
        }
    }, []);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        handleFiles(files);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        handleFiles(files);
    };

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const certificateInfo = parseCertificate(reader.result as Uint8Array);
                    setCertificates([...certificates, certificateInfo]);
                    localStorage.setItem("certificates", JSON.stringify([...certificates, certificateInfo]));
                } catch (error) {
                    console.error("Failed to parse certificate -", error);
                }
            };
            setButtonName("add");
            reader.readAsArrayBuffer(file);
        }
    };

    const handleButtonClick = () => {
        setShowDropZone(!showDropZone);
        setButtonName(showDropZone ? "add" : "back");
    };
    const handleItemClick = (certificate: CertificateInfo) => {
        setSelectedCertificate(certificate);
        setButtonName("add");
    };

    return (
        <div>
            <h1>Certificate Storage</h1>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "0 100px" }}>
                <div style={{ padding: "20px" }}>
                    <button
                        style={{ padding: "10px 28px", borderRadius: "4px", cursor: "pointer", marginBottom: "20px" }}
                        type="button"
                        onClick={handleButtonClick}>
                        {buttonName === "add" ? "Додати" : "Назад"}
                    </button>
                    <table>
                        <thead>
                            {certificates.map((cert, index) => (
                                <tr key={index} onClick={() => handleItemClick(cert)} style={{ cursor: "pointer" }}>
                                    <th>{cert.commonName}</th>
                                </tr>
                            ))}
                        </thead>
                    </table>
                </div>
                {certificates.length === 0 || buttonName === "back" || !selectedCertificate ? (
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        style={{
                            border: "2px dashed black",
                            borderRadius: "4px",
                            padding: "40px 28px",
                            margin: "20px 0",
                            backgroundColor: "lightgrey",
                        }}>
                        Просто перетягніть сюди файл
                        <label>
                            <input type="file" style={{ display: "none" }} onChange={handleFileInputChange} />
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
                ) : (
                    <CertificateDetails certificate={selectedCertificate} />
                )}
            </div>
        </div>
    );
};

export default CertificateStorage;
