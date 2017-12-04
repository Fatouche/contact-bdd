const {Given,Then,When} = require ('cucumber');

Given(/^The contact list is display$/ , function (callback) {
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

When(/^User clicks on remove button of the first contact$/ , function(callback) {
    this.browser.visit ("http://127.0.0.1:3000",(err)=> {
        if (err) throw err;

        var tab = this.browser.queryAll ('table tbody td a');
        tab[0].click();

        callback();
    });
});

Then(/^The first contact is removed$/ , function(callback) {
    this.browser.visit ("http://127.0.0.1:3000",(err)=> {
        if (err) throw err;

        var listeR = this.browser.tabs.current.Contact.Contacts.instance().iterator().next();

        var removeContact = this.browser.queryAll ('table tbody td');

        this.browser.assert.success(listeR.firstName(), "Jacques");
        this.browser.assert.success(listeR.firstName(),removeContact[0].innerText);

        callback();
    });
});