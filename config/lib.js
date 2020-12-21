module.exports = {
	convertDate:function(date){
		var str = date.split('-');
		if(str!=""){
			var convertedDate = str[2]+"-"+str[1]+"-"+str[0];
		} else {
			var convertedDate = "";
		};
		return convertedDate;
	},
	genDate: function(){
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
	},
	genPatternDate: function(){
		var d = new Date();
		var date = "";

		if(d.getDate()<10 && parseInt(d.getMonth())+1>9){
			date = ""+d.getFullYear()+"-"+(parseInt(d.getMonth())+1)+"-0"+d.getDate();
		} else if(d.getDate()>9 && parseInt(d.getMonth())+1<10){
			date = ""+d.getFullYear()+"-0"+(parseInt(d.getMonth())+1)+"-"+d.getDate();
		} else if(parseInt(d.getDate())<10 && parseInt(d.getMonth())+1<10){
			date = ""+d.getFullYear()+"-0"+(parseInt(d.getMonth())+1)+"-0"+d.getDate();
		} else {
			date = ""+d.getFullYear()+"-"+parseInt(d.getMonth()+1)+"-"+d.getDate();
		};
		return date;
	},
	genFullDate: function(){
		var d = new Date();
		var date = "";
		if(d.getDate()<10 && parseInt(d.getMonth())+1>9){
			date = "0"+d.getDate()+"-"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		} else if(d.getDate()>9 && parseInt(d.getMonth())+1<10){
			date = ""+d.getDate()+"-0"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		} else if(parseInt(d.getDate())<10 && parseInt(d.getMonth())+1<10){
			date = "0"+d.getDate()+"-0"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		} else {
			date = ""+d.getDate()+"-"+parseInt(d.getMonth()+1)+"-"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		};
		return date;
	},
	colectByMonth: function(month, dates){
		var array = [];
		var str = [];
		for(var i in dates){
			var str = dates[i].date.split('-');
			if(parseInt(str[1])==parseInt(month)){
				array.push(dates[i]);
			};
		};
		return array;
	},
	filterByPeriod:  function(month, dates){
		var array = [];
		var str = [];
		for(var i in dates){
			var str = dates[i].date.split('-');
			if(parseInt(str[1])==parseInt(month)){
				array.push(dates[i]);
			};
		};
		return array;
	},
	filterQuery: function(params, values, db, tbl, orderParam, order){
		if(params.length){
			var query = "SELECT * FROM "+db+"."+tbl+" WHERE ";
		} else {
			var query = "SELECT * FROM "+db+"."+tbl+" ";
		};
		for(t in params){
			if(t == params.length - 1){
				query += params[t]+"='"+values[t]+"' ";
			} else {
				query += params[t]+"='"+values[t]+"' AND ";
			};
		};
		query += "ORDER BY "+orderParam+" "+order+";";

		return query;
	},
	filterQueryName: function(name, params, values, db, tbl, orderParam, order){
		if(name){
			var query = "SELECT * FROM "+db+"."+tbl+" WHERE name like '%"+name+"%' ";
			if(params.length){
				query += "AND ";
			};
		} else {
			if(params.length){
				var query = "SELECT * FROM "+db+"."+tbl+" WHERE ";
			} else {
				var query = "SELECT * FROM "+db+"."+tbl+" ";
			};
		};
		for(i in params){
			if(i == params.length - 1){
				query += params[i]+"='"+values[i]+"' ";
			} else {
				query += params[i]+"='"+values[i]+"' AND ";
			};
		};
		query += "ORDER BY "+orderParam+" "+order+";";

		return query;
	},
	filterByPeriod: function(periodStart, periodEnd, params, values, db, tbl, orderParam, order){
		if(periodStart && periodEnd){
			var query = "SELECT * FROM "+db+"."+tbl+" WHERE date>='"+periodStart+"' AND date<='"+periodEnd+"' ";
			if(params.length){
				query += "AND ";
				for(i in params){
					if(i == params.length - 1){
						query += ""+params[i]+"='"+values[i]+"' ";
					} else {
						query += ""+params[i]+"='"+values[i]+"' AND ";
					};
				};
			};
		} else {
			var query = "SELECT * FROM "+db+"."+tbl+" ";
			if(params.length){
				query += "WHERE ";
				for(i in params){
					if(i == params.length - 1){
						query += ""+params[i]+"='"+values[i]+"' ";
					} else {
						query += ""+params[i]+"='"+values[i]+"' AND ";
					};
				};
			};
		};
		query += "ORDER BY "+orderParam+" "+order+";";

		return query;
	},
	filterByLikeAndByPeriod: function(periodStart, periodEnd, params, values, date, db, tbl, orderParam, order){
		if(periodStart && periodEnd){
			var query = "SELECT * FROM "+db+"."+tbl+" WHERE "+date+">='"+periodStart+"' AND "+date+"<='"+periodEnd+"' ";
			if(params.length){
				query += "AND ";
				for(i in params){
					if(i == params.length - 1){
						query += ""+params[i]+" like '%"+values[i]+"%' ";
					} else {
						query += ""+params[i]+" like '%"+values[i]+"%' AND ";
					};
				};
			};
		} else {
			var query = "SELECT * FROM "+db+"."+tbl+" ";
			if(params.length){
				query += "WHERE ";
				for(i in params){
					if(i == params.length - 1){
						query += ""+params[i]+" like '%"+values[i]+"%' ";
					} else {
						query += ""+params[i]+" like '%"+values[i]+"%' AND ";
					};
				};
			};
		};
		query += "ORDER BY "+orderParam+" "+order+";";

		return query;
	},
	sumByPeriod: function(periodStart, periodEnd, value, params, values, db, tbl, orderParam, order){
		if(periodStart && periodEnd){
			var query = "SELECT SUM("+value+") as totalValue FROM "+db+"."+tbl+" WHERE date>='"+periodStart+"' AND date<='"+periodEnd+"' ";
			if(params.length){
				query += "AND ";
				for(i in params){
					if(i == params.length - 1){
						query += ""+params[i]+"='"+values[i]+"';";
					} else {
						query += ""+params[i]+"='"+values[i]+"' AND ";
					};
				};
			};
		} else {
			var query = "SELECT SUM("+value+") as totalValue FROM "+db+"."+tbl+" ";
			if(params.length){
				query += "WHERE ";
				for(i in params){
					if(i == params.length - 1){
						query += ""+params[i]+"='"+values[i]+"';";
					} else {
						query += ""+params[i]+"='"+values[i]+"' AND ";
					};
				};
			};
		};
		return query;
	},
	findBy: async (data, database, table, param, value) => {
		let query = "SELECT * FROM "+ database +"."+ table +" WHERE "+ param +"='"+ value +"';";
	},
	roundValue: function(value){
		return Math.round((value) * 100) / 100;
	},
	roundToInt: (num, places) => {
		return +(parseFloat(num).toFixed(places));
	}
};