// config

var config = importConfiguration("https://raw.githubusercontent.com/jcodesmn/data-flipper/master/horizontalExpansion.json");

// onOpen

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Data Flipper")
    .addItem("Run Script", "runScript")
    .addToUi();
}


function jsonFromUrl(url) {
  var rsp  = UrlFetchApp.fetch(url);
  var data = rsp.getContentText();
  var json = JSON.parse(data);
  return json;
} 

function jsonFromFile(file) {
  var data = file.getBlob().getDataAsString();
  var json = JSON.parse(data);
  return json;
} 

function importConfiguration(scriptConfig) {
  var regExp = new RegExp("^(http|https)://");
  var test   = regExp.test(scriptConfig);
  var json;
  if (test) {
    json = jsonFromUrl(scriptConfig); 
    return json;
  } else {
    var file = findFileAtPath(scriptConfig); 
    json = jsonFromFile(file); 
    return json;
  }
}

function checkValIn(arr, val) { 
  return arr.indexOf(val) > -1; 
}

function arrSheetNames(ssObj) {
  var sheets = ssObj.getSheets();
  var arr    = [];
  for (var i = 0; i < sheets.length; i++) {
    arr.push(sheets[i].getName());
  } 
  return arr;
} 

function validSheet(ssObj, name) {
  var arr = arrSheetNames(sssObj);
  if (checkValIn(arr, name)) {
    return ssObj.getSheetByName(name);
  } 
}

function findFileAtPath(path) {
  var fi;
  var arr  = path.split('/');
  var file = arr[arr.length -1];
  var fldr;
  for (i = 0; i < arr.length - 1; i++) {
    if (i === 0) {
      fi = DriveApp.getRootFolder().getFoldersByName(arr[i]);
      if (fi.hasNext()) {
        fldr = fi.next();
      } else { 
        return null;
      }
    } else if (i >= 1) {
        fi = fldr.getFoldersByName(arr[i]);
        if (fi.hasNext()) {
          fldr = fi.next();
        } else { 
          return null;
        }
    }
  } 
  return findFileIn(fldr, file);
} 

function openFileAsSpreadsheet(file) {
  var _id = file.getId();
  var _ss = SpreadsheetApp.openById(_id);
  return _ss;
} 

// script

function runScript() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var iValues;
  if (config.process !== "") {
    if (config.input.pathToSpreadsheet !== "" && config.input.sheet !== "") {
      var iFile = findFileAtPath(config.input.pathToSpreadsheet);
      if (iFile) {
        var iSS = openFileAsSpreadsheet(iFile);
        if (iSS) {
          var iSheet = validSheet(iSS, config.input.sheet);
          if (iSheet) {
            var iMaxRows = iSheet.getMaxRows();
            var iMaxCol  = iSheet.getMaxColumns();
            iValues      = iSheet.getRange(2, 1, iMaxRows, iMaxCol).getValues();
          } else {
            // sheet not found in spreadsheet
          }
        } else {
          // can't open file as spreadsheet
        }
      } else {
        // no file found at path
      }
    } else {
      // no valid input 
    }
  } else {
    // no process specified
  }

  // do stuff with iValues

  var oFile, oSS, oSheet;

} 

// legacy

// global
// var ui        = SpreadsheetApp.getUi();
// var ss        = SpreadsheetApp.getActive();
// var iSheet    = ss.getSheets()[0];
// var oSheet    = ss.getSheets()[1];
// var iRowCount = iSheet.getMaxRows();
// var iColCount = iSheet.getMaxColumns();
// var aValues   = iSheet.getRange(2,1,iRowCount,iColCount).getValues();

function aToData() {
    var bValues = [];
    for (var aRow in aValues) {
        bValues[aRow] = [];
		bValues[aRow].push(aValues[aRow][0]);
		for (i = 1; i < iColCount; i++) {
			if (aValues[aRow][i] !== "") {
			    var class1  = aValues[aRow][i];
                bValues[aRow].push(class1);
	        } else {
                break;
		    }
        }
	}
    var cValues = [];
	var cRowCount = 0;
	for (var bRow in bValues) {
	    for (i = 1; i < bValues[bRow].length; i++) {
		    var student        = bValues[bRow][0];
			var class2          = bValues[bRow][i];
			cValues[cRowCount] = [];
			cValues[cRowCount].push(student,class2);
			cRowCount++;
        }
	}
  var oRowCount = cValues.length; 
  ss.setActiveSheet(oSheet);
  var oRange = oSheet.getRange(2,1,oRowCount,2);
  oRange.setValues(cValues);
}

