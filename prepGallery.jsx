//var inputFolder = Folder('D:/Melissa - Photo/Scripts/gallery/input')
//var outputFolder = Folder('D:/Melissa - Photo/Scripts/gallery/output')
//var galleryLogoImageFile = 'D:/Melissa - Photo/Scripts/gallery/logo/DCC Logo.jpg'

var galleryTitle = "Exhibition – Introduction to Photography January 2022 Class"
var textFont = "Calibri"

var portraitPhotoResizeHeight = 2600
var landscapePhotoResizeWidth = 3800
var movePhotoUpBy = -150
var finalJPEGQuality = 10

var logoHorizontalPosition = -380
//var logoVerticalPosition = 310

var cancelled = false
var filenameDelimiter = "+"

$.writeln("Starting prep gallery script...");

//---------------- Dialog window to get user prefs  ---------------------
var dlg = new Window('dialog', 'Gallery Creator', undefined);

//--- Panel for folders + logo file
dlg.selectFoldersPanel = dlg.add('panel', undefined, 'Select folders and DCC logo file:');
// Input folder
dlg.selectFoldersPanel.inputFolderGroup = dlg.selectFoldersPanel.add('group', undefined,'inputGroup');
dlg.selectFoldersPanel.inputFolderStaticText = dlg.selectFoldersPanel.inputFolderGroup.add('statictext', undefined,'Select the input folder:');
dlg.selectFoldersPanel.inputFolderStaticText.size = [150, 20]
dlg.selectFoldersPanel.inputFolderEditText = dlg.selectFoldersPanel.inputFolderGroup.add('edittext', undefined,'C:\\gallery\\input');
dlg.selectFoldersPanel.inputFolderEditText.size = [450, 20]
dlg.selectFoldersPanel.inputFolderBrowseButton = dlg.selectFoldersPanel.inputFolderGroup.add ('button', undefined, 'Browse...');
// onClick function for input folder selection
dlg.selectFoldersPanel.inputFolderBrowseButton.onClick = function ()  { 
    $.writeln("Inside inputFolderBrowseButton onClick function ..."); 

    selectedFolder = Folder.selectDialog("Select the folder that contains the images to convert");  
    if (selectedFolder != null) {
        dlg.selectFoldersPanel.inputFolderEditText.text = decodeURI(selectedFolder.fsName); 
    }
}

// Output folder
dlg.selectFoldersPanel.outputFolderGroup = dlg.selectFoldersPanel.add('group', undefined,'outputGroup');
dlg.selectFoldersPanel.outputFolderStaticText = dlg.selectFoldersPanel.outputFolderGroup.add('statictext', undefined,'Select the output folder:');
dlg.selectFoldersPanel.outputFolderStaticText.size = [150, 20]
dlg.selectFoldersPanel.outputFolderEditText = dlg.selectFoldersPanel.outputFolderGroup.add('edittext', undefined,'C:\\gallery\\output');
dlg.selectFoldersPanel.outputFolderEditText.size = [450, 20]
dlg.selectFoldersPanel.outputFolderBrowseButton = dlg.selectFoldersPanel.outputFolderGroup.add ('button', undefined, 'Browse...');
// onClick function for output folder selection
dlg.selectFoldersPanel.outputFolderBrowseButton.onClick = function ()  { 
    $.writeln("Inside outputFolderBrowseButton onClick function ..."); 

    selectedFolder = Folder.selectDialog("Select the folder to save processed images into");  
    if (selectedFolder != null) {
        dlg.selectFoldersPanel.outputFolderEditText.text = decodeURI(selectedFolder.fsName); 
    }
}

// Logo file - 800px X 267px
dlg.selectFoldersPanel.logoGroup = dlg.selectFoldersPanel.add('group', undefined,'logoGroup');
dlg.selectFoldersPanel.logoImageStaticText = dlg.selectFoldersPanel.logoGroup.add('statictext', undefined,'Select the logo image file:');
dlg.selectFoldersPanel.logoImageStaticText.size = [150, 20]
dlg.selectFoldersPanel.logoImageEditText = dlg.selectFoldersPanel.logoGroup.add('edittext', undefined,'C:\\gallery\\logo\\DCC Logo.jpg');
dlg.selectFoldersPanel.logoImageEditText.size = [450, 20]
dlg.selectFoldersPanel.logoImageBrowseButton = dlg.selectFoldersPanel.logoGroup.add ('button', undefined, 'Browse...');
// onClick function for logo file selection
dlg.selectFoldersPanel.logoImageBrowseButton.onClick = function ()  { 
    $.writeln("Inside logoImageBrowseButton onClick function ..."); 

    selectedLogo = File.openDialog("Select the DCC logo file","*.JPEG; *.JPG", false); 
    if (selectedLogo != null) {
        dlg.selectFoldersPanel.logoImageEditText.text = decodeURI(selectedLogo.fsName); 
    }
}

