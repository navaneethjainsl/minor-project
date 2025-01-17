/*
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 */

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
import { StringDecoder } from 'string_decoder';

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
            // clientId: process.env.ADOBEPDF_CLIENT_ID_API_KEY,
            // clientSecret: process.env.ADOBEPDF_CLIENT_ID_API_KEY
            clientId: "f85dae88f88649b1977717edd57f5d86",
            clientSecret: "p8e-1e_HNobF_vXS9Wwla8qCZ36L7ZlmTfgf"
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
        console.log("resultAsset");
        console.log(resultAsset);
        console.log("streamAsset");
        console.log(streamAsset);


        // // Creates a write stream and copy stream asset's content to it
        // const outputFilePath = createOutputFilePath();
        // console.log(`Saving asset at ${outputFilePath}`);

        // const writeStream = fs.createWriteStream(outputFilePath);
        // streamAsset.readStream.pipe(writeStream);
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