///GET, POST, PUT Y DELETE

function getCliente(){
    $.ajax({
        url:"http://141.147.49.139:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCliente(respuesta);
        }

    });

}
function pintarCliente(respuesta){
  console.log(respuesta)
  let myTable="<table>";
  for(i=0;i<respuesta.length;i++){
      myTable+="<tr>";
      myTable+="<td>"+respuesta[i].email+"</td>";
      myTable+="<td>"+respuesta[i].password+"</td>";
      myTable+="<td>"+respuesta[i].name+"</td>";
      myTable+="<td>"+respuesta[i].age+"</td>";
      myTable+="<td> <button onclick='putCliente("+respuesta[i].idClient+")'>Actualizar</button>";
      myTable+="<td> <button onclick='deleteCliente("+respuesta[i].idClient+")'>Borrar</button>";
      myTable+="</tr>";
  }
  myTable+="</table>";
  $("#resultado1").html(myTable);
}


function postCliente(){
    let cajas = {
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };
    $.ajax({
        url:"http://141.147.49.139:8080/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el Cliente");
            window.location.reload();
        }
    });
}

function putCliente(idBotonActualizar){
    console.log(idBotonActualizar)
    if($("#email").val().length==0 || 
    $("#password").val().length==0 || 
    $("#name").val().length==0 || 
    $("#age").val().length==0 
    ){
     alert("Todos los campos son obligatorios para actualizar el cliente");
    }else{
   
    let cajas = {
        idClient:idBotonActualizar,
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val(),
    };
    console.log(cajas);
    $.ajax({
        url:"http://141.147.49.139:8080/api/Client/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente el cliente");
            window.location.reload();
            }
        });
    }
}

function deleteCliente(idBotonBorrar){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de borrar el cliente?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
         
          let myData={
            id:idBotonBorrar
        };
        $.ajax({
            url:"http://141.147.49.139:8080/api/Client/"+idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            contentType:"application/JSON",
            data:JSON.stringify(myData),
            success:function(respuesta){
          
                window.location.reload();
            }
        });
        swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      }) 
}