//--- Panel for image info
dlg.imageDescripionPanel = dlg.add('panel', undefined, 'Configure image description:');
// Line1
dlg.imageDescripionPanel.line1Group = dlg.imageDescripionPanel.add('group', undefined,'line1');
dlg.imageDescripionPanel.line1StaticText = dlg.imageDescripionPanel.line1Group.add('statictext', undefined,'Line 1:');
dlg.imageDescripionPanel.line1StaticText.size = [50, 20]
dlg.imageDescripionPanel.line1OptionNone = dlg.imageDescripionPanel.line1Group.add('radiobutton', undefined,'None');
dlg.imageDescripionPanel.line1OptionText = dlg.imageDescripionPanel.line1Group.add('radiobutton', undefined,'Text box');
dlg.imageDescripionPanel.line1OptionFilename = dlg.imageDescripionPanel.line1Group.add('radiobutton', undefined,'From filename');
dlg.imageDescripionPanel.line1OptionText.value = true
dlg.imageDescripionPanel.line1EditText = dlg.imageDescripionPanel.line1Group.add('edittext', undefined,'Annual Exhibition 2022');
dlg.imageDescripionPanel.line1EditText.size = [400, 20]
dlg.imageDescripionPanel.line1EditText.enabled = true
dlg.imageDescripionPanel.line1OptionNone.onClick = function () {
    dlg.imageDescripionPanel.line1EditText.enabled = false
    dlg.imageDescripionPanel.line1EditText.text = ""
}
dlg.imageDescripionPanel.line1OptionText.onClick = function () {
    dlg.imageDescripionPanel.line1EditText.enabled = true
    dlg.imageDescripionPanel.line1EditText.text = ""
}
dlg.imageDescripionPanel.line1OptionFilename.onClick = function () {
    dlg.imageDescripionPanel.line1EditText.enabled = false
    dlg.imageDescripionPanel.line1EditText.text = ""
}

// Line2
dlg.imageDescripionPanel.line2Group = dlg.imageDescripionPanel.add('group', undefined,'line2');
dlg.imageDescripionPanel.line2StaticText = dlg.imageDescripionPanel.line2Group.add('statictext', undefined,'Line 2:');
dlg.imageDescripionPanel.line2StaticText.size = [50, 20]
dlg.imageDescripionPanel.line2OptionNone = dlg.imageDescripionPanel.line2Group.add('radiobutton', undefined,'None');
dlg.imageDescripionPanel.line2OptionText = dlg.imageDescripionPanel.line2Group.add('radiobutton', undefined,'Text box');
dlg.imageDescripionPanel.line2OptionFilename = dlg.imageDescripionPanel.line2Group.add('radiobutton', undefined,'From filename');
dlg.imageDescripionPanel.line2OptionFilename.value = true
dlg.imageDescripionPanel.line2EditText = dlg.imageDescripionPanel.line2Group.add('edittext', undefined,'');
dlg.imageDescripionPanel.line2EditText.size = [400, 20]
dlg.imageDescripionPanel.line2EditText.enabled = true
dlg.imageDescripionPanel.line2OptionNone.onClick = function () {
    dlg.imageDescripionPanel.line2EditText.enabled = false
    dlg.imageDescripionPanel.line2EditText.text = ""
}
dlg.imageDescripionPanel.line2OptionText.onClick = function () {
    dlg.imageDescripionPanel.line2EditText.enabled = true
    dlg.imageDescripionPanel.line2EditText.text = ""
}
dlg.imageDescripionPanel.line2OptionFilename.onClick = function () {
    dlg.imageDescripionPanel.line2EditText.enabled = false
    dlg.imageDescripionPanel.line2EditText.text = ""
}

