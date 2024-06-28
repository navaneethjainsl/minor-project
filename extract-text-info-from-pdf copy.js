import {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    ExtractPDFParams,
    ExtractElementType,
    ExtractPDFJob,
    ExtractPDFResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} from "@adobe/pdfservices-node-sdk";
import fs from "fs";
import dotenv from 'dotenv/config';
import AdmZip from 'adm-zip';

(async () => {
let readStream;
try {
    // Initial setup, create credentials instance
    const credentials = new ServicePrincipalCredentials({
        // clientId: "f85dae88f88649b1977717edd57f5d86",
        // clientSecret: "p8e-1e_HNobF_vXS9Wwla8qCZ36L7ZlmTfgf"
        clientId: process.env.ADOBEPDF_CLIENT_ID_API_KEY,
        clientSecret: process.env.ADOBEPDF_CLIENT_SECRET
    });

    // Creates a PDF Services instance
    const pdfServices = new PDFServices({credentials});

    // Creates an asset(s) from source file(s) and upload
    readStream = fs.createReadStream("./public/pdfs/IDS.pdf");
    const inputAsset = await pdfServices.upload({
    readStream,
    mimeType: MimeType.PDF
    });

    // Create parameters for the job
    const params = new ExtractPDFParams({
    elementsToExtract: [ExtractElementType.TEXT]
    });

    // Creates a new job instance
    const job = new ExtractPDFJob({inputAsset, params});

    // Submit the job and get the job result
    const pollingURL = await pdfServices.submit({job});
    const pdfServicesResponse = await pdfServices.getJobResult({
    pollingURL,
    resultType: ExtractPDFResult
    });

    // Get content from the resulting asset(s)
    const resultAsset = pdfServicesResponse.result.resource;
    const streamAsset = await pdfServices.getContent({asset: resultAsset});

    // Creates a write stream and copy stream asset's content to it
    const outputFilePath = "ExtractTextInfoFromPDF.zip";
    console.log(`Saving asset at ${outputFilePath}`);

    const writeStream = fs.createWriteStream(outputFilePath);
    streamAsset.readStream.pipe(writeStream);

    let zip = new AdmZip(outputFilePath);
    let jsondata = await zip.readAsText('structuredData.json');
    let data = JSON.parse(jsondata);
    data.elements.forEach(element => {
        console.log(element.Text);
        
    });
} catch (err) {
    console.log("Exception encountered while executing operation", err);
} finally {
    readStream?.destroy();
}
})();
