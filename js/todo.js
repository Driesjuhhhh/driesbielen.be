document.getElementById("submitButton").addEventListener("click", function() {
  // Construct JSON payload
  const payload = {
      fields: {
          project: { key: "DRS" },
          summary: 'test',
          issuetype: { name: "PRIVE" },
          description: 'test'
      }
  };

  // Send fetch request
  fetch("https://dries.atlassian.net/rest/api/2/issue/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic ZHJpZXMuYmllbGVuMTBAZ21haWwuY29tOkFURVRUM3hGZkcwUkhQMHB5SW1XbjdXVG5MSlBnamlUOVlrdGhoTjlYSE1Ecld4MXMxZnN5OW9NWEtVMDJ6dGRFQ1BBQkZFRklyUU9pRldWaS1tVWVYZjNQS2dBOEtaaTdqY0NpR0hvc3ozblJRc1dRejI3YUxGalpMaFFhSzhFTTVxcnB6MS1vTTlzSzAwUHJScmMwY3pIRzU1MVY5UXloVGdxc250M05IbC1GOEViZWxBSllDY<|endoffile|>"
      },
      body: JSON.stringify(payload)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      return response.json();
  })
  .then(data => {
      console.log("Success:", data);
      // Handle success response here
  })
  .catch(error => {
      console.error("Error:", error);
      // Handle error here
  });
});
