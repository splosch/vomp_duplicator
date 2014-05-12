h1.VOMP - Bookmarklet

Since github flavored markdown does not support `javascript:` in links
replace 'http://' with 'javascript:' ... once added to favorites

<a href='http://(function(){if(!($=window.jQuery)){script=document.createElement("script");script.src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";script.onload=a(jQuery);document.body.appendChild(script)}else{a(jQuery)}function a(d){var c=document.createElement("script"),b="https://raw.githubusercontent.com/splosch/codedropbox/master/testmevomp.js";c.src=b;d("body").appendChild(c)}}());'>VOMP - Testdata (corrected)</a>

--

<a href='javascript:(function(){if(!($=window.jQuery)){script=document.createElement("script");script.src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";script.onload=a(jQuery);document.body.appendChild(script)}else{a(jQuery)}function a(d){var c=document.createElement("script"),b="https://raw.githubusercontent.com/splosch/codedropbox/master/testmevomp.js";c.src=b;d("body").appendChild(c)}}());'>VOMP - Testdata (original)</a>

