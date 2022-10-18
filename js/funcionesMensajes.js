/////////////GET, POST,PUT Y DELETE

function getMensajes(){
    $.ajax({
        url:"http://141.147.49.139:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarMensajes(respuesta);
            console.log(respuesta);
        }

    });

}

function postMensajes(){
    if ($("#messageText").val().length==0) {
        alert("Todos los campos son obligatorios para actualizar el mensaje");
    }else{

    
    let cajas = {
        messageText:$("#messageText").val(),
        client:{idClient: +$("#select-client").val()},
        room:{id: +$("#select-room").val()}
        
    };
    console.log(cajas);
    $.ajax({
        url:"http://141.147.49.139:8080/api/Message/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el mensaje");
            window.location.reload();  

    
        }
    });
}
}

function putMensajes(idBotonActualizar){
    console.log(idBotonActualizar)
    if($("#messageText").val().length==0
    ){
     alert("Todos los campos son obligatorios para actualizar el mensaje");
    }else{
   
    let cajas = {
        idMessage:idBotonActualizar,
        messageText:$("#messageText").val(),
    
    };
    console.log(cajas);
    $.ajax({
        url:"http://141.147.49.139:8080/api/Message/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente el mensaje");
            window.location.reload();
            }
        });
    }
}


function deleteMensajes(idBotonBorrar){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de borrar el mensaje?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
         
          let myData={
            idMessage:idBotonBorrar
        };
        $.ajax({
            url:"http://141.147.49.139:8080/api/Message/"+idBotonBorrar,
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




////////////////////////////////////////////

function pintarMensajes(respuesta){
   
    let myTable="<table>";
    let MENSAJE = "MENSAJE";
    let ROOM = "ROOM";
    let CLIENTE = "CLIENTE";
    //let EDAD = "EDAD";
    
    myTable+="<th>"+MENSAJE+"</th>";

    myTable+="<th>"+ROOM+"</th>";

    myTable+="<th>"+CLIENTE+"</th>";

    
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].room.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick='putMensajes("+respuesta[i].idMessage+")'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteMensajes("+respuesta[i].idMessage+")'>Borrar</button> "
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);


}

function getRoom_Message(){
    $.ajax({
        url:"http://141.147.49.139:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-room");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>' )
            })
        }
    });
}

function getClient_Message(){
    $.ajax({
        url:"http://141.147.49.139:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>' )
            })
        }
    });
}