// -------------------
// javascript lib
// -------------------

const lib = {
	convertDate:function(date){
		let str = date.split('-');
		if(str!=""){
			var convertedDate = str[2]+"-"+str[1]+"-"+str[0];
		} else {
			var convertedDate = "";
		};
		return convertedDate;
	},
	genDate: function(){
		let d = new Date();
		let date = "";
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
	genFullDate: function(){
		let d = new Date();
		let date = "";
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
		let array = [];
		let str = [];
		for(i in dates){
			str = dates[i].date.split('-');
			if(parseInt(str[1])==parseInt(month)){
				array.push(dates[i]);
			};
		};
		return array;
	},
	roundValue: function(value){
		return Math.round((value) * 100) / 100;
	},

// -------------------
// html/css lib
// -------------------

	displayForm: (form, table) => {
		let productForm = document.getElementById(form);
		let productTable = document.getElementById(table);
		if(productForm.style.display == "none"){
			productForm.style.display = "block";	
			productTable.style.display = "block";	
		} else if(productForm.style.display == "block"){
			productForm.style.display = "none";	
			productTable.style.display = "none";	
		};
	},
	clearTable(table, location){
		document.getElementById(table).innerHTML = "NENHUM REGISTRO ENCONTRADO";
		$('#'+location+'Previous').prop('disabled');
		$('#'+location+'Next').prop('disabled');
		$('#'+location+'PageNumber').text('0');
	},
	fillSelect(selectLocation, location, route, method){
		$.ajax({
			url: route,
			method: method,
			success: (response) => {
				var select = document.getElementById(location);
				select.innerHTML = "";
				select.innerHTML += "<option value='0'>"+selectLocation+"</option>"
				for(i in response){
					select.innerHTML += "<option value='"+response[i].id+"'>"+response[i].name+"</option>"
				};
			}
		});
	}
};