module.exports = {
	convertDate:function(date){
		let str = date.split('-');
		if(str!=""){
			var convertedDate = str[2]+"-"+str[1]+"-"+str[0];
		} else {
			var convertedDate = "";
		};
		return convertedDate;
	},
	convertDatetime: function(datetime){
		let str = datetime.split('T');
		if(str!=""){
			var convertedDate = lib.convertDate(str[0])+" "+str[1];
		} else {
			var convertedDate = "";
		};
		return convertedDate;
	},
	datetimeToTimestamp: (datetime) => {
		let date = datetime.split("T");
		date.year = date[0].split("-")[0];
		date.month = date[0].split("-")[1];
		date.day = date[0].split("-")[2];
		date.hour = date[1].split(":")[0];
		date.minute = date[1].split(":")[1];
		date = new Date(date.year,date.month,date.day,date.hour,date.minute);
		return date.getTime();
	},
	timestampDay: () => { return 86400000; },
	timestampToDate: (timestamp) => {
		let date = new Date(parseInt(timestamp));
		let day;let month;let hour;let minute;
		if(date.getDate() < 10){ day = "0"+date.getDate() } else { day = date.getDate() };
		if(date.getMonth() < 10){ month = "0"+date.getMonth() } else { month = date.getMonth() };
		if(date.getHours() < 10){ hour = "0"+date.getHours() } else { hour = date.getHours() };
		if(date.getMinutes() < 10){ minute = "0"+date.getMinutes() } else { minute = date.getMinutes() };
		return day+'-'+month+'-'+date.getFullYear()+' '+hour+':'+minute;
	},
	timestampToDatetime: (timestamp) => {
		let date = new Date(parseInt(timestamp));
		let day;let month;let hour;let minute;
		if(date.getDate() < 10){ day = "0"+date.getDate() } else { day = date.getDate() };
		if(date.getMonth() < 10){ month = "0"+date.getMonth() } else { month = date.getMonth() };
		if(date.getHours() < 10){ hour = "0"+date.getHours() } else { hour = date.getHours() };
		if(date.getMinutes() < 10){ minute = "0"+date.getMinutes() } else { minute = date.getMinutes() };
		return date.getFullYear()+'-'+month+'-'+day+'T'+hour+':'+minute;
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
	filterByLikeAndByPeriodAndByStatus: function(periodStart, periodEnd, params, values, date, status, status_value, db, tbl, orderParam, order){
		let query = "";
		let only_status = true;
		if(periodStart && periodEnd){
			only_status = false;
			query = "SELECT * FROM "+db+"."+tbl+" WHERE "+date+">='"+periodStart+"' AND "+date+"<='"+periodEnd+"' ";
			if(params.length){
				query += "AND ";
				for(i in params){
					if(i == params.length - 1){
						query += params[i]+" like '%"+values[i]+"%' ";
						if(status_value){ 
							query += "AND "+status+" = '"+status_value+"' ";
						};
					} else {
						query += params[i]+" like '%"+values[i]+"%' ";
						if(status_value){ 
							query += "AND "+status+" = '"+status_value+"' OR ";
						} else {
							query += "OR ";
						};
					};
				};
			};
		} else {
			query = "SELECT * FROM "+db+"."+tbl+" ";
			if(params.length){
				only_status = false;
				query += "WHERE ";
				for(i in params){
					if(i == params.length - 1){
						query += params[i]+" like '%"+values[i]+"%' ";
						if(status_value){ 
							query += "AND "+status+" = '"+status_value+"' ";
						};
					} else {
						query += params[i]+" like '%"+values[i]+"%' ";
						if(status_value){ 
							query += "AND "+status+" = '"+status_value+"' OR "; 
						} else {
							query += "OR ";
						};
					};
				};
			};
		};

		if(status_value && only_status){ query += "WHERE "+status+" = '"+status_value+"' "; };
		query += "ORDER BY "+orderParam+" "+order+"";
		return query;
	},
	filterByLikeAndInnerJoin: function(params, values, innerTbl, inners, db, tbl, orderParam, order){
		var query = "SELECT * FROM "+db+"."+tbl+" ";
		if(inners.length){
			query += "INNER JOIN "+db+"."+innerTbl+" ON ";
			for(let i in inners){
				if(i == inners.length - 1){
					query += inners[i][0]+"="+inners[i][1]+" ";
				} else {
					query += inners[i][0]+"="+inners[i][1]+" AND ";
				};
			};
		};
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
		query += "ORDER BY "+orderParam+" "+order+";";

		return query;
	},
	filterByLikeAndInnerJoinAndByStatus: function(params, values, innerTbl, inners, status, status_value, db, tbl, orderParam, order){
		var query = "SELECT * FROM "+db+"."+tbl+" ";
		if(inners.length){
			query += "INNER JOIN "+db+"."+innerTbl+" ON ";
			for(let i in inners){
				if(i == inners.length - 1){
					query += inners[i][0]+"="+inners[i][1]+" ";
				} else {
					query += inners[i][0]+"="+inners[i][1]+" AND ";
				};
			};
		};
		if(params.length){
			query += "WHERE ";
			for(i in params){
				if(i == params.length - 1){
					query += params[i]+" like '%"+values[i]+"%' AND "+status+" = '"+status_value+"' ";
				} else {
					query += params[i]+" like '%"+values[i]+"%' AND ";
				};
			};
		};
		if(!params.length){ query += "WHERE "+status+" = '"+status_value+"' ";	};
		query += "ORDER BY "+orderParam+" "+order+";";

		return query;
	},
	insertParam: (param, value, params, values) => {
		if(param && value && params && values){ params.push(param); values.push(value); } else { return false; };
	},
	fillDate: (period, periodStart_value, periodEnd_value) => {
		if(periodStart_value && periodEnd_value){ 
			period.start = periodStart_value; 
			period.end = periodEnd_value; 
		} else {
			period.start = "";
			period.end = ""; 
		};
	},
	filter_by_period_params_strict: function(tbl, date, periodStart, periodEnd, params, values, strict_params, strict_values, orderParam, order){
		let query = "";
		query = "SELECT * FROM "+tbl+" ";

		if(periodStart && periodEnd){
			query += "WHERE "+date+">='"+periodStart+"' AND "+date+"<='"+periodEnd+"' ";
			if(params.length){
				query += "AND ";
				for(i in params){
					if(i == params.length - 1){
						query += params[i]+" like '%"+values[i]+"%' ";
					} else {
						query += params[i]+" like '%"+values[i]+"%' AND ";
					};
				};
			};
		} else {
			if(params.length){
				query += "WHERE ";
				for(i in params){
					if(i == params.length - 1){
						query += params[i]+" like '%"+values[i]+"%' ";
					} else {
						query += params[i]+" like '%"+values[i]+"%' AND ";
					};
				};
			};
		};

		if(params.length || periodStart && periodEnd){
			if(strict_params.length){
				query += "AND ";
				for(i in strict_params){
					if(i == strict_params.length - 1){
						query += strict_params[i]+" like '%"+strict_values[i]+"%' ";
					} else {
						query += strict_params[i]+" like '%"+strict_values[i]+"%' AND ";
					};
				};
			};
		} else {
			if(strict_params.length){
				query += "WHERE ";
				for(i in strict_params){
					if(i == strict_params.length - 1){
						query += strict_params[i]+"='"+strict_values[i]+"' ";
					} else {
						query += strict_params[i]+"='"+strict_values[i]+"' AND ";
					};
				};
			};
		};

		query += "ORDER BY "+orderParam+" "+order+";";

		return query;
	},
	filter_inner_by_period_params_strict: function(props, tbl, inners, date, periodStart, periodEnd, params, values, strict_params, strict_values, orderParam, order){
		let query = "";
		query = "SELECT ";

		if(props.length){
			for(let i in props){
				if(i == props.length - 1){
					query += props[i]+" ";
				} else {
					query += props[i]+", ";
				};
			};
		} else {
			query += "* ";
		};

		query += "FROM "+tbl+" ";

		if(inners.length){
			for(let i in inners){
				query += "INNER JOIN "+inners[i][0]+" ON "+inners[i][1]+"="+inners[i][2]+" ";
			};
		}

		if(periodStart && periodEnd){
			query += "WHERE "+date+">='"+periodStart+"' AND "+date+"<='"+periodEnd+"' ";
			if(params.length){
				query += "AND ";
				for(i in params){
					if(i == params.length - 1){
						query += params[i]+" like '%"+values[i]+"%' ";
					} else {
						query += params[i]+" like '%"+values[i]+"%' AND ";
					};
				};
			};
		} else {
			if(params.length){
				query += "WHERE ";
				for(i in params){
					if(i == params.length - 1){
						query += params[i]+" like '%"+values[i]+"%' ";
					} else {
						query += params[i]+" like '%"+values[i]+"%' AND ";
					};
				};
			};
		};

		if(params.length || periodStart && periodEnd){
			if(strict_params.length){
				query += "AND ";
				for(i in strict_params){
					if(i == strict_params.length - 1){
						query += strict_params[i]+" like '%"+strict_values[i]+"%' ";
					} else {
						query += strict_params[i]+" like '%"+strict_values[i]+"%' AND ";
					};
				};
			};
		} else {
			if(strict_params.length){
				query += "WHERE ";
				for(i in strict_params){
					if(i == strict_params.length - 1){
						query += strict_params[i]+"='"+strict_values[i]+"' ";
					} else {
						query += strict_params[i]+"='"+strict_values[i]+"' AND ";
					};
				};
			};
		};

		query += "ORDER BY "+orderParam+" "+order+";";

		return query;
	},
	inner_by_period_params_status: function(properties, tbl, tbl2, inners, date, periodStart, periodEnd, params, values, strict_params, strict_values, orderParam, order){
		let query = "";
		if(properties.length){
			query += "SELECT "
			for(let i in properties){
				if(i == properties.length - 1){
					query += properties[i]+" FROM "+tbl+" INNER JOIN "+tbl2+" ON ";
				} else {
					query += properties[i]+", ";
				};
			};
		} else {
			query += "SELECT * FROM "+tbl+" INNER JOIN "+tbl2+" ON ";
		};

		for(let i in inners){
			if(i == inners.length - 1){
				query += inners[i][0]+"="+inners[i][1]+" ";
			} else {
				query += inners[i][0]+"="+inners[i][1]+" AND ";
			};
		};

		if(periodStart && periodEnd){
			query += "WHERE "+date+">='"+periodStart+"' AND "+date+"<='"+periodEnd+"' ";
			if(params.length){
				query += "AND ";
				for(i in params){
					if(i == params.length - 1){
						query += params[i]+" like '%"+values[i]+"%' ";
					} else {
						query += params[i]+" like '%"+values[i]+"%' AND ";
					};
				};
			};
		} else {
			if(params.length){
				query += "WHERE ";
				for(i in params){
					if(i == params.length - 1){
						query += params[i]+" like '%"+values[i]+"%' ";
					} else {
						query += params[i]+" like '%"+values[i]+"%' AND ";
					};
				};
			};
		};

		if(params.length){
			if(strict_params.length){
				query += "AND ";
				for(i in strict_params){
					if(i == strict_params.length - 1){
						query += strict_params[i]+" like '%"+strict_values[i]+"%' ";
					} else {
						query += strict_params[i]+" like '%"+strict_values[i]+"%' AND ";
					};
				};
			};
		} else {
			if(strict_params.length){
				query += "wHERE ";
				for(i in strict_params){
					if(i == strict_params.length - 1){
						query += strict_params[i]+"='"+strict_values[i]+"' ";
					} else {
						query += strict_params[i]+"='"+strict_values[i]+"' AND ";
					};
				};
			};
		};

		query += "ORDER BY "+orderParam+" "+order+"";

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
	},
	routeToHttps: (req, res, next) => {
	    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")){
	    	console.log(req.headers["x-forwarded-proto"]);
	        res.redirect(`https://${req.hostname}${req.url}`);
	    } else {
	    	console.log(req.headers["x-forwarded-proto"]);
	        next();
	    }
	}
};