(function($) {
	$('.sweet-delete').click(function() {
		console.log('asdasdas');
		swal({
          title: "Are you sure?",
          text: "You will not be able to recover this book!",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: 'btn-danger',
          confirmButtonText: 'Yes, delete it!',
          closeOnConfirm: false,
          timer: 10000
          //closeOnCancel: false
        },
        function(){
          swal("Deleted!", "Your book has been deleted!", "success");
        });
	})
})(jQuery)