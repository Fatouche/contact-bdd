const {Given,Then,When} = require ('cucumber');

Given(/^The sort contact list is display$/ , function (callback) {
    this.browser.visit ("http://127.0.0.1:3000",(err)=> {
        if(err) throw err ;

        var list = this.browser.tabs.current.Contact.Contacts;
        var currentContact;
        var tab = this.browser.queryAll ('table tbody tr td');
        var j = 0;
        var i = list.instance().iterator();
        while(i.hasNext()){
            currentContact = i.next();
            this.browser.assert.success(currentContact.firstName(),tab[j].innerHTML);
            j = j + 1;
            this.browser.assert.success(currentContact.lastName(),tab[j].innerHTML);
            j = j+5;
        }

        callback();
    });
});

When(/^User clicks on sort button$/ , function (callback) {
    this.browser.visit ("http://127.0.0.1:3000",(err)=> {
        if(err) throw err ;

        var buton = this.browser.query ('#button_sort');
        buton.click();

        callback();
    });
});

Then(/^all contact sort$/ , function (callback) {
    this.browser.visit ("http://127.0.0.1:3000",(err)=> {
        if(err) throw err ;

        var listeContact = this.browser.tabs.current.Contact.Contacts.instance();
        var listeTempo = [];
        var i=listeContact.iterator();

        var cpt = 0;

        var tableau = this.browser.queryAll ('table tbody td');

        while(i.hasNext()){
            listeContact = i.next();
            listeTempo[cpt] = listeContact.lastName();
            cpt = cpt +1;
        }

        listeTempo.sort();

        var j = 1;

        for(var x=0; x < listeTempo.length; x++){
            this.browser.assert.success(listeTempo[x], tableau[j].innerText);
            j= j+6 ;
        }

        callback();
    });
});