jQuery(() => {
  if (window.location.href.includes("attachments")) {
    loadMultipleScripts([
      "https://unpkg.com/jszip@3.10.1/dist/jszip.js",
      "https://volodymyrbaydalka.github.io/docxjs/dist/docx-preview.js",
    ]).then(() => {
      $a = $(".filecontent-container  a");
      const container = $(".attachments")[0];

      let href = $a?.[0]?.href;

      if (href && href.includes(".docx")) {
        renderDocxPreview(href, container);
      }
    });
  }
});

function loadScriptAsync(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

async function loadMultipleScripts(scripts) {
  for (const url of scripts) {
    try {
      await loadScriptAsync(url);
    } catch (err) {
      console.error(err);
      break;
    }
  }
}

async function renderDocxPreview(docxUrl, container) {
  try {
    jQuery.ajax({
      url: docxUrl,
      cache: false,
      xhr: function () {
        // Seems like the only way to get access to the xhr object
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        return xhr;
      },
      success: function (data) {
        docx.renderAsync(data, container);
      },
      error: function (error) {
        throw new Error(error);
      },
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p style="color: red;">redmine_attachment_docxjs error: ${error.message}</p>`;
  }
}
