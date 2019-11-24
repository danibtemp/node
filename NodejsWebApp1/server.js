

const { Connection, Request } = require("tedious");
// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "azureuser", // update me
      password: "Fireheart3!!" // update me
    },
    type: "default"
  },
  server: "mysqlserver1717.database.windows.net", // update me
  options: {
    database: "DaniDatabase", //update me
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});
function queryDatabase() {
  console.log("Reading rows from the Table...");
  var x = Math.floor(Math.random() * 30) + 1  
    
  // Read all rows from table
 const request = new Request(`SELECT picurl FROM kittens WHERE ID =` + x + `;`,
    (err, rowCount) => {
      if (err) {
        //console.error(err.message);
      } else {
        //console.log(`${rowCount} row(s) returned`);
      }
    }
  );
    var html;


  request.on("row", columns => {
    columns.forEach(column => {
        html = '<img src="' + column.value + '" height="600"/>'

      //console.log("%s\t%s", column.metadata.colName, column.value);
      
    });
  });
  connection.execSql(request);

    var http = require('http');
    var port = process.env.PORT || 1337;
    var refresh = 'Cute Kitty pic; url pulled from database:)<br><br>'
    http.createServer(function (req, res) {

        res.writeHead(200, { 'Content-Type': 'text/html' });
       // res.writeContinue(refresh);
        res.end(refresh + html);
        
    }).listen(port);
    

}