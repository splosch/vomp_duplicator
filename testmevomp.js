(function($) {
  var module = {
      base: 'body',
      baselist: 'ul',
      listelements: 'ul > li',
      name: '.user-card__name > a[href^="/profile"]',
      badges: '.user-card__name > .user-card__badge',
      position: '.user-card__name + .user-card__wrapper--small',
      company: 'a[href^="/go/company"]',
      clickreason: '.user-card__name ~ .user-card__details--small'
    },
    badges = {
      full: "<a href='/app/billing' class='icn icn-ext-premium-small' title='Premium-Mitglied'>ICN_PREMIUM_MEMBER</a><a href='/app/help?op=explanations;id=247;category_id=367#247' class='icn icn-ext-moderator-small' title='Gruppenmoderator'>ICN_GROUP_MODERATOR</a>",
      one: "<a href='/app/billing' class='icn icn-ext-premium-small' title='Premium-Mitglied'>ICN_PREMIUM_MEMBER</a>"
    },
    examples = [
      {
        type: 'external visitor',
        badges: false,
        name : 'Externer Besucher ',
        position: null,
        company: null,
        clickreason: ' Kam von www.google.de '
      },
      {
        type: 'all: one line + badge',
        badges: 'full',
        name : 'Philipp Krause ',
        position: 'Senior Frontend Engineer',
        company: 'XING AG',
        clickreason: false
      },
      {
        type: 'name: two line + badge',
        badges: 'full',
        name : 'Prof. Dr. Med. / habilitus. Mostrowhitz Samule Milllev',
        position: 'Senior Frontend Engineer',
        company: 'XING AG',
        clickreason: false
      },
      {
        type: 'name: two line edge + badge [!]',
        badges: 'full',
        name : 'Prof. Dr. Med. / habilitus. Mostrowhitz Samule Milllevitch ',
        position: 'Senior Frontend Engineer',
        company: 'XING AG',
        clickreason: false
      },
      {
        type: 'name: two line max + badge [!!]',
        badges: 'full',
        name : 'Prof. Dr. Med. / habilitus. Mostrowhitz Samule Milllevitchov ',
        position: 'Senior Frontend Engineer',
        company: 'XING AG',
        clickreason: false
      },
      {
        type: 'name: long non-breaking',
        badges: false,
        name : 'MattthushitzDudeMattthushitzoveniasekkytechlonDude  Philippaev Mikael ',
        position: 'Senior Frontend Engineer',
        company: 'XING AG',
        clickreason: false
      },
      {
        type: 'position: two line',
        badges: false,
        name : 'Philipp Krause ',
        position: 'Vertriebsplanung / Vertriebscontrolling / Kaltaquise-Superkalt',
        company: 'XING AG',
        clickreason: false
      },
      {
        type: 'position: two lines non-breaking',
        badges: false,
        name : 'Philipp Krause ',
        position: 'Vertriebsplanung/und/oder/Vertriebscontrolling / Kaltaquise-Superkalt / Medium',
        company: 'XING AG',
        clickreason: false
      },
      {
        type: 'clickreason: two lines',
        badges: false,
        name : 'Philipp Krause ',
        position: 'Senior Frontend Engineer',
        company: 'XING AG',
        clickreason: "Hat Sie ganz gepflegt auf XING entdeckt"
      },
      {
        type: 'clickreason: two lines maxed',
        badges: false,
        name : 'Philipp Krause ',
        position: 'Senior Frontend Engineer',
        company: 'XING AG',
        clickreason: "Hat Sie ganz gepflegt auf XING entdeckt und trotzdem nicht angeklickt."
      },
      {
        type: 'clickreason: link',
        badges: false,
        name : 'Philipp Krause ',
        position: 'Senior Frontend Engineer',
        company: 'XING AG',
        clickreason: "Hat Sie im <a href='https://talentmanager.xing.com'>Talentmanager</a> entdeckt und nicht angeklickt"
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
        type: 'job: multiline, non-breaking',
        badges: 'full',
        name : 'Philipp Mattthushit Zoveniasekkytechlon Dude Mattthushitzoveniasek Kytechlon Dude',
        position: 'Mediamogul Survey SeniorConsultant (MBA/Dr/Prof)',
        company: 'Huxley Associates, ein Geschäftszweig der SThree GmbH',
        clickreason: "Suchte auf XING nach Name und Hat Sie im <a href='https://myfamousblog.xing.com'>SuperlongsupernotbreakingextensivelinknamingSuperlongsupernotbreakingextensivelinknaming</a> entdeckt wobei keine weiteren Erkenntnisse erkannt werden konnten."
      }
    ],

    getReferenceItem = function() {
      var refItemDetail = getItemsOfType('clickreason', $(module.base)).first(),
          refItem,
          listelementSelector = module.baselist + ' > li';

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
      styleEl.appendChild(document.createTextNode("")); /* Apparently some version of Safari needs the following line? I dunno. */
      styleEl.sheet.insertRule('li.user-card[title]:after {content: attr(title);position: absolute;right: -239px;width: 200px;border-left: 20px solid #FFF;padding-left: 5px;top: 20px;color: #D2691E; }', 0);
      /*styleEl.sheet.insertRule('.aside-module .user-card{outline: 1px solid rgba(220, 220, 0, 0.4);}', 0);
      styleEl.sheet.insertRule('.premium-app .user-card__block--denser{outline: 2px dotted rgba(220, 0, 0, 0.05);}', 0);
      styleEl.sheet.insertRule('.premium-app .media-obj__body{outline: 1px solid rgba(220, 120, 0, 0.4);}', 0);
      styleEl.sheet.insertRule('.premium-app .user-card__block--denser .user-card__name{outline: 1px dashed rgba(220, 20, 250, 0.8);}', 0);
      styleEl.sheet.insertRule('.premium-app .user-card__details--small{background-color: rgba(250, 250, 40, 0.3);}', 0);
      styleEl.sheet.insertRule('.premium-app .user-card__wrapper--small{background-color: rgba(0, 150, 150, 0.2);}', 0);*/
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
