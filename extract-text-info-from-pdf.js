const {
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
} = require("@adobe/pdfservices-node-sdk");
const axios = require("axios");
const fs = require("fs");

/**
 * This sample illustrates how to extract Text Information from PDF.
 * <p>
 * Refer to README.md for instructions on how to run the samples & understand output zip file
 */
(async () => {
    let readStream;
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.ADOBEPDF_API_KEY,
            clientSecret: process.env.ADOBEPDF_API_KEY
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Download the PDF from the URL
        const pdfUrl = 'YOUR_FIREBASE_STORAGE_PDF_URL';
        const response = await axios({
            url: pdfUrl,
            method: 'GET',
            responseType: 'stream'
        });

        // Creates an asset(s) from the downloaded stream and upload
        const inputAsset = await pdfServices.upload({
            readStream: response.data,
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
        const outputFilePath = createOutputFilePath();
        console.log(`Saving asset at ${outputFilePath}`);

        const writeStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(writeStream);
    } catch (err) {
        if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
            console.log("Exception encountered while executing operation", err);
        } else {
            console.log("Exception encountered while executing operation", err);
        }
    } finally {
        readStream?.destroy();
    }
})();

// Generates a string containing a directory structure and file name for the output file
function createOutputFilePath() {
    const filePath = "output/ExtractTextInfoFromPDF/";
    const date = new Date();
    const dateString = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + "-" +
        ("0" + date.getMinutes()).slice(-2) + "-" + ("0" + date.getSeconds()).slice(-2);
    fs.mkdirSync(filePath, {recursive: true});
    return (`${filePath}extract${dateString}.zip`);
}
