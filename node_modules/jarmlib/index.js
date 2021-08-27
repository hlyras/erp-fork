const JALIB = {};

// -----------
// Query
// -----------
JALIB.Query = function(){
	this._props = false;
	this._inners = false;
	this._period = false;
	this._params = false;
	this._strict_params = false;
	this._order_params = false;

	this.query = "";

	this.select = function(){
		this.query += "SELECT ";
		return this;
	};

	this.props = function(props) {
		if(props.length){
			this._props = true;

			for(let i in props){
				if(i == props.length - 1){
					this.query += props[i]+" ";
				} else {
					this.query += props[i]+", ";
				};
			};
		};
		return this;
	};

	this.table = function(table) {
		if(!this._props){
			this.query += "* FROM "+table+" ";
		} else {
			this.query += "FROM "+table+" ";
		}
		return this;
	};

	this.inners = function(inners) {
		if(inners.length){
			this._inners = true;
			
			for(let i in inners){
				this.query += "INNER JOIN "+inners[i][0]+" ON "+inners[i][1]+"="+inners[i][2]+" ";
			};
		}
		return this;
	};

	this.period = function(period) {
		if(period.start && period.end){
			this._period = true;

			this.query += "WHERE "+period.key+">='"+period.start+"' AND "+period.key+"<='"+period.end+"' ";
		};
		return this;
	};

	this.params = function(params) {
		if(params.keys.length){
			this._params = true;

			if(this._period){ this.query += "AND "; } else { this.query += "WHERE "; }

			for(let i in params.keys){
				if(i == params.keys.length - 1){
					this.query += params.keys[i]+" like '%"+params.values[i]+"%' ";
				} else {
					this.query += params.keys[i]+" like '%"+params.values[i]+"%' AND ";
				};
			};
		}
		return this;
	};

	this.strictParams = function(strict_params){
		if(strict_params.keys.length){
			this._strict_params = true;
			
			if(this._period || this._params){ this.query += "AND "; } else { this.query += "WHERE "; }

			for(let i in strict_params.keys){
				if(i == strict_params.keys.length - 1){
					this.query += strict_params.keys[i]+"='"+strict_params.values[i]+"' ";
				} else {
					this.query += strict_params.keys[i]+"='"+strict_params.values[i]+"' AND ";
				};
			};
		};
		return this;
	};

	this.order = function(orderParams){
		if(orderParams.length && orderParams[0].length > 1){
			this._order_params = true;
			
			this.query += "ORDER BY ";
			for(let i in orderParams){
				if(i == orderParams.length - 1){
					this.query += orderParams[i][0]+" "+orderParams[i][1]+" ";
				} else {
					this.query += orderParams[i][0]+" "+orderParams[i][1]+", ";
				};
			};
		}
		return this;
	};

	this.limit = function(limit){
		if(limit.length || limit > 0) {
			this._limit = true;
			this.query += "LIMIT "+limit;
		}
		return this;
	};

	this.build = function(){
		this.query = this.query.trim()+";"; 
		return this;
	};
};

JALIB.Query.fillParam = function(key, value, arr) {
	if(key && value && arr.keys && arr.values){ arr.keys.push(key); arr.values.push(value); } else { return false; };
};

// -----------
// Date
// -----------
JALIB.date = {};

JALIB.date.generate = function() {
	var d = new Date();
	var date = "";
	if(d.getDate()<10 && parseInt(d.getMonth())+1>9){
		date = "0"+d.getDate()+"-"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear();
	} else if(d.getDate()>9 && parseInt(d.getMonth())+1<10){
		date = ""+d.getDate()+"-0"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear();
	} else if(parseInt(d.getDate())<10 && parseInt(d.getMonth())+1<10){
		date = "0"+d.getDate()+"-0"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear();
	} else {
		date = ""+d.getDate()+"-"+parseInt(d.getMonth()+1)+"-"+d.getFullYear();
	};
	return date;
};

// -----------
// Timestamp
// -----------
JALIB.date.timestamp = {};

JALIB.date.timestamp.day = function() { return 86400000; };

JALIB.date.timestamp.generate = function() {
	const currentDate = new Date();
	const timestamp = currentDate.getTime();
	return timestamp;
};

JALIB.date.timestamp.toDate = function(timestamp) {
	let date = new Date(parseInt(timestamp));
	let day;let month;let hour;let minute;
	if(date.getDate() < 10){ day = "0"+date.getDate() } else { day = date.getDate() };
	if(date.getMonth() < 10){ month = "0"+date.getMonth() } else { month = date.getMonth() };
	if(date.getHours() < 10){ hour = "0"+date.getHours() } else { hour = date.getHours() };
	if(date.getMinutes() < 10){ minute = "0"+date.getMinutes() } else { minute = date.getMinutes() };
	return day+'-'+month+'-'+date.getFullYear()+' '+hour+':'+minute;
};

JALIB.date.timestamp.toDatetime = function(timestamp) {
		let date = new Date(parseInt(timestamp));
		let day;let month;let hour;let minute;
		if(date.getDate() < 10){ day = "0"+date.getDate() } else { day = date.getDate() };
		if(date.getMonth() < 10){ month = "0"+date.getMonth() } else { month = date.getMonth() };
		if(date.getHours() < 10){ hour = "0"+date.getHours() } else { hour = date.getHours() };
		if(date.getMinutes() < 10){ minute = "0"+date.getMinutes() } else { minute = date.getMinutes() };
		return date.getFullYear()+'-'+month+'-'+day+'T'+hour+':'+minute;
};

// -----------
// datetime
// -----------
JALIB.date.datetime = {};

JALIB.date.datetime.toTimestamp = function(datetime) {
	if(datetime){
		let date = datetime.split("T");
		date.year = date[0].split("-")[0];
		date.month = date[0].split("-")[1];
		date.day = date[0].split("-")[2];
		date.hour = date[1].split(":")[0];
		date.minute = date[1].split(":")[1];
		date = new Date(date.year,date.month-1,date.day,date.hour,date.minute);
		return date.getTime();
	};
	return false;
};

// -----------
// string
// -----------
JALIB.string = {};

JALIB.string.splitBy = function(string, key) {
	if(string && key){
		let splited_string = string.split(key);
		return splited_string;
	};
	return false;
};

// -----------
// math
// -----------
JALIB.math = {};

JALIB.math.round = {};

JALIB.math.round.toFloat = function() {
	return Math.round((value) * 100) / 100;
};

JALIB.math.round.toInt = function() {
	return +(parseFloat(num).toFixed(places));
};

// -----------
// sort
// -----------
JALIB.sort = (arr, key, order) => {
	return arr = arr.sort((a, b) => {
		if(order == "desc"){
			return b[key] - a[key];
		} else {
			return a[key] - b[key];
		}
	});
};

// -----------
// routes
// -----------
JALIB.route = {};

JALIB.route.toHttps = function(req, res, next) {
	if ((req.headers["x-forwarded-proto"] || "").endsWith("http")){
        res.redirect(`https://${req.hostname}${req.originalUrl}`);
    } else {
        next();
    }
};


module.exports = JALIB;