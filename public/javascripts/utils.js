export function formatDate(date) {
    let _date = new Date(date);
    let formatedDate = new Intl.DateTimeFormat("us-EN", {
      month: "short",
      day: "2-digit",
    }).format(_date);
  
    return formatedDate;
  }

  export function removeWordFromEnd(text, word) {
    if (text.endsWith(word)) {
      return text.slice(0, -word.length).trim();
    }
    return text;
  }

  export function getPageUrl() {
    let url = $(location).attr('href');
    return url.replace(/\/\s*$/, "").split('/').pop();
  }
  export function getPage() {
    let url = $(location).attr('href');

// Remove any trailing slash, then split the URL by '/'
let segments = url.replace(/\/\s*$/, "").split('/');

// Return the second-to-last segment (the page name)
return segments.length > 1 ? segments[segments.length - 2] : null;
  }
  