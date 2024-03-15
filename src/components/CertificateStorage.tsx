import React, { useState, useEffect } from "react";
import { parseCertificate } from "../utils/parseCertificate";
import { Button } from "./Button";
import { Table } from "./Table";
import { CertificateDetails } from "./CertificateDetails";
import { DragAndDrop } from "./DragAndDrop";
import toast from "react-hot-toast";

interface CertificateInfo {
    commonName: string;
    issuerName: string;
    validFrom: string;
    validTo: string;
}

type ButtonName = "add" | "back";

export const CertificateStorage: React.FC = () => {
    const [certificates, setCertificates] = useState<CertificateInfo[]>([]);
    const [showDropZone, setShowDropZone] = useState<boolean>(false);
    const [buttonName, setButtonName] = useState<ButtonName>("add");
    const [selectedCertificate, setSelectedCertificate] = useState<CertificateInfo | null>(null);
    const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);

    useEffect(() => {
        const storedCertificates = localStorage.getItem("certificates");

        if (storedCertificates) {
            setCertificates(JSON.parse(storedCertificates));
            if (certificates.length === 1) {
                toast.success(`Наразі маєте ${certificates.length} сертифікат`);
            } else if (certificates.length > 1) {
                toast.success(`Наразі маєте ${certificates.length} сертифікатів`);
            }
        }
        // eslint-disable-next-line
    }, []);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const certificateInfo = parseCertificate(reader.result as Uint8Array);
                    setCertificates([...certificates, certificateInfo]);
                    toast.success("Сертифікат успішно додано!");
                    localStorage.setItem("certificates", JSON.stringify([...certificates, certificateInfo]));
                } catch (error) {
                    toast.error(`Неможливо прочитати сертифікат - ${error}`);
                    console.error("Failed to parse certificate -", error);
                }
            };
            setButtonName("add");
            setSelectedCertificate(null);
            reader.readAsArrayBuffer(file);
        }
    };

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

    const handleButtonClick = () => {
        setButtonName(showDropZone ? "add" : "back");
        setShowDropZone(!showDropZone);
    };

    const handleItemClick = (certificate: CertificateInfo, rowIndex: number) => {
        setSelectedCertificate(certificate);
        setActiveRowIndex(rowIndex);
        setButtonName("add");
    };

    const handleDeleteItem = (index: number) => {
        const updatedCertificates = certificates.filter((_, i) => i !== index);
        toast.success("Сертифікат видалено!");

        if (updatedCertificates.length === 0) {
            setSelectedCertificate(null);
            setActiveRowIndex(null);
            setCertificates([]);
            setButtonName("back");
            toast.success("Наразі немає жодного сертифіката");
        }

        setCertificates(updatedCertificates);
        localStorage.setItem("certificates", JSON.stringify(updatedCertificates));
    };

    return (
        <section>
            <h1>Certificate's Storage</h1>
            <div className="Container">
                <div className="Container_button">
                    <Button onClick={handleButtonClick} buttonName={buttonName === "add" ? "Додати" : "Назад"} />
                    {certificates.length !== 0 ? (
                        <Table
                            certificates={certificates}
                            onTableRowClick={handleItemClick}
                            activeRowIndex={activeRowIndex}
                            onDeleteItem={handleDeleteItem}
                        />
                    ) : (
                        <b>Наразі немає жодного сертифіката</b>
                    )}
                </div>
                {buttonName === "back" && (
                    <DragAndDrop
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onFileInputChange={handleFileInputChange}
                    />
                )}
                {certificates.length !== 0 && buttonName === "add" && selectedCertificate && (
                    <CertificateDetails certificate={selectedCertificate} />
                )}
                {certificates.length === 0 && buttonName === "add" && <div style={{ width: "500px" }}></div>}
            </div>
        </section>
    );
};
