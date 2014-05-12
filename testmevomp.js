(function($) {
  var module = {
        base: 'body',
        baselist: 'ul',
        listelements: 'ul > li',
        name: 'a[href^="/profile"].on-outer-hover',
        badges: 'a[href^="/profile"].on-outer-hover + *',
        position: 'a[href^="/profile"].on-outer-hover ~ div',
        company: 'a[href^="/go/company"]',
        clickreason: 'p'
      },
      badges = {
        full: "<a href='/app/billing' class='icn icn-ext-premium-small' title='Premium-Mitglied'>ICN_PREMIUM_MEMBER</a><a href='/app/help?op=explanations;id=247;category_id=367#247' class='icn icn-ext-moderator-small' title='Gruppenmoderator'>ICN_GROUP_MODERATOR</a>",
        one: "<a href='/app/billing' class='icn icn-ext-premium-small' title='Premium-Mitglied'>ICN_PREMIUM_MEMBER</a>"
      },
      examples = [
        {
          type: 'external google',
          badges: false,
          name : 'Externer Besucher ',
          position: null,
          company: null,
          clickreason: ' Kam von www.google.de '
        },
        {
          type: 'all: oneliner',
          badges: 'full',
          name : 'Philipp Krause ',
          position: 'Senior Frontend Engineer',
          company: 'XING AG',
          clickreason: false
        },
        {
          type: 'name: multiline',
          badges: 'full',
          name : 'Prof. Dr. Med. / habil. Ing.(FH) Philippaev Mattthushitz Mikael Samule Milllevitch Osthoff ',
          position: 'Senior Frontend Engineer',
          company: 'XING AG',
          clickreason: false
        },
        {
          type: 'name: long non-breaking',
          badges: 'full',
          name : 'Philippaev MattthushitzoveniasekkytechlonDudeMattthushitzoveniasekkytechlonDude Mikael ',
          position: 'Senior Frontend Engineer',
          company: 'XING AG',
          clickreason: false
        },
        {
          type: 'clickreason: link',
          badges: false,
          name : 'Philipp Krause ',
          position: 'Senior Frontend Engineer',
          company: 'XING AG',
          clickreason: "Hat Sie im <a href='https://talentmanager.xing.com'>Talentmanager</a> entdeckt"
        },
        {
          type: 'clickreason: link with url as text',
          badges: false,
          name : 'Philipp Krause ',
          position: 'Senior Frontend Engineer',
          company: 'XING AG',
          clickreason: "Hat Sie im <a href='https://talentmanager.xing.com'><a href='https://talentmanager.xing.com'>www.talentmanager.xing.com/gruppenwurst</a></a> entdeckt"
        },
        {
          type: 'clickreason: multiline link',
          badges: false,
          name : 'Philipp Krause ',
          position: 'Senior Frontend Engineer',
          company: 'XING AG',
          clickreason: "Hat Sie im <a href='https://talentmanager.xing.com'>Talentmanager is the brand new xing app and its so awesome that you will die for it</a> entdeckt"
        },
        {
          type: 'clickreason: multiline, non-breaking link',
          badges: false,
          name : 'Philipp Krause ',
          position: 'Senior Frontend Engineer',
          company: 'XING AG',
          clickreason: "Suchte auf XING nach Name und Hat Sie im <a href='https://myfamousblog.xing.com'>SuperlongsupernotbreakingextensivelinknamingSuperlongsupernotbreakingextensivelinknaming</a> entdeckt wobei keine weiteren Erkenntnisse erkannt werden konnten."
        },
        {
          type: 'job: multiline',
          badges: 'one',
          name : 'Philipp Krause ',
          position: 'Senior Recruitment Consultant (Java) für Frankfurt und Umgebung No Joke!',
          company: 'Huxley Associates, ein Geschäftszweig der SThree GmbH',
          clickreason: 'Suchte auf XING nach Name'
        },
        {
          type: 'job: multiline, non-breaking',
          badges: 'full',
          name : 'Philipp MattthushitzoveniasekkytechlonDudeMattthushitzoveniasekkytechlonDude',
          position: 'MediamogulSurveySeniorConsultant (MBA/Dr/Prof)',
          company: 'Huxley Associates, ein Geschäftszweig der SThree GmbH',
          clickreason: false
        }
      ],

      getReferenceItem = function() {
        var refItemDetail = getItemsOfType('clickreason').first(),
            refItem,
            listelementSelector = module.baselist + ' > li';

        debugger;

        if(refItemDetail[0]) {
          refItem = refItemDetail.parentsUntil(module.base, listelementSelector);
        }else{
          refItem = $(module.base).find(listelementSelector).first();
        }

        return refItem;
      },

      getItemsOfType = function(type, baselist) {
        var items,
            selectorBase = baselist || $(module.baselist);

        if(module[type]) {
          items = selectorBase.find(module[type]);
        }
        return items;
      },

      addStyles = function() {
        /* before we start do some style to show the example type label for further QA referencing
         https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet.insertRule */
        var styleEl = document.createElement("style");

        document.head.appendChild(styleEl);
        styleEl.appendChild(document.createTextNode("")); // Apparently some version of Safari needs the following line? I dunno.
        styleEl.sheet.insertRule('li.user-card[title]:after {content: attr(title);position: absolute;right: -239px;width: 200px;border-left: 20px solid #FFF;padding-left: 5px;top: 20px;color: #D2691E; }', 0);
      };

  /* take care of different pagetypes */
  Object.defineProperty(module, 'base', {
    get: function() {

      /* vomp startpage */
      if( $('#premium-module')[0] ){
        module.baselist = '#premium-module ul';
        return '#premium-module';
      }

      /* vomp, network */
      if( $('[data-user-detail-list]')[0] ){
        module.baselist = '[data-user-detail-list]';
      }

      return 'body';
    }
  });

  addStyles();

  /* duplicate the reference item for every example
     and replace the reference data with the testdata */
  examples.forEach(function(example){
    var refItem        = getReferenceItem(),
        _clonedRefItem = refItem.clone(true),
        mockItems      = Object.keys(example);

    /* replace/delete data */
    mockItems.forEach(function(type){
      switch(type) {
        case 'type'   : /* add a title attribute */
                        _clonedRefItem.attr('title', example[type]);
                        break;

        case 'badges' : if(example[type] === false) {
                          getItemsOfType(type, _clonedRefItem).remove();
                        }else{
                          getItemsOfType(type, _clonedRefItem).html(badges[example[type]]);
                        }
                        break;

        default       : if(example[type]) {
                          getItemsOfType(type, _clonedRefItem).html(example[type]);
                        } else {
                          getItemsOfType(type, _clonedRefItem).remove();
                        }
      }
    });

    $(module.baselist).append(_clonedRefItem);
  });

})(jQuery);

