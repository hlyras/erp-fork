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
	fillDateInput: function(input){
		return input.valueAsDate = new Date();
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
	displayDiv: (div) => {
		let selectedDiv = document.getElementById(div);
		if(selectedDiv.style.display == "none"){
			selectedDiv.style.display = "block";	
		} else if(selectedDiv.style.display == "block"){
			selectedDiv.style.display = "none";	
		};
	},
	clearTable(table, location){
		document.getElementById(table).innerHTML = "NENHUM REGISTRO ENCONTRADO";
		$('#'+location+'Previous').prop('disabled');
		$('#'+location+'Next').prop('disabled');
		$('#'+location+'PageNumber').text('0');
	},
	noRecord(table){
		document.getElementById(table).innerHTML = "NENHUM REGISTRO ENCONTRADO";
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
	},
	clearSelect(select){
		select.innerHTML = "";
		select.innerHTML += "<option value='0'>Sem resultados</option>"
	},

	carousel: {
		execute: (box, render, response, pagination) => {
			document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-previous").onclick = function(){
		        if(pagination.page > 0){
		            pagination.page--;
		            lib.carousel.paging(render, response, pagination);
		            lib.carousel.navigation(box, response, pagination);
		        };
		    };

		    document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-next").onclick = function(){
		        if(pagination.page < response.length / pagination.pageSize - 1){
		            pagination.page++;
		            lib.carousel.paging(render, response, pagination);
		            lib.carousel.navigation(box, response, pagination);
		        };
		    };
		    lib.carousel.paging(render, response, pagination);
		    lib.carousel.navigation(box, response, pagination);
		},
		paging: (render, response, pagination) => {
			render(response, pagination);
		},
		navigation: (box, response, pagination) => {
			if(!response.length){
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-previous").disabled = true;
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-page").innerHTML = "0 de 0";
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-next").disabled = true;
				return;
			} else if(response.length / pagination.pageSize <= 1){
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-previous").disabled = true;
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-page").innerHTML = "1 de 1";
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-next").disabled = true;
				return;
			};

			if(response.length <= pagination.pageSize || pagination.page >= response.length / pagination.pageSize - 1){
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-previous").disabled = false;
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-page").innerHTML = ""+ (pagination.page + 1) + " de " + Math.ceil(response.length / pagination.pageSize);
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-next").disabled = true;
			};

			if(response.length <= pagination.pageSize || pagination.page == 0){
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-previous").disabled = true;
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-page").innerHTML = ""+ (pagination.page + 1) + " de " + Math.ceil(response.length / pagination.pageSize);
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-next").disabled = false;
			};

			document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-page").innerHTML = ""+ (pagination.page + 1) + " de " + Math.ceil(response.length / pagination.pageSize) ;
		}
	}
};