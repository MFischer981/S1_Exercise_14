"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Tutorial Case

   Author: Micah Fischer
   Date: 3 - 28 - 19

   Filename: bc_outline.js


   Function List
   =============

   makeOutline()
      Generates the text of the table of contents
      as a nested list

   createList(source, TOCList, headings)
      Creates an outline based on the source document,
      list items are appended to TOCList,
      the list items are based on the element names
      specified in the headings array


*/

// Generate an outline based on h1 through h6 in the source document.

window.addEventListener('load', makeOutline);

function makeOutline() {
      //location of the outline
      var outline = document.getElementById("outline");

      // source document for the outline.
      var source = document.getElementById("doc");

      var mainHeading = document.createElement("h1");
      var outlineList = document.createElement("ol");
      var headingText = document.createTextNode("Outline");

      mainHeading.appendChild(headingText);
      outline.appendChild(mainHeading);
      outline.appendChild(outlineList);

      createList(source, outlineList)
}

function createList(source, outlineList) {
      var headings = ["H1", "H2", "H3", "H4", "H5", "H6"];
      var prevLevel = 0;
      var headNum = 0;

      for (var n = source.firstChild; n !== null; n = n.nextSibling) {
            var headLevel = headings.indexOf(n.nodeName);
            if (headLevel !== -1) {
                  headNum++;
                  if (n.hasAttribute("id") === false) {
                        n.setAttribute("id", "head" + headNum);
                  }

                  var listElement = document.createElement("li");

                  var linkElement = document.createElement("a");
                  linkElement.innerHTML = n.innerHTML;
                  linkElement.setAttribute("href", "#" + n.id);
                  listElement.appendChild(linkElement);


                  if (headLevel === prevLevel) {
                        outlineList.appendChild(listElement);
                  } else if (headLevel > prevLevel) {
                        var nestedList = document.createElement("ol");
                        nestedList.appendChild(listElement);

                        outlineList.lastChild.appendChild(nestedList);
                        outlineList = nestedList;
                  } else {
                        var levelUp = prevLevel - headLevel;
                        for (var i = 1; i <= levelUp; i++) {
                              outlineList = outlineList.parentNode.parentNode;
                        }
                        outlineList.appendChild(listElement);
                  }

                  prevLevel = headLevel;
            }
      }
}