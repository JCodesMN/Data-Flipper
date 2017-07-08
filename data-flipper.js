// onOpen

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Data Flipper")
    .addItem("Run Script", "runScript")
    .addToUi();
}

// ------------------------------------------
// v0.2-beta | google-apps-script-cheat-sheet 
// ------------------------------------------

/**
 * Returns true if the value is in the array.
 *
 * @param {Array} arr
 * @param {*} val
 * @returns {boolean}
 */

function checkValIn(arr, val) { 
  return arr.indexOf(val) > -1; 
}

/**
 * Returns an array of the names of the sheets in a spreadsheet.
 *
 * @param {Spreadsheet} ss
 * @returns {string[]}
 */

function arrSheetNames(ss) {
  var sheets = ss.getSheets();
  var result = [];
  for (var i = 0; i < sheets.length; i++) {
    arr.push(sheets[i].getName());
  } 
  return result;
} 

function validSheet(ssObj, name) {
  var arr = arrSheetNames(ssObj);
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

function expandCol() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getNumSheets() >= 2) {
    var iSheet   = ss.getSheets()[0];
    var oSheet   = ss.getSheets()[1];
    // var iArr = arrForColName(iSheet, 0)

  } else {
    Logger.log("This function requires two sheets in the spreadsheet");
  
  }

} 

function compressToCol() {
  
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

