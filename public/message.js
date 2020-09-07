'use strict';

var messages_table = $('#messages_table')
var message_form = $('#message_form')

var user1_id = $('#user1_id')
var user2_id = $('#user2_id')
var message = $('#message')
var file = $('#file')

var protocol = window.location.protocol
var port = window.location.port
var hostname = window.location.hostname

var main_host = `${ protocol }//${ hostname }:${ port }`

getUsers('user1_id')
getUsers('user2_id')

message_form.submit(function(event){
    event.preventDefault()

    let formData = new FormData($('#message_form')[0])
    let url = `${ main_host }/message`

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        beforeSend: () => {
            $('#send_message').attr('disabled', true)
        },
        dataType: "JSON",
        success: function (data) {
            user1_id.val('')
            user2_id.val('')
            message.val('')
            file.val('')
            $('#modal-close').click()
        },
        error: function(data){
            console.log(data.responseText)
        },
        complete: (data) => {
            $('#send_message').attr('disabled', false)
        }
    });
})

function loadingInfo(){
    messages_table.find('tbody').html(`
        <tr>
            <td colspan="3" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </td>
        </tr>
    `)
}

function getMessages() {
    let url = `${ main_host }/message`
    let userName = $('#search_user').val()
    //let lastname = $('#search_lastname').val()
    $.ajax({
        url: url,
        type: 'GET',
        dataType: "JSON",
        data: {
            user_name: userName
        },
        beforeSend: loadingInfo,
        success: function (data) {
            putData(data.body, userName)
        },
        error: function (data) {
            console.log(data.responseText)
        }
    });
}

function getUsers(selector) {
    let url = `${ main_host }/user`
    $.ajax({
        url: url,
        type: 'GET',
        dataType: "JSON",
        success: function (data) {
            let select = $('#'+selector)
            select.append(`
            <option value="">
                --SELECCIONAR--
            </option>
            `)
            data.body.forEach(user => {
                select.append(`
                    <option value="${ user.id }">
                        ${ user.name } ${ user.lastname }
                    </option>
                `)
            })
        },
        error: function (data) {
            console.log(data.responseText)
        }
    });
}

function putData(data, userName){
    let message = data.length == 0 ? `
        <tr>
            <td colspan="5" class="text-center">
            No se encontró a un usuario con el nombre ${userName}
            </td>
        </tr>
    ` : ''

    let tbody = messages_table.find('tbody')
    tbody.html(message)
    data.forEach(( element, index ) => {
        let fileUrl = !!element.file.trim() ? `<img class="img-thumbnail" src="./${ element.file }" style="max-height: 100px;" />` : '';
        tbody.append(`
            <tr>
                <td>${ element.user1_id.name } ${ element.user1_id.lastname }</td>
                <td>${ element.user2_id.name } ${ element.user2_id.lastname }</td>
                <td>${ element.message }</td>
                <td style="text-align: center;">
                     ${ fileUrl }
                </td>
                <td>${ element.date }</td>
            </tr>
        `)
    })
}