package sho03.com.example.websocket_demo.config

import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer

// Spring のコンフィギュレーションクラス
@Configuration
// WebSocketメッセージを有効化
@EnableWebSocketMessageBroker
class WebSocketConfig : WebSocketMessageBrokerConfigurer {

    // メッセージブローカーを構成する
    override fun configureMessageBroker(registry: MessageBrokerRegistry) {
        // /topicをプレフィックスとしてもつ宛先でクライアントにグリーティングメッセージを戻すことができるようにする
        registry.enableSimpleBroker("/topic")
        // /app/helloとすると、GreetingControllerのgreetingメソッドが実行される
        registry.setApplicationDestinationPrefixes("/app")
    }

    // WebSocket接続用のエンドポイントを登録
    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        registry
            .addEndpoint("/gs-guide-websocket")
            .setAllowedOrigins("http://localhost:5173")
    }
}
