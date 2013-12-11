
Countries = new Meteor.Collection("countries");
Meteor.startup(function () {

	
	if (Countries.find().count() === 0) {
      var countries = ["Indonesia",
                   "Singapore",
                   "Malaysia",
                   "Brunei",
                   "Myanmar",
                   "Cambodia",
				   "Vietnam",
				   "Laos",
				   "Timor-Lestei",
				   "Thailand",
				   "Philippine"
				   ];
      for (var i = 0; i < countries.length; i++)
        Countries.insert({name: countries[i], votes: 0});
    }
  });