package sho03.com.example.websocket_demo.controller

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.util.HtmlUtils
import sho03.com.example.websocket_demo.data.Greeting
import sho03.com.example.websocket_demo.data.HelloMessage

@RestController
class GreetingController() {

    // /helloにメッセージが送信された場合、greeting()を呼び出す
    // メッセージのペイロードはHelloMessageにバインドされる
    @MessageMapping("/messages")
    // /topic/greetingsをサブスクライブしているクライアントにブロードキャストされる
    @SendTo("/topic/messages")
    fun greeting(message: Message): Message{
        return message
    }

    data class Message(val content: String)
}
