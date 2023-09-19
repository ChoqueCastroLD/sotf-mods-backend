export async function uploadFile(fileBuffer, filename) {
  // Create a Blob from the file buffer
  const blob = new Blob([fileBuffer], { type: 'application/zip' });
  console.log('Blob Size:', blob.size);
  console.log('Blob Type:', blob.type);
  
  // Create a FormData object and append the Blob to it
  const formData = new FormData();
  formData.append('file', blob, {
    contentType: 'application/zip',
    name: 'file',
    filename
  });

  // Construct the upload URL
  let url = process.env.MOD_UPLOAD_ENDPOINT || ''; // Use a default value if MOD_UPLOAD_ENDPOINT is undefined
  url += "?filename=" + filename;

  // Display the URL and FormData for debugging
  console.log(url);
  console.log(formData);

  try {
    // Send a POST request with the FormData
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      // Handle non-OK responses here, e.g., throw an error or handle as needed
      throw new Error(`Failed to upload file. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    if (!data.filename) {
      // Handle the response data here if needed
      throw new Error('Invalid response from the server');
    }

    return data.filename;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}