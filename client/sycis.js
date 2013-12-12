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
	'click button#giveOne' : function(){
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
Template.country.country_flag_url = function(){
	if(this.name === "Indonesia") return "http://media-2.web.britannica.com/eb-media/48/1648-004-B85F0033.jpg";
	if(this.name === "Malaysia") return "http://www.malaysiaworldexpo.com/img/malaysia_flag2.gif";
	if(this.name === "Singapore") return "http://www.freeusandworldmaps.com/images/Flags_Images/Singapore-snflag.jpg";
	if(this.name === "Brunei") return "http://www.blackberryempire.com/blog/wp-content/uploads/2010/12/brunei_flag.jpg";
	if(this.name === "Laos") return "http://www.amnesty.org.nz/files/laos-flag.JPG";
	if(this.name === "Cambodia") return "http://www.hotelblueriver.com/gallery/p/6/cambodia_flag.jpg";
	if(this.name === "Timor-Leste") return "http://www.comminit.com/files/images/timor-leste_flag.jpg";
	if(this.name === "Myanmar") return "http://upload.wikimedia.org/wikipedia/commons/6/68/Flag_of_Myanmar-new.jpg";
	if(this.name === "Vietnam") return "http://images3.wikia.nocookie.net/__cb20090517132302/uncyclopedia/images/2/24/Vietnam_Flag.jpg";
	if(this.name === "Philippine") return "http://images.wikia.com/hetaliafanmadecharacters/images/a/a8/64180234-philippines-flag.jpg";
	if(this.name === "Thailand") return "http://kenraggio.com/Thailand-Flag.png";
};
Template.country.votes_value_max = function(){
	if(this.votes < 50) return "50";
	if(this.votes < 200) return "200";
	if(this.votes < 500) return "500";
	if(this.votes < 1000) return "1000";
};
Template.country.votes_progress_width = function(){
	if(this.votes < 50) return this.votes/50*100+"%";
	else if(this.votes < 200) return this.votes/200*100+"%";
	else if(this.votes < 500) return this.votes/500*100+"%";
	else if(this.votes < 1000) return this.votes/1000*100+"%";
}
Template.country.events({
	'click' : function(){
		Session.set("selected_country", this._id);
	}
});