// Line3
dlg.imageDescripionPanel.line3Group = dlg.imageDescripionPanel.add('group', undefined,'line3');
dlg.imageDescripionPanel.line3StaticText = dlg.imageDescripionPanel.line3Group.add('statictext', undefined,'Line 3:');
dlg.imageDescripionPanel.line3StaticText.size = [50, 20]
dlg.imageDescripionPanel.line3OptionNone = dlg.imageDescripionPanel.line3Group.add('radiobutton', undefined,'None');
dlg.imageDescripionPanel.line3OptionText = dlg.imageDescripionPanel.line3Group.add('radiobutton', undefined,'Text box');
dlg.imageDescripionPanel.line3OptionFilename = dlg.imageDescripionPanel.line3Group.add('radiobutton', undefined,'From filename');
dlg.imageDescripionPanel.line3OptionNone.value = true
dlg.imageDescripionPanel.line3EditText = dlg.imageDescripionPanel.line3Group.add('edittext', undefined,'');
dlg.imageDescripionPanel.line3EditText.size = [400, 20]
dlg.imageDescripionPanel.line3EditText.enabled = true
dlg.imageDescripionPanel.line3OptionNone.onClick = function () {
    dlg.imageDescripionPanel.line3EditText.enabled = false
    dlg.imageDescripionPanel.line3EditText.text = ""
}
dlg.imageDescripionPanel.line3OptionText.onClick = function () {
    dlg.imageDescripionPanel.line3EditText.enabled = true
    dlg.imageDescripionPanel.line3EditText.text = ""
}
dlg.imageDescripionPanel.line3OptionFilename.onClick = function () {
    dlg.imageDescripionPanel.line3EditText.enabled = false
    dlg.imageDescripionPanel.line3EditText.text = ""
}

//--- OK + Cancel buttons
dlg.buttonGroup = dlg.add('group', undefined,'buttonGroup');
// Main OK
dlg.okButton = dlg.buttonGroup.add('button', undefined, 'Ok');
// onClick function for OK button
dlg.okButton.onClick = function () {
    var valid = true
    // Do some validation
     // Check the input folder exists
    folder =  Folder(dlg.selectFoldersPanel.inputFolderEditText.text)
    if (!folder.exists) { 
        valid  = false
        alert("Input folder '" + dlg.selectFoldersPanel.inputFolderEditText.text + "' does not exist.", "Input Folder Error")
        return
    } 
    // Check the output folder exists
    folder =  Folder(dlg.selectFoldersPanel.outputFolderEditText.text)
    if (!folder.exists) { 
        valid  = false
        alert("Output folder '" + dlg.selectFoldersPanel.outputFolderEditText.text + "' does not exist.", "Output Folder Error")
        return
    } 
    // Check there are files to process
    inputFolder =  Folder(dlg.selectFoldersPanel.inputFolderEditText.text)
    var fileList = inputFolder.getFiles()
    var numFiles = fileList.length
    if (numFiles == 0) {
        alert("No files found in input folder '" + decodeURI(inputFolder) + "'.", "Input Folder Error")
        return
    }
    // Check the logo file exists
    file = File(dlg.selectFoldersPanel.logoImageEditText.text)
    if (!file.exists) { 
        valid  = false
        alert("Logo file '" + dlg.selectFoldersPanel.logoImageEditText.text + "' does not exist.", "Logo File Error")
        return
    } 

    if (valid) {
        dlg.close()
    } 
}

// Main Cancel
dlg.cancelButton = dlg.buttonGroup.add ('button', undefined, 'Cancel');
// onClick function for Cancel button
dlg.cancelButton.onClick = function () {
    cancelled = true
    dlg.close()
}


dlg.center(); 
dlg.show();

//------ Figure out the gallery/image title descriptions
// If any line is set to None, all subsequent lines are ignored
var numLines = 0;
if (dlg.imageDescripionPanel.line1OptionNone.value != true) {
    numLines++;
    if (dlg.imageDescripionPanel.line2OptionNone.value != true) {
        numLines++;
        if (dlg.imageDescripionPanel.line3OptionNone.value != true) {
            numLines++;
        }
    }
}

var currIndex = 0;
var line1FilenameIndex = 0;
var line2FilenameIndex = 0;
var line3FilenameIndex = 0;
if (dlg.imageDescripionPanel.line1OptionFilename.value == true) {
    line1FilenameIndex = currIndex;
    currIndex++;
}
if (dlg.imageDescripionPanel.line2OptionFilename.value == true) {
    line2FilenameIndex = currIndex;
    currIndex++;
}
if (dlg.imageDescripionPanel.line3OptionFilename.value == true) {
    line3FilenameIndex = currIndex;
    currIndex++;
}

$.writeln("numLines=" + numLines)

$.writeln("Line1 None=" + dlg.imageDescripionPanel.line1OptionNone.value)
$.writeln("Line1 Text=" + dlg.imageDescripionPanel.line1OptionText.value)
$.writeln("Line1 Filename=" + dlg.imageDescripionPanel.line1OptionFilename.value)

