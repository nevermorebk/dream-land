$(document).ready(function() {
	  $('#fromDate').datepicker({
          format: "dd/mm/yyyy"
      });  
});

function add(){
	var name = $('#name').val();
//	var fromDate = $('#fromDate').val();
//	var toDate = $('#toDate').val();
	var status = $('#').val();
	var description = $('#description').val();
	
	// validate data
	if(!name){
		alert("Xin vui lòng nhập lại thông tin !");
		return {};
	}
	
	var request = {
			name : name,
			
			description: description
	};
	
	var url = BASE_URL + "/policy/add";
	$.ajax({
		  type: 'POST',
		  contentType : 'application/json',
		  url: url,
		  data: JSON.stringify(request),
		  dataType: 'json',
		  success: function(data) {
			  console.log(JSON.stringify(data));
		  },
		  error: function(data) {
			  console.log("Error: " + data);
		  }
		});
}

function cancel() {
	$('#name').val("");
	$('#description').val("");
}