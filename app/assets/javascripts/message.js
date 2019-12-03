$(function(){

  function buildHTML(message){
    var img = message.image ? `<img class="lower-message__image" src="${message.image}">`: "";
    var html =`<div class="content__message">
                <div class="content__message__upper-info">
                  <div class="content__message__upper-info__talker">
                    ${message.name}
                  </div>
                  <div class="content__message__pper-info__date">
                    ${message.date}
                  </div>
                </div>
                <div class="content__message__text">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                    ${img}
                </div>
              </div>`
    return html;
 } 
  

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.content__messages').append(html);
      $('.content__messages').animate({ scrollTop: $('.content__messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    
    })
    .fail(function(){
        alert("メッセージ送信に失敗しました")
    });
  })
});