$.writeln("Line2 None=" + dlg.imageDescripionPanel.line2OptionNone.value)
$.writeln("Line2 Text=" + dlg.imageDescripionPanel.line2OptionText.value)
$.writeln("Line2 Filename=" + dlg.imageDescripionPanel.line2OptionFilename.value)

$.writeln("Line3 None=" + dlg.imageDescripionPanel.line3OptionNone.value)
$.writeln("Line3 Text=" + dlg.imageDescripionPanel.line3OptionText.value)
$.writeln("Line3 Filename=" + dlg.imageDescripionPanel.line3OptionFilename.value)

// Set logo position
var logoVerticalPosition = 310
var line1VerticalPosition = 240
var line2VerticalPosition = 140
var line3VerticalPosition = 40

if (numLines == 1) {
    logoVerticalPosition = 310

    line1VerticalPosition = 200
}
if (numLines == 2) {
    logoVerticalPosition = 310

    line1VerticalPosition = 200
    line2VerticalPosition = 100
}
if (numLines == 3) {
    logoVerticalPosition = 320

    line1VerticalPosition = 250
    line2VerticalPosition = 150
    line3VerticalPosition = 50
}

//---------------- Main script ---------------------

// Do we still want to run ?
if (!cancelled) {
    // Get the values from the dialog box
    var inputFolder =  Folder(dlg.selectFoldersPanel.inputFolderEditText.text)
    var outputFolder =  Folder(dlg.selectFoldersPanel.outputFolderEditText.text)
    var galleryLogoImageFile = File(dlg.selectFoldersPanel.logoImageEditText.text)

    $.writeln("Searching input directory '" + inputFolder + "' for JPEGs to process and save into '" + outputFolder + "'"); 

    // Process the files
    var fileList = inputFolder.getFiles()
    var numFiles = fileList.length
    $.writeln("Found '" + numFiles + "' files to process"); 

    for (var i = 0; i < fileList.length; i++) {    
        var filename = fileList[i].name
        $.writeln("Processing file '" + filename + "'"); 
        var filenameWithoutExtension = removeExtension(decodeURI(filename))
        $.writeln("    filenameWithoutExtension '" + filenameWithoutExtension + "'"); 

        // Create a new document:  width, height, pixels per inch, name, mode
        var newDocument = app.documents.add(4200, 3000, 300, "gallery"+i, NewDocumentMode.RGB);
        $.writeln("    newDocument '" + newDocument + "'"); 

         // 1) Add gallery/image description lines
        if (dlg.imageDescripionPanel.line1OptionNone.value != true) {
            // 1) Add gallery/image description line1
            line1Text = getLineText(dlg.imageDescripionPanel.line1OptionText, dlg.imageDescripionPanel.line1EditText,
                                    dlg.imageDescripionPanel.line1OptionFilename, filenameWithoutExtension, line1FilenameIndex);
            addTextLayer("Line1", line1Text, line1VerticalPosition, true);

            if (dlg.imageDescripionPanel.line2OptionNone.value != true) {
                // 2) Add gallery/image description line2
                line2Text = getLineText(dlg.imageDescripionPanel.line2OptionText, dlg.imageDescripionPanel.line2EditText,
                    dlg.imageDescripionPanel.line2OptionFilename, filenameWithoutExtension, line2FilenameIndex);
                addTextLayer("Line2", line2Text, line2VerticalPosition, false);

                if (dlg.imageDescripionPanel.line3OptionNone.value != true) {
                    // 3) Add gallery/image description line3
                    line3Text = getLineText(dlg.imageDescripionPanel.line3OptionText, dlg.imageDescripionPanel.line3EditText,
                        dlg.imageDescripionPanel.line3OptionFilename, filenameWithoutExtension, line3FilenameIndex);
                    addTextLayer("Line3", line3Text, line3VerticalPosition, false);
                }
            }

            // 3) Add logo to left of the text
            placeFileAtPosition(galleryLogoImageFile, logoHorizontalPosition, logoVerticalPosition)            
        }


        // 4) Add the photo, resized and positioned
        resizePhotoImageAndCopyToClipboard(filename)
        pastePhotoImageFromClipboardToNewDocAndMoveUp(newDocument)
        // 5) Save new JPEG file
        outputFilename = outputFolder + "/" + generateFilePrefix(i) + filename
        $.writeln("    Saving processed JPEG to '" + outputFilename + "'"); 
        saveJPEG(newDocument, new File(outputFilename), finalJPEGQuality);

        // Close the document
        newDocument.close(SaveOptions.DONOTSAVECHANGES)
    }
} else {    
    $.writeln("Cancelled, exiting script."); 
}

