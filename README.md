Bookmarklet for xing.com variant testing
======

This Bookmarklet calls a duplicator script using some heuristics that allow testing of multiple variants of the same element in the VOMP box on xing.com startpage. Since this element is quite fragile, each time we touch it these variants will help to prevent the layout from breaking.

copy and past into a created bookmark
------

(unfortunately github markdown doeas not support javascript in links :)
this bookmarklet will call the latest version of:
`https://raw.githubusercontent.com/splosch/codedropbox/master/testmevomp.js`

Bookmarklet code:

    http://(function(){if(!($=window.jQuery)){script=document.createElement("script");script.src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";script.onload=a(jQuery);document.body.appendChild(script)}else{a(jQuery)}function a(d){var c=document.createElement("script"),b="https://raw.githubusercontent.com/splosch/codedropbox/master/testmevomp.js";c.src=b;d("body").appendChild(c)}}());
