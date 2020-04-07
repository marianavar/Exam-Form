element.innerHTML = '<div style="visibility: hidden; height: 100%; width=100%">' + textToBeAdded + '</div>';

var page = document.getElementsByClassName('page')[0];

if (page.scrollHeight > page.offsetHeight) {
  // is overflowing
  fixOverflow(page);
}

function fixOverflow(element) {
  var words = element.textContent.split(' ');
  // delete previous text content
  element.textContent = '';

  words.reduce(function(acc, value) {
    // store current element's text
    var currentElementText = element.textContent.toString().trim();
    var textToBeAdded = currentElementText + ' ' + value;

    element.innerHTML = '<div style="visibility: hidden; height: 100%; width=100%">' + textToBeAdded + '</div>';
 
    if (element.scrollHeight > element.offsetHeight) {
      // is overflowing with the new word
      element.innerHTML = "";
      // leave the last page element as is
      element.textContent = currentElementText;
      // create another element with the new value to be added
      // ** IMPORTANT replace the memory of the previous element variable 
      element = createPageElement(value);
      // add it to the same DOM tree as the previous page element
      page.parentElement.appendChild(element); // could also be document.getElementById('page-container').appendChild(element);
    } else {
      // if not overflowing add another word 
      element.innerHTML = currentElementText + ' ' + value;    
    }
  }, "");
}

function createPageElement(text) {
  // create element with class page
  var newPageEl = document.createElement('page');
  newPageEl.classList = 'page';
  newPageEl.textContent = text;
  return newPageEl;
}

