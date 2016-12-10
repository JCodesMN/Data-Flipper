// MEGA legacy. Will update soon.

// Globas SS Variables and Doc Config

var ui        = SpreadsheetApp.getUi();
var ss        = SpreadsheetApp.getActive();
var iSheet    = ss.getSheets()[0];
var oSheet    = ss.getSheets()[1];
var iRowCount = iSheet.getMaxRows();
var iColCount = iSheet.getMaxColumns();
var aValues   = iSheet.getRange(2,1,iRowCount,iColCount).getValues();

// UI Menu and Alert Text

function onOpen() {
 	ui.createMenu('makeData')
	.addItem('Expand Data', 'aToData')
    .addToUi();
}

// Data Functions

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

function matchClassToShortName() {
    }
