import ASN1 from "@lapo/asn1js";

interface CertificateInfo {
    commonName: string;
    issuerName: string;
    validFrom: string;
    validTo: string;
}

export const parseCertificate = (certData: Uint8Array): CertificateInfo => {
    const uint8Array = new Uint8Array(certData);
    const result = ASN1.decode(uint8Array);

    if (result.typeName() !== "SEQUENCE" || result.sub === null) {
        throw new Error("Неправильна структура конверта сертифіката (очікується SEQUENCE)");
    }
    const tbsCertificate = result.sub[0];
    const subject = tbsCertificate.sub?.[5];
    const issuer = tbsCertificate.sub?.[3];
    const start = tbsCertificate.sub?.[4].sub?.[0].content();
    const end = tbsCertificate.sub?.[4].sub?.[1].content();
    const name = subject?.sub?.[1].sub?.[0].sub?.[1].content();
    const issuerCN = issuer?.sub?.[2].sub?.[0].sub?.[1].content();

    const commonName = name ?? "Unknown";
    const issuerName = issuerCN ?? "Unknown";
    const validFrom = start?.split(" ")[0] ?? "Unknown";
    const validTo = end?.split(" ")[0] ?? "Unknown";

    return {
        commonName,
        issuerName,
        validFrom,
        validTo,
    };
};