function getLineText(useTextBoxOption, textBox, useFilenameOption, filenameWithoutExtension, index) {
    if (useTextBoxOption.value) {
        return textBox.text
    }

    if (useFilenameOption.value) {
        filenameParts = filenameWithoutExtension.split(filenameDelimiter);
        if (filenameParts.length < index + 1) {
            alert("The filename '" + filenameWithoutExtension + "' needs to be delimited by '" + filenameDelimiter + "' into at least " + (index + 1) + " parts, but it only has " + filenameParts.length + " parts. Rename the file and run again.", "Filename Error")
            return
        }
        return trim(filenameParts[index]);
    }
}

function trim(str) {
    return str.replace(/(^[\s\n\r\t\x0B]+)|([\s\n\r\t\x0B]+$)/g, '');
}

function addTextLayer(textLayerName, content, verticalPostion, bold) {
    var layers = newDocument.artLayers;
    var newLayer = layers.add();
    newLayer.name = textLayerName;

    // layer types
    newLayer.kind = LayerKind.TEXT;

    var textItem = newLayer.textItem;

    // create an rgb colour
    var black = new SolidColor();
    var rgbPart = black.rgb;
    rgbPart.red = 0;
    rgbPart.green = 0;
    rgbPart.blue = 0;

    // access fonts and grab a random one
    var fonts = app.fonts;
    var randomFont = fonts[textFont];

    // adjust text appearance
    textItem.contents = content;
    textItem.color = black;
    textItem.font = randomFont.postScriptName;
    textItem.size = 18;
    textItem.justification = Justification.CENTER;
    textItem.fauxBold = bold
    textItem.position = [newDocument.width*.5, newDocument.height-verticalPostion];
}

function placeFileAtPosition(placeFile, horizontalPos, verticalPos) {  
    var desc21 = new ActionDescriptor();  
    desc21.putPath(charIDToTypeID('null'), new File(placeFile));  
    desc21.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa'));  
    var desc22 = new ActionDescriptor();  
    desc22.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Px1'), horizontalPos);  
    desc22.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Px1'), verticalPos);  
    desc21.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc22);  
    executeAction(charIDToTypeID('Plc '), desc21, DialogModes.NO);  
}

function removeExtension(filename) {
    var lastDotPosition = filename.lastIndexOf(".");
    if (lastDotPosition === -1) return filename;
    else return filename.substr(0, lastDotPosition);
}

function resizePhotoImageAndCopyToClipboard(filename) {
    // Load the photo image
    app.load(File(decodeURI(inputFolder + "/" + filename))); 
    photoFile = app.activeDocument; 
    // Resize the photo
    if (photoFile.height > photoFile.width) {
        // Portrait
        photoFile.resizeImage(null, UnitValue(portraitPhotoResizeHeight, "px"), null, ResampleMethod.BICUBIC);
    } else {
        // Landscape
        photoFile.resizeImage(UnitValue(landscapePhotoResizeWidth, "px"), null, null, ResampleMethod.BICUBIC);
    }

    // We might have widened it and made height too big
    if (photoFile.height > portraitPhotoResizeHeight) {        
        photoFile.resizeImage(null, UnitValue(portraitPhotoResizeHeight, "px"), null, ResampleMethod.BICUBIC);
    }

    // We might have added height and made it too wide
    if (photoFile.width > landscapePhotoResizeWidth) {        
        photoFile.resizeImage(UnitValue(landscapePhotoResizeWidth, "px"), null, null, ResampleMethod.BICUBIC);
    }

    photoFile.selection.selectAll();
    photoFile.selection.copy(); //copy image into clipboard
    photoFile.close(SaveOptions.DONOTSAVECHANGES); //close image without saving changes    
}

function pastePhotoImageFromClipboardToNewDocAndMoveUp(newDocument) {
    newDocument.paste(); //paste selection into your document
    newDocument.layers[0].name = "Main Photo"; 
    // Move it up a bit
    newDocument.layers[0].translate(0, movePhotoUpBy);
}

function saveJPEG(doc, saveFile, qty) {
    var saveOptions = new JPEGSaveOptions();
    saveOptions.embedColorProfile = true;
    saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    saveOptions.matte = MatteType.NONE;
    saveOptions.quality = qty; 
    doc.saveAs(saveFile, saveOptions, true);
}

function generateFilePrefix(num) {
    num++;
    if (num < 10) {
        return "0" + num + "-"
    } else {
        return num + "-"
    }
}