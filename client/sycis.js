// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Countries = new Meteor.Collection("countries");

Template.leaderboard.countries = function () {
	return Countries.find({}, {sort: {votes: -1, name: 1}});
};
Template.country_votes.selected_country_block = function(){
	var country = Countries.findOne(Session.get("selected_country"));
    return country && country.name;
};
Template.country.selected = function(){
	return Session.equals("selected_country", this._id)? "selected":'';
};
Template.country_votes.events({
	'click input#giveOne' : function(){
		Countries.update(Session.get("selected_country"),{$inc: {votes: 1}});
	}
});
Template.country.how_many = function(){
		if(!this.votes) return "no";
		if(this.votes < 50) return "a few";
		if(this.votes < 200) return "some";
		if(this.votes < 500) return "a lot of";
		if(this.votes < 1000) return "amazing";
		return "Super Awesome!!!";
		
};
Template.country.events({
	'click' : function(){
		Session.set("selected_country", this._id);
	}
});