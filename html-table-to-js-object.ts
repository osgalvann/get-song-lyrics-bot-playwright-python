//This function convert an HTML Table to a JavaScript Object using Playwright and TypeScript

async function HTMLTableToObjectParser(table: Locator) {
    let rowsCount = await table.locator("tr").count();
    let headers = await table.locator("th").textContent();
    let rows = [];
    let rowData = {};
    let data = [];
    for(let i=1;i<rowsCount;i++){
      rows.push(await table.locator("tr").nth(i).locator("td").textContent());
    }

    for(let i=0;i<rows.length;i++){
      for(let j=0;j<headers.length;j++){
        rowData[headers[j]]=rows[i][j];
      }
      data.push(JSON.parse(JSON.stringify(rowData)));
    }
    return data;
 }

//using
const table = page.locator("#tableId");
let tableData = await HTMLTableToObjectParser(table);
