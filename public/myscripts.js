$(function () {
    const socket = io();
    const $prompt = $('#prompt');
    const $chatContainer = $('#chat-container');
    const $nameForm = $('#name-form');
    const $nameInput = $('#name-input');
    const $chatContent = $('#chat-content');
    const $messages = $('#messages');
    const $form = $('#form');
    const $input = $('#input');
    const emojies = {hey: "🤚", lol: "😂", woah: "😮", like: "❤️", congratulations: "🎉", react: "⚛"};
    let username;

    $nameForm.submit(function() {
      username = $nameInput.val();
      if (username) {
        $prompt.addClass('hidden');
        $chatContainer.removeClass('hidden');
      }
      return false;
    });

    $form.submit(function() {
        if ($input.val()) {
          let message = $input.val();
          if (message === "/help") {
            alert("This is the help message. Replace this with the actual help message you want to display in the popup box.");
          } else if (message === "/clear") {
            $messages.empty();
          } else {
            for (const word in emojies) {
              if (message.includes(word)) {
                message = message.replace(new RegExp(word, "gi"), emojies[word]);
              }
            }
            socket.emit('chat message', { username, message });
          }
          
          $input.val('');
        }
        return false;
      });
      

      socket.on('chat message', function(data) {
        $messages.append($('<li>').text(data.username + ": " + data.message));
        $chatContent.scrollTop($chatContent[0].scrollHeight);
      });

  });