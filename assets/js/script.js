/*
 * Evening Startpage
 * Inspired by https://github.com/jeroenpardon/sui
 * You can find it at https://github.com/TB-96/Evening-Startpage
 * Made by TB-96 2021
 *
 */

// Time and date settings
function startTime() {
  var currentDate = new Date();
  var hr = parseInt(currentDate.getHours());
  var min = parseInt(currentDate.getMinutes());
  //Add a zero in front of numbers<10
  if (min < 10) {
    min = "0" + min;
  }
  document.getElementById("header-time").innerHTML = hr + ":" + min;

  var dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }

  var date = currentDate.toLocaleDateString("en-GB", dateOptions);
  document.getElementById("header-date").innerHTML = date;

  var time = setTimeout(function(){ startTime() }, 60000);
}

document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('#link')) return;
	// Otherwise, run your code...
	document.body.style.opacity = 0;

}, false);

// SEARCH

const $s = {
  qS: e => document.querySelector(e),
  qA: e => document.querySelectorAll(e)
};

// You can add your own search query here for anything you're interested in.
// [command character]: ['search url', 'title']
function engines () {
  return {
	  k: ['https://www.kagi.com/search?q=', 'Kagi'],
	  a: ['https://web.archive.org/web/*/', 'Archive'],
	  w: ['https://en.wikipedia.org/w/index.php?search=', 'Wikipedia'],
  };
}

var search  = $s.qS('#search'),
    input   = $s.qS('#search input[type="text"]'),
    engines = engines();

// for (var key in engines)
//   $s.qS('.search-engines').innerHTML += `<li><p title="${engines[key][1]}">!${key}</p></li>`;

document.onkeypress = (e) => {
    if (e.key == 's')
      search.classList.add('active');

    input.focus();
    input.scrollIntoView();

    search.onkeyup = (e) => {
      let args   = e.target.value.split(' '),
          prefix = args[0],
          engine = engines['k'][0]; // the default engine (Kagi in this case)

      $s.qA('.search-engines li p').forEach((eng) => {
        let current = eng.parentNode;

        (prefix == eng.innerHTML)
          ? current.classList.add('active')
          : current.classList.remove('active');
      });

      if (e.key == 'Enter') {
        if (prefix.indexOf('!') == 0) {
          engine = engines[prefix.substring(1)][0];
          args = args.slice(1);
        }

        window.location = engine + encodeURIComponent(args.join(' '));
      } else if (e.keyCode == 27)
        search.classList.remove('active');
    };
};

document.addEventListener("DOMContentLoaded", startTime);
