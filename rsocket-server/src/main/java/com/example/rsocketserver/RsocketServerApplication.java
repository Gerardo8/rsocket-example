package com.example.rsocketserver;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ImageBanner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.integration.channel.PublishSubscribeChannel;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlows;
import org.springframework.integration.file.FileHeaders;
import org.springframework.integration.file.dsl.Files;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.integration.transformer.GenericTransformer;
import org.springframework.messaging.Message;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ReflectionUtils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;

@SpringBootApplication
@RequiredArgsConstructor
public class RsocketServerApplication {

    private  final PublishSubscribeChannel publishSubscribeChannel;
    private final ObjectMapper objectMapper;

    @Bean
    Publisher<Message<GreetingsRequest>> filePublisher(@Value("${input-directory:${HOME}/Desktop/in}") File in,
                              Environment environment) {

        GenericTransformer<File, Message<GreetingsRequest>> fileStringGenericTransformer = (File source) -> {


            try {
                final String content = new String(FileCopyUtils.copyToByteArray(source));
                return MessageBuilder.withPayload(this.objectMapper.readValue(content, GreetingsRequest.class))
                        .setHeader(FileHeaders.FILENAME, source.getAbsoluteFile().getName())
                        .build();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        };
        return IntegrationFlows
                .from(Files.inboundAdapter(in)
                                .autoCreateDirectory(true)
                                .preventDuplicates(true)
                                .patternFilter("*.json"),
                        poller -> poller.poller(pm -> pm.fixedRate(1000)))
                .transform(File.class, fileStringGenericTransformer)
//                .channel(this.publishSubscribeChannel)
                .toReactivePublisher();

    }

    public static void main(String[] args) {
        SpringApplication.run(RsocketServerApplication.class, args);
    }

}
