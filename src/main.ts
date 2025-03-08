import {processFileContent} from './fileProcessor.js';

function handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = function(e: ProgressEvent<FileReader>): void {
        try {
            // load file data and process it
            const content = e.target?.result as string;
            const {distance, similarity} = processFileContent(content);
            
            // write result to the forntend div
            const resultDiv = document.getElementById('result') as HTMLDivElement;
            resultDiv.innerHTML = `
                Total distance: ${distance}<br>
                Similarity score: ${similarity}
            `;
        } catch (error) {
            // write error in the frontend div
            const resultDiv = document.getElementById('result') as HTMLDivElement;
            resultDiv.textContent = `Error: ${(error as Error).message}`;
        }
    };
    
    reader.onerror = function(): void {
        // write error in the frontend div
        const resultDiv = document.getElementById('result') as HTMLDivElement;
        resultDiv.textContent = 'Error reading file';
    };
    
    // read the uploaded file
    reader.readAsText(file);
}

// add event listener for the file upload
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.addEventListener('change', handleFileUpload);
});
