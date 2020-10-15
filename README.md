# EventPlanner
An Event planning Web App built for demonstrative purposes.
This App was built using Reactjs and Nodejs.
The app has been tested and all features work fine.
However,because the app is for demonstrative purposes,
rather than for commercial purposes,I had to strip it of some
features that would require money to keep them operational.
The features stripped from the app are:

1. Being able to pay using the app. The payment feature is using a test
payment endpoint and uses test cards that just demonstrate payment in the ui.
Since this app has not been commercialized,there was no need to use the real 
production ready endpoint.
If you will like to test payment,use this test card:

Card number: 5531 8866 5214 2950
cvv: 564
Expiry: 09/32
Pin: 3310
OTP: 12345

2.Using of paid ssl. A self signed free certificate was used in development.A paid ssl
will require continous renewal over time,so since the app is demonstrative,a free self signed 
certificate was used.
Because the app was hosted on heroku,and because heroku does not provide DNS Email services,
getting a free CA certificate to use on heroku will still require pointing the site to name servers
that holds information on a purchased domain.
The implication of not using CA certificates is that most popular Email Services like Gmail,Yahoo,etc,
will reject Emails sent from the app unless "less secure apps" settings is changed to allow messages from
domains with self signed certificates like this app.
I have tested the app by using emails whose security features have been altered to allow emails from less
secure apps,and emails sent from the app were correcly delivered.

If the need arises to make the app commercial, all stripped off features will be added to the app.



