export default ({ body, title, initialState }) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="/app.css" />
        <script>
            window.__ATTOLLO_INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/app.js"></script>
      </head>
      <body>
        <div id="app-container">${body}</div>
      </body>
    </html>
  `;
};