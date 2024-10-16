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
    @MessageMapping("/hello")
    // /topic/greetingsをサブスクライブしているクライアントにブロードキャストされる
    @SendTo("/topic/greetings")
    fun greeting(message: HelloMessage): Greeting {
        // simulated delay
        Thread.sleep(1000)
        return Greeting("Hello ${HtmlUtils.htmlEscape(message.name)}")
    }
}
